import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Smartphone,
  Globe,
  Layout,
  Code2,
  Layers,
  Check,
  ArrowRight,
  Clock,
  Edit3,
  Sparkles,
  Zap
} from 'lucide-react';
import { Service } from '../types';

export const ServicesSection: React.FC = () => {
  const {
    services,
    agencySettings,
    setActiveTab,
    setSelectedEstimateService,
    isAdmin,
    setAdminSubTab
  } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#2e5441]" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#2e5441]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#2e5441]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#2e5441]" />;
      default:
        return <Globe className="w-6 h-6 text-[#2e5441]" />;
    }
  };

  const handleSelectService = (title: string) => {
    setSelectedEstimateService(title);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else setActiveTab('contact');
  };

  return (
    <motion.section
      id="services"
      className="py-20 bg-[#f6f4ee] relative border-t border-[#111111]/10 text-[#111111]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dbe7de] border border-[#2e5441]/20 text-[#2e5441] text-xs font-extrabold uppercase font-mono tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#2e5441]" />
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
            {agencySettings.servicesTitle || 'Tailored Development & Design Services'}
          </h2>
          <p className="text-[#555555] text-base leading-relaxed">
            {agencySettings.servicesSubtitle || 'From native Android applications published on Google Play to high-performance React web platforms, we engineer every pixel and API route for seamless execution.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service: Service) => (
            <div
              key={service.id}
              className={`relative rounded-3xl bg-white border transition-all duration-300 p-8 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl ${
                service.popular
                  ? 'border-[#ff5436] shadow-md ring-1 ring-[#ff5436]/20'
                  : 'border-[#111111]/10 hover:border-[#111111]/30 shadow-sm'
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-[#ff5436] text-white font-bold text-[11px] shadow-md flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-200" />
                  Most Popular Package
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#dbe7de] border border-[#2e5441]/10 flex items-center justify-center p-2.5 shadow-sm">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#f6f4ee] border border-[#111111]/10 text-[#444444] text-xs font-mono font-semibold">
                    {service.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-black text-[#111111] mb-3 group-hover:text-[#ff5436] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Pricing & Timeline Row */}
                <div className="flex items-center gap-6 py-4 px-5 rounded-2xl bg-[#f6f4ee] border border-[#111111]/10 mb-6">
                  <div>
                    <span className="text-[11px] text-[#666666] block uppercase font-mono font-bold">Starting At</span>
                    <span className="text-xl font-black text-[#ff5436] font-mono">{service.startingPrice}</span>
                  </div>
                  <div className="h-8 w-px bg-[#111111]/10"></div>
                  <div>
                    <span className="text-[11px] text-[#666666] block uppercase font-mono font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#2e5441]" /> Timeline
                    </span>
                    <span className="text-sm font-bold text-[#111111]">{service.deliveryTime}</span>
                  </div>
                </div>

                {/* Feature Check List */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">Deliverables Included:</p>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#333333] font-medium">
                        <div className="w-4 h-4 rounded-full bg-[#dbe7de] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#2e5441]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleSelectService(service.title)}
                  className="w-full py-3.5 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setAdminSubTab('services');
                      setActiveTab('admin');
                    }}
                    className="px-3.5 py-3.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white transition-colors"
                    title="Edit Service in Admin"
                  >
                    <Edit3 className="w-4 h-4 text-[#ff5436]" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#111111] text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">Have a unique or custom requirement?</h3>
            <p className="text-slate-300 text-sm mt-1">We offer custom hybrid contracts, dedicated developer hours, and full app maintenance packages.</p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else setActiveTab('contact');
            }}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Talk to an Architect
          </button>
        </div>

      </div>
    </motion.section>
  );
};
