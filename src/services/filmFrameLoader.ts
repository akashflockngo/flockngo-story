import { useAssetStore } from '../store/useAssetStore'

export const TOTAL_FRAMES = 240
export const KEYFRAME_INTERVAL = 8 // Every 8th frame: 0, 8, 16, 24... (~30 keyframes)

// Shared memory registry of loaded frame Image objects
export const frameElements: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null)

let hasStartedLoading = false

/**
 * Helper to fetch a single frame with concurrency throttling
 */
function fetchSingleFrame(index: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (frameElements[index] && frameElements[index]?.complete) {
      resolve(frameElements[index]!)
      return
    }

    const img = new Image()
    const padded = index.toString().padStart(3, '0')
    img.src = `/frames/frame_${padded}.webp`

    img.onload = async () => {
      try {
        if ('decode' in img) {
          await img.decode()
        }
      } catch {
        // Fallback gracefully
      }
      frameElements[index] = img
      resolve(img)
    }

    img.onerror = (e) => {
      reject(e)
    }
  })
}

/**
 * Concurrency worker pool: runs tasks with a maximum concurrent capacity
 */
async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  task: (item: T) => Promise<unknown>
): Promise<void> {
  const queue = [...items]
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()
      if (item !== undefined) {
        try {
          await task(item)
        } catch {
          // Continue with remaining frames even if one fails
        }
      }
    }
  })
  await Promise.all(workers)
}

/**
 * Initializes the prioritized film preloader:
 * - Phase 1: Frame 0 immediately for instant poster
 * - Phase 2: Keyframes (0, 8, 16...) with concurrency of 4
 * - Phase 3: Fill intermediate frames in background with concurrency of 4
 */
export function initFilmFrameLoader(): void {
  if (hasStartedLoading || typeof window === 'undefined') return
  hasStartedLoading = true

  const store = useAssetStore.getState()
  let loadedCount = 0

  // 1. Frame 0 immediate load
  fetchSingleFrame(0)
    .then(() => {
      loadedCount++
      store.setFilmLoadedCount(loadedCount)
    })
    .catch(() => {})

  // 2. Schedule Phase 2: Keyframes (every 8th frame)
  const keyframeIndices: number[] = []
  for (let i = KEYFRAME_INTERVAL; i < TOTAL_FRAMES; i += KEYFRAME_INTERVAL) {
    keyframeIndices.push(i)
  }

  const startPreload = async () => {
    // Load Keyframes with concurrency limit of 4
    await runWithConcurrency(keyframeIndices, 4, async (idx) => {
      await fetchSingleFrame(idx)
      loadedCount++
      store.setFilmLoadedCount(loadedCount)
    })

    // Keyframes ready! Scrubbing is now 100% fluid
    store.setFilmKeyframesReady(true)

    // Phase 3: Intermediate frames in background
    const intermediateIndices: number[] = []
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (i % KEYFRAME_INTERVAL !== 0) {
        intermediateIndices.push(i)
      }
    }

    // Use requestIdleCallback or small delay to avoid competing with main thread
    const loadIntermediate = () => {
      runWithConcurrency(intermediateIndices, 4, async (idx) => {
        await fetchSingleFrame(idx)
        loadedCount++
        store.setFilmLoadedCount(loadedCount)
      })
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadIntermediate)
    } else {
      setTimeout(loadIntermediate, 100)
    }
  }

  // Kick off after a gentle 50ms tick to let initial page layout settle
  setTimeout(startPreload, 50)
}

/**
 * Fast lookup for nearest loaded frame
 */
export function getNearestLoadedFrame(index: number): HTMLImageElement | null {
  const exact = frameElements[index]
  if (exact && exact.complete && exact.naturalWidth > 0) return exact

  // Search backward
  for (let i = index - 1; i >= 0; i--) {
    const prev = frameElements[i]
    if (prev && prev.complete && prev.naturalWidth > 0) return prev
  }

  // Search forward
  for (let i = index + 1; i < TOTAL_FRAMES; i++) {
    const next = frameElements[i]
    if (next && next.complete && next.naturalWidth > 0) return next
  }

  return frameElements[0] || null
}
