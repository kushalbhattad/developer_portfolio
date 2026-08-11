export type ProjectCategory = 'All' | 'Web Design' | 'Web Development' | 'Android App' | 'Full Stack';

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: 'Web Design' | 'Web Development' | 'Android App' | 'Full Stack' | '15-Day Website' | 'E-Commerce & Admin' | 'Business Website';
  shortSummary: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  thumbnailUrl: string;
  heroImageUrl: string;
  liveUrl?: string;
  appStoreUrl?: string;
  featured: boolean;
  completionDate: string;
  duration: string;
  rating?: number;
  testimonialSnippet?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl: string;
  rating: number;
  content: string;
  projectId?: string;
  projectName?: string;
  featured: boolean;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string; // Lucide icon name mapping
  features: string[];
  startingPrice: string;
  deliveryTime: string;
  popular?: boolean;
}

export interface ScannedSite {
  id: string;
  url: string;
  score: number;
  scannedAt: string;
  scanType?: string;
  statusSummary?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  status: 'New' | 'In Contact' | 'Proposal Sent' | 'Completed' | 'Archived';
  submittedAt: string;
  notes?: string;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  description: string;
  currencySymbol: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  whatsappNumber?: string;
  yearsInBusiness: number;
  completedProjects: number;
  happyClients: number;
  androidAppsPublished: number;
  // Page Editable Headings & Copy
  heroTitle?: string;
  heroSubtitle?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  processTitle?: string;
  processSubtitle?: string;
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
    behance?: string;
    youtube?: string;
    playstore?: string;
  };
  adminPin: string;
  enabledSections?: Record<string, boolean>;
  whatsappTemplate?: string;
  enabledSocialLinks?: Record<string, boolean>;
}

export interface Backlink {
  id: string;
  title: string;
  targetUrl: string;
  anchorText: string;
  category: 'SEO Partner' | 'Tech Directory' | 'Client Site' | 'Press & Media' | 'Developer Network';
  domainAuthority: number;
  status: 'Active' | 'Verified' | 'Pending Review';
  addedDate: string;
  description?: string;
}

export type ActiveTab = 'home' | 'services' | 'portfolio' | 'testimonials' | 'process' | 'backlinks' | 'contact' | 'admin';

export type AdminSubTab = 'overview' | 'case-studies' | 'testimonials' | 'services' | 'backlinks' | 'inquiries' | 'settings' | 'security-audit';
