import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSubTab } from '../../types';
import { BrandLogo } from '../BrandLogo';
import {
  FolderKanban,
  Star,
  Layers,
  Inbox,
  Settings,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Link2
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { AdminCaseStudies } from './AdminCaseStudies';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminServices } from './AdminServices';
import { AdminInquiries } from './AdminInquiries';
import { AdminSettings } from './AdminSettings';
import { AdminSecurityAudit } from './AdminSecurityAudit';
import { AdminBacklinks } from './AdminBacklinks';
import { AdminLoginModal } from './AdminLoginModal';

export const AdminDashboard: React.FC = () => {
  const {
    isAdmin,
    setIsAdmin,
    adminSubTab,
    setAdminSubTab,
    inquiries,
    setActiveTab,
    agencySettings,
    themeMode
  } = useApp();

  const [showLoginModal, setShowLoginModal] = useState(!isAdmin);

  if (!isAdmin && showLoginModal) {
    return <AdminLoginModal onClose={() => setShowLoginModal(false)} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Admin Authentication Required</h2>
        <p className="text-slate-400 text-sm max-w-md">
          Please enter your security PIN to access the portfolio editor and client lead management dashboard.
        </p>
        <button
          onClick={() => setShowLoginModal(true)}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30"
        >
          Open Security Login
        </button>
      </div>
    );
  }

  const unreadInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const sidebarNav: { id: AdminSubTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'security-audit', label: 'Security Audit', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { id: 'case-studies', label: 'Our Projects', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Star className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Layers className="w-4 h-4" /> },
    { id: 'backlinks', label: 'SEO Backlinks', icon: <Link2 className="w-4 h-4 text-amber-400" /> },
    { id: 'inquiries', label: 'Leads & Inquiries', icon: <Inbox className="w-4 h-4" />, badge: unreadInquiriesCount },
    { id: 'settings', label: 'Agency Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Navigation Bar */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border mb-8 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`p-2 rounded-xl border transition-colors ${
                isDark ? 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-300'
              }`}
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div className="hidden sm:block pl-2 border-l border-slate-700/50">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                  ADMIN PORTAL
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                isDark ? 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              View Live Website
            </button>
            <button
              onClick={() => {
                setIsAdmin(false);
                setActiveTab('home');
              }}
              className="px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-950/80 text-rose-300 text-xs font-semibold border border-rose-500/30 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Navigation Sidebar */}
          <div className={`lg:col-span-3 space-y-2 p-3 rounded-2xl border transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <p className={`px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Management Views
            </p>
            {sidebarNav.map(item => {
              const isActive = adminSubTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminSubTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-950 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-3 h-3 opacity-50" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sub Tab View Container */}
          <div className={`lg:col-span-9 p-6 sm:p-8 rounded-2xl border min-h-[600px] transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            {adminSubTab === 'overview' && <AdminOverview />}
            {adminSubTab === 'security-audit' && <AdminSecurityAudit />}
            {adminSubTab === 'case-studies' && <AdminCaseStudies />}
            {adminSubTab === 'testimonials' && <AdminTestimonials />}
            {adminSubTab === 'services' && <AdminServices />}
            {adminSubTab === 'backlinks' && <AdminBacklinks />}
            {adminSubTab === 'inquiries' && <AdminInquiries />}
            {adminSubTab === 'settings' && <AdminSettings />}
          </div>

        </div>

      </div>
    </div>
  );
};
