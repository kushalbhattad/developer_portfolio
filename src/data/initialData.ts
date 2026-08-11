import { CaseStudy, Testimonial, Service, Inquiry, AgencySettings, ScannedSite, Backlink } from '../types';

export const initialAgencySettings: AgencySettings = {
  agencyName: "Nakshatra Digital Solutions",
  tagline: "Get Your Business Online in Just 15 Days 🚀",
  description: "Professional, hassle-free website development, social media marketing, and portfolio management with zero hidden costs. Complete custom & mobile-ready designs, basic SEO, Generative Engine Optimization (GEO), 6 months free tech support, and easy admin dashboards with PDF & Excel reports.",
  currencySymbol: "₹",
  contactEmail: "nakshatradigitial@gmail.com",
  contactPhone: "+91 70203 23182",
  address: "Nakshatra Digital Solutions",
  whatsappNumber: "917020323182",
  yearsInBusiness: 5,
  completedProjects: 140,
  happyClients: 128,
  androidAppsPublished: 35,
  heroTitle: "We Build High-Converting Web Platforms & Android Apps in 15 Days",
  heroSubtitle: "Zero hassle, full mobile-ready responsive designs, basic SEO, 6 months free support, and easy PDF/Excel admin dashboards with only 25% advance.",
  heroImageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80",
  heroImageFit: "cover",
  servicesTitle: "Our Services & Transparent Pricing",
  servicesSubtitle: "Flat-rate, transparent packages with 15-day delivery targets, 25% advance, and 6 months free tech support warranty.",
  processTitle: "Our 15-Day Go-Live Methodology",
  processSubtitle: "A transparent, 5-phase process engineered to get your business online in 15 days or less — with only 25% advance and zero hidden costs.",
  testimonialsTitle: "What Our Clients Say About Us",
  testimonialsSubtitle: "Real feedback from CTOs, product managers, and founders who trusted our studio with their digital web platforms and mobile applications.",
  contactTitle: "Estimate Your Project & Contact Us",
  contactSubtitle: "Fill out the project scope estimator below or send us an email. We typically respond with a detailed project proposal within 24 hours.",
  socialLinks: {
    github: "https://github.com/nakshatradigital",
    linkedin: "https://linkedin.com/company/nakshatra-digital-solutions",
    twitter: "https://twitter.com/nakshatradigital",
    instagram: "https://instagram.com/nakshatradigital",
    dribbble: "https://dribbble.com/nakshatradigital",
    behance: "https://behance.net/nakshatradigital",
    youtube: "https://youtube.com/@nakshatradigital",
    playstore: "https://play.google.com/store/apps"
  },
  adminPin: "1234",
  whatsappTemplate: "Hello Nakshatra Digital Solutions! I would like to enquire about getting my business website or mobile app online in 15 days.",
  enabledSections: {
    services: true,
    portfolio: true,
    testimonials: false,
    process: true,
    backlinks: false,
    contact: true
  },
  enabledSocialLinks: {
    github: false,
    linkedin: true,
    twitter: false,
    instagram: true,
    dribbble: false,
    behance: false,
    youtube: false,
    playstore: false
  }
};

