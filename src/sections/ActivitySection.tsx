import React from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { Calendar, MapPin, Users, CheckCircle2, ArrowRight, Clock } from 'lucide-react'
import { useScrollAnimation, gsap } from '../hooks/useScrollAnimation'
import { OptimizedImage } from '../components/ui/OptimizedImage'

export const ActivitySection: React.FC = () => {
  const containerRef = useScrollAnimation<HTMLElement>((_ctx, container, reducedMotion) => {
    if (reducedMotion) {
      gsap.set(container.querySelectorAll('.act-reveal'), { opacity: 1, y: 0 })
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
      container.querySelectorAll('.act-text-reveal'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    ).fromTo(
      container.querySelector('.act-stage-reveal'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.4'
    )
  })

  return (
    <section
      ref={containerRef}
      id="activities"
      className="relative py-16 sm:py-24 lg:py-36 bg-[#0A0D14] text-white overflow-hidden border-t border-white/[0.08]"
    >
      <div className="container-cinematic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Left Column: Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">

            {/* Headline per specification: “Turn your next idea into a real experience.” */}
            <h2 className="act-text-reveal display-chapter text-white tracking-tight text-balance">
              Turn your next idea into a real experience.
            </h2>

            {/* Supporting Copy per specification: “Create an activity, share its details, and give members a clear way to participate.” */}
            <p className="act-text-reveal text-base sm:text-lg text-slate-300 font-normal leading-relaxed text-balance">
              Create an activity, share its details, and give members a clear way to participate.
            </p>

            {/* Structured Breakdown */}
            <div className="act-text-reveal space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl glass-card-dark">
                <div className="w-8 h-8 rounded-xl bg-[#F47721] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                  1
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white text-sm block">Define Dates & Itinerary</span>
                  <span className="text-slate-400 leading-relaxed">Set departure timing, pickup points, and gear checklists in one unified form.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl glass-card-dark">
                <div className="w-8 h-8 rounded-xl bg-[#F47721] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                  2
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white text-sm block">Cap Spots & Automate Rosters</span>
                  <span className="text-slate-400 leading-relaxed">Set max participant limits. FlocknGo manages waitlists and confirmations automatically.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant Visual Demonstration (Creation form transitioning into live activity card) */}
          <div className="lg:col-span-7">
            <div className="act-stage-reveal relative mx-auto max-w-xl">

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">

                {/* Visual A: Actual Activity Planning & Device in Organizer Hands */}
                <div className="sm:col-span-6 w-full lg:max-w-[280px] sm:max-w-none mx-auto rounded-3xl overflow-hidden glass-surface-dark p-3 shadow-2xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1 pb-2">
                    <span className="text-[#F47721] font-bold">ORGANISER PLANNING</span>
                    <span>FLOCKNGO APP</span>
                  </div>
                  <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-slate-950 relative group border border-white/5">
                    <OptimizedImage
                      src={BRAND_CONFIG.assets.activityCreation}
                      alt="Organizer hand planning an activity on modern smartphone screen with trail map"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                      <span className="text-[10px] font-mono font-bold text-white/90 glass-pill-dark px-2 py-0.5 rounded border border-white/10">
                        CURATING EXPERIENCE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual B: Resulting Live Activity Pass with Tactile Detail & Real Trek Imagery */}
                <div className="sm:col-span-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F47721] uppercase font-bold">
                    <span>Generated Activity Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>

                  <div className="rounded-2xl glass-surface-dark shadow-2xl overflow-hidden relative">
                    {/* Activity Participation Banner: Sunrise Trek to Rajgad Fort */}
                    <div className="w-full h-32 relative overflow-hidden">
                      <OptimizedImage
                        src={BRAND_CONFIG.assets.activityParticipation}
                        alt="Sahyadri Trekkers ascending Rajgad Fort mountain ridge at sunrise"
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 z-10" />
                      <div className="absolute top-2.5 left-2.5 z-20">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F47721] text-white shadow-xs">
                          TREK & CAMP
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3.5">
                      {/* Badge & Title */}
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white leading-snug">
                          Rajgad Fort Night Trek & Sunrise
                        </h3>
                        <p className="text-xs text-slate-400">Hosted by Sahyadri Trekkers</p>
                      </div>

                      {/* Schedule & Location Details */}
                      <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#F47721] shrink-0" />
                          <span>Saturday, 11:00 PM – Sunday, 10:00 AM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#F47721] shrink-0" />
                          <span>Gunjawane Base Village • Pune</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#10B981] shrink-0" />
                          <span className="font-semibold text-white">20 Spot Limit (18 Confirmed)</span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>RSVP Open</span>
                        </div>
                        <span className="text-xs font-bold text-[#F47721] shrink-0">Instant Share Link →</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Annotation */}
                  <div className="p-3 rounded-xl glass-pill-dark text-[11px] text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F47721] shrink-0" />
                    <span>Published instantly across member calendars with zero delay.</span>
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
