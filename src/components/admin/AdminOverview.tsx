import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderKanban,
  Star,
  Layers,
  Inbox,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
  Download
} from 'lucide-react';
import { exportInquiriesToExcel, exportInquiriesToPDF } from '../../lib/reportExporter';

export const AdminOverview: React.FC = () => {
  const {
    caseStudies,
    testimonials,
    services,
    inquiries,
    setAdminSubTab,
    updateInquiryStatus
  } = useApp();

  const newInquiries = inquiries.filter(i => i.status === 'New');

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Nakshatra Digital Arts — Easy Admin Dashboard</span>
          </h2>
          <p className="text-xs text-slate-300">
            Manage your website content, review client inquiries, and generate downloadable PDF & Excel reports with zero hassle.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => exportInquiriesToExcel(inquiries)}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Excel Report</span>
          </button>

          <button
            onClick={() => exportInquiriesToPDF(inquiries)}
            className="px-3.5 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>PDF Report</span>
          </button>

          <button
            onClick={() => setAdminSubTab('case-studies')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Case Study</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div
          onClick={() => setAdminSubTab('case-studies')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Case Studies</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{caseStudies.length}</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {caseStudies.filter(c => c.featured).length} Featured on Homepage
          </p>
        </div>

        <div
          onClick={() => setAdminSubTab('testimonials')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Testimonials</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{testimonials.length}</p>
          <p className="text-[11px] text-slate-400">5.0 Star Average Client Rating</p>
        </div>

        <div
          onClick={() => setAdminSubTab('services')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Services</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{services.length}</p>
          <p className="text-[11px] text-slate-400">Web & Android Development</p>
        </div>

        <div
          onClick={() => setAdminSubTab('inquiries')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Lead Inquiries</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{inquiries.length}</p>
          <p className="text-[11px] text-emerald-400 font-bold">
            {newInquiries.length} New Uncontacted Leads
          </p>
        </div>

      </div>

      {/* Recent Inquiries List */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-indigo-400" />
            <span>Recent Client Inquiries & Project Requests</span>
          </h3>
          <button
            onClick={() => setAdminSubTab('inquiries')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>View All ({inquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {inquiries.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No client inquiries received yet.</p>
        ) : (
          <div className="space-y-3">
            {inquiries.slice(0, 3).map(inq => (
              <div
                key={inq.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{inq.name}</span>
                    <span className="text-xs text-slate-400 font-mono">({inq.email})</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        inq.status === 'New'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300 font-semibold mt-1">
                    {inq.serviceType} • Budget: {inq.budgetRange}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{inq.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {inq.status === 'New' && (
                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'In Contact')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
                    >
                      Mark Contacted
                    </button>
                  )}
                  <button
                    onClick={() => setAdminSubTab('inquiries')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