export const initialCaseStudies: CaseStudy[] = [
  {
    id: "cs-scrapdukaan",
    title: "ScrapDukaan - Doorstep Scrap Recycling & Trading Platform",
    slug: "scrapdukaan-recycling-platform",
    client: "ScrapDukaan",
    category: "Full Stack",
    shortSummary: "Digital scrap collection and eco-trading web platform enabling doorstep scrap pickup scheduling, live scrap rate charts, and instant digital payouts.",
    challenge: "ScrapDukaan needed a modern, user-friendly digital platform to connect households and industrial clients with doorstep scrap collection, offering transparent daily rate cards and seamless booking.",
    solution: "Engineered a high-performance responsive web platform with interactive rate calculators, real-time pickup request workflows, address geo-tagging, and instant WhatsApp inquiry routing.",
    results: [
      "10,000+ Doorstep scrap pickup requests processed",
      "Live at https://scrapdukaan.com",
      "4.9/5.0 Customer satisfaction rating across household & commercial clients",
      "Delivered turnkey in under 15 days by Nakshatra Digital Solutions"
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Vite"],
    thumbnailUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    heroImageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://scrapdukaan.com",
    featured: true,
    completionDate: "July 2026",
    duration: "2 Weeks",
    rating: 5,
    testimonialSnippet: "Nakshatra Digital Solutions delivered scrapdukaan.com ahead of schedule. The online pickup booking and rate transparency transformed our business."
  },
  {
    id: "cs-1",
    title: "HealthTrack Pro - Native Android Fitness Companion",
    slug: "healthtrack-pro-android",
    client: "Pulse Health Inc.",
    category: "Android App",
    shortSummary: "A feature-packed Android app built with Kotlin & Jetpack Compose featuring real-time step tracking, AI workout plans, and offline sync.",
    challenge: "Pulse Health needed a battery-efficient Android app that could run complex background sensor tracking without draining user batteries, while presenting an intuitive, accessible UI.",
    solution: "Engineered a Kotlin native app using Android Jetpack WorkManager, Sensor APIs, Room DB for local caching, and Jetpack Compose for sleek, fluid 60fps animations.",
    results: [
      "120,000+ Downloads on Google Play Store",
      "4.8/5.0 Star Rating with 2,400+ reviews",
      "45% Increase in daily active user retention",
      "Under 2.5% battery drain over 24-hour continuous sensor monitoring"
    ],
    techStack: ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "WorkManager", "Google Fit API"],
    thumbnailUrl: "https://images.unsplash.com/photo-1510519138161-5844005b8e97?auto=format&fit=crop&w=800&q=80",
    heroImageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80",
    appStoreUrl: "https://play.google.com/store/apps",
    featured: true,
    completionDate: "May 2026",
    duration: "10 Weeks",
    rating: 5,
    testimonialSnippet: "Apex delivered our flagship Android app weeks ahead of schedule. The Jetpack Compose UI feels incredibly responsive!"
  },
  {
    id: "cs-2",
    title: "Nova Pay - FinTech Mobile & Web Dashboard",
    slug: "nova-pay-fintech",
    client: "Nova Global Payments",
    category: "Full Stack",
    shortSummary: "End-to-end digital banking platform comprising a high-converting web marketing portal, customer web dashboard, and Android banking app.",
    challenge: "Nova Pay required a high-security cross-platform solution to let merchants accept payments, view real-time analytics, and send micro-transfers with biometric authentication.",
    solution: "Built a unified React/TypeScript web app alongside an Android app using Jetpack Security, biometric prompt, and encrypted WebSockets for instant transaction notifications.",
    results: [
      "₹14 Cr+ processed in first 90 days after launch",
      "99.99% system uptime maintained across peaks",
      "Sub-200ms latency for real-time wallet updates",
      "Zero security compliance vulnerabilities during external audit"
    ],
    techStack: ["React 19", "Node.js", "Express", "Kotlin", "Biometrics API", "Tailwind CSS", "WebSockets"],
    thumbnailUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    heroImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/novapay",
    appStoreUrl: "https://play.google.com/store/apps",
    featured: true,
    completionDate: "February 2026",
    duration: "14 Weeks",
    rating: 5,
    testimonialSnippet: "The dual web and Android solution provided by Apex allowed us to go to market 3x faster than expected."
  },
  {
    id: "cs-3",
    title: "LuxeSpace - E-Commerce Architectural Web Design",
    slug: "luxespace-ecommerce-web",
    client: "LuxeSpace Furniture",
    category: "Web Design",
    shortSummary: "Bespoke luxury furniture showroom website featuring 3D product previews, custom configurators, and an ultra-fast checkout flow.",
    challenge: "LuxeSpace was losing high-ticket buyers due to a slow, outdated catalog that failed to present luxury interior craftsmanship dynamically.",
    solution: "Designed a minimalist, high-contrast visual interface with interactive 360° product views, smooth layout transitions, and optimized web vitals.",
    results: [
      "+185% Increase in online order conversion rate",
      "98/100 Google Lighthouse Performance Score",
      "2.4x Increase in average session duration",
      "+40% Higher average order value (AOV)"
    ],
    techStack: ["React", "Tailwind CSS", "Three.js / WebGL", "Motion", "Vite", "Stripe API"],
    thumbnailUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    heroImageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/luxespace",
    featured: true,
    completionDate: "April 2026",
    duration: "8 Weeks",
    rating: 5,
    testimonialSnippet: "Apex transformed our brand identity. The website design is stunning and customers constantly compliment the smooth visual flow."
  },
  {
    id: "cs-4",
    title: "FleetManager - Android Logistics & Route Dispatcher",
    slug: "fleetmanager-android-logistics",
    client: "Apex Logistics Corp",
    category: "Android App",
    shortSummary: "Enterprise Android driver tablet app with real-time GPS tracking, offline manifest scanning, and optimized route dispatch.",
    challenge: "Delivery drivers operating in low-connectivity rural zones lost access to order manifests, leading to delayed deliveries and inaccurate route tracking.",
    solution: "Developed an Android application with robust offline-first SQLite database sync, background GPS telemetry, camera barcode scanner, and turn-by-turn navigation integrations.",
    results: [
      "Reduced delivery delays by 38%",
      "100% offline manifest access reliability",
      "Saved ~1,200 fleet fuel hours per month across 300 vehicles",
      "4.9 rating among fleet driver staff"
    ],
    techStack: ["Android SDK", "Kotlin", "Google Maps SDK", "CameraX", "Room DB", "MQTT"],
    thumbnailUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    heroImageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    appStoreUrl: "https://play.google.com/store/apps",
    featured: false,
    completionDate: "January 2026",
    duration: "12 Weeks",
    rating: 5,
    testimonialSnippet: "Our drivers love the simplicity of the tablet interface. It handles connection dropouts flawlessly!"
  },
  {
    id: "cs-5",
    title: "EduPulse - Interactive Learning SaaS Platform",
    slug: "edupulse-saas-web",
    client: "EduPulse Global",
    category: "Web Development",
    shortSummary: "Modern educational SaaS web application with live video streaming, interactive quizzes, student progress analytics, and instructor dashboards.",
    challenge: "EduPulse had an outdated PHP platform struggling to scale past 5,000 concurrent students during live lecture events.",
    solution: "Rebuilt the platform using Node.js microservices and a React frontend with server-sent events for live quizzes and dynamic dashboard widgets.",
    results: [
      "Scales seamlessly up to 50,000+ concurrent live video learners",
      "62% Reduction in page load times",
      "Integrated automated video transcription & AI note summarization",
      "Passed security compliance audits with 100% rating"
    ],
    techStack: ["React 19", "Express", "Tailwind CSS", "WebRTC", "PostgreSQL", "Redis"],
    thumbnailUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    heroImageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/edupulse",
    featured: false,
    completionDate: "June 2026",
    duration: "11 Weeks",
    rating: 5,
    testimonialSnippet: "An exceptional engineering team. Apex delivered a platform capable of handling massive spikes without a hitch."
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "t-scrapdukaan",
    clientName: "ScrapDukaan Team",
    clientRole: "Founding Team",
    company: "ScrapDukaan",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "Nakshatra Digital Solutions delivered scrapdukaan.com in record time. The doorstep pickup booking interface, live rate chart, and mobile-friendly design transformed our customer acquisition!",
    projectId: "cs-scrapdukaan",
    projectName: "ScrapDukaan Platform",
    featured: true,
    date: "July 2026"
  },
  {
    id: "t-1",
    clientName: "David Sterling",
    clientRole: "VP of Product",
    company: "Pulse Health Inc.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "Working with Apex on our Android app was a masterclass in modern mobile development. They translated our complex background tracking requirements into a lightning-fast Kotlin app with zero battery lag.",
    projectId: "cs-1",
    projectName: "HealthTrack Pro - Native Android",
    featured: true,
    date: "June 2026"
  },
  {
    id: "t-2",
    clientName: "Elena Rostova",
    clientRole: "Chief Executive Officer",
    company: "Nova Global Payments",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "The dual web and Android banking solution created by Apex exceeded every milestone. Their attention to UX detail, security protocols, and speed in execution was phenomenal.",
    projectId: "cs-2",
    projectName: "Nova Pay FinTech",
    featured: true,
    date: "March 2026"
  },
  {
    id: "t-3",
    clientName: "Marcus Vance",
    clientRole: "Creative Director",
    company: "LuxeSpace Furniture",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "Apex brought a level of visual aesthetic and motion design that elevated our e-commerce brand to international luxury standards. Our sales conversions doubled within 30 days of release!",
    projectId: "cs-3",
    projectName: "LuxeSpace E-Commerce",
    featured: true,
    date: "May 2026"
  },
  {
    id: "t-4",
    clientName: "Samantha Chen",
    clientRole: "Operations Director",
    company: "Apex Logistics Corp",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    content: "Our fleet drivers needed a bulletproof Android app for tough field conditions. Apex delivered an intuitive tablet application that operates seamlessly offline and saves us thousands in daily fuel costs.",
    projectId: "cs-4",
    projectName: "FleetManager Android App",
    featured: false,
    date: "February 2026"
  }
];

