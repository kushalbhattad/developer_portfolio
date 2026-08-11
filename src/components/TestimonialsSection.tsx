import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Testimonial } from '../types';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Plus,
  Building2
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const {
    testimonials,
    agencySettings,
    isAdmin,
    setAdminSubTab,
    setActiveTab,
    caseStudies,
    setSelectedCaseStudy
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex % testimonials.length];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <motion.section
      id="testimonials"
      className="py-20 bg-[#f6f4ee] relative border-t border-[#111111]/10 text-[#111111]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dbe7de] border border-[#2e5441]/20 text-[#2e5441] text-xs font-extrabold uppercase font-mono tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Verified Client Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              {agencySettings.testimonialsTitle || 'What Our Clients Say About Us'}
            </h2>
            <p className="text-[#555555] text-sm sm:text-base mt-2 max-w-2xl">
              {agencySettings.testimonialsSubtitle || 'Real feedback from CTOs, product managers, and founders who trusted our studio with their digital web platforms and mobile applications.'}
            </p>
          </div>

          {/* Admin Add Button */}
          {isAdmin && (
            <button
              onClick={() => {
                setAdminSubTab('testimonials');
                setActiveTab('admin');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          )}
        </div>

        {/* Featured Testimonial Spotlight Card */}
        <div className="relative rounded-3xl bg-white border border-[#111111]/10 p-8 sm:p-12 shadow-sm mb-12">
          
          <Quote className="absolute top-6 right-8 w-20 h-20 text-[#ff5436]/10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Client Avatar & Details */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#ff5436] p-1 bg-[#f6f4ee] shadow-md">
                <img
                  src={currentTestimonial.avatarUrl}
                  alt={currentTestimonial.clientName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#111111]">{currentTestimonial.clientName}</h3>
                <p className="text-xs text-[#2e5441] font-bold uppercase tracking-wider">{currentTestimonial.clientRole}</p>
                <p className="text-xs text-[#666666] flex items-center gap-1 justify-center lg:justify-start mt-0.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-[#2e5441]" />
                  {currentTestimonial.company}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-lg sm:text-xl text-[#222222] leading-relaxed font-serif italic">
                "{currentTestimonial.content}"
              </p>

              {/* Related Case Study Link if available */}
              {currentTestimonial.projectId && (
                <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#666666] font-mono">Project Delivered:</span>
                  <button
                    onClick={() => {
                      const found = caseStudies.find(c => c.id === currentTestimonial.projectId);
                      if (found) setSelectedCaseStudy(found);
                    }}
                    className="text-xs text-[#ff5436] hover:text-[#e24226] font-bold uppercase tracking-wider underline"
                  >
                    {currentTestimonial.projectName || 'View Related Case Study'}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#111111]/10">
            <span className="text-xs text-[#666666] font-mono font-bold">
              Testimonial {currentIndex + 1} of {testimonials.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-[#f6f4ee] border border-[#111111]/10 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                title="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-[#f6f4ee] border border-[#111111]/10 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                title="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Small Grid Overview of All Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t: Testimonial, idx) => (
            <div
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-[#ff5436] shadow-md bg-white'
                  : 'bg-white/60 border-[#111111]/10 hover:border-[#111111]/30 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-[#111111]/10"
                />
                <div>
                  <h4 className="text-sm font-black text-[#111111] line-clamp-1">{t.clientName}</h4>
                  <p className="text-[11px] text-[#2e5441] font-semibold">{t.company}</p>
                </div>
              </div>
              <p className="text-xs text-[#555555] line-clamp-3 leading-relaxed font-serif italic">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};
