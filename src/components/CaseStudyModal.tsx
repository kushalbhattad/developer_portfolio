import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ExternalLink,
  Smartphone,
  CheckCircle2,
  Calendar,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

export const CaseStudyModal: React.FC = () => {
  const { selectedCaseStudy, setSelectedCaseStudy, setActiveTab, setSelectedEstimateService } = useApp();

  if (!selectedCaseStudy) return null;

  const cs = selectedCaseStudy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#f6f4ee] border border-[#111111]/15 rounded-3xl shadow-2xl overflow-y-auto my-8 text-[#111111]">
        
        {/* Modal Close Button */}
        <button
          onClick={() => setSelectedCaseStudy(null)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-[#111111] text-white hover:bg-[#ff5436] transition-colors shadow-md"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Header */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#111111] border-b border-[#111111]/10 overflow-hidden">
          <img
            src={cs.heroImageUrl || cs.thumbnailUrl}
            alt={cs.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent p-6 sm:p-8 flex flex-col justify-end">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#ff5436] text-white text-xs font-mono font-bold uppercase tracking-wider">
                {cs.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 text-[#111111] text-xs font-mono font-bold">
                Client: {cs.client}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {cs.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-[#111111]/10 shadow-sm">
            <div>
              <span className="text-[11px] text-[#666666] block uppercase font-mono font-bold">Completion</span>
              <span className="text-sm font-bold text-[#111111] flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#2e5441]" /> {cs.completionDate}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#666666] block uppercase font-mono font-bold">Duration</span>
              <span className="text-sm font-bold text-[#111111] flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#2e5441]" /> {cs.duration}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#666666] block uppercase font-mono font-bold">Client Rating</span>
              <div className="flex items-center text-amber-500 gap-1 mt-0.5">
                {[...Array(cs.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
            </div>
            <div>
              <span className="text-[11px] text-[#666666] block uppercase font-mono font-bold">Deployment</span>
              <span className="text-xs font-bold text-[#2e5441] mt-0.5 block truncate">
                {cs.appStoreUrl ? 'Google Play Store' : cs.liveUrl ? 'Live Web Site' : 'Production'}
              </span>
            </div>
          </div>

          {/* Short Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">Executive Summary</h3>
            <p className="text-base text-[#333333] leading-relaxed font-normal">
              {cs.shortSummary}
            </p>
          </div>

          {/* Challenge vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-rose-500/30 space-y-2 shadow-sm">
              <h4 className="text-sm font-black text-rose-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                The Business Challenge
              </h4>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                {cs.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#dbe7de] border border-[#2e5441]/20 space-y-2 shadow-sm">
              <h4 className="text-sm font-black text-[#2e5441] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2e5441]"></span>
                The Engineering Solution
              </h4>
              <p className="text-xs sm:text-sm text-[#222222] leading-relaxed font-medium">
                {cs.solution}
              </p>
            </div>
          </div>

          {/* Measured Key Results & Metrics */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">Key Measured Impact & Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cs.results.map((result, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#111111]/10 flex items-start gap-3 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-[#dbe7de] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2e5441]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#222222] font-semibold">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">Technologies & Frameworks Utilized</h3>
            <div className="flex flex-wrap gap-2">
              {cs.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#111111]/10 text-[#222222] text-xs font-mono font-bold shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Client Testimonial Snippet if present */}
          {cs.testimonialSnippet && (
            <div className="p-5 rounded-2xl bg-white border-l-4 border-l-[#ff5436] border border-[#111111]/10 shadow-sm">
              <p className="text-xs font-bold text-[#ff5436] uppercase tracking-wider font-mono mb-2">Client Review</p>
              <blockquote className="text-sm italic text-[#333333] font-serif">
                "{cs.testimonialSnippet}"
              </blockquote>
              <p className="text-xs text-[#666666] font-bold mt-2">— {cs.client}</p>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-6 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {cs.appStoreUrl && (
                <a
                  href={cs.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#2e5441] hover:bg-[#1f3a2d] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>View on Google Play Store</span>
                </a>
              )}

              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#111111]/15 text-[#111111] hover:bg-[#111111] hover:text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#ff5436]" />
                  <span>Open Live Website</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedEstimateService(cs.category === 'Android App' ? 'Android App Development' : 'Full Stack Web Platform');
                setSelectedCaseStudy(null);
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('contact');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            >
              <span>Build A Platform Like This</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
