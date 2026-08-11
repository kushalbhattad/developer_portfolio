import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Backlink } from '../types';
import {
  Link2,
  ExternalLink,
  ShieldCheck,
  Globe,
  Search,
  Plus,
  BarChart3,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const BacklinksSection: React.FC = () => {
  const { backlinks, isAdmin, setAdminSubTab, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Developer Network', 'SEO Partner', 'Tech Directory', 'Press & Media', 'Client Site'];

  const filteredBacklinks = backlinks.filter(bl => {
    const matchesCategory = selectedCategory === 'All' || bl.category === selectedCategory;
    const matchesSearch =
      bl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bl.anchorText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bl.targetUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bl.description && bl.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const avgDA = backlinks.length > 0
    ? Math.round(backlinks.reduce((acc, b) => acc + b.domainAuthority, 0) / backlinks.length)
    : 90;

  return (
    <motion.section
      id="backlinks"
      className="py-20 bg-[#f6f4ee] relative border-t border-[#111111]/10 text-[#111111]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dbe7de] border border-[#2e5441]/20 text-[#2e5441] text-xs font-extrabold uppercase font-mono tracking-wider mb-3">
              <Link2 className="w-3.5 h-3.5 text-[#2e5441]" />
              <span>SEO Backlinks & Partner Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              Authoritative Backlinks & Index
            </h2>
            <p className="text-[#555555] text-sm sm:text-base mt-2 max-w-2xl">
              High Domain Authority (DA 85+) partner links, client accreditations, and developer network references engineered for Search Engine & AI Optimization (GEO).
            </p>
          </div>

          {/* Admin Add Backlink CTA */}
          {isAdmin && (
            <button
              onClick={() => {
                setAdminSubTab('backlinks');
                setActiveTab('admin');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Manage Backlinks</span>
            </button>
          )}
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-[#111111]/10 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#dbe7de] border border-[#2e5441]/20 flex items-center justify-center text-[#2e5441] font-bold">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#666666] uppercase">Active Backlinks</span>
              <p className="text-2xl font-black text-[#111111] font-mono">{backlinks.length} Links</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#111111]/10 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#ff5436]/10 border border-[#ff5436]/20 flex items-center justify-center text-[#ff5436] font-bold">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#666666] uppercase">Avg Domain Authority</span>
              <p className="text-2xl font-black text-[#ff5436] font-mono">DA {avgDA}+</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#111111]/10 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#dbe7de] border border-[#2e5441]/20 flex items-center justify-center text-[#2e5441] font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#666666] uppercase">Index Verification</span>
              <p className="text-2xl font-black text-[#2e5441] font-mono">100% Passed</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#111111] text-white shadow-md'
                    : 'bg-white text-[#444444] border border-[#111111]/10 hover:border-[#111111]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search backlinks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#111111]/10 text-xs font-medium focus:outline-none focus:border-[#ff5436]"
            />
          </div>

        </div>

        {/* Backlinks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBacklinks.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-[#111111]/10 text-[#666666]">
              <Globe className="w-10 h-10 mx-auto text-[#2e5441] mb-2 opacity-50" />
              <p className="text-sm font-bold">No backlinks found matching your search criteria.</p>
            </div>
          ) : (
            filteredBacklinks.map(bl => (
              <div
                key={bl.id}
                className="p-6 rounded-3xl bg-white border border-[#111111]/10 hover:border-[#ff5436]/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#dbe7de] text-[#2e5441] text-[10px] font-mono font-extrabold uppercase">
                      {bl.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#ff5436]/10 text-[#ff5436] text-[10px] font-mono font-bold">
                      DA {bl.domainAuthority}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#111111] leading-snug">
                    {bl.title}
                  </h3>

                  {bl.description && (
                    <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                      {bl.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-[#111111]/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] text-[#666666] font-mono">
                    <span className="flex items-center gap-1 text-[#2e5441] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {bl.status}
                    </span>
                    <span>Added {bl.addedDate}</span>
                  </div>

                  <a
                    href={bl.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#f6f4ee] hover:bg-[#111111] hover:text-white border border-[#111111]/10 text-[#111111] font-mono font-bold text-xs flex items-center justify-between transition-colors group"
                  >
                    <span className="truncate pr-2">{bl.anchorText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#ff5436] shrink-0 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </motion.section>
  );
};
