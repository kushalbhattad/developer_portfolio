import React from 'react';
import { Laptop, Smartphone, Terminal, Code2, Sparkles, Cpu } from 'lucide-react';

interface NerdProgrammerAvatarProps {
  customImageUrl?: string;
  imageFit?: 'cover' | 'contain';
}

export const NerdProgrammerAvatar: React.FC<NerdProgrammerAvatarProps> = ({ customImageUrl, imageFit = 'cover' }) => {
  const imageUrl = customImageUrl || "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden group select-none">
      
      {/* Background Code Matrix Glow Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2e5441]/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Floating Animated Badges */}
      <div className="absolute top-4 left-3 bg-[#111111] text-[#dbe7de] text-[10px] font-mono px-2.5 py-1 rounded-lg border border-[#2e5441]/40 flex items-center gap-1.5 shadow-md animate-bounce z-10">
        <Terminal className="w-3 h-3 text-[#ff5436]" />
        <span>dev@nakshatra:~$</span>
      </div>

      <div className="absolute top-12 right-3 bg-white text-[#2e5441] text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-[#111111]/10 flex items-center gap-1.5 shadow-md z-10">
        <Cpu className="w-3 h-3 text-[#ff5436]" />
        <span>React + Kotlin</span>
      </div>

      {/* Main Vector / Custom Hero Image Artwork */}
      <div className="relative w-full h-[92%] flex items-end justify-center">
        <img
          src={imageUrl}
          alt="Hero Highlight Studio Artwork"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className={`w-full h-full ${imageFit === 'contain' ? 'object-contain object-center bg-slate-900/40 p-1' : 'object-cover object-top'} rounded-t-[140px] filter brightness-[1.03] contrast-[1.05] transition-transform duration-500 group-hover:scale-105`}
        />

        {/* Overlay Overlay Graphic depicting Laptop & Mobile Glow */}
        <div className="absolute bottom-2 inset-x-3 p-3 rounded-2xl bg-[#111111]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-between gap-2 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#ff5436] text-white">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-black font-mono leading-none">Web Platform</p>
              <p className="text-[9px] text-[#dbe7de] font-mono">15-Day Go Live</p>
            </div>
          </div>

          <div className="h-6 w-px bg-white/20"></div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#2e5441] text-white">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-black font-mono leading-none">Android Native</p>
              <p className="text-[9px] text-[#dbe7de] font-mono">Play Store App</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
