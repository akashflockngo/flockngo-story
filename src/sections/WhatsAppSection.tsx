import React from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { MessageSquare, ArrowRight, ShieldCheck, CheckCheck } from 'lucide-react'
import { useScrollAnimation, gsap } from '../hooks/useScrollAnimation'
import { OptimizedImage } from '../components/ui/OptimizedImage'

export const WhatsAppSection: React.FC = () => {
  const containerRef = useScrollAnimation<HTMLElement>((_ctx, container, reducedMotion) => {
    if (reducedMotion) {
      gsap.set(container.querySelectorAll('.wa-reveal'), { opacity: 1, y: 0 })
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
      container.querySelectorAll('.wa-text-reveal'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    ).fromTo(
      container.querySelector('.wa-cards-stage'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.4'
    )
  })

  return (
    <section
      ref={containerRef}
      id="whatsapp"
      className="relative py-16 sm:py-24 lg:py-36 bg-[#FFFCF8] text-[#111111] overflow-hidden border-t border-[#F3E5D8]"
    >
      <div className="container-cinematic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Left Column: Feature Narrative */}
          <div className="lg:col-span-5 space-y-6">

            {/* Headline per specification: “Important updates deserve to be seen.” */}
            <h2 className="wa-text-reveal display-chapter text-[#111111] tracking-tight text-balance">
              Important updates deserve to be seen.
            </h2>

            {/* Supporting Copy per specification: “Share activity invitations and useful action links through direct WhatsApp updates.” */}
            <p className="wa-text-reveal text-base sm:text-lg text-[#3A3A3A] font-normal leading-relaxed text-balance">
              Share activity invitations and useful action links through direct WhatsApp updates.
            </p>

            {/* Practical Benefits */}
            <div className="wa-text-reveal space-y-3 pt-2">
              <div className="p-4 rounded-2xl glass-card-light flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#111111] block">Zero App Installs for Attendees</span>
                  <span className="text-[#6B7280]">Participants receive individual, actionable invitations right where they already check messages daily.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card-light flex items-start gap-3">
                <CheckCheck className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#111111] block">Personal 1-to-1 Delivery</span>
                  <span className="text-[#6B7280]">Critical departure times, packing instructions, and payment receipts never get lost under group banter.</span>
                </div>
              </div>
            </div>

            {/* Clear, honest third-party integration disclaimer */}
            <div className="wa-text-reveal pt-2 text-[11px] text-[#6B7280] italic">
              *FlocknGo integrates with direct messaging workflows for organiser convenience and is an independent platform not owned or endorsed by WhatsApp Inc.
            </div>
          </div>

          {/* Right Column: Comparative Graphic Representation (Real Video Frames) */}
          <div className="lg:col-span-7">
            <div className="wa-cards-stage relative mx-auto max-w-xl">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

                {/* Visual A: Studio-Quality Smartphone Notification on Wooden Surface */}
                <div className="w-full lg:max-w-[280px] sm:max-w-none mx-auto rounded-3xl overflow-hidden glass-surface-light p-3.5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6B7280] px-1">
                    <span className="flex items-center gap-1.5 text-[#111111] font-bold">
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      Direct Alert
                    </span>
                    <span className="text-[10px] text-[#6B7280]">10:42 AM</span>
                  </div>

                  <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-[#F3E5D8]/80 relative group">
                    <OptimizedImage
                      src={BRAND_CONFIG.assets.whatsappInvitation}
                      alt="Smartphone on wooden table receiving an activity invitation notification"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass-surface-dark text-white text-xs space-y-1 z-10">
                      <div className="flex items-center gap-1.5 text-[#25D366] font-bold text-[11px]">
                        <MessageSquare className="w-3 h-3" />
                        <span>Sahyadri Trekkers</span>
                      </div>
                      <p className="text-[11px] text-slate-200 font-medium leading-snug">
                        “You're invited: Rajgad Fort Night Trek & Sunrise. Tap below to reserve your spot.”
                      </p>
                    </div>
                  </div>

                  <div className="p-2 text-center text-xs text-[#6B7280]">
                    Direct personal invitation delivered to attendee
                  </div>
                </div>

                {/* Visual B: Action Itinerary Chat with Direct Tap Action */}
                <div className="w-full lg:max-w-[280px] sm:max-w-none mx-auto rounded-3xl overflow-hidden glass-surface-light p-3.5 space-y-3 sm:translate-y-6">
                  <div className="flex items-center justify-between text-xs font-mono px-1">
                    <span className="text-[#F47721] font-bold">Actionable Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F47721]" />
                  </div>

                  <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#EFEAE2] border border-[#F3E5D8]/80 p-3 flex flex-col justify-end space-y-2.5">
                    {/* Native Chat Message Bubble */}
                    <div className="p-3 rounded-2xl rounded-tl-xs bg-white/95 backdrop-blur-md shadow-sm border border-black/5 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-[#111111] text-[11px]">Sahyadri Trekkers</span>
                        <span className="text-[10px] text-slate-400">10:43 AM</span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 text-xs">🏔️ Rajgad Night Trek Itinerary</div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Pickup: Swargate Pillar #44<br />
                          Time: Sat 11:00 PM<br />
                          Confirmed Spots: 18 / 20
                        </p>
                      </div>
                      <div className="pt-1.5 border-t border-slate-100">
                        <div className="w-full py-1.5 px-3 rounded-lg bg-[#F47721]/10 border border-[#F47721]/30 text-center font-bold text-[#F47721] text-[11px]">
                          flockngo.com/e/rajgad-trek
                        </div>
                      </div>
                    </div>

                    {/* Direct Tap Link Card */}
                    <div className="p-2.5 rounded-xl glass-pill-light border border-slate-200/80 shadow-xs flex items-center justify-between">
                      <div className="text-[11px]">
                        <span className="font-bold text-slate-900 block">Instant Guest Pass</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">1-Tap Registration</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#25D366] text-white font-bold text-[10px] shadow-xs">
                        Open Pass
                      </span>
                    </div>
                  </div>

                  <div className="p-2 text-center text-xs text-[#6B7280]">
                    One tap opens itinerary, payment confirmation & live chat
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
