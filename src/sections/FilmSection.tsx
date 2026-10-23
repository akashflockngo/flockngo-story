import React, { useRef, useState, useEffect, useCallback } from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { gsap, ScrollTrigger } from '../config/gsap'
import {
  TOTAL_FRAMES,
  initFilmFrameLoader,
  getNearestLoadedFrame,
} from '../services/filmFrameLoader'
import { useAssetStore } from '../store/useAssetStore'
// import { MessageSquare, ArrowUpRight, Compass, Sparkles } from 'lucide-react'

export const FilmSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const currentFrameRef = useRef<number>(0)

  const filmLoadedCount = useAssetStore((state) => state.filmLoadedCount)
  const filmKeyframesReady = useAssetStore((state) => state.filmKeyframesReady)

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  // Listen for changes to user motion preferences
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  // Canvas drawing function: Guarantees 100% full-viewport edge-to-edge coverage on all screen resolutions
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Pick target image or nearest loaded fallback from optimized frame registry
    const img = getNearestLoadedFrame(index)
    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1
    const rect = canvas.getBoundingClientRect()
    const targetW = Math.round(rect.width * dpr)
    const targetH = Math.round(rect.height * dpr)

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW
      canvas.height = targetH
    }

    const cWidth = canvas.width
    const cHeight = canvas.height
    const iWidth = img.naturalWidth || 1280
    const iHeight = img.naturalHeight || 720

    // High-precision edge-to-edge cover: Math.ceil prevents hairline subpixel gaps
    const ratio = Math.max(cWidth / iWidth, cHeight / iHeight)
    const drawWidth = Math.ceil(iWidth * ratio)
    const drawHeight = Math.ceil(iHeight * ratio)
    const drawX = Math.floor((cWidth - drawWidth) / 2)
    const drawY = Math.floor((cHeight - drawHeight) / 2)

    ctx.clearRect(0, 0, cWidth, cHeight)
    ctx.drawImage(img, 0, 0, iWidth, iHeight, drawX, drawY, drawWidth, drawHeight)
  }, [])

  // Start prioritized film preloading (concurrency throttled, keyframes first)
  useEffect(() => {
    if (prefersReducedMotion) return
    initFilmFrameLoader()

    const handleResize = () => {
      renderFrame(currentFrameRef.current)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Render initial frame as soon as frame 0 is fetched
    renderFrame(0)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [prefersReducedMotion, renderFrame])

  // Rerender current frame when keyframes become available
  useEffect(() => {
    if (filmLoadedCount > 0) {
      renderFrame(currentFrameRef.current)
    }
  }, [filmLoadedCount, renderFrame])

  // GSAP ScrollTrigger Canvas Sequence Scrubbing with Master-Grade Story Pacing
  useEffect(() => {
    if (prefersReducedMotion) return
    const section = sectionRef.current
    if (!section) return

    // Use GSAP Context for component lifecycle cleanup
    const ctx = gsap.context(() => {
      // Extended cinematic scroll runway (+8000px desktop, +5500px mobile)
      // Provides ample time to read the on-screen alerts, understand the story, and absorb the experience
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => (window.innerWidth < 768 ? '+=5500' : '+=8000'),
          pin: true,
          pinSpacing: true,
          scrub: 0.5, // Velvety 0.5s cinematic damping: smooth, luxurious, no whizzing past
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress

            // Story pacing:
            // 240 frames scrub across the first 85% of the scroll runway (progress 0.00 to 0.85)
            // (~6800px of comfortable scroll travel, giving ~28px per frame — the golden storytelling ratio).
            // The remaining 15% (0.85 to 1.00, ~1200px of scroll) holds the final sunrise frame and outro card.
            const videoProgress = Math.min(1, progress / 0.85)
            const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(videoProgress * TOTAL_FRAMES))

            if (targetFrame !== currentFrameRef.current) {
              currentFrameRef.current = targetFrame
              renderFrame(targetFrame)
            }
          },
        },
      })

      // 1. Intro Header Overlay: Fades out smoothly as visitor starts scrolling (0.02 to 0.14)
      tl.to(
        '.film-header-overlay',
        {
          opacity: 0,
          y: -24,
          duration: 0.12,
          ease: 'power1.out',
        },
        0.02
      )

      // 2. Story Beat 1: Direct WhatsApp Alert (progress 0.16 to 0.38)
      tl.fromTo(
        '.film-beat-1',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power1.out' },
        0.16
      )
      tl.to(
        '.film-beat-1',
        { opacity: 0, y: -16, duration: 0.08, ease: 'power1.in' },
        0.36
      )

      // 3. Story Beat 2: 1-Tap Itinerary Pass & Confirmed Roster (progress 0.40 to 0.62)
      tl.fromTo(
        '.film-beat-2',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power1.out' },
        0.40
      )
      tl.to(
        '.film-beat-2',
        { opacity: 0, y: -16, duration: 0.08, ease: 'power1.in' },
        0.60
      )

      // 4. Story Beat 3: Community In Real Life (progress 0.64 to 0.82)
      tl.fromTo(
        '.film-beat-3',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power1.out' },
        0.64
      )
      tl.to(
        '.film-beat-3',
        { opacity: 0, y: -16, duration: 0.08, ease: 'power1.in' },
        0.82
      )

      // 5. Outro Resolution: Appears as the sunrise reaches its climax (0.84) and holds to 1.00
      tl.fromTo(
        '.film-outro-overlay',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power1.out' },
        0.84
      )
    }, section)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [prefersReducedMotion, renderFrame])

  // Accessibility / Reduced-Motion Fallback (Normal, non-pinned playback)
  if (prefersReducedMotion) {
    return (
      <section
        id="film"
        className="relative py-24 sm:py-32 bg-[#0A0D14] text-white"
      >
        <div className="container-cinematic text-center space-y-8">
          <div className="film-header max-w-2xl mx-auto text-center space-y-4">

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              See the experience unfold.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal">
              A quiet phone on a desk, an incoming invitation, and a connected community coming together.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl">
            <video
              src={BRAND_CONFIG.assets.video}
              poster={BRAND_CONFIG.assets.videoPoster}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="film"
      ref={sectionRef}
      className="relative w-full bg-[#0A0D14] text-white"
    >
      {/* Fullscreen Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-[100vh] h-[100svh] overflow-hidden bg-[#0A0D14] select-none"
      >
        {/* Full-viewport ambient backdrop reflection eliminating empty letterbox gaps */}
        <div
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={BRAND_CONFIG.assets.heroBrand}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-25 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-[#0A0D14]/80" />
        </div>

        {/* 
          Apple-Grade Canvas Frame-by-Frame Scrubber:
          - Pure background element (z-10)
          - Zero video controls or HUD overlays
          - Permanently muted with synchronous 60fps GPU frame paint
          - Zero decoder lag or dropped frames
        */}
        <canvas
          ref={canvasRef}
          aria-label="FlocknGo 20-second cinematic film scroll-scrubbed background"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none select-none"
        />

        {/* Cinematic Vignette Overlay to ensure text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/80 via-transparent to-[#0A0D14]/85 z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Cinematic Intro Header (Gracefully fades out as user scrubs forward) */}
        <div className="film-header-overlay absolute top-20 sm:top-28 md:top-32 left-0 right-0 z-30 pointer-events-none px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md leading-tight">
              See the experience unfold.
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-normal drop-shadow-sm leading-relaxed">
              A quiet phone on a desk, an incoming invitation, and a connected community coming together.
            </p>
          </div>
        </div>

        {/* Dynamic Story Beat 1: Alert arrives on desk */}
        <div className="film-beat-1 absolute bottom-16 sm:bottom-28 left-4 right-4 sm:left-14 sm:right-auto sm:max-w-xl z-30 pointer-events-none opacity-0">
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight">
              An invitation that actually gets seen.
            </h3>
            <p className="text-xs sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed">
              Delivered directly to attendee WhatsApp — no noisy 500-person group chats, just personal updates and clear action links.
            </p>
          </div>
        </div>

        {/* Dynamic Story Beat 2: Direct reservation & pass */}
        <div className="film-beat-2 absolute bottom-16 sm:bottom-28 left-4 right-4 sm:left-auto sm:right-14 sm:max-w-xl z-30 pointer-events-none opacity-0">
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-2 sm:space-y-3 text-left sm:text-right">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight">
              Instant RSVP & verified roster spot.
            </h3>
            <p className="text-xs sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed">
              Rajgad Fort Night Trek • Verified spot #18 locked with pickup location, gear checklist, and automated payment reconciliation.
            </p>
          </div>
        </div>

        {/* Dynamic Story Beat 3: Real human connection on the trail */}
        <div className="film-beat-3 absolute bottom-16 sm:bottom-28 left-4 right-4 sm:left-14 sm:right-auto sm:max-w-xl z-30 pointer-events-none opacity-0">
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight">
              Turning online chats into shared memories.
            </h3>
            <p className="text-xs sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed">
              Hikers scaling the mountain ridge at sunrise. Real people sharing real adventures, building communities that stay together.
            </p>
          </div>
        </div>

        {/* Outro Overlay: Final resolution leading cleanly into Chapter 01 */}
        <div className="film-outro-overlay absolute inset-x-0 bottom-12 sm:bottom-20 md:bottom-24 z-30 pointer-events-none text-center opacity-0 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-black/95 backdrop-blur-2xl border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              From a quiet notification to a thriving community.
            </h3>
            <p className="text-xs sm:text-base md:text-xl text-slate-200 leading-relaxed font-normal">
              Scroll down to discover how organizers build, launch, and grow on FlocknGo ↓
            </p>
          </div>
        </div>

        {/* Subtle buffering progress pill - only shown briefly until keyframes are ready */}
        {!filmKeyframesReady && (
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-mono text-slate-300 flex items-center gap-2 pointer-events-none transition-opacity duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F47721] animate-ping" />
            <span>Buffering film {Math.min(100, Math.round((filmLoadedCount / 30) * 100))}%</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default FilmSection
