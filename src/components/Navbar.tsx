import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    agencySettings,
    themeMode,
    toggleThemeMode
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveTab>('home');

  const enabled = agencySettings.enabledSections || {};

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    ...(enabled.services !== false ? [{ id: 'services' as ActiveTab, label: 'SERVICES' }] : []),
    ...(enabled.portfolio !== false ? [{ id: 'portfolio' as ActiveTab, label: 'WORK' }] : []),
    ...(enabled.testimonials !== false ? [{ id: 'testimonials' as ActiveTab, label: 'TESTIMONIALS' }] : []),
    ...(enabled.process !== false ? [{ id: 'process' as ActiveTab, label: 'PROCESS' }] : []),
    ...(enabled.backlinks !== false ? [{ id: 'backlinks' as ActiveTab, label: 'BACKLINKS' }] : []),
    ...(enabled.contact !== false ? [{ id: 'contact' as ActiveTab, label: 'CONTACT' }] : []),
  ];

  // Scroll detection to highlight active navbar section
  useEffect(() => {
    if (activeTab === 'admin') return;

    const sections = navItems.map(item => item.id);
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const handleNavClick = (tabId: ActiveTab) => {
    setMobileMenuOpen(false);
    if (activeTab === 'admin') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(tabId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      setActiveSection(tabId);
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-[95%] max-w-7xl mx-auto transition-all">
      <div className="w-full rounded-2xl sm:rounded-full bg-[#f6f4ee]/90 backdrop-blur-md border border-[#111111]/15 shadow-xl shadow-black/5 px-4 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          {navItems.map(item => {
            const isActive = activeTab !== 'admin' && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`text-xs font-bold uppercase tracking-wider transition-all relative py-1.5 ${
                  isActive
                    ? 'text-[#ff5436]'
                    : 'text-[#333333] hover:text-[#111111]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5436] rounded-full animate-fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons: Theme Switcher & START A PROJECT */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleThemeMode}
            className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800 border border-[#111111]/15 dark:border-slate-700 text-[#111111] dark:text-amber-300 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
            title={themeMode === 'dark' ? 'Switch to Studio Off-White Theme' : 'Switch to High-Contrast Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {themeMode === 'dark' ? (
              <>
                <Sun className="w-4 h-4 fill-amber-300/30 text-amber-300" />
                <span className="hidden xl:inline text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
                <span className="hidden xl:inline text-[10px] font-mono font-bold uppercase tracking-wider text-[#333333]">Dark</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (activeTab === 'admin') {
                setActiveTab('home');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-5 py-2.5 rounded-full bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
          >
            <span>START A PROJECT</span>
          </a>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleThemeMode}
            className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-slate-800 border border-[#111111]/15 dark:border-slate-700 text-[#111111] dark:text-amber-300"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 fill-amber-300/30 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-slate-800 border border-[#111111]/15 dark:border-slate-700 text-[#111111] dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#f6f4ee]/95 backdrop-blur-md border border-[#111111]/15 rounded-2xl px-4 py-5 space-y-4 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-1.5">
            {navItems.map(item => {
              const isActive = activeTab !== 'admin' && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left font-bold text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#ff5436]'
                      : 'text-[#111111] hover:bg-white/80'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#111111]/10 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (activeTab === 'admin') setActiveTab('home');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full py-3 rounded-full bg-[#ff5436] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md text-center"
            >
              <span>START A PROJECT</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
