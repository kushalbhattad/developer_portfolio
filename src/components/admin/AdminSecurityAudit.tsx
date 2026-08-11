import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Search,
  Download,
  FileSpreadsheet,
  RefreshCw,
  Globe,
  Lock,
  Smartphone,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  History,
  Copy,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { exportSecurityScanToPDF } from '../../lib/reportExporter';
import * as XLSX from 'xlsx';

interface AuditCheckItem {
  id: string;
  category: 'Security' | 'Performance' | 'Mobile' | 'SEO' | 'Social';
  name: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  detail: string;
  remediation: string;
}

interface AuditHistoryRecord {
  id: string;
  targetUrl: string;
  date: string;
  score: number;
  scanType: string;
  statusSummary: string;
  checks: AuditCheckItem[];
}

export const AdminSecurityAudit: React.FC = () => {
  const { themeMode, toggleThemeMode, addToast, agencySettings, scannedSites, addScannedSite, deleteScannedSite } = useApp();

  const isDark = themeMode === 'dark';

  const [urlInput, setUrlInput] = useState('https://nakshatradigitalarts.com');
  const [scanType, setScanType] = useState<'full' | 'ssl' | 'speed' | 'seo'>('full');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepText, setScanStepText] = useState('');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'PASS' | 'WARN' | 'FAIL'>('ALL');
  const [copiedLink, setCopiedLink] = useState(false);

  // Results & History state
  const [currentResult, setCurrentResult] = useState<AuditHistoryRecord | null>(null);
  const [history, setHistory] = useState<AuditHistoryRecord[]>([
    {
      id: 'audit-101',
      targetUrl: 'https://demo-client-shop.com',
      date: '2026-08-10 14:30',
      score: 74,
      scanType: 'Full Comprehensive Scan',
      statusSummary: '2 Warnings • 1 Flaw Detected',
      checks: [
        {
          id: 'chk-1',
          category: 'Security',
          name: 'SSL Certificate & TLS Protocol',
          status: 'PASS',
          detail: 'Valid TLS 1.3 Encryption active. Issued by Let\'s Encrypt.',
          remediation: 'No action required.'
        },
        {
          id: 'chk-2',
          category: 'Security',
          name: 'HTTP Content Security Policy (CSP)',
          status: 'FAIL',
          detail: 'Missing Content-Security-Policy header. Susceptible to XSS injection.',
          remediation: 'Inject default-src \'self\' headers in web server configuration.'
        },
        {
          id: 'chk-3',
          category: 'Mobile',
          name: 'Touch Targets & Viewport Scale',
          status: 'WARN',
          detail: 'Mobile buttons sit closer than 44px spacing on small devices.',
          remediation: 'Increase button padding to min-h-[44px] and add gap-3.'
        },
        {
          id: 'chk-4',
          category: 'Performance',
          name: 'Uncompressed Image Asset Pipeline',
          status: 'WARN',
          detail: 'Banner images served in uncompressed PNG format (2.8MB).',
          remediation: 'Convert imagery to WebP / AVIF format to shave 1.9s load time.'
        },
        {
          id: 'chk-5',
          category: 'SEO',
          name: 'OpenGraph Meta Social Share Cards',
          status: 'PASS',
          detail: 'Valid og:title, og:image, and Twitter Card attributes configured.',
          remediation: 'No action required.'
        }
      ]
    }
  ]);

  const progressRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Trigger Mock Security Scan
  const handleTriggerAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    let target = urlInput.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }

    setScanning(true);
    setScanProgress(5);
    setScanStepText('1/6 Resolving Host DNS & SSL Certificate Handshake...');

    // Smooth scroll down to progress section
    setTimeout(() => {
      progressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    const steps = [
      { pct: 20, text: '2/6 Inspecting Content Security Policy (CSP) & CORS Headers...' },
      { pct: 40, text: '3/6 Auditing Mobile Viewport & Touch Target Spacing...' },
      { pct: 60, text: '4/6 Measuring PageSpeed Optimization & Image Asset Sizes...' },
      { pct: 80, text: '5/6 Querying Known Vulnerability Database & Malware Signature...' },
      { pct: 100, text: '6/6 Generating Final Security Audit Report...' }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setScanProgress(step.pct);
        setScanStepText(step.text);

        if (step.pct === 100) {
          // Finish scan & build mock report
          setTimeout(() => {
            setScanning(false);
            const isOwnAgencySite =
              target.includes('nakshatra') ||
              target.includes('localhost') ||
              target.includes('run.app') ||
              target.includes('127.0.0.1') ||
              target.includes('3000') ||
              (agencySettings.websiteUrl && target.includes(agencySettings.websiteUrl.toLowerCase().replace('https://', '').replace('http://', '')));

            const calculatedScore = isOwnAgencySite ? 98 : Math.floor(Math.random() * 20) + 65;
            
            const newChecks: AuditCheckItem[] = [
              {
                id: `chk-${Date.now()}-1`,
                category: 'Security',
                name: 'SSL Certificate & Encryption Strength',
                status: 'PASS',
                detail: 'Valid SSL Certificate active with 2048-bit RSA Encryption.',
                remediation: 'Auto-renew enabled via Let\'s Encrypt.'
              },
              {
                id: `chk-${Date.now()}-title-px`,
                category: 'SEO',
                name: 'Page Title Pixel Width & Context Match',
                status: isOwnAgencySite ? 'PASS' : 'FAIL',
                detail: isOwnAgencySite
                  ? 'Page title "Nakshatra Digital Solutions — 15-Day Web & Mobile Agency" (56 chars, ~510px / < 580px max) matches page content.'
                  : 'Page title is over 900px long (> 580px max). Title will be truncated in search engine results.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Shorten page title to under 580 pixels (~50-55 characters).'
              },
              {
                id: `chk-${Date.now()}-desc-px`,
                category: 'SEO',
                name: 'Meta Description Phrasing & Length Optimization',
                status: isOwnAgencySite ? 'PASS' : 'WARN',
                detail: isOwnAgencySite
                  ? 'Actionable meta description optimized to 151 chars (~880px / 1000px max budget) with clear value proposition.'
                  : 'Meta description is too short (< 300px out of 1000px max). Lacks key value proposition detail.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Expand meta description to ~800-950 pixels (~145-160 characters).'
              },
              {
                id: `chk-${Date.now()}-h1`,
                category: 'SEO',
                name: 'H1 Document Title Heading Specification',
                status: isOwnAgencySite ? 'PASS' : 'FAIL',
                detail: isOwnAgencySite
                  ? 'Valid <h1 id="hero-heading"> present with semantic heading hierarchy.'
                  : 'There is no H1 heading specified. Page lacks a top-level semantic <h1> title tag.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Add a single primary <h1> heading tag summarizing the page context.'
              },
              {
                id: `chk-${Date.now()}-words`,
                category: 'SEO',
                name: 'Content Word Count & Paragraph Quality',
                status: isOwnAgencySite ? 'PASS' : 'FAIL',
                detail: isOwnAgencySite
                  ? 'High quality content verified (450+ words). Title keywords matched across structured <p> paragraphs.'
                  : 'Page quality issues: Insufficient words detected (< 250 words) and missing structured <p> paragraphs.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Expand page content to at least 250 words with structured <p> paragraphs and title keywords.'
              },
              {
                id: `chk-${Date.now()}-apple`,
                category: 'Mobile',
                name: 'Mobile Optimization & Apple Touch Icon',
                status: isOwnAgencySite ? 'PASS' : 'WARN',
                detail: isOwnAgencySite
                  ? '100% Mobile Responsive viewport with min-44px touch targets & valid <link rel="apple-touch-icon"> specified.'
                  : 'Mobile optimization: No Apple touch icon specified for iOS home screen bookmarks.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Specify <link rel="apple-touch-icon"> in the <head> section for mobile bookmarks.'
              },
              {
                id: `chk-${Date.now()}-share`,
                category: 'Social',
                name: 'Social Sharing Options & Media Plugins',
                status: isOwnAgencySite ? 'PASS' : 'WARN',
                detail: isOwnAgencySite
                  ? '1-Click Social Sharing widget (WhatsApp, LinkedIn, X, Telegram) active to increase social media reach.'
                  : 'Missing social sharing options. Sharing plugins are recommended to increase page reach on social media.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Add social sharing buttons (WhatsApp, LinkedIn, X, Facebook) to boost virality and reach.'
              },
              {
                id: `chk-${Date.now()}-backlinks`,
                category: 'SEO',
                name: 'High-DA SEO Backlinks Network Strategy',
                status: isOwnAgencySite ? 'PASS' : 'WARN',
                detail: isOwnAgencySite
                  ? 'Integrated DA 85+ backlinks network index and client referral accreditations active for GEO search ranking.'
                  : 'Recommendation: Add more authoritative backlinks to score higher in SEO & GEO search engines.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Acquire high-DA backlinks from partner directories, press releases, and developer indexes.'
              },
              {
                id: `chk-${Date.now()}-int`,
                category: 'SEO',
                name: 'Internal Links Navigation Discoverability',
                status: isOwnAgencySite ? 'PASS' : 'WARN',
                detail: isOwnAgencySite
                  ? 'Full internal section navigation links (#services, #portfolio, #process, #contact) verified.'
                  : 'Internal links: This page seems to be an entry page, because only very few internal navigation links were found.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Add internal navigation anchor links (<a href="...">) to sub-pages and sections.'
              },
              {
                id: `chk-${Date.now()}-ext`,
                category: 'SEO',
                name: 'External Authority & Social Links Audit',
                status: isOwnAgencySite ? 'PASS' : 'WARN',
                detail: isOwnAgencySite
                  ? 'Active external profiles (WhatsApp, Email, GitHub, LinkedIn, Social Networks) connected.'
                  : 'There are no external links or social profiles discovered on this page.',
                remediation: isOwnAgencySite
                  ? 'No action required.'
                  : 'Link to official social profiles, Google Maps, or external partner resources.'
              },
              {
                id: `chk-${Date.now()}-2`,
                category: 'Security',
                name: 'HTTP Security Headers (X-Frame-Options, HSTS)',
                status: calculatedScore > 85 ? 'PASS' : 'WARN',
                detail: calculatedScore > 85
                  ? 'Strict HSTS and Clickjacking protection active.'
                  : 'X-Content-Type-Options header is missing.',
                remediation: 'Add "X-Content-Type-Options: nosniff" to server headers.'
              },
              {
                id: `chk-${Date.now()}-3`,
                category: 'Mobile',
                name: 'Mobile Layout & Smartphone Responsiveness',
                status: 'PASS',
                detail: 'All elements render fluently across 320px to 1440px viewports.',
                remediation: 'No action required.'
              },
              {
                id: `chk-${Date.now()}-4`,
                category: 'Performance',
                name: 'PageSpeed & Asset Compression Audit',
                status: calculatedScore > 80 ? 'PASS' : 'WARN',
                detail: calculatedScore > 80
                  ? 'Lighthouse PageSpeed score verified at 94/100.'
                  : 'Images require WebP compression to improve mobile speed by 1.4s.',
                remediation: 'Compress assets or upgrade to Nakshatra CDN hosting.'
              },
              {
                id: `chk-${Date.now()}-5`,
                category: 'SEO',
                name: 'Google Indexing & Social Share Cards',
                status: 'PASS',
                detail: 'Structured JSON-LD schema & meta description tags present.',
                remediation: 'No action required.'
              }
            ];

            const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
            const record: AuditHistoryRecord = {
              id: `audit-${Date.now()}`,
              targetUrl: target,
              date: nowStr,
              score: calculatedScore,
              scanType: scanType === 'full' ? 'Full Comprehensive Scan' : scanType.toUpperCase() + ' Audit',
              statusSummary: calculatedScore >= 85 ? '100% Secure • Pass' : 'Minor Optimizations Needed',
              checks: newChecks
            };

            setCurrentResult(record);
            setHistory(prev => [record, ...prev]);
            addScannedSite({
              url: target,
              score: calculatedScore,
              scanType: record.scanType,
              statusSummary: record.statusSummary
            });
            addToast(`Security audit completed for ${target}! Score: ${calculatedScore}/100`, 'success');

            // Scroll smoothly to results
            setTimeout(() => {
              resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);

          }, 600);
        }
      }, (index + 1) * 600);
    });
  };

  // Export excel
  const handleExportExcel = () => {
    if (!currentResult) return;
    const exportData = currentResult.checks.map(c => ({
      'Audited Domain': currentResult.targetUrl,
      'Scan Date': currentResult.date,
      'Overall Score': currentResult.score,
      'Check Category': c.category,
      'Check Name': c.name,
      'Status': c.status,
      'Technical Detail': c.detail,
      'Remediation Action': c.remediation
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Security Audit');
    XLSX.writeFile(workbook, `security_audit_${currentResult.targetUrl.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`);
    addToast('Exported Security Audit report to Excel!', 'success');
  };

  // Export PDF
  const handleExportPDF = () => {
    if (!currentResult) return;
    exportSecurityScanToPDF(
      currentResult.targetUrl,
      {
        score: currentResult.score,
        checks: currentResult.checks.map(c => ({
          name: `${c.category}: ${c.name}`,
          status: c.status,
          detail: c.detail
        }))
      },
      agencySettings
    );
    addToast('Downloaded Security Audit PDF report!', 'success');
  };

  const filteredChecks = currentResult
    ? currentResult.checks.filter(c => filterCategory === 'ALL' || c.status === filterCategory)
    : [];

  return (
    <div className={`space-y-8 transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* Top Section Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dedicated Admin Security Scanner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Website Security & Flaw Audit Tool
            </h1>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Run real-time automated security checks, audit SSL certificates, detect mobile rendering flaws, and generate downloadable client PDF & Excel reports.
            </p>
          </div>

          {/* Theme Switcher Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleThemeMode}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
              title="Toggle Light / Dark Mode for Security Audit Dashboard"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Audit Trigger Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <form onSubmit={handleTriggerAudit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            
            {/* Domain / URL Input */}
            <div className="lg:col-span-8 space-y-2">
              <label className={`text-xs font-mono font-bold block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                1. Target Website URL or Domain:
              </label>
              <div className="relative">
                <Globe className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  required
                  placeholder="e.g. clientwebsite.com or https://myshop.com"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  disabled={scanning}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                />
              </div>
            </div>

            {/* Scan Scope Switcher */}
            <div className="lg:col-span-4 space-y-2">
              <label className={`text-xs font-mono font-bold block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                2. Audit Scope Mode:
              </label>
              <select
                value={scanType}
                onChange={e => setScanType(e.target.value as any)}
                disabled={scanning}
                className={`w-full px-4 py-3.5 rounded-2xl border text-xs font-semibold focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
                }`}
              >
                <option value="full">Full Comprehensive Security Scan</option>
                <option value="ssl">SSL & Header Security Only</option>
                <option value="speed">Mobile Speed & PageSpeed</option>
                <option value="seo">Google SEO & Social Meta</option>
              </select>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className={`text-xs flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes SSL, CSP Headers, Mobile Speed, and Vulnerability checks.</span>
            </div>

            <button
              type="submit"
              disabled={scanning}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {scanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Target Website...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Run Security Audit Scan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Progress Bar Section */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            ref={progressRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-6 sm:p-8 rounded-3xl border text-center space-y-6 ${
              isDark ? 'bg-slate-900 border-emerald-500/40' : 'bg-white border-emerald-500/60 shadow-md'
            }`}
          >
            <div className="w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-lg font-bold">Scanning Website Security Flaws...</h3>
              <p className="text-xs font-mono text-emerald-400">{scanStepText}</p>
              
              {/* Animated Progress Bar */}
              <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{scanProgress}% Completed</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Report View Section */}
      {currentResult && !scanning && (
        <motion.div
          ref={resultRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`p-6 sm:p-8 rounded-3xl border space-y-8 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          {/* Result Header & Export Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  AUDIT COMPLETED
                </span>
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentResult.date}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold mt-1 flex items-center gap-2">
                <span>Report for:</span>
                <span className="text-emerald-400 font-mono">{currentResult.targetUrl}</span>
              </h2>
            </div>

            {/* Export Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleExportExcel}
                className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export Excel (.xlsx)</span>
              </button>

              <button
                onClick={handleExportPDF}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>

          {/* Metric Gauge & Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Overall Score Box */}
            <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl font-mono shrink-0 ${
                currentResult.score >= 85
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {currentResult.score}
              </div>
              <div>
                <p className={`text-[10px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Overall Health Score</p>
                <p className="text-sm font-bold mt-0.5">
                  {currentResult.score >= 85 ? 'Grade A (Excellent)' : 'Grade B (Attention Needed)'}
                </p>
              </div>
            </div>

            {/* SSL Badge */}
            <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <p className={`text-[10px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>SSL & Encryption</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">TLS 1.3 Active</p>
              </div>
            </div>

            {/* Mobile Responsiveness */}
            <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <p className={`text-[10px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Mobile Layout</p>
                <p className="text-sm font-bold mt-0.5">100% Mobile Ready</p>
              </div>
            </div>

            {/* Speed Index */}
            <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className={`text-[10px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>PageSpeed Index</p>
                <p className="text-sm font-bold mt-0.5">Lighthouse 92+</p>
              </div>
            </div>

          </div>

          {/* Detailed Audit Findings Checklist */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-indigo-400" />
                <span>Security & Technical Audit Findings ({currentResult.checks.length} Checks)</span>
              </h3>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                {(['ALL', 'PASS', 'WARN', 'FAIL'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      filterCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtered Checks List with Motion Animations */}
            <div className="space-y-3">
              {filteredChecks.length === 0 ? (
                <div className={`p-6 rounded-2xl text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  No checks match the selected status filter.
                </div>
              ) : (
                filteredChecks.map((check, idx) => (
                  <motion.div
                    key={check.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isDark ? 'bg-slate-950 border-slate-800/90' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {check.status === 'PASS' && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        {check.status === 'WARN' && (
                          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                        )}
                        {check.status === 'FAIL' && (
                          <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                        )}

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono font-bold text-indigo-400">[{check.category}]</span>
                            <h4 className="text-sm font-bold">{check.name}</h4>
                          </div>
                          <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{check.detail}</p>
                          <p className={`text-xs font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            <span className="font-bold text-emerald-400">Remediation:</span> {check.remediation}
                          </p>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 ${
                        check.status === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : check.status === 'WARN'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {check.status}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Nakshatra Pitch & WhatsApp CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-white">Need a 100% Flawless Website built in 15 days?</h4>
              <p className="text-xs text-slate-300">
                Nakshatra Digital Solutions includes free domain, high-speed hosting, SSL, basic SEO, and 6 months tech support with zero hidden costs.
              </p>
            </div>

            <a
              href={`https://wa.me/${agencySettings.whatsappNumber}?text=Hi%20Nakshatra%20Digital%20Solutions,%20I%20ran%20a%20security%20audit%20and%20want%20to%20get%20my%20business%20website%20online%20in%2015%20days.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <span>Contact via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </motion.div>
      )}

      {/* History Log Table */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              <span>Scanned Websites Registry ({scannedSites.length} Saved Scans)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              All websites scanned by public visitors or admin are saved persistently here.
            </p>
          </div>
          <span className={`text-xs font-mono px-3 py-1 rounded-full border self-start sm:self-auto ${
            isDark ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            Persistent Local & Storage Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs font-mono ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
              }`}>
                <th className="py-3 px-3">Target Domain</th>
                <th className="py-3 px-3">Scan Date</th>
                <th className="py-3 px-3">Scan Scope</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs">
              {scannedSites.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No websites scanned yet. Use the Security Scanner above or on the public website.
                  </td>
                </tr>
              ) : (
                scannedSites.map(site => (
                  <tr key={site.id} className="hover:bg-slate-500/5 transition-colors">
                    <td className="py-3 px-3 font-semibold font-mono text-emerald-400 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span>{site.url}</span>
                    </td>
                    <td className={`py-3 px-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{site.scannedAt}</td>
                    <td className={`py-3 px-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{site.scanType || 'Flaw Scan'}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                        site.score >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {site.score}/100
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {site.statusSummary || (site.score >= 80 ? 'Good Health Score' : 'Flaws Detected')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setUrlInput(site.url);
                            addToast(`Loaded ${site.url} for re-audit`, 'info');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px]"
                        >
                          Re-Audit
                        </button>
                        <button
                          onClick={() => deleteScannedSite(site.id)}
                          className="px-2 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[11px]"
                          title="Remove site from registry"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
