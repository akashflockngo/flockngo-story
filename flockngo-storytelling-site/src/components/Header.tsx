import React, { useState, useEffect, useRef } from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { gsap } from '../config/gsap'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('story')
  const headerRef = useRef<HTMLElement | null>(null)
  const isScrolledRef = useRef(false)

  useEffect(() => {
    let ticking = false
    const sectionIds = ['story', 'film', 'community', 'activities', 'whatsapp', 'payments', 'engagement']

    // Accurate geometry-based active section detection that respects pinned sections
    const checkActiveSection = () => {
      const vh = window.innerHeight
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Section is active when its top enters the upper viewport and its bottom has not scrolled away
          if (rect.top <= vh * 0.45 && rect.bottom >= vh * 0.15) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 30
          if (scrolled !== isScrolledRef.current) {
            isScrolledRef.current = scrolled
            setIsScrolled(scrolled)
          }
          checkActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', checkActiveSection, { passive: true })
    checkActiveSection()

    // Controlled entrance animation for header
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion && headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.1 }
      )
    }

    // Keyboard ESC listener for accessible mobile menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkActiveSection)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '')
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        e.preventDefault()
        targetElement.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
        window.history.pushState(null, '', href)
      }
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-xl'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container-cinematic">
        <div className="flex items-center justify-between">
          {/* Official FlocknGo Logo */}
          <a
            href="#story"
            onClick={(e) => handleNavClick(e, '#story')}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded-lg py-1"
            aria-label="FlocknGo Home"
          >
            <img
              src={BRAND_CONFIG.assets.logo}
              alt="FlocknGo — Experience Together"
              width={140}
              height={38}
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:opacity-90"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 text-[0.875rem] font-medium tracking-tight text-slate-300"
          >
            {BRAND_CONFIG.navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative py-1 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded-md px-1.5 ${isActive ? 'text-white font-semibold' : 'hover:text-white text-slate-400'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#F47721] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={BRAND_CONFIG.primaryCtaUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-cinematic-primary px-5 py-2.5 text-xs font-semibold"
            >
              <span>Explore Platform</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[62px] bg-[#0A0D14]/98 border-b border-white/[0.08] px-6 py-8 backdrop-blur-xl transition-all shadow-2xl">
          <div className="flex flex-col space-y-5">
            {BRAND_CONFIG.navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-lg font-semibold py-2 transition-colors ${isActive ? 'text-[#F47721]' : 'text-slate-300 hover:text-white'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )
            })}
            <div className="pt-4 border-t border-white/[0.08]">
              <a
                href={BRAND_CONFIG.primaryCtaUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-cinematic-primary w-full justify-center py-3 text-sm font-semibold"
              >
                <span>Explore Platform</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
