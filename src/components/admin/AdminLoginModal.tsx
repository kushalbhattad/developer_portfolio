import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Unlock, ShieldCheck, Key, ArrowRight, Sparkles } from 'lucide-react';

export const AdminLoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { agencySettings, setIsAdmin, addToast } = useApp();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === agencySettings.adminPin) {
      setIsAdmin(true);
      addToast('Welcome to Agency Admin Dashboard!', 'success');
      onClose();
    } else {
      setErrorMsg('Incorrect PIN. Default demo PIN is: 1234');
    }
  };

  const handleDemoUnlock = () => {
    setIsAdmin(true);
    addToast('Admin Dashboard unlocked with Quick Demo access!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-indigo-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">Agency Admin Login</h2>
          <p className="text-slate-400 text-xs">
            Enter PIN to access agency portfolio management, lead inquiries, case studies, and testimonial editors.
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">Reviewer Quick Access</span>
          </div>
          <button
            onClick={handleDemoUnlock}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
          >
            Instant Unlock
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-mono">Admin Security PIN</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter PIN (Default: 1234)"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono tracking-widest"
              />
            </div>
            {errorMsg && <p className="text-xs text-rose-400 mt-1">{errorMsg}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <span>Authenticate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
