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
 * Initializes the prioritized film preloader:
 * - Frame 0 immediately for instant poster
 */
export function initFilmFrameLoader(): void {
  if (hasStartedLoading || typeof window === 'undefined') return
  hasStartedLoading = true

  const store = useAssetStore.getState()

  // Frame 0 load for poster fallback
  fetchSingleFrame(0)
    .then(() => {
      store.setFilmLoadedCount(1)
      store.setFilmKeyframesReady(true)
    })
    .catch(() => {
      store.setFilmKeyframesReady(true)
    })
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
