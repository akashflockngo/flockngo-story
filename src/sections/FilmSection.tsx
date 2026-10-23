import React, { useRef, useEffect, useSyncExternalStore } from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { gsap, ScrollTrigger } from '../config/gsap'

// External store subscription for desktop viewport breakpoint (>= 768px)
const subscribeToDesktop = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(min-width: 768px)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
const getDesktopSnapshot = () =>
  typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false
const getDesktopServerSnapshot = () => false

// External store subscription for accessibility reduced-motion preference
const subscribeToReducedMotion = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
const getReducedMotionSnapshot = () =>
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
const getReducedMotionServerSnapshot = () => false

export const FilmSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const posterRef = useRef<HTMLDivElement | null>(null)

  // Responsive mobile-first breakpoint detection: mobile (< 768px) vs desktop (>= 768px)
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  )

  // Accessibility reduced-motion detection
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )

  // Active video source determination based on mobile-first breakpoint
  const activeVideoSrc = isDesktop
    ? BRAND_CONFIG.assets.video
    : BRAND_CONFIG.assets.videoMobile

  // Responsive film poster banner: Desktop 16:9 widescreen vs Mobile 9:16 portrait
  const activePoster = isDesktop
    ? BRAND_CONFIG.assets.videoPosterDesktop
    : BRAND_CONFIG.assets.videoPoster

  // GSAP ScrollTrigger Stage Pinning with Scroll-Controlled Video Scrubbing & Poster Choreography
  // GSAP ScrollTrigger Stage Pinning with Scroll-Controlled Video Scrubbing & Poster Choreography
  useEffect(() => {
    if (prefersReducedMotion) return
    const section = sectionRef.current
    const video = videoRef.current
    const poster = posterRef.current
    if (!section || !video) return

    // Ensure video is initially paused so scrolling up & down exclusively controls the playhead
    video.pause()

    // Smooth virtual playhead animated by GSAP Timeline in lockstep with scrub
    const playhead = { time: 0 }
    let lastRenderedTime = -1
    let isSeeking = false
    let seekTimeout: ReturnType<typeof setTimeout> | null = null
    let stInstance: ScrollTrigger | null = null

    // Video seeker using hardware-accelerated fastSeek where available
    const performSeek = (target: number) => {
      isSeeking = true
      lastRenderedTime = target

      if (typeof video.fastSeek === 'function') {
        try {
          video.fastSeek(target)
        } catch {
          video.currentTime = target
        }
      } else {
        video.currentTime = target
      }

      // Safeguard: auto-release lock if browser drops the seeked event
      if (seekTimeout) clearTimeout(seekTimeout)
      seekTimeout = setTimeout(() => {
        isSeeking = false
      }, 75)
    }

    const onSeeked = () => {
      isSeeking = false
      if (seekTimeout) {
        clearTimeout(seekTimeout)
        seekTimeout = null
      }
    }

    video.addEventListener('seeked', onSeeked)

    // Ticker Loop synchronized with display refresh rate (60Hz / 120Hz ProMotion)
    const tickerLoop = () => {
      if (!video || !video.duration || isNaN(video.duration) || video.duration <= 0) return
      // When stage is not active in viewport, do nothing (0% GPU/CPU overhead)
      if (!stInstance || !stInstance.isActive) return

      const target = playhead.time
      const diff = Math.abs(target - lastRenderedTime)

      // Only seek if difference is meaningful (> 25ms, roughly 1 frame)
      // AND the video hardware decoder is not currently busy
      if (diff >= 0.025) {
        if (video.seeking || isSeeking) return
        performSeek(target)
      }
    }

    gsap.ticker.add(tickerLoop)

    const handleLoadedMetadata = () => {
      video.pause()
      if (video.currentTime !== 0) {
        video.currentTime = 0
      }
      ScrollTrigger.refresh()
    }

    if (video.readyState >= 1) {
      handleLoadedMetadata()
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })
    }

    // Use GSAP Context for component lifecycle cleanup
    const ctx = gsap.context(() => {
      // Cinematic extended scroll runway (+5800px desktop, +4200px mobile)
      // Provides smooth, unhurried scroll-scrubbing travel for the video playhead so each scene and story beat is crystal clear
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => (window.innerWidth < 768 ? '+=4200' : '+=5800'),
          pin: true,
          pinSpacing: true,
          scrub: window.innerWidth < 768 ? 0.45 : 0.4, // Silky smooth inertia spring that cushions touch & wheel momentum
          anticipatePin: 1,
          fastScrollEnd: true, // Prevents card animations from playing catch-up when scrolling fast
          preventOverlaps: true, // Prevents conflicting tweens during high-velocity navigation
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set(['.film-beat-1', '.film-beat-2', '.film-beat-3', '.film-outro-overlay'], {
              visibility: 'visible',
            })
          },
          onEnterBack: () => {
            gsap.set(['.film-beat-1', '.film-beat-2', '.film-beat-3', '.film-outro-overlay'], {
              visibility: 'visible',
            })
          },
          onLeave: () => {
            // When leaving Film section downwards into the rest of the page,
            // immediately freeze video and hide all beat cards so nothing flashes over the page
            if (video) {
              video.pause()
            }
            gsap.set(
              ['.film-beat-1', '.film-beat-2', '.film-beat-3', '.film-outro-overlay', '.film-header-overlay'],
              { opacity: 0, visibility: 'hidden' }
            )
          },
          onLeaveBack: () => {
            // When leaving Film section upwards into Hero, reset to 0, show poster, and clean cards
            if (video && video.currentTime !== 0) {
              video.currentTime = 0
            }
            playhead.time = 0
            lastRenderedTime = 0
            if (poster) {
              poster.style.opacity = '1'
              poster.style.visibility = 'visible'
            }
            gsap.set('.film-poster-overlay', { opacity: 1, visibility: 'visible' })
            gsap.set('.film-header-overlay', { opacity: 1, visibility: 'visible', y: 0 })
            gsap.set(['.film-beat-1', '.film-beat-2', '.film-beat-3', '.film-outro-overlay'], {
              opacity: 0,
              visibility: 'hidden',
            })
          },
        },
      })

      stInstance = tl.scrollTrigger || null

      // Smooth Video Scrub tween on the timeline:
      // Advances playhead.time from 0 to (duration - 0.02) between timeline progress 0.04 and 0.96
      tl.to(
        playhead,
        {
          time: () =>
            video && video.duration && !isNaN(video.duration)
              ? Math.max(0, video.duration - 0.02)
              : 20,
          ease: 'none',
          duration: 0.92,
        },
        0.04
      )

      // Timeline Animation 1: Poster Banner Fades Out (0.04 to 0.12)
      tl.to(
        '.film-poster-overlay',
        {
          opacity: 0,
          duration: 0.08,
          ease: 'power1.out',
          onComplete: () => {
            gsap.set('.film-poster-overlay', { visibility: 'hidden' })
          },
          onReverseComplete: () => {
            gsap.set('.film-poster-overlay', { visibility: 'visible' })
          },
        },
        0.04
      )

      // Timeline Animation 2: Intro Header Overlay Fades Out (0.04 to 0.14)
      tl.to(
        '.film-header-overlay',
        {
          opacity: 0,
          y: -24,
          duration: 0.10,
          ease: 'power1.out',
        },
        0.04
      )

      // Timeline Animation 3: Story Beat 1 - Direct WhatsApp Alert (progress 0.16 to 0.38)
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

      // Timeline Animation 4: Story Beat 2 - 1-Tap Itinerary Pass (progress 0.40 to 0.62)
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

      // Timeline Animation 5: Story Beat 3 - Community In Real Life (progress 0.64 to 0.86)
      tl.fromTo(
        '.film-beat-3',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power1.out' },
        0.64
      )
      tl.to(
        '.film-beat-3',
        { opacity: 0, y: -16, duration: 0.08, ease: 'power1.in' },
        0.84
      )

      // Timeline Animation 6: Outro Resolution (0.86 to 0.96, dissolves cleanly before pin ends)
      tl.fromTo(
        '.film-outro-overlay',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.07, ease: 'power1.out' },
        0.86
      )
      tl.to(
        '.film-outro-overlay',
        { opacity: 0, y: -16, duration: 0.04, ease: 'power1.in' },
        0.96
      )
    }, section)

    ScrollTrigger.refresh()

    return () => {
      video.removeEventListener('seeked', onSeeked)
      gsap.ticker.remove(tickerLoop)
      if (seekTimeout) clearTimeout(seekTimeout)
      ctx.revert()
    }
  }, [prefersReducedMotion, isDesktop])

  // Accessibility / Reduced-Motion Fallback (Normal, non-pinned autonomous playback)
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
              key={isDesktop ? 'desktop-reduced-video' : 'mobile-reduced-video'}
              src={activeVideoSrc}
              poster={activePoster}
              autoPlay
              loop
              muted
              playsInline
              aria-label={
                isDesktop
                  ? 'FlocknGo desktop brand film'
                  : 'FlocknGo mobile brand film'
              }
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
      className="relative z-10 w-full bg-[#0A0D14] text-white overflow-hidden"
    >
      {/* Fullscreen Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-[100vh] h-[100svh] overflow-hidden bg-[#0A0D14] select-none"
      >
        {/* Full-viewport ambient backdrop banner reflection eliminating letterbox gaps */}
        <div
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={activePoster}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-35 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-[#0A0D14]/80" />
        </div>

        {/* 
          Responsive Scroll-Controlled Cinematic Brand Video:
          - Mobile screens (< 768px): flockngo-story-mobile.mp4 (720x1280 9:16 portrait)
          - Desktop screens (>= 768px): flockngo-story.mp4 (1280x720 16:9 landscape)
          - Scroll-scrubbed via GSAP ScrollTrigger timeline: scrolls forward on down, reverses on up!
          - Keyed video element prevents duplicate downloads across breakpoints.
        */}
        <video
          key={isDesktop ? 'desktop-film-video' : 'mobile-film-video'}
          ref={videoRef}
          src={activeVideoSrc}
          poster={activePoster}
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          aria-label={
            isDesktop
              ? 'FlocknGo desktop brand film'
              : 'FlocknGo mobile brand film'
          }
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none select-none"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        />

        {/* 
          Cinematic Film Poster Banner Overlay (z-15):
          - Visible before video starts scrubbing (at progress 0.00 to 0.04)
          - Fades out smoothly as user scrolls down and video scrubbing starts
          - Fades back in seamlessly when user scrolls back up and video returns to 0
        */}
        <div
          ref={posterRef}
          className="film-poster-overlay absolute inset-0 z-15 pointer-events-none select-none transition-opacity duration-150"
          style={{ opacity: 1 }}
        >
          <picture className="w-full h-full block">
            <source
              media="(min-width: 768px)"
              srcSet={BRAND_CONFIG.assets.videoPosterDesktop}
            />
            <source
              media="(max-width: 767px)"
              srcSet={BRAND_CONFIG.assets.videoPoster}
            />
            <img
              src={activePoster}
              alt="FlocknGo Film Poster Banner"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/80 via-transparent to-[#0A0D14]/60" />
        </div>

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
          <div className="glass-surface-dark p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-2 sm:space-y-3">
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
          <div className="glass-surface-dark p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-2 sm:space-y-3 text-left sm:text-right">
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
          <div className="glass-surface-dark p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-2 sm:space-y-3">
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
          <div className="glass-surface-dark max-w-2xl mx-auto space-y-3 sm:space-y-4 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl">
            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              From a quiet notification to a thriving community.
            </h3>
            <p className="text-xs sm:text-base md:text-xl text-slate-200 leading-relaxed font-normal">
              Scroll down to discover how organizers build, launch, and grow on FlocknGo ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FilmSection
