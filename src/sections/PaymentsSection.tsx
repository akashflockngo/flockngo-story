import React from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { Shield, ArrowRight, Check, CreditCard, Sparkles, UserCheck } from 'lucide-react'
import { useScrollAnimation, gsap } from '../hooks/useScrollAnimation'
import { OptimizedImage } from '../components/ui/OptimizedImage'

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
      className="relative py-28 sm:py-36 bg-[#0A0D14] text-white overflow-hidden border-t border-white/[0.08]"
    >
      <div className="container-cinematic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Feature Narrative */}
          <div className="lg:col-span-5 space-y-6">

            {/* Headline per specification: “Make joining straightforward.” */}
            <h2 className="pay-text-reveal display-chapter text-white tracking-tight text-balance">
              Make joining straightforward.
            </h2>

            {/* Supporting Copy per specification: “Help participants move from an invitation to activity details, registration, and payment.” */}
            <p className="pay-text-reveal text-base sm:text-lg text-slate-300 font-normal leading-relaxed text-balance">
              Help participants move from an invitation to activity details, registration, and payment.
            </p>

            {/* Key Benefits */}
            <div className="pay-text-reveal space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Automatic Payment Reconciliation</span>
                  <span className="text-slate-400">Paid spots match attendee rosters instantly, eliminating manual screenshot cross-checking.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-[#F47721] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Real-Time Spot Allocation</span>
                  <span className="text-slate-400">Confirmed seats update live; once full, waitlisted participants are queued in order.</span>
                </div>
              </div>
            </div>

            <div className="pay-text-reveal text-[11px] text-slate-400 italic">
              *UI flow shown below is clearly illustrative of the three-stage registration lifecycle.
            </div>
          </div>

          {/* Right Column: Three-Stage Sequential Progression Graphic */}
          <div className="lg:col-span-7">
            <div className="pay-stage-reveal relative mx-auto max-w-xl rounded-3xl bg-slate-900/80 border border-white/10 p-6 shadow-2xl backdrop-blur-sm space-y-5">

              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#F47721]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-white">
                    Three-Stage Participation Flow
                  </span>
                </div>
                <span className="text-xs font-mono text-[#10B981] font-bold">100% RECONCILED</span>
              </div>

              {/* Editorial Product Photography: Frictionless Mobile Checkout */}
              <div className="w-full h-36 rounded-2xl overflow-hidden relative group border border-white/10 shadow-inner">
                <OptimizedImage
                  src={BRAND_CONFIG.assets.registrationPayment}
                  alt="Contactless verified mobile payment on dark granite surface"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20 flex items-end p-3 z-10 pointer-events-none">
                  <div className="flex items-center justify-between w-full text-xs">
                    <span className="font-mono text-[10px] text-slate-300 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                      INSTANT UPI / CARD VERIFICATION
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      ZERO MANUAL CROSS-CHECKS
                    </span>
                  </div>
                </div>
              </div>

              {/* Three Stages in Visual Progression */}
              <div className="space-y-3.5">

                {/* Stage 1: Invitation Link Received */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F47721]/20 border border-[#F47721]/30 text-[#F47721] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Invitation Received</div>
                      <div className="text-[11px] text-slate-400">Direct WhatsApp message with secure tap link</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#F47721] font-semibold bg-[#F47721]/15 px-2.5 py-1 rounded-full">
                    1 TAP
                  </span>
                </div>

                {/* Connector Arrow */}
                <div className="flex justify-center -my-1 text-slate-400">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Stage 2: Activity Details & Registration Form */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F47721]/20 border border-[#F47721]/30 text-[#F47721] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Review Itinerary & Details</div>
                      <div className="text-[11px] text-slate-400">Attendee info, emergency contact & pickup preference</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 bg-white/[0.06] px-2.5 py-1 rounded-full">
                    GUEST FORM
                  </span>
                </div>

                {/* Connector Arrow */}
                <div className="flex justify-center -my-1 text-slate-400">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Stage 3: Payment & Instant Verified Confirmation */}
                <div className="p-4 rounded-2xl bg-[#FFF9F5]/[0.06] border-2 border-[#10B981]/40 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Payment & Spot Confirmed</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-bold">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Instant UPI/Card checkout • Roster spot #18 locked & pass issued
                      </div>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#10B981] shrink-0" />
                </div>

              </div>

              {/* Bottom Feature Metadata Footer */}
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
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
