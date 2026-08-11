import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Share2,
  Copy,
  Check,
  X,
  Send,
  MessageCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ isOpen, onClose }) => {
  const { agencySettings, addToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nakshatradigitalsolutions.com/';
  const shareTitle = `${agencySettings.agencyName} — Get Your Business Online in 15 Days`;
  const shareText = `Check out ${agencySettings.agencyName}! High-converting websites & Android apps delivered in 15 days with zero hassle & 6 months free tech support.`;

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(shareText);
  const encodedTitle = encodeURIComponent(shareTitle);

  const shareLinks = [
    {
      name: 'WhatsApp',
      iconColor: 'bg-[#25D366] text-white',
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      description: 'Share directly on WhatsApp chat or status'
    },
    {
      name: 'LinkedIn',
      iconColor: 'bg-[#0A66C2] text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      description: 'Post to your professional LinkedIn network'
    },
    {
      name: 'X (Twitter)',
      iconColor: 'bg-black text-white',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      description: 'Tweet to your followers on X'
    },
    {
      name: 'Facebook',
      iconColor: 'bg-[#1877F2] text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      description: 'Share on Facebook feed or groups'
    },
    {
      name: 'Telegram',
      iconColor: 'bg-[#229ED9] text-white',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      description: 'Send to Telegram chats & channels'
    },
    {
      name: 'Email',
      iconColor: 'bg-emerald-600 text-white',
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`,
      description: 'Send link via personal email client'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    addToast('Website link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl
        });
        addToast('Shared successfully!', 'success');
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-md bg-[#111111] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Modal Header */}
          <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#ff5436]/20 border border-[#ff5436]/30 flex items-center justify-center text-[#ff5436]">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Share Our Website</h3>
                <p className="text-[11px] font-mono text-slate-400">Increase reach & inspire business partners</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Copy Link Bar */}
          <div className="p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Direct Website Link:
              </label>
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`px-3 py-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all shrink-0 flex items-center gap-1.5 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#ff5436] hover:bg-[#e24226] text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Native Share Trigger if supported */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Use Device Native Share Menu</span>
              </button>
            )}

            {/* Social Channels List */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Share via Social Media:
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {shareLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center gap-3 transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-xl ${link.iconColor} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm`}>
                      {link.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-[#ff5436] transition-colors truncate">
                        {link.name}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400 truncate">Post &amp; Share</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="p-4 bg-slate-950 border-t border-slate-900 text-center text-[10px] text-slate-500 font-mono">
            {agencySettings.agencyName} — Turnkey 15-Day Web Platforms &amp; Mobile Apps
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
