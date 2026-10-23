import React from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { Plus, Share2, ShieldCheck, Users, Copy, Check } from 'lucide-react'
import { useScrollAnimation, gsap } from '../hooks/useScrollAnimation'
import { OptimizedImage } from '../components/ui/OptimizedImage'

export const CommunitySection: React.FC = () => {
  const [copied, setCopied] = React.useState(false)

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://flockngo.com/flock/sahyadri-trekkers')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerRef = useScrollAnimation<HTMLElement>((_ctx, container, reducedMotion) => {
    if (reducedMotion) {
      gsap.set(container.querySelectorAll('.comm-reveal'), { opacity: 1, y: 0 })
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
      container.querySelectorAll('.comm-text-reveal'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    ).fromTo(
      container.querySelector('.comm-graphic-stage'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.4'
    )
  })

  return (
    <section
      ref={containerRef}
      id="community"
      className="relative py-16 sm:py-24 lg:py-36 bg-[#FFFCF8] text-[#111111] overflow-hidden border-t border-[#F3E5D8]"
    >
      <div className="container-cinematic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Narrative & How-It-Works Breakdown */}
          <div className="lg:col-span-5 space-y-6">

            {/* Headline per specification: “Bring your people together.” */}
            <h2 className="comm-text-reveal display-chapter text-[#111111] tracking-tight text-balance">
              Bring your people together.
            </h2>

            {/* Supporting Copy per specification */}
            <p className="comm-text-reveal text-base sm:text-lg text-[#3A3A3A] font-normal leading-relaxed text-balance">
              Create a Flock around a shared passion, organise your members, and give your community a dedicated place to connect.
            </p>

            {/* Structured Product Explanation Callouts */}
            <div className="comm-text-reveal space-y-3.5 pt-2">
              
              {/* Callout 1: Setup */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl glass-card-light">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0E6] text-[#F47721] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-[#111111] text-sm block">Instant Community Setup</span>
                  <p className="text-[#6B7280] leading-relaxed">
                    Name your Flock, set privacy guidelines, and define host roles in under two minutes without technical complexity.
                  </p>
                </div>
              </div>

              {/* Callout 2: Shareability */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl glass-card-light">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0E6] text-[#F47721] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Share2 className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-[#111111] text-sm block">Frictionless Member Invitation</span>
                  <p className="text-[#6B7280] leading-relaxed">
                    One shareable link allows members to view community itineraries, photo vaults, and schedules without downloading an app.
                  </p>
                </div>
              </div>

            </div>

            {/* Community Health Signals */}
            <div className="comm-text-reveal pt-2 flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap text-xs text-[#6B7280] border-t border-[#F3E5D8]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F47721]" />
                <div>
                  <div className="text-base font-extrabold text-[#111111]">100%</div>
                  <div>Zero App Friction for Guests</div>
                </div>
              </div>
              <div className="w-px h-8 bg-[#F3E5D8]" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <div>
                  <div className="text-base font-extrabold text-[#111111]">Verified</div>
                  <div>Direct Host Control</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dominant Editorial Graphical Demonstration */}
          <div className="lg:col-span-7">
            <div className="comm-graphic-stage relative mx-auto max-w-xl rounded-2xl sm:rounded-3xl glass-surface-light p-4 sm:p-6 lg:p-7 space-y-6">
              
              {/* Top Banner: Authentic Community Profile Card */}
              <div className="flex items-center justify-between pb-6 border-b border-[#F3E5D8]/80">
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FFF0E6] border border-[#F47721]/30 flex items-center justify-center text-[#F47721] font-extrabold text-lg sm:text-xl shrink-0 shadow-xs">
                    ST
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#111111] truncate">Sahyadri Trekkers</h3>
                      <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                    </div>
                    <p className="text-xs text-[#6B7280] line-clamp-1 sm:line-clamp-none">Outdoor Adventure & Trekking • Pune & Western Ghats</p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full glass-pill-light text-[#F47721] font-mono text-xs font-bold border border-[#F47721]/30">
                    142 Members
                  </span>
                </div>
              </div>

              {/* Graphic Stage: Genuine Illustration + Community Member Roster */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                
                {/* Editorial Photography Frame: Real Community Organizers & Members */}
                <div className="sm:col-span-6 rounded-2xl overflow-hidden bg-[#FFF9F5] border border-[#F3E5D8] aspect-[4/3] relative group shadow-sm">
                  <OptimizedImage
                    src={BRAND_CONFIG.assets.community}
                    alt="Authentic FlocknGo community members planning an outdoor trek together"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md glass-pill-light text-[10px] font-mono text-[#E74728] font-bold shadow-xs z-10">
                    COMMUNITY CULTURE
                  </div>
                </div>

                {/* Organizer & Member Directory Panel */}
                <div className="sm:col-span-6 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] font-mono">
                    Host & Management
                  </div>

                  {/* Organizer Profile Item */}
                  <div className="flex items-center justify-between p-3 rounded-xl glass-card-light">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        AM
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-[#111111]">Akash Mane</div>
                        <div className="text-[#6B7280]">Founder & Lead Trekker</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md glass-pill-light text-[#F47721] font-bold border border-[#F3E5D8]">
                      ADMIN
                    </span>
                  </div>

                  {/* Activity Track Record */}
                  <div className="p-3 rounded-xl glass-card-light flex items-center justify-between text-xs">
                    <span className="text-[#6B7280] flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#F47721]" />
                      Active Community
                    </span>
                    <span className="font-bold text-[#111111]">12 Past Expeditions</span>
                  </div>
                </div>

              </div>

              {/* Shareable Invite Link Bar with One-Tap Copy Interaction */}
              <div className="pt-2">
                <div className="text-xs font-mono text-[#6B7280] mb-1.5 flex items-center justify-between">
                  <span>PUBLIC COMMUNITY HUB LINK</span>
                  <span className="text-[#10B981] font-semibold text-[11px]">NO APP REQUIRED</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl glass-pill-light min-w-0 gap-2">
                  <span className="text-xs font-mono text-slate-700 truncate min-w-0 font-medium">
                    flockngo.com/flock/sahyadri-trekkers
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#F3E5D8] text-xs font-semibold text-[#111111] hover:border-[#F47721] hover:text-[#F47721] transition-all shrink-0 shadow-2xs cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Feature Metadata Footer */}
              <div className="pt-3 border-t border-[#F3E5D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 text-xs text-[#6B7280]">
                <span>A permanent, dedicated home for your community</span>
                <span className="font-bold text-[#E74728] font-mono">01 / COMMUNITY</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
