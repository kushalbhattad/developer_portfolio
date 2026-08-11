import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CaseStudy, Testimonial, Service } from '../../types';
import { X, Plus, Trash2, Check, Sparkles } from 'lucide-react';

interface AdminModalFormProps {
  type: 'caseStudy' | 'testimonial' | 'service';
  itemToEdit?: CaseStudy | Testimonial | Service | null;
  onClose: () => void;
}

export const AdminModalForm: React.FC<AdminModalFormProps> = ({ type, itemToEdit, onClose }) => {
  const {
    addCaseStudy,
    updateCaseStudy,
    addTestimonial,
    updateTestimonial,
    addService,
    updateService,
    caseStudies
  } = useApp();

  // Case Study State
  const [csTitle, setCsTitle] = useState((itemToEdit as CaseStudy)?.title || '');
  const [csClient, setCsClient] = useState((itemToEdit as CaseStudy)?.client || '');
  const [csCategory, setCsCategory] = useState<CaseStudy['category']>((itemToEdit as CaseStudy)?.category || 'Android App');
  const [csSummary, setCsSummary] = useState((itemToEdit as CaseStudy)?.shortSummary || '');
  const [csChallenge, setCsChallenge] = useState((itemToEdit as CaseStudy)?.challenge || '');
  const [csSolution, setCsSolution] = useState((itemToEdit as CaseStudy)?.solution || '');
  const [csResults, setCsResults] = useState<string[]>((itemToEdit as CaseStudy)?.results || ['']);
  const [csTechStack, setCsTechStack] = useState<string>((itemToEdit as CaseStudy)?.techStack?.join(', ') || '');
  const [csThumbnail, setCsThumbnail] = useState((itemToEdit as CaseStudy)?.thumbnailUrl || 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80');
  const [csHero, setCsHero] = useState((itemToEdit as CaseStudy)?.heroImageUrl || 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80');
  const [csLiveUrl, setCsLiveUrl] = useState((itemToEdit as CaseStudy)?.liveUrl || '');
  const [csAppStoreUrl, setCsAppStoreUrl] = useState((itemToEdit as CaseStudy)?.appStoreUrl || '');
  const [csFeatured, setCsFeatured] = useState((itemToEdit as CaseStudy)?.featured ?? true);
  const [csEnabled, setCsEnabled] = useState((itemToEdit as CaseStudy)?.enabled ?? true);
  const [csDuration, setCsDuration] = useState((itemToEdit as CaseStudy)?.duration || '6 Weeks');

  // Testimonial State
  const [tName, setTName] = useState((itemToEdit as Testimonial)?.clientName || '');
  const [tRole, setTRole] = useState((itemToEdit as Testimonial)?.clientRole || '');
  const [tCompany, setTCompany] = useState((itemToEdit as Testimonial)?.company || '');
  const [tAvatar, setTAvatar] = useState((itemToEdit as Testimonial)?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
  const [tRating, setTRating] = useState((itemToEdit as Testimonial)?.rating || 5);
  const [tContent, setTContent] = useState((itemToEdit as Testimonial)?.content || '');
  const [tProjectId, setTProjectId] = useState((itemToEdit as Testimonial)?.projectId || '');

  // Service State
  const [sTitle, setSTitle] = useState((itemToEdit as Service)?.title || '');
  const [sCategory, setSCategory] = useState<Service['category']>((itemToEdit as Service)?.category || 'Android');
  const [sDesc, setSDesc] = useState((itemToEdit as Service)?.description || '');
  const [sIcon, setSIcon] = useState((itemToEdit as Service)?.iconName || 'Smartphone');
  const [sPrice, setSPrice] = useState((itemToEdit as Service)?.startingPrice || '₹29,999');
  const [sDelivery, setSDelivery] = useState((itemToEdit as Service)?.deliveryTime || '4 Weeks');
  const [sFeatures, setSFeatures] = useState<string[]>((itemToEdit as Service)?.features || ['Custom Feature 1', 'Custom Feature 2']);
  const [sPopular, setSPopular] = useState((itemToEdit as Service)?.popular ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'caseStudy') {
      const techArray = csTechStack.split(',').map(s => s.trim()).filter(Boolean);
      const cleanResults = csResults.filter(r => r.trim() !== '');

      const csPayload = {
        title: csTitle,
        slug: csTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        client: csClient,
        category: csCategory,
        shortSummary: csSummary,
        challenge: csChallenge,
        solution: csSolution,
        results: cleanResults.length > 0 ? cleanResults : ['100% Client Satisfaction Delivered'],
        techStack: techArray.length > 0 ? techArray : ['React', 'Kotlin'],
        thumbnailUrl: csThumbnail,
        heroImageUrl: csHero,
        liveUrl: csLiveUrl || undefined,
        appStoreUrl: csAppStoreUrl || undefined,
        featured: csFeatured,
        enabled: csEnabled,
        completionDate: 'Current',
        duration: csDuration,
        rating: 5
      };

      if (itemToEdit) {
        updateCaseStudy(itemToEdit.id, csPayload);
      } else {
        addCaseStudy(csPayload);
      }
    } else if (type === 'testimonial') {
      const selectedCS = caseStudies.find(c => c.id === tProjectId);
      const tPayload = {
        clientName: tName,
        clientRole: tRole,
        company: tCompany,
        avatarUrl: tAvatar,
        rating: Number(tRating),
        content: tContent,
        projectId: tProjectId || undefined,
        projectName: selectedCS ? selectedCS.title : undefined,
        featured: true,
        date: 'Recent'
      };

      if (itemToEdit) {
        updateTestimonial(itemToEdit.id, tPayload);
      } else {
        addTestimonial(tPayload);
      }
    } else if (type === 'service') {
      const sPayload = {
        title: sTitle,
        category: sCategory,
        description: sDesc,
        iconName: sIcon,
        features: sFeatures.filter(f => f.trim() !== ''),
        startingPrice: sPrice,
        deliveryTime: sDelivery,
        popular: sPopular
      };

      if (itemToEdit) {
        updateService(itemToEdit.id, sPayload);
      } else {
        addService(sPayload);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>
              {itemToEdit ? 'Edit' : 'Create New'}{' '}
              {type === 'caseStudy' ? 'Case Study' : type === 'testimonial' ? 'Client Testimonial' : 'Service Package'}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* CASE STUDY FORM */}
          {type === 'caseStudy' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={csTitle}
                    onChange={e => setCsTitle(e.target.value)}
                    placeholder="e.g. HealthTrack Pro Android App"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Client Name / Company *</label>
                  <input
                    type="text"
                    required
                    value={csClient}
                    onChange={e => setCsClient(e.target.value)}
                    placeholder="e.g. Pulse Health Inc."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Category *</label>
                  <select
                    value={csCategory}
                    onChange={e => setCsCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="Android App">Android App</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Full Stack">Full Stack</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Duration</label>
                  <input
                    type="text"
                    value={csDuration}
                    onChange={e => setCsDuration(e.target.value)}
                    placeholder="e.g. 8 Weeks"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">Short Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={csSummary}
                  onChange={e => setCsSummary(e.target.value)}
                  placeholder="Brief overview of what was built and achieved..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">Client Challenge</label>
                <textarea
                  rows={2}
                  value={csChallenge}
                  onChange={e => setCsChallenge(e.target.value)}
                  placeholder="What problem did the client face?"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">Engineering Solution</label>
                <textarea
                  rows={2}
                  value={csSolution}
                  onChange={e => setCsSolution(e.target.value)}
                  placeholder="How did our agency design & engineer the solution?"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              {/* Measured Impact / Results */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-400 font-mono">Key Measured Results</label>
                  <button
                    type="button"
                    onClick={() => setCsResults([...csResults, ''])}
                    className="text-[11px] text-indigo-400 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Result Line
                  </button>
                </div>
                {csResults.map((res, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={res}
                      onChange={e => {
                        const updated = [...csResults];
                        updated[i] = e.target.value;
                        setCsResults(updated);
                      }}
                      placeholder="e.g. 120,000+ Downloads on Play Store"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                    {csResults.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setCsResults(csResults.filter((_, idx) => idx !== i))}
                        className="p-1.5 text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">Tech Stack (comma separated) *</label>
                <input
                  type="text"
                  value={csTechStack}
                  onChange={e => setCsTechStack(e.target.value)}
                  placeholder="Kotlin, Jetpack Compose, Room DB, React, Tailwind CSS"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Thumbnail Image URL</label>
                  <input
                    type="text"
                    value={csThumbnail}
                    onChange={e => setCsThumbnail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Hero Banner Image URL</label>
                  <input
                    type="text"
                    value={csHero}
                    onChange={e => setCsHero(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Live Web URL (Optional)</label>
                  <input
                    type="text"
                    value={csLiveUrl}
                    onChange={e => setCsLiveUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Google Play Store URL (Optional)</label>
                  <input
                    type="text"
                    value={csAppStoreUrl}
                    onChange={e => setCsAppStoreUrl(e.target.value)}
                    placeholder="https://play.google.com/store/apps/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="csEnabled"
                    checked={csEnabled}
                    onChange={e => setCsEnabled(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <label htmlFor="csEnabled" className="text-xs text-emerald-300 font-semibold cursor-pointer">
                    Enable & Show on Public Showcase
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="csFeatured"
                    checked={csFeatured}
                    onChange={e => setCsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="csFeatured" className="text-xs text-amber-300 font-semibold cursor-pointer">
                    Feature prominently on homepage
                  </label>
                </div>
              </div>
            </>
          )}

          {/* TESTIMONIAL FORM */}
          {type === 'testimonial' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={tName}
                    onChange={e => setTName(e.target.value)}
                    placeholder="e.g. David Sterling"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Client Role / Title</label>
                  <input
                    type="text"
                    value={tRole}
                    onChange={e => setTRole(e.target.value)}
                    placeholder="e.g. VP of Engineering"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={tCompany}
                    onChange={e => setTCompany(e.target.value)}
                    placeholder="e.g. Pulse Health Inc."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Star Rating (1 - 5)</label>
                  <select
                    value={tRating}
                    onChange={e => setTRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">Client Photo Avatar URL</label>
                <input
                  type="text"
                  value={tAvatar}
                  onChange={e => setTAvatar(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">Testimonial Quote *</label>
                <textarea
                  required
                  rows={4}
                  value={tContent}
                  onChange={e => setTContent(e.target.value)}
                  placeholder="What did the client say about working with our agency?"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">Link to Delivered Case Study (Optional)</label>
                <select
                  value={tProjectId}
                  onChange={e => setTProjectId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="">-- No specific case study link --</option>
                  {caseStudies.map(cs => (
                    <option key={cs.id} value={cs.id}>
                      {cs.title} ({cs.client})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* SERVICE FORM */}
          {type === 'service' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={sTitle}
                    onChange={e => setSTitle(e.target.value)}
                    placeholder="e.g. Android App Development"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Category</label>
                  <select
                    value={sCategory}
                    onChange={e => setSCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="Android">Android</option>
                    <option value="Web">Web</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">Service Description *</label>
                <textarea
                  required
                  rows={3}
                  value={sDesc}
                  onChange={e => setSDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Starting Price</label>
                  <input
                    type="text"
                    value={sPrice}
                    onChange={e => setSPrice(e.target.value)}
                    placeholder="$3,500"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Delivery Time</label>
                  <input
                    type="text"
                    value={sDelivery}
                    onChange={e => setSDelivery(e.target.value)}
                    placeholder="4 - 8 Weeks"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">Icon</label>
                  <select
                    value={sIcon}
                    onChange={e => setSIcon(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="Smartphone">Smartphone (Android)</option>
                    <option value="Layout">Layout (UI/UX)</option>
                    <option value="Code2">Code2 (Web)</option>
                    <option value="Layers">Layers (Backend)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="sPopular"
                  checked={sPopular}
                  onChange={e => setSPopular(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600"
                />
                <label htmlFor="sPopular" className="text-xs text-slate-300 font-semibold">
                  Highlight as Popular Package
                </label>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
