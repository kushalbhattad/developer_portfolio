import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Inquiry } from '../../types';
import { Inbox, Trash2, Mail, Phone, Calendar, Check, MessageSquare, StickyNote, FileSpreadsheet, Download } from 'lucide-react';
import { exportInquiriesToExcel, exportInquiriesToPDF } from '../../lib/reportExporter';

export const AdminInquiries: React.FC = () => {
  const { inquiries, agencySettings, updateInquiryStatus, deleteInquiry } = useApp();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(inquiries[0] || null);
  const [noteInput, setNoteInput] = useState('');

  const statuses: Inquiry['status'][] = ['New', 'In Contact', 'Proposal Sent', 'Completed', 'Archived'];

  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    updateInquiryStatus(id, status);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleSaveNote = () => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, noteInput);
    setSelectedInquiry(prev => prev ? { ...prev, notes: noteInput } : null);
    setNoteInput('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-rose-400" />
            <span>Client Inquiries & Project Requests</span>
          </h2>
          <p className="text-xs text-slate-400">
            Review incoming client leads from your project estimator form, track sales status, and record internal notes.
          </p>
        </div>

        {/* Report Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportInquiriesToExcel(inquiries)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Export Inquiries to Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Excel</span>
          </button>

          <button
            onClick={() => exportInquiriesToPDF(inquiries, agencySettings)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Export Inquiries Report to PDF"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-slate-400 text-sm">No client inquiries received yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Inquiry List */}
          <div className="lg:col-span-5 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {inquiries.map(inq => (
              <div
                key={inq.id}
                onClick={() => {
                  setSelectedInquiry(inq);
                  setNoteInput(inq.notes || '');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedInquiry?.id === inq.id
                    ? 'bg-indigo-950/60 border-indigo-500/60 shadow-md'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-sm">{inq.name}</span>
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
                <p className="text-xs text-indigo-300 font-semibold">{inq.serviceType}</p>
                <p className="text-[11px] text-slate-400 mt-1">Submitted: {inq.submittedAt}</p>
              </div>
            ))}
          </div>

          {/* Inquiry Detail View */}
          {selectedInquiry ? (
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedInquiry.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-indigo-400 hover:underline flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> {selectedInquiry.email}
                    </a>
                    {selectedInquiry.phone && (
                      <span className="flex items-center gap-1 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" /> {selectedInquiry.phone}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteInquiry(selectedInquiry.id)}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-rose-950 text-rose-400 hover:text-rose-300 border border-slate-800"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Switcher Bar */}
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-mono">Lead Sales Status</label>
                <div className="flex flex-wrap gap-1.5">
                  {statuses.map(st => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedInquiry.status === st
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-400 block font-mono">Service Requested</span>
                  <span className="font-semibold text-indigo-300 mt-0.5 block">{selectedInquiry.serviceType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Budget</span>
                  <span className="font-semibold text-emerald-400 mt-0.5 block">{selectedInquiry.budgetRange}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Timeline</span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">{selectedInquiry.timeline}</span>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 font-mono uppercase">Client Message</h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 font-mono uppercase flex items-center gap-1.5">
                  <StickyNote className="w-3.5 h-3.5 text-amber-400" />
                  Internal Agency Notes
                </h4>
                {selectedInquiry.notes && (
                  <p className="text-xs text-amber-200/90 p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
                    {selectedInquiry.notes}
                  </p>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    placeholder="Add internal note (e.g. Sent discovery call link)..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shrink-0"
                  >
                    Save Note
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="lg:col-span-7 text-center py-12 text-slate-400 text-sm">
              Select an inquiry from the left to view full details.
            </div>
          )}

        </div>
      )}

    </div>
  );
};
