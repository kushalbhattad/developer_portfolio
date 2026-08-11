import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Menu,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    agencySettings,
    inquiries,
    isAdmin
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveTab>('home');

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

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
    <header className="sticky top-0 z-40 w-full bg-[#f6f4ee]/95 backdrop-blur-md border-b border-[#111111]/10 transition-all">
      {/* Top Banner when Admin Mode is active */}
      {isAdmin && (
        <div className="bg-[#111111] text-white px-4 py-1.5 text-xs font-medium border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 container mx-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ff5436] text-white font-bold text-[10px] uppercase">
              <ShieldCheck className="w-3 h-3" /> Admin Mode Active
            </span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              You can add/edit projects, update social media handles, and manage client inquiries.
            </span>
          </div>
          <button
            onClick={() => {
              setActiveTab('admin');
            }}
            className="text-xs text-[#ff5436] hover:text-white underline font-bold flex items-center gap-1 shrink-0"
          >
            Go to Admin Dashboard <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight uppercase font-mono">
              {agencySettings.agencyName}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(item => {
              const isActive = activeTab !== 'admin' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
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
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: START A PROJECT Coral Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Show Admin Dashboard button ONLY when logged in or in admin mode */}
            {(isAdmin || activeTab === 'admin') && (
              <button
                onClick={() => {
                  if (activeTab === 'admin') {
                    setActiveTab('home');
                  } else {
                    setActiveTab('admin');
                  }
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#111111] text-white border border-[#111111] transition-all hover:bg-[#222222]"
                title="Access Admin Dashboard"
              >
                <Unlock className="w-3.5 h-3.5 text-[#ff5436]" />
                <span className="font-mono">ADMIN PANEL</span>
                {newInquiriesCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#ff5436] text-white font-bold text-[10px]">
                    {newInquiriesCount}
                  </span>
                )}
              </button>
            )}

            {/* START A PROJECT Coral Button */}
            <button
              onClick={() => {
                if (activeTab === 'admin') {
                  setActiveTab('home');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <span>START A PROJECT</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-[#111111]/15 text-[#111111]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f6f4ee] border-b border-[#111111]/15 px-4 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navItems.map(item => {
              const isActive = activeTab !== 'admin' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-bold text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#ff5436] text-white'
                      : 'text-[#111111] hover:bg-white/80'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#111111]/10 flex flex-col gap-3">
            {(isAdmin || activeTab === 'admin') && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab(activeTab === 'admin' ? 'home' : 'admin');
                }}
                className="w-full py-3 rounded-xl bg-[#111111] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#ff5436]" />
                <span>{isAdmin ? 'Switch to Public Site' : 'Admin Portal'}</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (activeTab === 'admin') setActiveTab('home');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full py-3 rounded-xl bg-[#ff5436] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>START A PROJECT</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
