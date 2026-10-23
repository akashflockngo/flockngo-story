import React, { useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { FilmSection } from './sections/FilmSection'
import { CommunitySection } from './sections/CommunitySection'
import { ActivitySection } from './sections/ActivitySection'
import { WhatsAppSection } from './sections/WhatsAppSection'
import { PaymentsSection } from './sections/PaymentsSection'
import { EngagementSection } from './sections/EngagementSection'
import { FinalBrandSection } from './sections/FinalBrandSection'
import { ScrollTrigger } from './config/gsap'
import { BRAND_CONFIG } from './config/brand'
import { preloadImage } from './services/queryClient'
import { initFilmFrameLoader } from './services/filmFrameLoader'

export const App: React.FC = () => {
  useEffect(() => {
    // 1. Kick off prioritized film sequence loader in background
    initFilmFrameLoader()

    // 2. Preload critical above-the-fold and near-fold brand images immediately
    preloadImage(BRAND_CONFIG.assets.heroBrand)
    preloadImage(BRAND_CONFIG.assets.logo)
    preloadImage(BRAND_CONFIG.assets.community)
    preloadImage(BRAND_CONFIG.assets.activityCreation)

    // 3. Stagger remaining section assets so user never experiences blank cards
    const preloadRest = () => {
      preloadImage(BRAND_CONFIG.assets.activityParticipation)
      preloadImage(BRAND_CONFIG.assets.whatsappInvitation)
      preloadImage(BRAND_CONFIG.assets.registrationPayment)
      preloadImage(BRAND_CONFIG.assets.pollsAnnouncements)
      preloadImage(BRAND_CONFIG.assets.communityMemories)
      preloadImage(BRAND_CONFIG.assets.closingBrand)
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadRest)
    } else {
      setTimeout(preloadRest, 200)
    }

    // Initial layout calculation after child components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0D14] text-[#111111] relative selection:bg-[#F47721]/30 selection:text-white">
      {/* 01. Refined Navigation Bar with Official Logo */}
      <Header />

      <main className="flex-1 relative z-10">
        {/* 02. Cinematic & Clean Hero Section */}
        <HeroSection />

        {/* 03. Prominent 16:9 Cinematic Video Player Stage */}
        <FilmSection />

        {/* 04. “Create Communities” Feature Section */}
        <CommunitySection />

        {/* 05. “Create Activities” Feature Section */}
        <ActivitySection />

        {/* 06. “WhatsApp Invitations” Feature Section */}
        <WhatsAppSection />

        {/* 07. “Joining and Payments” Feature Section */}
        <PaymentsSection />

        {/* 08. “Activity Engagement” Feature Section */}
        <EngagementSection />

        {/* 09. Final Brand Section & Conversion CTA */}
        <FinalBrandSection />
      </main>

      {/* 10. Refined Brand Footer */}
      <Footer />
    </div>
  )
}

export default App
