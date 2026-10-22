import React, { useState, useEffect, useCallback } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface SlideInfo {
  id: string
  num: string
  label: string
}

const CHAPTERS: SlideInfo[] = [
  { id: 'chapter-01', num: '01', label: 'Overview' },
  { id: 'chapter-02', num: '02', label: 'Community' },
  { id: 'chapter-03', num: '03', label: 'Activities' },
  { id: 'chapter-04', num: '04', label: 'WhatsApp' },
  { id: 'chapter-05', num: '05', label: 'Payments' },
  { id: 'chapter-06', num: '06', label: 'The Hub' },
  { id: 'chapter-07', num: '07', label: 'FlocknGo' },
]

export const PresentationNav: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToChapter = useCallback((index: number) => {
    const target = CHAPTERS[index]
    if (!target) return
    const el = document.getElementById(target.id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${target.id}`)
      setActiveIndex(index)
    }
  }, [])

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      scrollToChapter(activeIndex - 1)
    }
  }, [activeIndex, scrollToChapter])

  const handleNext = useCallback(() => {
    if (activeIndex < CHAPTERS.length - 1) {
      scrollToChapter(activeIndex + 1)
    }
  }, [activeIndex, scrollToChapter])

  useEffect(() => {
    // Keyboard navigation (Arrow keys and Page Up/Down)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (activeIndex < CHAPTERS.length - 1) {
          e.preventDefault()
          handleNext()
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (activeIndex > 0) {
          e.preventDefault()
          handlePrev()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, handleNext, handlePrev])

  useEffect(() => {
    // Intersection observer to track which chapter is currently in view
    const observers: IntersectionObserver[] = []

    CHAPTERS.forEach((chapter, idx) => {
      const el = document.getElementById(chapter.id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
              setActiveIndex(idx)
            }
          })
        },
        { threshold: [0.45] }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const current = CHAPTERS[activeIndex] || CHAPTERS[0]
  const progressPercent = Math.round(((activeIndex + 1) / CHAPTERS.length) * 100)

  return (
    <>
      {/* Discreet Presentation HUD - Bottom Left */}
      <nav
        aria-label="Chapter Navigation Controls"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-4 py-2 rounded-full bg-[#0A0D14]/90 backdrop-blur-md border border-white/10 text-xs font-mono tracking-wider shadow-xl"
      >
        <span className="w-2 h-2 rounded-full bg-[#F47721]" />
        <span className="font-bold text-white">
          {activeIndex + 1} / {CHAPTERS.length}
        </span>
        <span className="text-white/20">•</span>
        <span className="text-slate-300 uppercase font-medium">{current.label}</span>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F47721]"
            aria-label="Previous chapter"
            title="Previous chapter (Arrow Up)"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === CHAPTERS.length - 1}
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F47721]"
            aria-label="Next chapter"
            title="Next chapter (Arrow Down)"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Right Edge Presentation Chapter Dots */}
      <nav
        aria-label="Chapter Quick Jumper"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2.5 py-4 px-2 rounded-full bg-[#0A0D14]/60 backdrop-blur-md border border-white/10"
      >
        {CHAPTERS.map((chapter, idx) => {
          const isActive = idx === activeIndex
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollToChapter(idx)}
              className="group relative flex items-center justify-center p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F47721] rounded-full"
              aria-label={`Jump to Chapter ${idx + 1}: ${chapter.label}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-2 h-4 bg-[#F47721]'
                    : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/60'
                }`}
              />
              <span className="absolute right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap px-2.5 py-1 rounded bg-[#0A0D14] border border-white/10 text-[11px] font-mono text-slate-200 shadow-lg">
                {chapter.num} / {chapter.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-[#F47721] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </>
  )
}
