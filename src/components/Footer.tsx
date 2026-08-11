import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  ArrowUp,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';
import { SocialLinksBar } from './SocialLinksBar';

export const Footer: React.FC = () => {
  const { agencySettings, setActiveTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 rounded-b-[24px] sm:rounded-b-[36px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Agency Brand & Social Handles */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-xl font-extrabold tracking-tight uppercase font-mono text-white">
                {agencySettings.agencyName}
              </span>
              <p className="text-xs text-[#2e5441] font-semibold mt-0.5">
                Web Design & Mobile Development Studio
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {agencySettings.description}
            </p>

            {/* Social Media Handles */}
            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Social Profiles
              </p>
              <SocialLinksBar iconSize="sm" />
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Navigation</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              {agencySettings.enabledSections?.services !== false && (
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
              )}
              {agencySettings.enabledSections?.portfolio !== false && (
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Our Projects
                  </button>
                </li>
              )}
              {agencySettings.enabledSections?.testimonials !== false && (
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Client Testimonials
                  </button>
                </li>
              )}
              {agencySettings.enabledSections?.process !== false && (
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Our Process
                  </button>
                </li>
              )}
              {agencySettings.enabledSections?.backlinks !== false && (
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      document.getElementById('backlinks')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>SEO Backlinks Network</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#ff5436]/20 text-[#ff5436] text-[9px] font-mono font-bold">DA 90+</span>
                  </button>
                </li>
              )}
              {agencySettings.enabledSections?.contact !== false && (
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Project Estimator & Quote
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Capabilities</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Brand Websites & UI Systems</li>
              <li>Product Interfaces & UX</li>
              <li>Android App Development</li>
              <li>Front-End & React Engineering</li>
              <li>Google Play Store Publishing</li>
              <li>GEO & Basic Google SEO</li>
            </ul>
          </div>

          {/* Col 4: Contact & Portal */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Direct Contact</p>
            <div className="space-y-2 text-xs">
              <p className="text-slate-200 font-semibold">{agencySettings.contactEmail}</p>
              <p className="text-slate-400">{agencySettings.contactPhone}</p>
              <p className="text-slate-500">{agencySettings.address}</p>

              <div className="pt-3">
                <a
                  href="#admin"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = 'admin';
                    setActiveTab('admin');
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 font-mono transition-colors"
                >
                  <Lock className="w-3 h-3 text-slate-600" />
                  <span>/admin portal</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {agencySettings.agencyName}. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
