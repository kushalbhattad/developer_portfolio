import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  Globe,
  Layout,
  Code2,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Rocket,
  Calendar,
  Building2,
  CheckCircle2,
  Leaf,
  Sparkles,
  Camera,
  Upload,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { SecurityScannerModal } from './SecurityScannerModal';
import { SocialLinksBar } from './SocialLinksBar';
import { NerdProgrammerAvatar } from './NerdProgrammerAvatar';

export const Hero: React.FC = () => {
  const { agencySettings, updateAgencySettings, addToast, isAdmin } = useApp();
  const [showScannerModal, setShowScannerModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      addToast('Image size should be less than 10MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateAgencySettings({
          heroImageUrl: dataUrl
        });
        addToast('Hero home page image updated successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      className="pt-6 pb-12 bg-[#f6f4ee] text-[#111111]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Copy, Center Arch Portrait, Right Design+Code & Socials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12">
          
          {/* Left Column: Eyebrow, Main Headline, Tagline, CTAs */}
          <motion.div
            className="lg:col-span-5 space-y-6 text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/80 border border-[#111111]/15 dark:border-slate-700 shadow-sm">
              <BrandLogo size="xs" variant="icon-only" />
              <span className="text-xs font-extrabold text-[#2e5441] dark:text-emerald-400 tracking-wider uppercase font-mono">
                OFFICIAL DIGITAL DEVELOPMENT STUDIO
              </span>
            </div>

            {/* Main Title */}
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] leading-[1.06] tracking-tight">
              {agencySettings.heroTitle || 'Digital experiences designed to feel effortless.'}
            </h1>

            {/* Tagline Paragraph */}
            <p className="text-sm sm:text-base text-[#444444] leading-relaxed font-normal max-w-md">
              {agencySettings.heroSubtitle || `${agencySettings.agencyName} creates thoughtful websites and mobile interfaces that help modern brands communicate clearly and grow with confidence.`}
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('portfolio');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 group"
              >
                <span>VIEW OUR WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#process"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('process');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#2e5441] hover:text-[#111111] font-bold text-xs uppercase tracking-wider underline underline-offset-4 transition-colors"
              >
                DISCOVER OUR PROCESS
              </a>
            </div>

            {/*  & Quick WhatsApp / Security Scanner */}
            <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${agencySettings.whatsappNumber}?text=Hi%20${encodeURIComponent(agencySettings.agencyName)},%20I%20want%20to%20get%20my%20business%20online%20in%2015%20days!`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#2e5441]/10 hover:bg-[#2e5441]/20 text-[#2e5441] font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#2e5441]" />
                <span>WhatsApp DM</span>
              </a>

              <button
                onClick={() => setShowScannerModal(true)}
                className="px-3.5 py-2 rounded-lg bg-white border border-[#111111]/15 text-[#111111] hover:bg-[#111111] hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5436]" />
                <span>Free Flaw Scan</span>
              </button>
            </div>

          </motion.div>

          {/* Center Column: Mint Arched Frame with Animated Nerd Programmer Boy Avatar */}
          <motion.div
            className="lg:col-span-4 flex justify-center relative my-4 lg:my-0 group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[340px] aspect-[4/5]">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* Arched Mint Frame */}
              <div className="w-full h-full bg-[#dbe7de] dark:bg-slate-800 rounded-t-[160px] rounded-b-3xl overflow-hidden relative shadow-inner border border-[#111111]/5 flex items-end justify-center">
                <NerdProgrammerAvatar
                  customImageUrl={agencySettings.heroImageUrl}
                  imageFit={agencySettings.heroImageFit || 'cover'}
                />
              </div>

              {/* Decorative Coral Circle Ornament */}
              <div className="w-12 h-12 rounded-full bg-[#ff5436] absolute top-6 -right-2 shadow-lg flex items-center justify-center animate-pulse z-20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>

              {/* Quick Image Upload & Fit Mode Controls */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/90 text-[#111111] dark:text-white border border-[#111111]/15 dark:border-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg hover:bg-[#ff5436] hover:text-white dark:hover:bg-[#ff5436] transition-all flex items-center gap-1.5"
                  title="Click to Upload / Change Home Page Image"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </button>

                <button
                  onClick={() => {
                    const nextFit = agencySettings.heroImageFit === 'contain' ? 'cover' : 'contain';
                    updateAgencySettings({ heroImageFit: nextFit });
                    addToast(`Switched image fit to ${nextFit}`, 'info');
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/90 text-[#111111] dark:text-white border border-[#111111]/15 dark:border-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1"
                  title="Toggle between Object-Cover and Object-Contain fit"
                >
                  {agencySettings.heroImageFit === 'contain' ? (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="hidden sm:inline">Cover</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="hidden sm:inline">Contain</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Giant Display DESIGN + CODE, Feature Bullets & Social Media Bar */}
          <motion.div
            className="lg:col-span-3 space-y-6 text-left pl-0 lg:pl-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            
            {/* Display Text */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-[#111111] tracking-tight leading-none uppercase">
                DESIGN
              </h2>
              <p className="text-3xl font-black text-[#ff5436] my-0.5">+</p>
              <h2 className="text-4xl sm:text-5xl font-black text-[#111111] tracking-tight leading-none uppercase">
                CODE
              </h2>
              <p className="text-xs font-semibold text-[#666666] mt-2">
                One studio. One seamless process.
              </p>
            </div>

            {/* Core Capabilities List */}
            <div className="space-y-3 pt-2 border-t border-[#111111]/10 text-xs font-medium text-[#222222]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#dbe7de] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-[#2e5441]" />
                </div>
                <span>Brand Websites</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#dbe7de] flex items-center justify-center shrink-0">
                  <Layout className="w-4 h-4 text-[#2e5441]" />
                </div>
                <span>Product Interfaces</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#dbe7de] flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4 text-[#2e5441]" />
                </div>
                <span>Front-End & Mobile Apps</span>
              </div>
            </div>

            {/* Editable Social Media Handles Bar */}
            <div className="pt-4 border-t border-[#111111]/10">
              <p className="text-[11px] font-bold text-[#666666] uppercase tracking-wider mb-2 font-mono">
                Connect With Us
              </p>
              <SocialLinksBar iconSize="sm" />
            </div>

          </motion.div>

        </div>

        {/* Bottom Stats Grid (4 Cards matching mockup) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#111111]/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          
          {/* Box 1: Projects */}
          <div className="p-4 rounded-2xl bg-white/80 border border-[#111111]/10 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#dbe7de] flex items-center justify-center text-[#2e5441]">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#ff5436] font-mono leading-none">
                {agencySettings.completedProjects}+
              </p>
              <p className="text-xs font-medium text-[#444444] mt-1">Projects Delivered</p>
            </div>
          </div>

          {/* Box 2: Experience */}
          <div className="p-4 rounded-2xl bg-white/80 border border-[#111111]/10 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#dbe7de] flex items-center justify-center text-[#2e5441]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#ff5436] font-mono leading-none">
                {agencySettings.yearsInBusiness}
              </p>
              <p className="text-xs font-medium text-[#444444] mt-1">Years Experience</p>
            </div>
          </div>

          {/* Box 3: Industries / Apps */}
          <div className="p-4 rounded-2xl bg-white/80 border border-[#111111]/10 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#dbe7de] flex items-center justify-center text-[#2e5441]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#ff5436] font-mono leading-none">
                {agencySettings.androidAppsPublished || 12}+
              </p>
              <p className="text-xs font-medium text-[#444444] mt-1">Published Apps / Industries</p>
            </div>
          </div>

          {/* Box 4: Trust statement */}
          <div className="p-4 rounded-2xl bg-white/80 border border-[#111111]/10 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-[#dbe7de] flex items-center justify-center text-[#2e5441] shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111111] leading-tight">
                Trusted by ambitious teams.
              </p>
              <p className="text-[11px] text-[#2e5441] font-semibold mt-0.5">
                15-Day Go-Live • 25% Advance
              </p>
            </div>
          </div>

        </motion.div>

      </div>

      {/* Free Security Flaw Scanner Modal */}
      {showScannerModal && (
        <SecurityScannerModal onClose={() => setShowScannerModal(false)} />
      )}
    </motion.div>
  );
};
