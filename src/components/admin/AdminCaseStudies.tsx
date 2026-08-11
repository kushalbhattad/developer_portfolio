import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CaseStudy } from '../../types';
import {
  FolderKanban,
  Plus,
  Edit3,
  Trash2,
  Star,
  Search,
  CheckCircle2,
  Smartphone,
  Globe,
  ExternalLink
} from 'lucide-react';
import { AdminModalForm } from './AdminModalForm';

export const AdminCaseStudies: React.FC = () => {
  const { caseStudies, deleteCaseStudy, updateCaseStudy } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = caseStudies.filter(
    cs =>
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-indigo-400" />
            <span>Manage Our Projects & Portfolio Showcase</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add new projects to showcase directly on the website homepage, update tech stacks, or toggle featured status.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCaseStudy(null);
            setModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project to Showcase</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search case studies..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Case Studies Table / List */}
      <div className="space-y-4">
        {filtered.map(cs => (
          <div
            key={cs.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={cs.thumbnailUrl}
                alt={cs.title}
                className="w-20 h-16 rounded-xl object-cover border border-slate-800 shrink-0 bg-slate-950"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white text-sm">{cs.title}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                    {cs.category}
                  </span>
                  {cs.featured && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300" /> Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-400 font-mono">Client: {cs.client}</p>
                <p className="text-xs text-slate-400 line-clamp-1">{cs.shortSummary}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => updateCaseStudy(cs.id, { featured: !cs.featured })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  cs.featured
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cs.featured ? 'Featured' : 'Make Featured'}
              </button>

              <button
                onClick={() => {
                  setEditingCaseStudy(cs);
                  setModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => deleteCaseStudy(cs.id)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <AdminModalForm
          type="caseStudy"
          itemToEdit={editingCaseStudy}
          onClose={() => {
            setModalOpen(false);
            setEditingCaseStudy(null);
          }}
        />
      )}

    </div>
  );
};
