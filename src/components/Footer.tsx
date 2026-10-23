import React from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { ExternalLink } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0D14] text-slate-400 py-12 sm:py-16 md:py-20 border-t border-white/[0.08]">
      <div className="container-cinematic">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/[0.08]">
          
          {/* Logo & Brand Statement Column */}
          <div className="md:col-span-5 space-y-5">
            <a
              href="#"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
              aria-label="Back to top"
            >
              <img
                src={BRAND_CONFIG.assets.logo}
                alt="FlocknGo — Experience Together"
                width={140}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto object-contain "
              />
            </a>
            
            {/* Exact Brand Line per specification */}
            <p className="text-base font-bold text-white tracking-tight">
              {BRAND_CONFIG.manifesto}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The operating layer for experience-led businesses and community organizers — fill every seat, run every event, and bring people back.
            </p>

            {/* Official Website Link */}
            <div className="pt-1">
              <a
                href={BRAND_CONFIG.officialSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F47721] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
              >
                <span>Visit Official Website (flockngo.com)</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Platform & Hubs Column */}
          <div className="md:col-span-3 space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform & Hubs
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={BRAND_CONFIG.primaryCtaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
                >
                  FlocknGo Platform
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.links.eventsHub}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
                >
                  Events & Activities Hub
                </a>
              </li>
              <li>
                <a
                  href="#action"
                  className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
                >
                  Action & Invitations
                </a>
              </li>
              <li>
                <a
                  href="#communication"
                  className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
                >
                  1-to-1 WhatsApp Sync
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Social & Community Channels */}
          <div className="md:col-span-4 space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Verified Channels
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={BRAND_CONFIG.links.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
                >
                  <span>LinkedIn (FlocknGo)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
                >
                  <span>YouTube Community Channel</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.links.whatsappSupport}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721] rounded"
                >
                  <span>WhatsApp Concierge (+91 96074 76642)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
            </ul>

            {/* Store Download Badges */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={BRAND_CONFIG.links.googlePlay}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-pill-dark hover:border-[#F47721]/50 hover:bg-white/[0.08] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]"
              >
                <img
                  src={BRAND_CONFIG.assets.googlePlay}
                  alt=""
                  aria-hidden="true"
                  width={14}
                  height={14}
                  loading="lazy"
                  decoding="async"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span className="text-[11px] font-semibold text-slate-200">Google Play</span>
              </a>
              <a
                href={BRAND_CONFIG.links.appStore}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-pill-dark hover:border-[#F47721]/50 hover:bg-white/[0.08] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]"
              >
                <img
                  src={BRAND_CONFIG.assets.appStore}
                  alt=""
                  aria-hidden="true"
                  width={14}
                  height={14}
                  loading="lazy"
                  decoding="async"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span className="text-[11px] font-semibold text-slate-200">App Store</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>© {CURRENT_YEAR} FlocknGo. All rights reserved.</div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Experience Together</span>
            <span>•</span>
            <span>Zero Customer App Installs</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
