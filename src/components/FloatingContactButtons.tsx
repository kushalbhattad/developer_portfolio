import React, { useState } from 'react';
import { Phone, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SocialShareModal } from './SocialShareModal';

export const FloatingContactButtons: React.FC = () => {
  const { agencySettings } = useApp();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const cleanPhone = agencySettings.contactPhone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = (agencySettings.whatsappNumber || agencySettings.contactPhone).replace(/[^0-9]/g, '');

  const customTemplate = agencySettings.whatsappTemplate || `Hello ${agencySettings.agencyName}! I would like to enquire about getting my business website online in 15 days.`;
  const prebuiltMessage = encodeURIComponent(customTemplate);

  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${prebuiltMessage}`;
  const phoneUrl = `tel:${cleanPhone}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 pointer-events-auto select-none">
        
        {/* Share Button */}
        <button
          onClick={() => setShareModalOpen(true)}
          className="group relative w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg border border-white/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label="Share Website"
          title="Share Website on Social Media"
        >
          <Share2 className="w-5 h-5 text-white" />
          <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-3 py-1.5 rounded-xl bg-[#111111] text-white text-xs font-mono font-bold whitespace-nowrap shadow-xl">
            Share Website
          </span>
        </button>

        {/* Call Circular Floating Button */}
        <a
          href={phoneUrl}
          className="group relative w-12 h-12 rounded-full bg-[#111111] hover:bg-[#222222] text-white shadow-lg border border-white/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label={`Call ${agencySettings.contactPhone}`}
          title={`Call ${agencySettings.contactPhone}`}
        >
          <Phone className="w-5 h-5 text-white" />
          <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-3 py-1.5 rounded-xl bg-[#111111] text-white text-xs font-mono font-bold whitespace-nowrap shadow-xl">
            Call: {agencySettings.contactPhone}
          </span>
        </a>

        {/* WhatsApp Circular Floating Button with Actual WhatsApp Brand Logo */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg shadow-[#25D366]/30 border border-white/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.98 9.98 0 004.779 1.221h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.923 9.923 0 0012.012 2zm5.827 14.195c-.244.688-1.428 1.312-1.97 1.378-.501.062-1.15.093-1.85-.132a12.92 12.92 0 01-4.887-2.906 13.067 13.067 0 01-2.483-3.136c-.344-.594-.037-1.138.226-1.401.21-.21.469-.481.703-.75.188-.21.25-.344.375-.594.125-.25.062-.469-.031-.656-.094-.188-.844-2.032-1.156-2.782-.313-.75-.625-.656-.844-.656-.219 0-.469-.031-.719-.031-.25 0-.656.094-1 .469-.344.375-1.313 1.281-1.313 3.125 0 1.844 1.344 3.625 1.531 3.875.188.25 2.641 4.032 6.406 5.657 2.25.969 3.125.875 3.938.75.938-.14 1.969-.8 2.25-1.578.281-.781.281-1.453.188-1.594-.094-.141-.344-.219-.719-.406z"/>
          </svg>
          <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-3 py-1.5 rounded-xl bg-[#111111] text-white text-xs font-mono font-bold whitespace-nowrap shadow-xl">
            WhatsApp Direct Chat
          </span>
        </a>

      </div>

      <SocialShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </>
  );
};