export const initialServices: Service[] = [
  {
    id: "srv-1",
    title: "15-Day Express Business Website",
    category: "15-Day ",
    description: "Get your business fully online in 15 days or less. Custom & mobile-ready design,  high-speed hosting, SSL security, basic SEO, and social integration included.",
    iconName: "Zap",
    features: [
      "<= 15 Days Go Live Target ",
      "Custom & Mobile-Ready Design (Phones, Tablets, Desktops)",
      "Exclusive of Domain Name, High-Speed Hosting & SSL Security",
      "Basic SEO Setup for Google Ranking & Social Cards",
      "6 Months Free Tech Support (Backups, Bug Fixes, Security)",
      "Only 25% Advance — Balance Payable Upon Go Live"
    ],
    startingPrice: "₹15,999",
    deliveryTime: "Under 15 Days",
    popular: true
  },
  {
    id: "srv-2",
    title: "Easy Admin Dashboard & Reporting Web App",
    category: "Web & Admin",
    description: "Custom web applications equipped with an intuitive content management dashboard, interactive data tables, and 1-click PDF & EXCEL report generation.",
    iconName: "Layout",
    features: [
      "User-Friendly Admin Dashboard to Manage Content",
      "Built-in PDF & EXCEL Report Generator for Sales & Analytics",
      "Mobile-Optimized Admin Interface",
      "Basic SEO & Social Media Integration",
      "6 Months Free Managed Backups & Tech Support",
      "25% Advance Flexible Payment Model"
    ],
    startingPrice: "₹24,999",
    deliveryTime: "12 - 15 Days",
    popular: true
  },
  {
    id: "srv-3",
    title: "Search & Social Ready E-Commerce Store",
    category: "E-Commerce",
    description: "Full-featured online shop with product catalog, WhatsApp DM quick order checkout, payment gateway, SEO ranking optimizations, and Excel report export.",
    iconName: "Code2",
    features: [
      "Responsive Product Showcase & WhatsApp Quick DM Orders",
      "Google Search Ranking (SEO) & Social Share Cards",
      "Excel & PDF Sales Export for Inventory & Orders",
      "Free High-Speed Hosting, SSL & Domain Registration",
      "Free Security Scan for Vulnerabilities with Detailed Report",
      "6 Months Free Tech Support & Bug Warranty"
    ],
    startingPrice: "₹49,999",
    deliveryTime: "Under 45 Days",
    popular: false
  },
  {
    id: "srv-4",
    title: "Free Website Security Scan & Flaw Audit",
    category: "Security",
    description: "Comprehensive security scanning of your current website for flaw detection, SSL vulnerabilities, page performance bottlenecks, and mobile rendering errors.",
    iconName: "ShieldCheck",
    features: [
      "Automated Security Flaw Scanning",
      "SSL & Encryption Certificate Inspection",
      "Mobile Readiness & PageSpeed Audit",
      "Downloadable PDF Flaw Report with Remediation Plan",
      "100% Free Consultation with No Obligation",
      "Instant Direct DM Consultation"
    ],
    startingPrice: "FREE ₹0",
    deliveryTime: "Instant / 24 Hrs",
    popular: false
  },
  {
    id: "srv-5",
    title: "Social Media Marketing & GEO Brand Growth",
    category: "Social Marketing",
    description: "Multi-channel social marketing campaigns, automated content strategy, lead capture funnels, and Generative Engine Optimization (GEO) to get recommended by AI Search engines.",
    iconName: "Sparkles",
    features: [
      "Social Media Campaign Planning & Content Strategy",
      "Generative Engine Optimization (GEO) for AI Search Visibility",
      "Targeted Ad Creative & Lead Generation Funnels",
      "Brand Reputation & Impression Growth Analytics",
      "Monthly Social Performance Reports (Excel & PDF)",
      "Dedicated Social Media Account Manager"
    ],
    startingPrice: "₹19,999",
    deliveryTime: "Ongoing / Monthly",
    popular: true
  },
  {
    id: "srv-6",
    title: "Interactive Portfolio Management & Custom CMS",
    category: "Portfolio CMS",
    description: "Showcase your work, projects, and creative case studies in a high-impact responsive gallery backed by a sleek, easy-to-use Admin CMS for instant 1-click project updates.",
    iconName: "FolderKanban",
    features: [
      "High-Fidelity Visual Gallery with Filterable Categories",
      "Custom Admin CMS to Add, Edit, or Remove Projects 24/7",
      "PDF Case Study Generator for Client Pitches",
      "Light & Dark Theme Responsive Showcase",
      "SEO & GEO Structured Schema for Project Showcase",
      "6 Months Free Hosting & Maintenance Support"
    ],
    startingPrice: "₹34,999",
    deliveryTime: "7 - 10 Days",
    popular: false
  }
];

