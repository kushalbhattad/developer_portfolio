import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Backlink } from '../../types';
import {
  Link2,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  Download,
  BarChart3
} from 'lucide-react';

export const AdminBacklinks: React.FC = () => {
  const { backlinks, addBacklink, updateBacklink, deleteBacklink, addToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBL, setEditingBL] = useState<Backlink | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    targetUrl: '',
    anchorText: '',
    category: 'SEO Partner' as Backlink['category'],
    domainAuthority: 85,
    status: 'Verified' as Backlink['status'],
    description: ''
  });

  const openAddModal = () => {
    setEditingBL(null);
    setFormData({
      title: '',
      targetUrl: 'https://',
      anchorText: '',
      category: 'SEO Partner',
      domainAuthority: 85,
      status: 'Verified',
      description: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (bl: Backlink) => {
    setEditingBL(bl);
    setFormData({
      title: bl.title,
      targetUrl: bl.targetUrl,
      anchorText: bl.anchorText,
      category: bl.category,
      domainAuthority: bl.domainAuthority,
      status: bl.status,
      description: bl.description || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.targetUrl || !formData.anchorText) {
      addToast('Please fill in title, target URL, and anchor text.', 'error');
      return;
    }

    if (editingBL) {
      updateBacklink(editingBL.id, formData);
    } else {
      addBacklink(formData);
    }
    setModalOpen(false);
  };

  const exportBacklinksCSV = () => {
    const headers = ['ID', 'Title', 'Target URL', 'Anchor Text', 'Category', 'Domain Authority', 'Status', 'Added Date'];
    const rows = backlinks.map(b => [
      b.id,
      `"${b.title.replace(/"/g, '""')}"`,
      `"${b.targetUrl.replace(/"/g, '""')}"`,
      `"${b.anchorText.replace(/"/g, '""')}"`,
      b.category,
      b.domainAuthority,
      b.status,
      b.addedDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `backlinks_index_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Exported backlinks CSV successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Link2 className="w-5 h-5 text-indigo-400" />
            <span>Manage SEO Backlinks & Partner Links</span>
          </h2>
          <p className="text-xs text-slate-400">
            Add authoritative target URLs, anchor text, and DA scores for search engine indexation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportBacklinksCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Backlink</span>
          </button>
        </div>
      </div>

      {/* List Table / Cards */}
      <div className="space-y-4">
        {backlinks.map(b => (
          <div
            key={b.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-base">{b.title}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                  {b.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" /> DA {b.domainAuthority}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                  {b.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono underline">
                <a href={b.targetUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-300">
                  <span>Anchor: "{b.anchorText}"</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {b.description && (
                <p className="text-xs text-slate-400 line-clamp-1">{b.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => openEditModal(b)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Edit Backlink"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => deleteBacklink(b.id)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300"
                title="Delete Backlink"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl relative animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-indigo-400" />
                <span>{editingBL ? 'Edit Backlink' : 'Add New Backlink'}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-300 mb-1 font-mono">Title / Site Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clutch B2B Agency Directory"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">Target URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://clutch.co/profile/nakshatra"
                  value={formData.targetUrl}
                  onChange={e => setFormData({ ...formData, targetUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">Anchor Text *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nakshatra Top Rated Web Agency"
                  value={formData.anchorText}
                  onChange={e => setFormData({ ...formData, anchorText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="SEO Partner">SEO Partner</option>
                    <option value="Developer Network">Developer Network</option>
                    <option value="Tech Directory">Tech Directory</option>
                    <option value="Press & Media">Press & Media</option>
                    <option value="Client Site">Client Site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-mono">Domain Authority (DA 1-100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.domainAuthority}
                    onChange={e => setFormData({ ...formData, domainAuthority: parseInt(e.target.value) || 85 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Verified">Verified</option>
                  <option value="Active">Active</option>
                  <option value="Pending Review">Pending Review</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">Description / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Additional context about this backlink relationship..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30"
                >
                  {editingBL ? 'Save Changes' : 'Add Backlink'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
