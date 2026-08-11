import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CaseStudy,
  Testimonial,
  Service,
  Inquiry,
  AgencySettings,
  ActiveTab,
  AdminSubTab,
  ScannedSite,
  Backlink
} from '../types';
import {
  initialAgencySettings,
  initialCaseStudies,
  initialTestimonials,
  initialServices,
  initialInquiries,
  initialScannedSites,
  initialBacklinks
} from '../data/initialData';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // State
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  services: Service[];
  inquiries: Inquiry[];
  scannedSites: ScannedSite[];
  backlinks: Backlink[];
  agencySettings: AgencySettings;
  activeTab: ActiveTab;
  adminSubTab: AdminSubTab;
  isAdmin: boolean;
  selectedCaseStudy: CaseStudy | null;
  selectedEstimateService: string | null;
  toasts: Toast[];
  themeMode: 'dark' | 'light';

  // Navigation & UI Actions
  setActiveTab: (tab: ActiveTab) => void;
  setAdminSubTab: (subTab: AdminSubTab) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setSelectedCaseStudy: (caseStudy: CaseStudy | null) => void;
  setSelectedEstimateService: (serviceTitle: string | null) => void;
  toggleThemeMode: () => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Case Studies CRUD
  addCaseStudy: (cs: Omit<CaseStudy, 'id'>) => void;
  updateCaseStudy: (id: string, cs: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: string) => void;

  // Testimonials CRUD
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, t: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Services CRUD
  addService: (s: Omit<Service, 'id'>) => void;
  updateService: (id: string, s: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Inquiries Actions
  addInquiry: (inquiryData: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;

  // Security Scanner Site Actions
  addScannedSite: (siteData: { url: string; score: number; scanType?: string; statusSummary?: string }) => void;
  deleteScannedSite: (id: string) => void;

  // Backlinks CRUD
  addBacklink: (bl: Omit<Backlink, 'id' | 'addedDate'>) => void;
  updateBacklink: (id: string, bl: Partial<Backlink>) => void;
  deleteBacklink: (id: string) => void;

  // Settings & System
  updateAgencySettings: (settings: Partial<AgencySettings>) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'apex_studio_portfolio_data_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [scannedSites, setScannedSites] = useState<ScannedSite[]>(initialScannedSites);
  const [backlinks, setBacklinks] = useState<Backlink[]>(initialBacklinks);
  const [agencySettings, setAgencySettings] = useState<AgencySettings>(initialAgencySettings);

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>('overview');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedEstimateService, setSelectedEstimateService] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  const toggleThemeMode = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.caseStudies) setCaseStudies(parsed.caseStudies);
        if (parsed.testimonials) setTestimonials(parsed.testimonials);
        if (parsed.services) setServices(parsed.services);
        if (parsed.inquiries) setInquiries(parsed.inquiries);
        if (parsed.scannedSites) setScannedSites(parsed.scannedSites);
        if (parsed.backlinks) setBacklinks(parsed.backlinks);
        if (parsed.agencySettings) {
          const merged = { ...initialAgencySettings, ...parsed.agencySettings };
          if (merged.contactEmail === 'contact@nakshatradigitalarts.com') {
            merged.contactEmail = 'nakshatradigitial@gmail.com';
          }
          if (merged.contactPhone === '+91 98765 43210' || !merged.contactPhone) {
            merged.contactPhone = '+91 70203 23182';
          }
          if (merged.whatsappNumber === '+919876543210' || !merged.whatsappNumber) {
            merged.whatsappNumber = '917020323182';
          }
          setAgencySettings(merged);
        }
      }
    } catch (e) {
      console.error('Failed to parse localStorage data:', e);
    }
  }, []);

  // Save state to localStorage whenever state changes
  useEffect(() => {
    try {
      const dataToSave = {
        caseStudies,
        testimonials,
        services,
        inquiries,
        scannedSites,
        backlinks,
        agencySettings
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save data to localStorage:', e);
    }
  }, [caseStudies, testimonials, services, inquiries, scannedSites, backlinks, agencySettings]);

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Case Studies CRUD
  const addCaseStudy = (csData: Omit<CaseStudy, 'id'>) => {
    const newCS: CaseStudy = {
      ...csData,
      id: `cs-${Date.now()}`
    };
    setCaseStudies(prev => [newCS, ...prev]);
    addToast(`Added case study: "${newCS.title}"`, 'success');
  };

  const updateCaseStudy = (id: string, csData: Partial<CaseStudy>) => {
    setCaseStudies(prev =>
      prev.map(item => (item.id === id ? { ...item, ...csData } : item))
    );
    addToast('Case study updated successfully!', 'success');
  };

  const deleteCaseStudy = (id: string) => {
    const cs = caseStudies.find(item => item.id === id);
    setCaseStudies(prev => prev.filter(item => item.id !== id));
    addToast(`Deleted case study "${cs?.title || id}"`, 'info');
  };

  // Testimonials CRUD
  const addTestimonial = (tData: Omit<Testimonial, 'id'>) => {
    const newT: Testimonial = {
      ...tData,
      id: `t-${Date.now()}`
    };
    setTestimonials(prev => [newT, ...prev]);
    addToast(`Added testimonial from ${newT.clientName}`, 'success');
  };

  const updateTestimonial = (id: string, tData: Partial<Testimonial>) => {
    setTestimonials(prev =>
      prev.map(item => (item.id === id ? { ...item, ...tData } : item))
    );
    addToast('Testimonial updated!', 'success');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(item => item.id !== id));
    addToast('Testimonial deleted', 'info');
  };

  // Services CRUD
  const addService = (sData: Omit<Service, 'id'>) => {
    const newS: Service = {
      ...sData,
      id: `srv-${Date.now()}`
    };
    setServices(prev => [...prev, newS]);
    addToast(`Added service "${newS.title}"`, 'success');
  };

  const updateService = (id: string, sData: Partial<Service>) => {
    setServices(prev =>
      prev.map(item => (item.id === id ? { ...item, ...sData } : item))
    );
    addToast('Service updated!', 'success');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(item => item.id !== id));
    addToast('Service removed', 'info');
  };

  // Inquiries Actions
  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'New',
      submittedAt: formattedDate
    };
    setInquiries(prev => [newInquiry, ...prev]);

    // Send email alert to agency email (nakshatradigitial@gmail.com)
    const emailSubject = encodeURIComponent(`🔥 NEW LEAD: ${inquiryData.serviceType} from ${inquiryData.name}`);
    const emailBody = encodeURIComponent(
      `NEW LEAD RECEIVED ON WEBSITE:\n\nName: ${inquiryData.name}\nEmail: ${inquiryData.email}\nPhone: ${inquiryData.phone || 'N/A'}\nService Required: ${inquiryData.serviceType}\nBudget Range: ${inquiryData.budgetRange}\nTimeline: ${inquiryData.timeline}\nSubmitted At: ${formattedDate}\n\nProject Message:\n${inquiryData.message}`
    );
    
    // Attempt mailto trigger
    try {
      window.open(`mailto:${agencySettings.contactEmail}?subject=${emailSubject}&body=${emailBody}`, '_blank');
    } catch (err) {
      console.log('Mail client pop-up triggered or blocked:', err);
    }

    addToast(`New lead recorded! Notification email dispatched to ${agencySettings.contactEmail}`, 'success');
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status'], notes?: string) => {
    setInquiries(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item
      )
    );
    addToast(`Inquiry status set to "${status}"`, 'success');
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
    addToast('Inquiry removed', 'info');
  };

  // Security Scanner Site Actions
  const addScannedSite = (siteData: { url: string; score: number; scanType?: string; statusSummary?: string }) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newScan: ScannedSite = {
      id: `scan-${Date.now()}`,
      url: siteData.url,
      score: siteData.score,
      scannedAt: formattedDate,
      scanType: siteData.scanType || 'Free Security Flaw Scan',
      statusSummary: siteData.statusSummary || (siteData.score >= 80 ? 'Good Health Score' : 'Flaws / Optimizations Detected')
    };
    setScannedSites(prev => [newScan, ...prev]);
  };

  const deleteScannedSite = (id: string) => {
    setScannedSites(prev => prev.filter(item => item.id !== id));
    addToast('Scanned site removed from registry', 'info');
  };

  // Backlinks CRUD
  const addBacklink = (blData: Omit<Backlink, 'id' | 'addedDate'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const newBL: Backlink = {
      ...blData,
      id: `bl-${Date.now()}`,
      addedDate: formattedDate
    };
    setBacklinks(prev => [newBL, ...prev]);
    addToast(`Added backlink: "${newBL.anchorText}"`, 'success');
  };

  const updateBacklink = (id: string, blData: Partial<Backlink>) => {
    setBacklinks(prev =>
      prev.map(item => (item.id === id ? { ...item, ...blData } : item))
    );
    addToast('Backlink updated successfully!', 'success');
  };

  const deleteBacklink = (id: string) => {
    setBacklinks(prev => prev.filter(item => item.id !== id));
    addToast('Backlink removed from network', 'info');
  };

  // Agency Settings
  const updateAgencySettings = (settingsData: Partial<AgencySettings>) => {
    setAgencySettings(prev => ({ ...prev, ...settingsData }));
    addToast('Agency profile updated!', 'success');
  };

  const resetAllData = () => {
    setCaseStudies(initialCaseStudies);
    setTestimonials(initialTestimonials);
    setServices(initialServices);
    setInquiries(initialInquiries);
    setScannedSites(initialScannedSites);
    setBacklinks(initialBacklinks);
    setAgencySettings(initialAgencySettings);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    addToast('All portfolio data reset to original defaults!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        caseStudies,
        testimonials,
        services,
        inquiries,
        scannedSites,
        backlinks,
        agencySettings,
        activeTab,
        adminSubTab,
        isAdmin,
        selectedCaseStudy,
        selectedEstimateService,
        toasts,
        themeMode,

        setActiveTab,
        setAdminSubTab,
        setIsAdmin,
        setSelectedCaseStudy,
        setSelectedEstimateService,
        toggleThemeMode,
        addToast,
        removeToast,

        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,

        addTestimonial,
        updateTestimonial,
        deleteTestimonial,

        addService,
        updateService,
        deleteService,

        addInquiry,
        updateInquiryStatus,
        deleteInquiry,

        addScannedSite,
        deleteScannedSite,

        addBacklink,
        updateBacklink,
        deleteBacklink,

        updateAgencySettings,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
