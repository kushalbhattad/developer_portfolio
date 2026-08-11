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
  XCircle,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';
import { AdminModalForm } from './AdminModalForm';

export const AdminCaseStudies: React.FC = () => {
  const { caseStudies, deleteCaseStudy, updateCaseStudy } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'enabled' | 'disabled'>('all');

  const totalProjects = caseStudies.length;
  const enabledCount = caseStudies.filter(cs => cs.enabled !== false).length;
  const disabledCount = caseStudies.filter(cs => cs.enabled === false).length;
  const featuredCount = caseStudies.filter(cs => cs.featured).length;

  const filtered = caseStudies.filter(cs => {
    const isEnabled = cs.enabled !== false;
    if (statusFilter === 'enabled' && !isEnabled) return false;
    if (statusFilter === 'disabled' && isEnabled) return false;

    return (
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
            Enable/disable, add new projects, edit tech stacks, or toggle featured status directly for the website showcase.
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

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-mono text-slate-400">Total Projects</p>
          <p className="text-lg font-bold text-white mt-0.5">{totalProjects}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-mono text-emerald-400">Active / Visible</p>
          <p className="text-lg font-bold text-emerald-300 mt-0.5">{enabledCount}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-mono text-rose-400">Disabled / Hidden</p>
          <p className="text-lg font-bold text-rose-300 mt-0.5">{disabledCount}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-mono text-amber-400">Featured</p>
          <p className="text-lg font-bold text-amber-300 mt-0.5">{featuredCount}</p>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, client, or category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0 text-xs font-medium">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'all'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({totalProjects})
          </button>
          <button
            onClick={() => setStatusFilter('enabled')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'enabled'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active ({enabledCount})
          </button>
          <button
            onClick={() => setStatusFilter('disabled')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === 'disabled'
                ? 'bg-rose-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Disabled ({disabledCount})
          </button>
        </div>
      </div>

      {/* Case Studies List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <p className="text-sm text-slate-400">No projects found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="text-xs text-indigo-400 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map(cs => {
            const isEnabled = cs.enabled !== false;
            return (
              <div
                key={cs.id}
                className={`p-5 rounded-2xl bg-slate-900 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isEnabled ? 'border-slate-800 hover:border-slate-700' : 'border-rose-900/40 bg-rose-950/10'
                }`}
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

                      {/* Enabled / Disabled Tag */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                          isEnabled
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {isEnabled ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-rose-400" /> Disabled
                          </>
                        )}
                      </span>

                      {cs.featured && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-300" /> Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-400 font-mono">Client: {cs.client}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{cs.shortSummary}</p>
                    {cs.liveUrl && (
                      <a
                        href={cs.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 font-mono pt-0.5"
                      >
                        <ExternalLink className="w-3 h-3" /> {cs.liveUrl}
                      </a>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 self-end md:self-center">
                  
                  {/* ENABLE / DISABLE TOGGLE BUTTON */}
                  <button
                    onClick={() => updateCaseStudy(cs.id, { enabled: !isEnabled })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isEnabled
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                    }`}
                    title={isEnabled ? 'Click to disable and hide from public showcase' : 'Click to enable and show on public showcase'}
                  >
                    {isEnabled ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Enabled</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Disabled</span>
                      </>
                    )}
                  </button>

                  {/* FEATURED TOGGLE BUTTON */}
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

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => {
                      setEditingCaseStudy(cs);
                      setModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                    title="Edit Project"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteCaseStudy(cs.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
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

