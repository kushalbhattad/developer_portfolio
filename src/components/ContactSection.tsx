import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Calculator
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const {
    addInquiry,
    agencySettings,
    selectedEstimateService,
    setSelectedEstimateService,
    addToast
  } = useApp();

  const sym = agencySettings.currencySymbol || '₹';

  const [serviceType, setServiceType] = useState<string>('Android App Development');
  const [budgetRange, setBudgetRange] = useState<string>(`${sym}25,000 - ${sym}50,000`);
  const [timeline, setTimeline] = useState<string>('2 - 3 Weeks');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If coming from "Request This Service" button, pre-fill serviceType!
  useEffect(() => {
    if (selectedEstimateService) {
      setServiceType(selectedEstimateService);
    }
  }, [selectedEstimateService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out your Name, Email, and Project Description.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addInquiry({
        name,
        email,
        phone,
        serviceType,
        budgetRange,
        timeline,
        message
      });

      addToast(`Quote request sent! Copy sent to ${agencySettings.contactEmail}`, 'success');

      // Prepare mailto link to open user's default email client as direct delivery option
      const subject = encodeURIComponent(`New Quote Request: ${serviceType} from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService Package: ${serviceType}\nBudget Range: ${budgetRange}\nTimeline: ${timeline}\n\nProject Overview:\n${message}`
      );
      window.open(`mailto:${agencySettings.contactEmail}?subject=${subject}&body=${body}`, '_blank');

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitting(false);
      setSelectedEstimateService(null);
    }, 600);
  };

  return (
    <motion.section
      id="contact"
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
            <Sparkles className="w-3.5 h-3.5 text-[#2e5441]" />
            <span>Start Your Next Project</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
            {agencySettings.contactTitle || 'Estimate Your Project & Contact Us'}
          </h2>
          <p className="text-[#555555] text-base leading-relaxed">
            {agencySettings.contactSubtitle || 'Fill out the project scope estimator below or send us an email. We typically respond with a detailed project proposal within 24 hours.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Perks */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 rounded-3xl bg-white border border-[#111111]/10 space-y-6 shadow-sm">
              <h3 className="text-xl font-black text-[#111111] border-b border-[#111111]/10 pb-4">
                Get In Touch Directly
              </h3>

              <div className="space-y-4 text-sm text-[#333333]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dbe7de] border border-[#2e5441]/20 flex items-center justify-center shrink-0 text-[#2e5441]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#666666] block font-mono font-bold uppercase">Email Us</span>
                    <a href={`mailto:${agencySettings.contactEmail}`} className="font-bold text-[#111111] hover:text-[#ff5436] underline">
                      {agencySettings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dbe7de] border border-[#2e5441]/20 flex items-center justify-center shrink-0 text-[#2e5441]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#666666] block font-mono font-bold uppercase">Call / WhatsApp</span>
                    <a href={`tel:${agencySettings.contactPhone}`} className="font-bold text-[#111111] hover:text-[#ff5436]">
                      {agencySettings.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dbe7de] border border-[#2e5441]/20 flex items-center justify-center shrink-0 text-[#2e5441]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#666666] block font-mono font-bold uppercase">Headquarters</span>
                    <span className="font-bold text-[#111111]">
                      {agencySettings.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Action */}
              <div className="pt-4 border-t border-[#111111]/10">
                <a
                  href={`https://wa.me/${agencySettings.whatsappNumber}?text=Hi%20${encodeURIComponent(agencySettings.agencyName)},%20I%20want%20to%20get%20my%20business%20online%20in%2015%20days!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#2e5441] hover:bg-[#1f3a2d] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Chat Immediately on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Why Choose Studio Box */}
            <div className="p-8 rounded-3xl bg-[#dbe7de] border border-[#2e5441]/20 space-y-4">
              <h4 className="text-base font-black text-[#111111] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2e5441]" />
                15-Day Studio
              </h4>
              <ul className="space-y-2.5 text-xs text-[#222222] font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff5436]"></span>
                  15-Day Go-Live Target
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff5436]"></span>
                  Only 25% Advance — Balance Upon Final Go-Live
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff5436]"></span>
                  6 Months Free Tech Support Warranty
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff5436]"></span>
                  Free Domain Registration & SSL Certificate Included
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Estimator & Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-white border border-[#111111]/10 space-y-8 shadow-sm">
              
              <div className="border-b border-[#111111]/10 pb-4">
                <h3 className="text-2xl font-black text-[#111111] flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[#ff5436]" />
                  Project Estimator & Proposal Form
                </h3>
                <p className="text-xs text-[#666666] mt-1 font-medium">
                  Select your project parameters to receive an instant scope quote.
                </p>
              </div>

              {/* Step 1: Service Type Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono block">
                  1. Select Service Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '15-Day Business Website',
                    'Android App Development',
                    'Full Stack Web Platform',
                    'E-Commerce Store & Admin'
                  ].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setServiceType(s)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                        serviceType === s
                          ? 'bg-[#ff5436] text-white border-[#ff5436] shadow-sm'
                          : 'bg-[#f6f4ee] text-[#333333] border-[#111111]/10 hover:border-[#111111]/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Budget Range */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono block">
                  2. Estimated Budget Range ({sym})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    `<${sym}25,000`,
                    `${sym}25,000 - ${sym}50,000`,
                    `${sym}50,000 - ${sym}1,00,000`,
                    `${sym}1,00,000+`
                  ].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudgetRange(b)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold font-mono transition-all ${
                        budgetRange === b
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-[#f6f4ee] text-[#444444] border-[#111111]/10 hover:border-[#111111]/30'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="space-y-4 pt-2">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono block">
                  3. Your Contact Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#666666] font-bold block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-[#f6f4ee] border border-[#111111]/10 text-[#111111] text-xs font-medium focus:outline-none focus:border-[#ff5436]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#666666] font-bold block mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. rahul@company.in"
                      className="w-full px-4 py-3 rounded-xl bg-[#f6f4ee] border border-[#111111]/10 text-[#111111] text-xs font-medium focus:outline-none focus:border-[#ff5436]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#666666] font-bold block mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#f6f4ee] border border-[#111111]/10 text-[#111111] text-xs font-medium focus:outline-none focus:border-[#ff5436]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#666666] font-bold block mb-1">Project Details & Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your app or website goals, features needed, target launch date, or reference links..."
                    className="w-full px-4 py-3 rounded-xl bg-[#f6f4ee] border border-[#111111]/10 text-[#111111] text-xs font-medium focus:outline-none focus:border-[#ff5436]"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Formal Proposal</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </motion.section>
  );
};
