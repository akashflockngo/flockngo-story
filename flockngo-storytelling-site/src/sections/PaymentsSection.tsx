import React from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { Shield, ArrowRight, Check, CreditCard, Sparkles, UserCheck } from 'lucide-react'
import { useScrollAnimation, gsap } from '../hooks/useScrollAnimation'

export const PaymentsSection: React.FC = () => {
  const containerRef = useScrollAnimation<HTMLElement>((_ctx, container, reducedMotion) => {
    if (reducedMotion) {
      gsap.set(container.querySelectorAll('.pay-reveal'), { opacity: 1, y: 0 })
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
      container.querySelectorAll('.pay-text-reveal'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    ).fromTo(
      container.querySelector('.pay-stage-reveal'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.4'
    )
  })

  return (
    <section
      ref={containerRef}
      id="payments"
      className="relative py-28 sm:py-36 bg-[#FFFCF8] text-[#111111] overflow-hidden border-t border-[#F3E5D8]"
    >
      <div className="container-cinematic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Feature Narrative */}
          <div className="lg:col-span-5 space-y-6">
            {/* Eyebrow */}
            <div className="pay-text-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E6] border border-[#F3E5D8] text-xs font-mono font-bold tracking-wider text-[#E74728] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F47721]" />
              <span>04 / JOINING & PAYMENTS</span>
            </div>

            {/* Headline per specification: “Make joining straightforward.” */}
            <h2 className="pay-text-reveal display-chapter text-[#111111] tracking-tight text-balance">
              Make joining straightforward.
            </h2>

            {/* Supporting Copy per specification: “Help participants move from an invitation to activity details, registration, and payment.” */}
            <p className="pay-text-reveal text-base sm:text-lg text-[#3A3A3A] font-normal leading-relaxed text-balance">
              Help participants move from an invitation to activity details, registration, and payment.
            </p>

            {/* Key Benefits */}
            <div className="pay-text-reveal space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#F3E5D8] shadow-xs flex items-start gap-3.5">
                <Shield className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-[#111111] text-sm block">Automatic Payment Reconciliation</span>
                  <span className="text-[#6B7280] leading-relaxed">Paid spots match attendee rosters instantly, eliminating manual screenshot cross-checking.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#F3E5D8] shadow-xs flex items-start gap-3.5">
                <UserCheck className="w-5 h-5 text-[#F47721] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-[#111111] text-sm block">Real-Time Spot Allocation</span>
                  <span className="text-[#6B7280] leading-relaxed">Confirmed seats update live; once full, waitlisted participants are queued in order.</span>
                </div>
              </div>
            </div>

            <div className="pay-text-reveal text-[11px] text-[#6B7280] italic">
              *UI flow shown below is clearly illustrative of the three-stage registration lifecycle.
            </div>
          </div>

          {/* Right Column: Three-Stage Sequential Progression Graphic */}
          <div className="lg:col-span-7">
            <div className="pay-stage-reveal relative mx-auto max-w-xl rounded-3xl bg-white border border-[#F3E5D8] p-6 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F3E5D8]">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#F47721]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#111111]">
                    Three-Stage Participation Flow
                  </span>
                </div>
                <span className="text-xs font-mono text-[#059669] font-bold">100% RECONCILED</span>
              </div>

              {/* Editorial Product Photography: Frictionless Mobile Checkout */}
              <div className="w-full h-36 rounded-2xl overflow-hidden relative group border border-[#F3E5D8] shadow-xs">
                <img
                  src={BRAND_CONFIG.assets.registrationPayment}
                  alt="Contactless verified mobile payment on dark granite surface"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex items-end p-3">
                  <div className="flex items-center justify-between w-full text-xs">
                    <span className="font-mono text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded border border-white/20">
                      INSTANT UPI / CARD VERIFICATION
                    </span>
                    <span className="font-mono text-[10px] text-emerald-300 font-bold">
                      ZERO MANUAL CROSS-CHECKS
                    </span>
                  </div>
                </div>
              </div>

              {/* Three Stages in Visual Progression */}
              <div className="space-y-3.5">
                
                {/* Stage 1: Invitation Link Received */}
                <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F3E5D8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FFF0E6] border border-[#F3E5D8] text-[#F47721] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111111]">Invitation Received</div>
                      <div className="text-[11px] text-[#6B7280]">Direct WhatsApp message with secure tap link</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#E74728] font-semibold bg-[#FFF0E6] px-2.5 py-1 rounded-full border border-[#F3E5D8]">
                    1 TAP
                  </span>
                </div>

                {/* Connector Arrow */}
                <div className="flex justify-center -my-1 text-[#F47721]/60">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Stage 2: Activity Details & Registration Form */}
                <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F3E5D8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FFF0E6] border border-[#F3E5D8] text-[#F47721] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111111]">Review Itinerary & Details</div>
                      <div className="text-[11px] text-[#6B7280]">Attendee info, emergency contact & pickup preference</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#6B7280] bg-white border border-[#F3E5D8] px-2.5 py-1 rounded-full">
                    GUEST FORM
                  </span>
                </div>

                {/* Connector Arrow */}
                <div className="flex justify-center -my-1 text-[#F47721]/60">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Stage 3: Payment & Instant Verified Confirmation */}
                <div className="p-4 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981]/50 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#10B981] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111111] flex items-center gap-2">
                        <span>Payment & Spot Confirmed</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#059669] font-bold">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-[11px] text-[#065F46]">
                        Instant UPI/Card checkout • Roster spot #18 locked & pass issued
                      </div>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#059669] shrink-0" />
                </div>

              </div>

              {/* Bottom Feature Metadata Footer */}
              <div className="pt-2 border-t border-[#F3E5D8] flex items-center justify-between text-xs text-[#6B7280]">
                <span>Organisers spend zero hours reconciling bank SMS alerts</span>
                <span className="font-bold text-[#F47721] font-mono">04 / PAYMENTS</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
