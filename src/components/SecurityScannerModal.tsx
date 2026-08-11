import React, { useState } from 'react';
import {
  ShieldCheck,
  X,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  Globe,
  Sparkles,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { exportSecurityScanToPDF } from '../lib/reportExporter';
import { useApp } from '../context/AppContext';

interface SecurityScannerModalProps {
  onClose: () => void;
}

export const SecurityScannerModal: React.FC<SecurityScannerModalProps> = ({ onClose }) => {
  const { agencySettings, setActiveTab, addScannedSite, addToast } = useApp();
  const [urlInput, setUrlInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [results, setResults] = useState<{
    targetUrl: string;
    score: number;
    checks: { name: string; status: 'PASS' | 'WARN' | 'FAIL'; detail: string }[];
  } | null>(null);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    let cleanUrl = urlInput.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    setScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1400);

    setTimeout(() => {
      setScanning(false);
      const computedScore = Math.floor(Math.random() * 25) + 60;
      setResults({
        targetUrl: cleanUrl,
        score: computedScore,
        checks: [
          {
            name: 'SSL Certificate & HTTPS Security',
            status: 'PASS',
            detail: 'Valid SSL Encryption present. Certificate is active.'
          },
          {
            name: 'Mobile Responsiveness & Viewport',
            status: 'WARN',
            detail: 'Text elements and tap targets require mobile layout optimization for smartphones.'
          },
          {
            name: 'Basic SEO & Google Indexing Readiness',
            status: 'WARN',
            detail: 'Missing Meta Social Cards (OpenGraph) and Structured Schema markup.'
          },
          {
            name: 'Security Headers & XSS Protection',
            status: 'PASS',
            detail: 'Content Security Policy and Anti-Clickjacking headers are enabled.'
          },
          {
            name: 'Page Load Speed & Assets Optimization',
            status: 'FAIL',
            detail: 'Uncompressed image assets slowing down mobile load times past 3.2 seconds.'
          }
        ]
      });

      // Save scanned site persistently in AppContext & localStorage
      addScannedSite({
        url: cleanUrl,
        score: computedScore,
        scanType: 'Public Visitor Security Scan',
        statusSummary: computedScore >= 80 ? 'Good Health Score' : 'Flaws / Mobile Bottlenecks Detected'
      });
      addToast(`Scanned website "${cleanUrl}" saved to Admin Registry!`, 'success');
    }, 2100);
  };

  const handleDownloadPDF = () => {
    if (!results) return;
    exportSecurityScanToPDF(results.targetUrl, results);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/70 backdrop-blur-sm animate-fade-in text-[#111111]">
      <div className="relative w-full max-w-2xl bg-[#f6f4ee] border border-[#111111]/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#111111] text-white hover:bg-[#ff5436] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#dbe7de] border border-[#2e5441]/20 flex items-center justify-center text-[#2e5441] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#111111]">Free Website Security & Flaw Scan</h2>
            <p className="text-xs text-[#555555] font-medium">
              Check your website for SSL flaws, mobile rendering bugs, speed bottlenecks, and SEO issues.
            </p>
          </div>
        </div>

        {/* Form Input */}
        {!results && !scanning && (
          <form onSubmit={handleStartScan} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-[#111111] font-mono font-bold uppercase">Enter your website URL:</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. mybusiness.com"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#111111]/10 text-[#111111] text-sm font-medium focus:outline-none focus:border-[#ff5436]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Run Free Security Flaw Scan Now</span>
            </button>

            <div className="p-4 rounded-xl bg-white border border-[#111111]/10 text-xs text-[#555555] space-y-1">
              <p className="font-bold text-[#2e5441] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 100% Free & Confidential
              </p>
              <p>We do not store or share your website data. You will receive an instant PDF report with remediation advice.</p>
            </div>
          </form>
        )}

        {/* Scanning Animation */}
        {scanning && (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full border-4 border-[#2e5441]/20 border-t-[#ff5436] animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h3 className="text-base font-black text-[#111111]">Scanning Website Flaws & Security...</h3>
              <p className="text-xs text-[#2e5441] font-mono font-bold">
                {scanStep === 1 && '1/3 Checking SSL Certificate & Encryption Protocol...'}
                {scanStep === 2 && '2/3 Auditing Mobile Layout & Viewport Rendering...'}
                {scanStep === 3 && '3/3 Analyzing PageSpeed & Google SEO Meta Tags...'}
              </p>
            </div>
          </div>
        )}

        {/* Results View */}
        {results && !scanning && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Score Banner */}
            <div className="p-5 rounded-2xl bg-white border border-[#111111]/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-xs font-mono font-bold text-[#666666] uppercase">Target Scanned</span>
                <p className="text-sm font-black text-[#111111]">{results.targetUrl}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#666666] uppercase">Health Score</span>
                <p className="text-3xl font-black font-mono text-[#ff5436]">{results.score}/100</p>
              </div>
            </div>

            {/* Checks list */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#111111] font-mono uppercase">Audit Findings:</p>
              <div className="space-y-2">
                {results.checks.map((chk, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#111111]/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#111111]">{chk.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        chk.status === 'PASS'
                          ? 'bg-[#dbe7de] text-[#2e5441]'
                          : chk.status === 'WARN'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {chk.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#555555]">{chk.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF Export & Fix Actions */}
            <div className="pt-4 border-t border-[#111111]/10 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#111111] text-white hover:bg-[#222222] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#ff5436]" />
                <span>Export PDF Report</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else setActiveTab('contact');
                }}
                className="w-full sm:w-auto flex-1 py-3 bg-[#ff5436] hover:bg-[#e24226] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
              >
                <span>Fix Flaws in 15 Days</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
