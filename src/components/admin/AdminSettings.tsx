import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Save,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  Check,
  Building2,
  Lock
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { agencySettings, updateAgencySettings, resetAllData, addToast } = useApp();

  const [name, setName] = useState(agencySettings.agencyName);
  const [tagline, setTagline] = useState(agencySettings.tagline);
  const [description, setDescription] = useState(agencySettings.description);
  const [currencySymbol, setCurrencySymbol] = useState(agencySettings.currencySymbol || '₹');
  const [email, setEmail] = useState(agencySettings.contactEmail);
  const [phone, setPhone] = useState(agencySettings.contactPhone);
  const [whatsapp, setWhatsapp] = useState(agencySettings.whatsappNumber || '917020323182');
  const [address, setAddress] = useState(agencySettings.address);
  const [projectsCount, setProjectsCount] = useState(agencySettings.completedProjects);
  const [androidAppsCount, setAndroidAppsCount] = useState(agencySettings.androidAppsPublished);
  const [happyClients, setHappyClients] = useState(agencySettings.happyClients);
  const [pin, setPin] = useState(agencySettings.adminPin);

  // Page Headings
  const [heroTitle, setHeroTitle] = useState(agencySettings.heroTitle || 'We Build High-Converting Web Platforms & Android Apps in 15 Days');
  const [heroSubtitle, setHeroSubtitle] = useState(agencySettings.heroSubtitle || 'Zero hassle, full mobile-ready responsive designs, basic SEO, 1 year free support, and easy PDF/Excel admin dashboards with only 25% advance.');
  const [servicesTitle, setServicesTitle] = useState(agencySettings.servicesTitle || 'Our Services & Transparent Pricing');
  const [servicesSubtitle, setServicesSubtitle] = useState(agencySettings.servicesSubtitle || 'Flat-rate, transparent packages with 15-day delivery targets, 25% advance, and 1 year free tech support warranty.');
  const [processTitle, setProcessTitle] = useState(agencySettings.processTitle || 'Our 15-Day Go-Live Methodology');
  const [processSubtitle, setProcessSubtitle] = useState(agencySettings.processSubtitle || 'A transparent, 5-phase process engineered to get your business online in 15 days or less — with only 25% advance and zero hidden costs.');
  const [testimonialsTitle, setTestimonialsTitle] = useState(agencySettings.testimonialsTitle || 'What Our Clients Say About Us');
  const [testimonialsSubtitle, setTestimonialsSubtitle] = useState(agencySettings.testimonialsSubtitle || 'Real feedback from CTOs, product managers, and founders who trusted our studio with their digital web platforms and mobile applications.');
  const [contactTitle, setContactTitle] = useState(agencySettings.contactTitle || 'Estimate Your Project & Contact Us');
  const [contactSubtitle, setContactSubtitle] = useState(agencySettings.contactSubtitle || 'Fill out the project scope estimator below or send us an email. We typically respond with a detailed project proposal within 24 hours.');

  // WhatsApp Message Template State
  const [whatsappTemplate, setWhatsappTemplate] = useState(
    agencySettings.whatsappTemplate || `Hello ${agencySettings.agencyName}! I would like to enquire about getting my business website or mobile app online in 15 days.`
  );

  // Enable / Disable Pages State
  const [enabledSections, setEnabledSections] = useState<Record<string, boolean>>(
    agencySettings.enabledSections || {
      services: true,
      portfolio: true,
      testimonials: true,
      process: true,
      backlinks: true,
      contact: true
    }
  );

  // Enable / Disable Social Media Links State
  const [enabledSocialLinks, setEnabledSocialLinks] = useState<Record<string, boolean>>(
    agencySettings.enabledSocialLinks || {
      github: true,
      linkedin: true,
      twitter: true,
      instagram: true,
      dribbble: true,
      behance: true,
      youtube: true,
      playstore: true
    }
  );

  // Social links state
  const [github, setGithub] = useState(agencySettings.socialLinks?.github || '');
  const [linkedin, setLinkedin] = useState(agencySettings.socialLinks?.linkedin || '');
  const [twitter, setTwitter] = useState(agencySettings.socialLinks?.twitter || '');
  const [instagram, setInstagram] = useState(agencySettings.socialLinks?.instagram || '');
  const [dribbble, setDribbble] = useState(agencySettings.socialLinks?.dribbble || '');
  const [behance, setBehance] = useState(agencySettings.socialLinks?.behance || '');
  const [youtube, setYoutube] = useState(agencySettings.socialLinks?.youtube || '');
  const [playstore, setPlaystore] = useState(agencySettings.socialLinks?.playstore || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAgencySettings({
      agencyName: name,
      tagline,
      description,
      currencySymbol,
      contactEmail: email,
      contactPhone: phone,
      whatsappNumber: whatsapp,
      whatsappTemplate,
      address,
      completedProjects: Number(projectsCount),
      androidAppsPublished: Number(androidAppsCount),
      happyClients: Number(happyClients),
      adminPin: pin,
      heroTitle,
      heroSubtitle,
      servicesTitle,
      servicesSubtitle,
      processTitle,
      processSubtitle,
      testimonialsTitle,
      testimonialsSubtitle,
      contactTitle,
      contactSubtitle,
      enabledSections,
      enabledSocialLinks,
      socialLinks: {
        github,
        linkedin,
        twitter,
        instagram,
        dribbble,
        behance,
        youtube,
        playstore
      }
    });
    addToast('Agency settings, social links & WhatsApp template saved!', 'success');
  };

  const handleExportBackup = () => {
    try {
      const savedData = localStorage.getItem('apex_studio_portfolio_data_v1');
      if (!savedData) return;
      const blob = new Blob([savedData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `agency_portfolio_backup_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('Backup JSON exported successfully!', 'success');
    } catch (e) {
      addToast('Failed to export backup JSON', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          <span>Agency Profile & System Settings</span>
        </h2>
        <p className="text-xs text-slate-400">
          Update agency branding, contact credentials, live portfolio metric counters, and security PIN.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-slate-800 pb-2">
          Agency Branding & Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Agency Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Tagline</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Currency Symbol (e.g. ₹ or $)</label>
            <input
              type="text"
              required
              value={currencySymbol}
              onChange={e => setCurrencySymbol(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-bold text-emerald-400"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-mono">Agency Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
          />
        </div>

        {/* Dynamic Page Headings & Subtitles Editor */}
        <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-slate-800 pb-2 pt-4 flex items-center justify-between">
          <span>Website Page Headings & Subtitle Content Editor</span>
          <span className="text-xs font-normal text-indigo-400">Admin Content Controls</span>
        </h3>

        <div className="space-y-4">
          {/* Hero Section */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono">Hero Section Copy</h4>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Hero Main Title</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={e => setHeroTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Hero Subtitle</label>
                <textarea
                  rows={2}
                  value={heroSubtitle}
                  onChange={e => setHeroSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono">Services & Pricing Section Copy</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Services Title</label>
                <input
                  type="text"
                  value={servicesTitle}
                  onChange={e => setServicesTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Services Subtitle</label>
                <input
                  type="text"
                  value={servicesSubtitle}
                  onChange={e => setServicesSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono">15-Day Methodology / Process Copy</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Process Title</label>
                <input
                  type="text"
                  value={processTitle}
                  onChange={e => setProcessTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Process Subtitle</label>
                <input
                  type="text"
                  value={processSubtitle}
                  onChange={e => setProcessSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Testimonials & Contact Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono">Testimonials Title</h4>
              <input
                type="text"
                value={testimonialsTitle}
                onChange={e => setTestimonialsTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
              />
              <input
                type="text"
                value={testimonialsSubtitle}
                onChange={e => setTestimonialsSubtitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                placeholder="Testimonials Subtitle"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono">Contact & Estimator Title</h4>
              <input
                type="text"
                value={contactTitle}
                onChange={e => setContactTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
              />
              <input
                type="text"
                value={contactSubtitle}
                onChange={e => setContactSubtitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                placeholder="Contact Subtitle"
              />
            </div>
          </div>

        </div>

        {/* Enable / Disable Website Pages & Sections */}
        <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-slate-800 pb-2 pt-4 flex items-center justify-between">
          <span>Enable / Disable Website Pages & Sections</span>
          <span className="text-xs font-normal text-emerald-400">Page Visibility Controls</span>
        </h3>

        <p className="text-xs text-slate-400">
          Toggle switch off to hide a page or section from public navigation and page layout.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { id: 'services', label: 'Services & Pricing', desc: 'Core Services & Pricing Packages' },
            { id: 'portfolio', label: 'Work / Portfolio', desc: 'Case Studies & Mobile Apps' },
            { id: 'testimonials', label: 'Testimonials', desc: 'Client Reviews & Star Ratings' },
            { id: 'process', label: '15-Day Process', desc: 'Go-Live Methodology Steps' },
            { id: 'backlinks', label: 'SEO Backlinks', desc: 'DA 90+ Backlinks Showcase' },
            { id: 'contact', label: 'Contact & Estimator', desc: 'Project Scope Calculator & Form' },
          ].map(sec => {
            const isEnabled = enabledSections[sec.id] !== false;
            return (
              <div
                key={sec.id}
                onClick={() => {
                  setEnabledSections(prev => ({ ...prev, [sec.id]: !isEnabled }));
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isEnabled
                    ? 'bg-slate-950 border-emerald-500/50 text-white shadow-sm'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono">{sec.label}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                      isEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {isEnabled ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{sec.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 ${isEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-slate-800 pb-2 pt-4 flex items-center justify-between">
          <span>Contact Credentials & WhatsApp Chat Setup</span>
          <span className="text-xs font-normal text-emerald-400">Direct Contact Controls</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Contact Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. nakshatradigitial@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Mobile / Phone Number</label>
            <input
              type="text"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="e.g. 7020323182"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">WhatsApp Number</label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="e.g. 917020323182"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none font-bold text-emerald-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Office Address</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="e.g. Silicon Valley Drive"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* WhatsApp Pre-filled Message Template */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2">
              <span>WhatsApp Pre-filled Message Template</span>
            </label>
            <span className="text-[10px] text-slate-400">Auto-filled when users click floating WhatsApp button</span>
          </div>
          <textarea
            rows={2}
            value={whatsappTemplate}
            onChange={e => setWhatsappTemplate(e.target.value)}
            placeholder="Enter pre-filled WhatsApp message..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs leading-relaxed focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Social Media Links with Enable/Disable Toggles */}
        <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-slate-800 pb-2 pt-4 flex items-center justify-between">
          <span>Social Media Links & Visibility Controls</span>
          <span className="text-xs font-normal text-indigo-400">Enable/Disable Any Link</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'linkedin', label: 'LinkedIn', value: linkedin, setter: setLinkedin, placeholder: 'https://linkedin.com/company/...' },
            { id: 'github', label: 'GitHub Profile', value: github, setter: setGithub, placeholder: 'https://github.com/...' },
            { id: 'twitter', label: 'Twitter / X', value: twitter, setter: setTwitter, placeholder: 'https://x.com/...' },
            { id: 'instagram', label: 'Instagram Profile', value: instagram, setter: setInstagram, placeholder: 'https://instagram.com/...' },
            { id: 'behance', label: 'Behance Portfolio', value: behance, setter: setBehance, placeholder: 'https://behance.net/...' },
            { id: 'dribbble', label: 'Dribbble Profile', value: dribbble, setter: setDribbble, placeholder: 'https://dribbble.com/...' },
            { id: 'youtube', label: 'YouTube Channel', value: youtube, setter: setYoutube, placeholder: 'https://youtube.com/@...' },
            { id: 'playstore', label: 'Google Play Store', value: playstore, setter: setPlaystore, placeholder: 'https://play.google.com/...' },
          ].map(soc => {
            const isEnabled = enabledSocialLinks[soc.id] !== false;
            return (
              <div key={soc.id} className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
                isEnabled ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 font-mono">{soc.label}</span>
                  <button
                    type="button"
                    onClick={() => setEnabledSocialLinks(prev => ({ ...prev, [soc.id]: !isEnabled }))}
                    className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-colors ${
                      isEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {isEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
                <input
                  type="text"
                  value={soc.value}
                  onChange={e => soc.setter(e.target.value)}
                  placeholder={soc.placeholder}
                  disabled={!isEnabled}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none disabled:opacity-50"
                />
              </div>
            );
          })}
        </div>

        <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-slate-800 pb-2 pt-4">
          Homepage Live Metric Stats
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Completed Projects</label>
            <input
              type="number"
              value={projectsCount}
              onChange={e => setProjectsCount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Android Apps Published</label>
            <input
              type="number"
              value={androidAppsCount}
              onChange={e => setAndroidAppsCount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">Happy Clients</label>
            <input
              type="number"
              value={happyClients}
              onChange={e => setHappyClients(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-slate-800 pb-2 pt-4">
          Security Settings
        </h3>

        <div className="max-w-xs space-y-1">
          <label className="text-xs text-slate-400 font-mono">Admin PIN Lock</label>
          <input
            type="text"
            value={pin}
            onChange={e => setPin(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono tracking-widest"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Settings</span>
          </button>
        </div>

      </form>

      {/* Backup & Restore Data Card */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Download className="w-5 h-5 text-indigo-400" />
          <span>Data Backup & Default Reset</span>
        </h3>
        <p className="text-xs text-slate-400">
          Export your portfolio database as a JSON file or restore original sample seed data.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={handleExportBackup}
            className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Backup JSON</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all portfolio data to original defaults?')) {
                resetAllData();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/70 text-rose-300 border border-rose-500/30 font-semibold text-xs flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>Reset Data to Defaults</span>
          </button>
        </div>
      </div>

    </div>
  );
};
