import React, { useRef, useState, useEffect, useCallback } from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { gsap, ScrollTrigger } from '../config/gsap'
import { MessageSquare, ArrowUpRight, Compass, Sparkles } from 'lucide-react'

const TOTAL_FRAMES = 240

export const FilmSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>([])
  const currentFrameRef = useRef<number>(0)
  const isLoadedRef = useRef<boolean>(false)

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

    // Pick target image or nearest loaded fallback
    let img = imagesRef.current[index]
    if (!img || !img.complete) {
      // Search backward for nearest loaded frame
      for (let i = index - 1; i >= 0; i--) {
        if (imagesRef.current[i]?.complete) {
          img = imagesRef.current[i]
          break
        }
      }
      // If none found backward, search forward
      if (!img || !img.complete) {
        for (let i = index + 1; i < TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete) {
            img = imagesRef.current[i]
            break
          }
        }
      }
    }

    if (!img || !img.complete) return

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

  // Progressive frame preloading
  useEffect(() => {
    if (prefersReducedMotion) return

    imagesRef.current = new Array(TOTAL_FRAMES).fill(null)

    // Load first frame with immediate priority to eliminate any blank initial flash
    const firstImg = new Image()
    firstImg.src = `/frames/frame_000.webp`
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg
      renderFrame(0)
      isLoadedRef.current = true
    }

    // Preload remaining frames in progressive batches
    const loadRemainingFrames = () => {
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image()
        const padded = i.toString().padStart(3, '0')
        img.src = `/frames/frame_${padded}.webp`
        img.onload = () => {
          imagesRef.current[i] = img
          // If the user happens to be paused at this frame, render it
          if (currentFrameRef.current === i) {
            renderFrame(i)
          }
        }
      }
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadRemainingFrames)
    } else {
      setTimeout(loadRemainingFrames, 80)
    }

    // Window resize handler for crisp canvas rerender
    const handleResize = () => {
      renderFrame(currentFrameRef.current)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [prefersReducedMotion, renderFrame])

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
        className="relative py-24 sm:py-32 bg-[#0A0D14] text-white border-t border-white/[0.08]"
      >
        <div className="container-cinematic text-center space-y-8">
          <div className="film-header max-w-2xl mx-auto text-center space-y-4">
            <div className="eyebrow-badge text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F47721]" />
              <span>THE 20-SECOND FILM</span>
            </div>
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
      className="relative w-full bg-[#0A0D14] text-white border-t border-white/[0.08]"
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
        <div className="film-header-overlay absolute top-24 sm:top-28 md:top-32 left-0 right-0 z-30 pointer-events-none px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="eyebrow-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-mono font-bold tracking-wider text-slate-300 uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F47721] animate-pulse" />
              <span>THE 20-SECOND FILM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
              See the experience unfold.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal drop-shadow-sm">
              A quiet phone on a desk, an incoming invitation, and a connected community coming together.
            </p>
          </div>
        </div>

        {/* Dynamic Story Beat 1: Alert arrives on desk */}
        <div className="film-beat-1 absolute bottom-24 sm:bottom-28 left-6 sm:left-12 z-30 pointer-events-none opacity-0">
          <div className="p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 shadow-2xl max-w-xs sm:max-w-md space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#25D366] font-mono font-bold text-[11px] uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>10:42 AM • Direct WhatsApp Alert</span>
            </div>
            <h3 className="text-sm sm:text-base text-white font-bold leading-snug">
              An invitation that actually gets seen.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Delivered directly to attendee WhatsApp — no noisy 500-person group chats, just personal updates and clear action links.
            </p>
          </div>
        </div>

        {/* Dynamic Story Beat 2: Direct reservation & pass */}
        <div className="film-beat-2 absolute bottom-24 sm:bottom-28 right-6 sm:right-12 z-30 pointer-events-none opacity-0">
          <div className="p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 shadow-2xl max-w-xs sm:max-w-md space-y-1.5 text-right">
            <div className="flex items-center justify-end gap-1.5 text-[#F47721] font-mono font-bold text-[11px] uppercase tracking-wider">
              <span>1-Tap Itinerary Pass</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm sm:text-base text-white font-bold leading-snug">
              Instant RSVP & verified roster spot.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Rajgad Fort Night Trek • Verified spot #18 locked with pickup location, gear checklist, and automated payment reconciliation.
            </p>
          </div>
        </div>

        {/* Dynamic Story Beat 3: Real human connection on the trail */}
        <div className="film-beat-3 absolute bottom-24 sm:bottom-28 left-6 sm:left-12 z-30 pointer-events-none opacity-0">
          <div className="p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 shadow-2xl max-w-xs sm:max-w-md space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#F47721] font-mono font-bold text-[11px] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Community In Real Life</span>
            </div>
            <h3 className="text-sm sm:text-base text-white font-bold leading-snug">
              Turning online chats into shared memories.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Hikers scaling the mountain ridge at sunrise. Real people sharing real adventures, building communities that stay together.
            </p>
          </div>
        </div>

        {/* Outro Overlay: Final resolution leading cleanly into Chapter 01 */}
        <div className="film-outro-overlay absolute inset-x-0 bottom-20 sm:bottom-24 z-30 pointer-events-none text-center opacity-0 px-6">
          <div className="max-w-xl mx-auto space-y-2.5 p-6 rounded-3xl bg-black/90 backdrop-blur-md border border-white/15 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E6]/10 border border-[#F47721]/30 text-xs font-mono font-bold tracking-widest text-[#F47721] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>01 / CREATE COMMUNITIES</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              From a quiet notification to a thriving community.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Scroll down to discover how organizers build, launch, and grow on FlocknGo ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FilmSection
