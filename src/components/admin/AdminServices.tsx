import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Service } from '../../types';
import { Layers, Plus, Edit3, Trash2, Clock, Sparkles } from 'lucide-react';
import { AdminModalForm } from './AdminModalForm';

export const AdminServices: React.FC = () => {
  const { services, deleteService, updateService } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Manage Agency Services</span>
          </h2>
          <p className="text-xs text-slate-400">
            Define service packages, pricing, deliverables, and delivery timelines.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingService(null);
            setModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="space-y-4">
        {services.map(s => (
          <div
            key={s.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{s.title}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                  {s.category}
                </span>
                {s.popular && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" /> Popular
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">{s.description}</p>
              <div className="flex items-center gap-4 text-xs font-mono text-emerald-400 pt-1">
                <span>From: {s.startingPrice}</span>
                <span>•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {s.deliveryTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => updateService(s.id, { popular: !s.popular })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  s.popular
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                {s.popular ? 'Popular' : 'Mark Popular'}
              </button>

              <button
                onClick={() => {
                  setEditingService(s);
                  setModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => deleteService(s.id)}
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
          type="service"
          itemToEdit={editingService}
          onClose={() => {
            setModalOpen(false);
            setEditingService(null);
          }}
        />
      )}

    </div>
  );
};
