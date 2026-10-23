import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { BRAND_CONFIG } from '../config/brand'
import { ArrowUpRight, Menu, X, ChevronRight, MessageSquare } from 'lucide-react'
import { gsap } from '../config/gsap'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('story')
  const isMounted = typeof document !== 'undefined'
  const headerRef = useRef<HTMLElement | null>(null)
  const isScrolledRef = useRef(false)
  const isVisibleRef = useRef(true)
  const lastScrollYRef = useRef(0)

  // Lock background scroll when mobile drawer is open without layout shift
  useBodyScrollLock(mobileMenuOpen)

  useEffect(() => {
    let ticking = false
    const sectionIds = ['story', 'film', 'community', 'activities', 'whatsapp', 'payments', 'engagement']
    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0

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
          const currentY = window.scrollY || window.pageYOffset || 0
          const lastY = lastScrollYRef.current
          const diff = currentY - lastY

          // 1. Scrolled background styling
          const scrolled = currentY > 30
          if (scrolled !== isScrolledRef.current) {
            isScrolledRef.current = scrolled
            setIsScrolled(scrolled)
          }

          // 2. Hero boundary visibility logic:
          // Topnav always visible inside hero section.
          // Past hero section: hides when scrolling down, shows when scrolling up.
          const heroEl = document.getElementById('story')
          const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight - 80 : 400

          let nextVisible = isVisibleRef.current

          if (mobileMenuOpen) {
            nextVisible = true
          } else if (currentY <= heroBottom) {
            // Within Hero section: always visible
            nextVisible = true
          } else if (diff > 8) {
            // Scrolling down past hero: hide
            nextVisible = false
          } else if (diff < -8) {
            // Scrolling up: show
            nextVisible = true
          }

          if (nextVisible !== isVisibleRef.current) {
            isVisibleRef.current = nextVisible
            setIsVisible(nextVisible)
          }

          lastScrollYRef.current = currentY
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
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.1,
          onComplete: () => {
            if (headerRef.current) {
              gsap.set(headerRef.current, { clearProps: 'transform' })
            }
          },
        }
      )
    }

    // Keyboard ESC listener for accessible mobile menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkActiveSection)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '')
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        e.preventDefault()
        setMobileMenuOpen(false)
        setIsVisible(true)
        isVisibleRef.current = true
        targetElement.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }

  return (
    <>
      <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      } ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/[0.10] py-3 sm:py-1 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent py-4 sm:py-1'
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
              fetchPriority="high"
              decoding="async"
              className="h-12 sm:h-20 w-auto object-contain transition-transform duration-200 group-hover:opacity-90"
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
              rel="noopener noreferrer"
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
              className="p-2 -mr-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] touch-manipulation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Render mobile backdrop overlay and side drawer via Portal to document.body 
        This isolates the drawer from <header>'s backdrop-filter and transforms,
        guaranteeing 100% solid opacity and silky smooth 60fps sliding open & close. */}
    {isMounted &&
      createPortal(
        <>
          {/* Accessible Mobile Backdrop Overlay (Fades In / Fades Out Smoothly) */}
          <div
            className={`md:hidden fixed inset-0 z-[9998] bg-black/80 backdrop-blur-xs transition-opacity duration-300 ease-out ${
              mobileMenuOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Sliding Side Navigation Drawer (100% Solid Opaque Dark - Zero Transparency) */}
          <aside
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
            style={{ backgroundColor: '#070A10' }}
            className={`md:hidden fixed top-0 right-0 bottom-0 z-[9999] w-[85%] max-w-[340px] h-screen h-[100dvh] flex flex-col justify-between border-l border-white/15 px-6 py-6 shadow-[-28px_0_80px_rgba(0,0,0,0.95)] transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
              mobileMenuOpen
                ? 'translate-x-0 pointer-events-auto'
                : 'translate-x-full pointer-events-none'
            }`}
          >
            {/* Side Nav Top Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] relative z-10">
              <img
                src={BRAND_CONFIG.assets.logo}
                alt="FlocknGo"
                width={120}
                height={32}
                className="h-7 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] active:scale-90"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Side Nav Links (Scrollable if height constrained) */}
            <div className="flex-1 overflow-y-auto overscroll-contain py-6 space-y-2 relative z-10">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                Story Navigation
              </div>
              {BRAND_CONFIG.navigation.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`group text-base font-semibold py-3 px-3.5 rounded-xl transition-all flex items-center justify-between border ${
                      isActive
                        ? 'text-[#F47721] bg-gradient-to-r from-[#F47721]/15 to-transparent border-[#F47721]/30 shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border-transparent hover:border-white/[0.06]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                    </span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#F47721] shadow-[0_0_8px_#F47721]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                    )}
                  </a>
                )
              })}
            </div>

            {/* Side Nav Bottom Actions */}
            <div className="pt-4 border-t border-white/[0.08] space-y-3 relative z-10">
              <a
                href={BRAND_CONFIG.primaryCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cinematic-primary w-full justify-center py-3 text-sm font-semibold shadow-lg shadow-[#F47721]/20 active:scale-[0.98] transition-transform"
              >
                <span>Explore Platform</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={BRAND_CONFIG.links.whatsappSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>

              <div className="text-center pt-1">
                <span className="text-[10px] text-slate-400 font-mono">
                  FlocknGo • Experience Together
                </span>
              </div>
            </div>
          </aside>
        </>,
        document.body
      )}
  </>
)
}
