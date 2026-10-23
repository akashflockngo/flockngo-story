import React from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useScrollAnimation, gsap } from '../hooks/useScrollAnimation'
import { OptimizedImage } from '../components/ui/OptimizedImage'

export const HeroSection: React.FC = () => {
  const containerRef = useScrollAnimation<HTMLElement>((_ctx, container, reducedMotion) => {
    if (reducedMotion) {
      gsap.set(container.querySelectorAll('.hero-animate'), { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // Controlled entrance transitions (300-600ms)
    tl.fromTo(
      container.querySelector('.hero-eyebrow'),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.15 }
    )
      .fromTo(
        container.querySelectorAll('.hero-headline-line'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.12 },
        '-=0.3'
      )
      .fromTo(
        container.querySelector('.hero-copy'),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        '-=0.35'
      )
      .fromTo(
        container.querySelectorAll('.hero-cta-btn'),
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      )
  })

  const scrollToFilm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('film')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', '#film')
    }
  }

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative min-h-[100svh] flex flex-col justify-center pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-24 md:pb-10 bg-[#0A0D14] text-white overflow-hidden"
    >
      {/* Ambient backdrop and clearly visible hero banner image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <OptimizedImage
          src={BRAND_CONFIG.assets.heroBrand}
          alt="FlocknGo community brand banner"
          priority={true}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-center opacity-45 sm:opacity-55 scale-105 transition-transform duration-1000"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/75 via-[#0A0D14]/65 to-[#0A0D14]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-[#F47721]/[0.10] rounded-full blur-[140px]" />
      </div>

      <div className="container-cinematic relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">

          {/* Headline per specification: “Every community has a story.” */}
          <h1 className="display-hero text-white tracking-[-0.035em] text-balance">
            <span className="hero-animate hero-headline-line block">Every community</span>
            <span className="hero-animate hero-headline-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#F47721]">
              has a story.
            </span>
          </h1>

          {/* Supporting Copy per specification: “Bring your people together. Turn shared passions into real-world experiences.” */}
          <p className="hero-animate hero-copy sub-display text-slate-300 max-w-2xl mx-auto font-normal text-balance leading-relaxed">
            Bring your people together. Turn shared passions into real-world experiences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href="#film"
              onClick={scrollToFilm}
              className="hero-animate hero-cta-btn btn-cinematic-primary w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold group shadow-lg shadow-[#F47721]/20 hover:shadow-xl hover:shadow-[#F47721]/30 justify-center"
            >
              <span>Watch the film</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>

            <a
              href={BRAND_CONFIG.primaryCtaUrl}
              target="_blank"
              rel="noreferrer"
              className="hero-animate hero-cta-btn btn-cinematic-secondary btn-cinematic-secondary-dark w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 text-sm sm:text-base justify-center"
            >
              <span>Explore Platform</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
