import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  ProjectCategory,
  CaseStudy
} from '../types';
import {
  Search,
  CheckCircle2,
  Edit3,
  Trash2,
  Plus,
  ArrowRight,
  Eye,
  Award
} from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';
import { AdminModalForm } from './admin/AdminModalForm';

export const PortfolioSection: React.FC = () => {
  const {
    caseStudies,
    setSelectedCaseStudy,
    isAdmin,
    deleteCaseStudy,
    updateCaseStudy
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);

  const categories: ProjectCategory[] = ['All', 'Android App', 'Web Development', 'Web Design', 'Full Stack'];

  // Handle category change with smooth skeleton loading state
  const handleCategoryChange = (cat: ProjectCategory) => {
    setSelectedCategory(cat);
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 350);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 300);
  };

  // Filter case studies
  const filteredCaseStudies = caseStudies.filter(cs => {
    // Non-admin users only see enabled projects
    if (!isAdmin && cs.enabled === false) return false;

    const matchesCategory = selectedCategory === 'All' || cs.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section
      id="portfolio"
      className="py-20 bg-[#f6f4ee] relative border-t border-[#111111]/10 text-[#111111]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dbe7de] border border-[#2e5441]/20 text-[#2e5441] text-xs font-extrabold uppercase font-mono tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-[#2e5441]" />
              <span>Our Projects & Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              Our Showcase Projects
            </h2>
            <p className="text-[#555555] text-sm sm:text-base mt-2 max-w-2xl">
              Explore custom web platforms, mobile apps, and digital experiences delivered for our clients. Admin can add new projects to showcase anytime.
            </p>
          </div>

          {/* Admin Add Button if active */}
          {isAdmin && (
            <button
              onClick={() => {
                setEditingCaseStudy(null);
                setAddProjectModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project to Showcase</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-[#111111]/10 mb-10 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#ff5436] text-white shadow-sm'
                    : 'text-[#444444] hover:text-[#111111] hover:bg-[#f6f4ee]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search by keyword, tech, or client..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#f6f4ee] border border-[#111111]/10 text-[#111111] text-xs placeholder:text-[#888888] focus:outline-none focus:border-[#ff5436] transition-colors font-medium"
            />
          </div>

        </div>

        {/* Case Studies Grid */}
        {isFiltering ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(skeletonKey => (
              <div
                key={skeletonKey}
                className="rounded-3xl bg-white border border-[#111111]/10 overflow-hidden flex flex-col justify-between animate-pulse"
              >
                <div className="aspect-[16/10] bg-[#e2dfd5] relative flex items-center justify-center">
                  <div className="w-24 h-5 rounded bg-white/60 absolute top-3 left-3"></div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="w-20 h-3 bg-[#e2dfd5] rounded"></div>
                    <div className="w-3/4 h-5 bg-[#dbe7de] rounded"></div>
                    <div className="w-full h-3 bg-[#e2dfd5] rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCaseStudies.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white border border-[#111111]/10 space-y-3">
            <p className="text-[#666666] text-base font-medium">No case studies match your current filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-[#ff5436] hover:text-[#e24226] font-bold text-xs uppercase tracking-wider underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((cs: CaseStudy) => (
              <div
                key={cs.id}
                className="group relative rounded-3xl bg-white border border-[#111111]/10 hover:border-[#ff5436]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 shadow-sm hover:shadow-xl"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] bg-[#111111] overflow-hidden">
                  {!loadedImages[cs.id] && (
                    <div className="absolute inset-0 bg-[#e2dfd5] animate-pulse flex items-center justify-center">
                      <span className="text-xs text-[#666666] font-mono">Loading Preview...</span>
                    </div>
                  )}

                  <img
                    src={cs.thumbnailUrl}
                    alt={cs.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [cs.id]: true }))}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
                      loadedImages[cs.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 text-[#111111] text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
                      {cs.category}
                    </span>

                    <div className="flex items-center gap-1">
                      {cs.enabled === false && (
                        <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
                          Disabled
                        </span>
                      )}
                      {cs.featured && (
                        <span className="px-2.5 py-1 rounded-lg bg-[#ff5436] text-white text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick View Button on Image */}
                  <button
                    onClick={() => setSelectedCaseStudy(cs)}
                    className="absolute inset-0 flex items-center justify-center bg-[#111111]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <span className="px-4 py-2 rounded-xl bg-[#ff5436] text-white font-bold text-xs flex items-center gap-1.5 shadow-xl uppercase tracking-wider">
                      <Eye className="w-4 h-4" /> View Full Details
                    </span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-mono font-bold text-[#2e5441] uppercase tracking-wider mb-1">{cs.client}</p>
                    <h3
                      onClick={() => setSelectedCaseStudy(cs)}
                      className="text-xl font-black text-[#111111] group-hover:text-[#ff5436] transition-colors cursor-pointer line-clamp-1"
                    >
                      {cs.title}
                    </h3>
                    <p className="text-xs text-[#555555] leading-relaxed mt-2 line-clamp-2">
                      {cs.shortSummary}
                    </p>
                  </div>

                  {/* Key Metrics Snippet */}
                  {cs.results.length > 0 && (
                    <div className="pt-2 border-t border-[#111111]/10">
                      <div className="flex items-center gap-1.5 text-xs text-[#222222] font-semibold line-clamp-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2e5441] shrink-0" />
                        <span>{cs.results[0]}</span>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cs.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-[#f6f4ee] text-[#444444] text-[10px] font-mono font-semibold border border-[#111111]/10">
                        {tech}
                      </span>
                    ))}
                    {cs.techStack.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-[#f6f4ee] text-[#666666] text-[10px] font-mono">
                        +{cs.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCaseStudy(cs)}
                      className="text-xs text-[#ff5436] hover:text-[#e24226] font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateCaseStudy(cs.id, { enabled: cs.enabled === false ? true : false })}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                            cs.enabled !== false
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          }`}
                          title={cs.enabled !== false ? 'Click to Disable / Hide' : 'Click to Enable / Show'}
                        >
                          {cs.enabled !== false ? 'Visible' : 'Hidden'}
                        </button>

                        <button
                          onClick={() => {
                            setEditingCaseStudy(cs);
                            setAddProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#f6f4ee] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCaseStudy(cs.id)}
                          className="p-1.5 rounded-lg bg-[#f6f4ee] text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* Selected Modal */}
        <CaseStudyModal />

        {/* Admin Direct Add / Edit Modal */}
        {(addProjectModalOpen || editingCaseStudy) && (
          <AdminModalForm
            type="caseStudy"
            itemToEdit={editingCaseStudy}
            onClose={() => {
              setAddProjectModalOpen(false);
              setEditingCaseStudy(null);
            }}
          />
        )}

      </div>
    </motion.section>
  );
};