export const initialInquiries: Inquiry[] = [
  {
    id: "inq-101",
    name: "Rachel Miller",
    email: "rachel@starlighthealth.com",
    phone: "+1 (555) 948-2011",
    serviceType: "Android App Development",
    budgetRange: "₹50,000 - ₹1,00,000",
    timeline: "1 - 2 Months",
    message: "Hi Nakshatra team! We are looking to develop a native Android mobile app for patient appointment scheduling and telehealth video consultations.",
    status: "New",
    submittedAt: "2026-08-09 14:32",
    notes: "High priority lead. Reached out via web form."
  },
  {
    id: "inq-102",
    name: "Arthur Pendelton",
    email: "arthur@pendeltonlaw.com",
    phone: "+1 (555) 231-8970",
    serviceType: "Web Design & UI/UX Systems",
    budgetRange: "₹25,000 - ₹50,000",
    timeline: "2 - 4 Weeks",
    message: "We need a complete redesign of our law firm's web portal with online client case tracking and appointment booking.",
    status: "In Contact",
    submittedAt: "2026-08-08 10:15",
    notes: "Sent initial calendar invite for discovery call."
  }
];

export const initialScannedSites: ScannedSite[] = [
  {
    id: "scan-101",
    url: "https://demo-client-shop.com",
    score: 74,
    scannedAt: "2026-08-10 14:30",
    scanType: "Full Comprehensive Scan",
    statusSummary: "2 Warnings • 1 Flaw Detected"
  },
  {
    id: "scan-102",
    url: "https://example-business.com",
    score: 88,
    scannedAt: "2026-08-10 11:15",
    scanType: "Full Security Audit",
    statusSummary: "100% Pass"
  }
];

