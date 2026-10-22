import React, { useState } from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { BarChart2, Bell, Check, Image, FileText, Download } from 'lucide-react'
import { useScrollAnimation, gsap } from '../hooks/useScrollAnimation'
import { OptimizedImage } from '../components/ui/OptimizedImage'

export const EngagementSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0)

  const pollOptions = [
    { id: 0, text: 'Torna Fort Sunrise Ridge', votes: '58% • 28 votes' },
    { id: 1, text: 'Lohagad & Visapur Caves', votes: '32% • 15 votes' },
    { id: 2, text: 'Kalsubai Peak Trek', votes: '10% • 5 votes' },
  ]

  const containerRef = useScrollAnimation<HTMLElement>((_ctx, container, reducedMotion) => {
    if (reducedMotion) {
      gsap.set(container.querySelectorAll('.eng-reveal'), { opacity: 1, y: 0 })
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
      container.querySelectorAll('.eng-text-reveal'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    ).fromTo(
      container.querySelector('.eng-stage-reveal'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.4'
    )
  })

  return (
    <section
      ref={containerRef}
      id="engagement"
      className="relative py-28 sm:py-36 bg-[#FFFCF8] text-[#111111] overflow-hidden border-t border-[#F3E5D8]"
    >
      <div className="container-cinematic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Feature Narrative */}
          <div className="lg:col-span-5 space-y-6">

            {/* Headline per specification: “Keep the conversation connected to the experience.” */}
            <h2 className="eng-text-reveal display-chapter text-[#111111] tracking-tight text-balance">
              Keep the conversation connected to the experience.
            </h2>

            {/* Supporting Copy per specification: “Bring polls, announcements, photos, videos and useful updates together around your community activities.” */}
            <p className="eng-text-reveal text-base sm:text-lg text-[#3A3A3A] font-normal leading-relaxed text-balance">
              Bring polls, announcements, photos, videos and useful updates together around your community activities.
            </p>

            {/* Strategic Value Items */}
            <div className="eng-text-reveal space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-[#F3E5D8] flex items-start gap-3 shadow-2xs">
                <BarChart2 className="w-5 h-5 text-[#F47721] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#111111] block">Democratic Participant Polls</span>
                  <span className="text-[#6B7280]">Decide next dates, meeting spots, and routes with swift mobile voting cards.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#F3E5D8] flex items-start gap-3 shadow-2xs">
                <Image className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#111111] block">High-Resolution Shared Memory Vault</span>
                  <span className="text-[#6B7280]">Participants upload and access original photos, videos, and GPS maps long after the weekend.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bento Composition (Activity Feed & Media Vault) */}
          <div className="lg:col-span-7">
            <div className="eng-stage-reveal relative mx-auto max-w-xl rounded-3xl bg-white border border-[#F3E5D8] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.06)] space-y-4">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F3E5D8]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F47721] uppercase">Sahyadri Trekkers</span>
                  <span className="text-[#6B7280]">•</span>
                  <span className="text-xs text-[#111111] font-semibold">Activity Hub</span>
                </div>
                <span className="text-xs font-mono text-[#6B7280]">ACTIVE FEED</span>
              </div>

              {/* Bento Grid: 2x2 Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Cell A: Interactive Poll (sm:col-span-7) */}
                <div className="sm:col-span-7 p-4 rounded-2xl bg-[#FFF9F5] border border-[#F3E5D8] space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-[#F47721] flex items-center gap-1">
                      <BarChart2 className="w-3.5 h-3.5" />
                      COMMUNITY POLL
                    </span>
                    <span className="text-[#6B7280]">Closes Tomorrow</span>
                  </div>

                  <div className="text-xs font-bold text-[#111111]">
                    Where should we head for the mid-November trek?
                  </div>

                  <div className="space-y-1.5">
                    {pollOptions.map((opt) => {
                      const isSelected = selectedOption === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedOption(opt.id)}
                          className={`w-full p-2 rounded-lg border text-left transition-all flex items-center justify-between text-xs ${
                            isSelected
                              ? 'bg-white border-[#F47721] shadow-2xs'
                              : 'bg-white/70 border-[#F3E5D8] hover:border-[#F47721]/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#F47721] bg-[#F47721] text-white'
                                  : 'border-[#F3E5D8] bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-2 h-2" />}
                            </div>
                            <span className="text-[11px] font-medium text-[#111111]">{opt.text}</span>
                          </div>
                          <span className="font-mono text-[10px] text-[#6B7280]">{opt.votes.split('•')[0]}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Cell B: Pinned Announcement (sm:col-span-5) */}
                <div className="sm:col-span-5 p-4 rounded-2xl bg-white border border-[#F3E5D8] space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#E74728] font-bold">
                      <Bell className="w-3 h-3" />
                      <span>PINNED BULLETIN</span>
                    </div>
                    <div className="text-xs font-bold text-[#111111] leading-snug">
                      Bus Boarding Point: Swargate Pillar #44
                    </div>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      Arrive 15 minutes before 11:00 PM. High-visibility jacket mandatory.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#10B981] font-semibold">ALL 18 ATTENDEES NOTIFIED</span>
                </div>

                {/* Cell C: Media Vault Screen using authentic high-res community memories (sm:col-span-5) */}
                <div className="sm:col-span-5 rounded-2xl overflow-hidden bg-black border border-[#F3E5D8] aspect-[4/3] relative group shadow-sm">
                  <OptimizedImage
                    src={BRAND_CONFIG.assets.communityMemories}
                    alt="Sahyadri Trekkers community members celebrating at mountain summit during sunset"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3 z-10 pointer-events-none">
                    <div className="text-xs text-white flex items-center justify-between w-full">
                      <span className="font-bold flex items-center gap-1.5 text-xs">
                        <Image className="w-3.5 h-3.5 text-[#F47721]" />
                        48 Photos & 4K Recap
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">
                        HD VAULT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cell D: Files & Resources (sm:col-span-7) */}
                <div className="sm:col-span-7 p-4 rounded-2xl bg-white border border-[#F3E5D8] flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#6B7280] uppercase text-[10px]">Persistent Documents</span>
                    <span className="font-mono text-[#10B981] text-[10px] font-bold">ACCESSIBLE OFFLINE</span>
                  </div>
                  
                  <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#F3E5D8] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#F47721]" />
                      <div>
                        <div className="font-bold text-[#111111] text-[11px]">Rajgad_Trail_Elevation.gpx</div>
                        <div className="text-[10px] text-[#6B7280]">Trail GPS map • 1.2 MB</div>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-[#6B7280] hover:text-[#F47721] cursor-pointer" />
                  </div>

                  <div className="text-[11px] text-[#6B7280]">
                    Packing guides and emergency maps remain permanently attached to the activity.
                  </div>
                </div>

              </div>

              {/* Bottom Feature Metadata Footer */}
              <div className="pt-3 border-t border-[#F3E5D8] flex items-center justify-between text-xs text-[#6B7280]">
                <span>Shared memories keep members bonded for the next journey</span>
                <span className="font-bold text-[#E74728] font-mono">05 / ENGAGEMENT</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
