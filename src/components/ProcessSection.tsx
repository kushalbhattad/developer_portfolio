import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Figma,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { setActiveTab, agencySettings } = useApp();

  const steps = [
    {
      number: "Day 1-3",
      title: "Discovery & 25% Advance Setup",
      icon: <Compass className="w-6 h-6 text-[#2e5441]" />,
      description: "We align on your brand requirements, select your free custom domain name, set up high-speed hosting & SSL security, and confirm the 25% advance payment.",
      deliverables: ["Domain Registration & SSL Config", "Project Milestone Scope", "High-Speed Hosting Provisioning"]
    },
    {
      number: "Day 4-7",
      title: "Custom & Mobile-Ready UI/UX",
      icon: <Figma className="w-6 h-6 text-[#2e5441]" />,
      description: "We design flawless visual layouts optimized for smartphones, tablets, and desktops, ensuring high contrast, clean typography, and responsive touch targets.",
      deliverables: ["Mobile & Desktop Wireframes", "Brand Color Scheme & Typography", "Responsive Layout Specs"]
    },
    {
      number: "Day 8-11",
      title: "Fast Development, SEO & Admin Setup",
      icon: <Code2 className="w-6 h-6 text-[#2e5441]" />,
      description: "We code your website using React & Tailwind CSS, integrate Google ranking basic SEO tags, social share cards, and set up your easy Admin Dashboard with PDF/Excel exports.",
      deliverables: ["Full React Website Code", "Basic Google SEO Setup", "PDF & Excel Admin Portal"]
    },
    {
      number: "Day 12-13",
      title: "Free Security Scan & Performance Audit",
      icon: <ShieldCheck className="w-6 h-6 text-[#2e5441]" />,
      description: "We run our comprehensive automated security scan to eliminate vulnerabilities, verify SSL certificates, and optimize PageSpeed scores.",
      deliverables: ["Security Flaw Scan Report", "Lighthouse 95+ Speed Score", "Cross-Device Browser Test"]
    },
    {
      number: "Day 14-15",
      title: "Client Review, Go Live & 1 Year Support",
      icon: <Rocket className="w-6 h-6 text-[#ff5436]" />,
      description: "You review the completed live preview. Once 100% satisfied, your site goes official, you pay the remaining 75% balance, and your 1 year free tech support begins!",
      deliverables: ["100% Live Website Launch", "Admin Dashboard Walkthrough", "1 Year Free Tech Support Warranty"]
    }
  ];

  return (
    <motion.section
      id="process"
      className="py-20 bg-[#f6f4ee] relative border-t border-[#111111]/10 text-[#111111]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dbe7de] border border-[#2e5441]/20 text-[#2e5441] text-xs font-extrabold uppercase font-mono tracking-wider">
            <Rocket className="w-3.5 h-3.5 text-[#2e5441]" />
            <span>Guaranteed Fast Turnaround</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
            {agencySettings.processTitle || 'Our 15-Day Go-Live Methodology'}
          </h2>
          <p className="text-[#555555] text-base leading-relaxed">
            {agencySettings.processSubtitle || 'A transparent, 5-phase process engineered to get your business online in 15 days or less — with only 25% advance and zero hidden costs.'}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-8 relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#2e5441] via-[#ff5436] to-[#2e5441] hidden sm:block opacity-30"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl bg-white border border-[#111111]/10 p-6 sm:p-8 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 group hover:border-[#ff5436]/40 shadow-sm hover:shadow-md"
            >
              {/* Step Number Circle */}
              <div className="w-12 h-12 rounded-2xl bg-[#dbe7de] border border-[#2e5441]/20 flex items-center justify-center shrink-0 z-10 shadow-sm">
                <span className="font-mono font-bold text-xs text-[#2e5441]">{step.number}</span>
              </div>

              {/* Step Body */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-black text-[#111111] group-hover:text-[#ff5436] transition-colors flex items-center gap-2">
                    {step.title}
                  </h3>
                  <div className="p-2 rounded-xl bg-[#f6f4ee] border border-[#111111]/10">
                    {step.icon}
                  </div>
                </div>

                <p className="text-sm text-[#555555] leading-relaxed">
                  {step.description}
                </p>

                {/* Deliverables List */}
                <div className="pt-3 border-t border-[#111111]/10">
                  <span className="text-[11px] font-mono text-[#666666] uppercase font-bold block mb-2">Key Deliverables:</span>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-lg bg-[#f6f4ee] border border-[#111111]/10 text-[#333333] text-xs font-mono font-semibold flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#2e5441]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else setActiveTab('contact');
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
          >
            <span>Start Step 1: Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </motion.section>
  );
};