export const initialBacklinks: Backlink[] = [
  {
    id: "bl-1",
    title: "Google Play Store Developer Directory",
    targetUrl: "https://play.google.com/store/apps/dev?id=nakshatradigital",
    anchorText: "Nakshatra Digital Android Apps",
    category: "Developer Network",
    domainAuthority: 98,
    status: "Verified",
    addedDate: "2026-01-15",
    description: "Official Google Play developer portal verifying 35+ published Android applications."
  },
  {
    id: "bl-2",
    title: "GitHub Open Source & Mobile Repositories",
    targetUrl: "https://github.com/nakshatradigital",
    anchorText: "Nakshatra Digital GitHub Studio",
    category: "Developer Network",
    domainAuthority: 96,
    status: "Active",
    addedDate: "2026-02-10",
    description: "Verified GitHub organization hosting React & Kotlin open source frameworks."
  },
  {
    id: "bl-3",
    title: "ProductHunt Tech Studio Showcase",
    targetUrl: "https://producthunt.com/@nakshatradigital",
    anchorText: "15-Day Web Go-Live Platform on ProductHunt",
    category: "Tech Directory",
    domainAuthority: 91,
    status: "Verified",
    addedDate: "2026-03-22",
    description: "Top rated digital agency launch profile on ProductHunt."
  },
  {
    id: "bl-4",
    title: "Clutch Verified B2B Web & App Agency",
    targetUrl: "https://clutch.co/profile/nakshatra-digital-arts",
    anchorText: "Clutch Top Rated Web Development Agency",
    category: "SEO Partner",
    domainAuthority: 89,
    status: "Verified",
    addedDate: "2026-04-05",
    description: "5-Star client review backing and agency accreditation on Clutch."
  },
  {
    id: "bl-5",
    title: "Dribbble UI/UX & Mobile Design Showcase",
    targetUrl: "https://dribbble.com/nakshatradigital",
    anchorText: "Nakshatra UI/UX Portfolio on Dribbble",
    category: "Tech Directory",
    domainAuthority: 92,
    status: "Active",
    addedDate: "2026-05-18",
    description: "High-resolution mobile & web interface design shots."
  },
  {
    id: "bl-6",
    title: "TechCrunch Indian Digital Innovation Feature",
    targetUrl: "https://techcrunch.com",
    anchorText: "15-Day Go Live Agency Methodology",
    category: "Press & Media",
    domainAuthority: 94,
    status: "Verified",
    addedDate: "2026-06-01",
    description: "Feature coverage on rapid 15-day digital agency turnarounds with 25% advance."
  }
];
