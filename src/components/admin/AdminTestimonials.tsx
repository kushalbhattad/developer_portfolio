import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Testimonial } from '../../types';
import { Star, Plus, Edit3, Trash2, Building2 } from 'lucide-react';
import { AdminModalForm } from './AdminModalForm';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, deleteTestimonial } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Manage Client Testimonials</span>
          </h2>
          <p className="text-xs text-slate-400">
            Edit client reviews, ratings, and testimonials showcased on the portfolio website.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTestimonial(null);
            setModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      <div className="space-y-4">
        {testimonials.map(t => (
          <div
            key={t.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={t.avatarUrl}
                alt={t.clientName}
                className="w-12 h-12 rounded-full object-cover border border-slate-700 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{t.clientName}</span>
                  <span className="text-xs text-indigo-400">{t.clientRole}</span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-500" /> {t.company}
                </p>
                <p className="text-xs text-slate-300 italic line-clamp-2">"{t.content}"</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => {
                  setEditingTestimonial(t);
                  setModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTestimonial(t.id)}
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
          type="testimonial"
          itemToEdit={editingTestimonial}
          onClose={() => {
            setModalOpen(false);
            setEditingTestimonial(null);
          }}
        />
      )}

    </div>
  );
};
