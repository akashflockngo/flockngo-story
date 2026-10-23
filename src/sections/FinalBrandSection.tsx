import React from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { ArrowUpRight, MessageSquare, Check } from 'lucide-react'
import { useScrollAnimation, gsap } from '../hooks/useScrollAnimation'
import { OptimizedImage } from '../components/ui/OptimizedImage'

export const FinalBrandSection: React.FC = () => {
  const containerRef = useScrollAnimation<HTMLElement>((_ctx, container, reducedMotion) => {
    if (reducedMotion) {
      gsap.set(container.querySelectorAll('.final-reveal'), { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power2.out' },
    })

    tl.fromTo(
      container.querySelectorAll('.final-reveal'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }
    )
  })

  return (
    <section
      ref={containerRef}
      id="get-started"
      className="relative min-h-[85svh] flex flex-col justify-center py-16 sm:py-24 lg:py-32 bg-[#0A0D14] text-white border-t border-white/[0.08] overflow-hidden"
    >
      {/* Editorial Twilight Ambient Campfire Backdrop with High-Contrast Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <OptimizedImage
          src={BRAND_CONFIG.assets.closingBrand}
          alt="FlocknGo community campfire gathering at twilight under starry mountain night"
          priority={true}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-bottom opacity-55 sm:opacity-65 scale-105 transition-transform duration-1000"
          aria-hidden="true"
        />
        {/* Soft atmospheric gradient vignette preserving campfire clarity while maintaining text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/45 to-[#0A0D14]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/75 via-transparent to-transparent" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F47721]/[0.16] rounded-full blur-[100px]" />
      </div>

      <div className="container-cinematic relative z-10 w-full my-auto text-center">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">

          {/* Headline per specification: “Stop managing groups. Start building communities.” */}
          <h2 className="final-reveal display-chapter text-white tracking-tight text-balance">
            Stop managing groups. <br />
            <span className="text-[#F47721]">Start building communities.</span>
          </h2>

          {/* Supporting Copy per specification: “Bring your people together and create better experiences with FlocknGo.” */}
          <p className="final-reveal sub-display text-slate-300 max-w-xl mx-auto font-normal leading-relaxed text-balance">
            Bring your people together and create better experiences with FlocknGo.
          </p>

          {/* Official Brand Manifesto Line per specification: “Build Communities. Drive Engagement. Grow Your Business.” */}
          <div className="final-reveal py-2">
            <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-200 font-semibold px-5 py-2.5 rounded-2xl sm:rounded-full glass-pill-dark inline-block leading-relaxed border border-white/12 shadow-sm">
              {BRAND_CONFIG.manifesto}
            </span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="final-reveal flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-2">
            <a
              href={BRAND_CONFIG.primaryCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cinematic-primary w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base font-semibold shadow-lg shadow-[#F47721]/20 hover:shadow-xl hover:shadow-[#F47721]/30 justify-center"
            >
              <span>Explore FlocknGo</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={BRAND_CONFIG.links.whatsappSupport}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cinematic-secondary btn-cinematic-secondary-dark w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base justify-center"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Talk on WhatsApp</span>
            </a>
          </div>

          {/* Practical Guarantees */}
          <div className="final-reveal pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              No guest app required
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              Direct 1-to-1 WhatsApp updates
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              Automated roster & payments
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}
