import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProcessSection } from './components/ProcessSection';
import { BacklinksSection } from './components/BacklinksSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { AdminDashboard } from './components/admin/AdminDashboard';

function MainAppContent() {
  const { activeTab, setActiveTab, agencySettings } = useApp();

  // Detect /admin or #admin URL
  React.useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.endsWith('/admin') || hash === '#admin' || path.includes('/admin')) {
        setActiveTab('admin');
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, [setActiveTab]);

  // Dynamic SEO Head Manager (Document Title, Meta Description, Meta Keywords & OpenGraph)
  React.useEffect(() => {
    const brandName = agencySettings.agencyName || 'Nakshatra Digital Arts';
    
    let title = `${brandName} — Turnkey Web & Mobile App Studio | 15-Day Delivery`;
    let description = `${brandName} delivers high-converting business websites, mobile apps, social marketing, and portfolio management in 15 days or less with 25% advance. Free domain, SSL & 1 year tech support.`;
    let keywords = `${brandName}, 15 day website, web design agency, mobile app development, social media marketing, portfolio management, SEO agency, website calculator`;

    switch (activeTab) {
      case 'services':
        title = `Services & Flat-Rate Packages — ${brandName}`;
        description = `Explore web development, native Android app publishing, UI/UX design, and social marketing packages by ${brandName}. Delivered in 15 days with 1 year free tech support.`;
        keywords = `web development services, android app publishing, ui ux design, social media marketing packages, agency pricing, 15 day website`;
        break;
      case 'portfolio':
        title = `Our Portfolio & Case Studies — ${brandName}`;
        description = `View live client projects, mobile app builds, and interactive web platforms created by ${brandName}. Download PDF case studies and explore live demos.`;
        keywords = `web design portfolio, client case studies, mobile app showcase, live website demos, react web apps, android app portfolio`;
        break;
      case 'testimonials':
        title = `Client Testimonials & Verified Reviews — ${brandName}`;
        description = `Read verified client reviews and ratings from founders, CTOs, and business owners who partnered with ${brandName} for fast 15-day digital execution.`;
        keywords = `client testimonials, agency reviews, web developer ratings, verified client feedback, digital agency trust score`;
        break;
      case 'process':
        title = `15-Day Go-Live Methodology & Workflow — ${brandName}`;
        description = `Learn about our structured 5-step 15-day development process: Discovery, Prototyping, Build, Testing, and Deployment with 25% advance payment.`;
        keywords = `15 day website process, agile web development workflow, website turnaround time, agency go live methodology`;
        break;
      case 'backlinks':
        title = `DA 90+ SEO Backlinks & Authority Growth — ${brandName}`;
        description = `Supercharge your organic search rankings on Google with ${brandName}'s high DA 90+ SEO backlink building and Generative Engine Optimization (GEO).`;
        keywords = `SEO backlinks, DA 90 backlinks, link building agency, Google SEO ranking, GEO AI search optimization`;
        break;
      case 'contact':
        title = `Estimate Project & Contact Us — ${brandName}`;
        description = `Calculate your project estimate in real-time or get in touch with ${brandName}. We respond within 24 hours with detailed proposals.`;
        keywords = `project cost calculator, website quote estimator, contact web studio, hire web developers, 15 day website estimate`;
        break;
      case 'admin':
        title = `Admin Portal & Management CMS — ${brandName}`;
        description = `Secure Admin Portal for ${brandName} to manage client inquiries, case studies, agency settings, and section visibility.`;
        keywords = `admin portal, agency dashboard, content management system, admin login`;
        break;
      default:
        break;
    }

    document.title = title;

    const updateMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
  }, [activeTab, agencySettings.agencyName]);

  const enabled = agencySettings.enabledSections || {};

  if (activeTab === 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <AdminDashboard />
        </main>
        <Footer />
        <NotificationToast />
      </div>
    );
  }

  return (
    <div className="bg-[#0c231a] p-2 sm:p-4 lg:p-6 min-h-screen font-sans antialiased selection:bg-[#ff5436] selection:text-white">
      {/* Studio Off-White Rounded Canvas Container */}
      <div className="bg-[#f6f4ee] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-black/10 flex flex-col min-h-[94vh]">
        <Navbar />

        <main className="flex-1">
          <section id="home">
            <Hero />
          </section>

          {enabled.services !== false && (
            <section id="services">
              <ServicesSection />
            </section>
          )}

          {enabled.portfolio !== false && (
            <section id="portfolio">
              <PortfolioSection />
            </section>
          )}

          {enabled.testimonials !== false && (
            <section id="testimonials">
              <TestimonialsSection />
            </section>
          )}

          {enabled.process !== false && (
            <section id="process">
              <ProcessSection />
            </section>
          )}

          {enabled.backlinks !== false && (
            <section id="backlinks">
              <BacklinksSection />
            </section>
          )}

          {enabled.contact !== false && (
            <section id="contact">
              <ContactSection />
            </section>
          )}
        </main>

        <Footer />
      </div>

      <FloatingContactButtons />
      <ScrollToTopButton />
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
