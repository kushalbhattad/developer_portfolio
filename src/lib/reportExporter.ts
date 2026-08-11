import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Inquiry, CaseStudy, Service } from '../types';

/**
 * Export Inquiries / Leads to Excel (.xlsx) file
 */
export function exportInquiriesToExcel(inquiries: Inquiry[], fileName = 'nakshatra_client_inquiries.xlsx') {
  const data = inquiries.map(inq => ({
    'ID': inq.id,
    'Client Name': inq.name,
    'Email': inq.email,
    'Phone': inq.phone || 'N/A',
    'Service Requested': inq.serviceType,
    'Budget': inq.budgetRange,
    'Timeline': inq.timeline,
    'Status': inq.status,
    'Submitted Date': inq.submittedAt,
    'Client Message': inq.message,
    'Internal Notes': inq.notes || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Client Inquiries');

  // Auto column widths
  const max_width = data.reduce((w, r) => Math.max(w, r['Client Name']?.length || 10), 12);
  worksheet['!cols'] = [{ wch: 10 }, { wch: max_width }, { wch: 25 }, { wch: 18 }, { wch: 28 }, { wch: 18 }, { wch: 15 }, { wch: 12 }, { wch: 18 }, { wch: 40 }];

  XLSX.writeFile(workbook, fileName);
}

/**
 * Export Inquiries / Leads to PDF Summary Report
 */
export function exportInquiriesToPDF(inquiries: Inquiry[], fileName = 'nakshatra_leads_report.pdf') {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('NAKSHATRA DIGITAL ARTS', 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text('Client Leads & Project Inquiries Report', 14, 27);

  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 140, 27);

  let y = 45;

  inquiries.forEach((inq, index) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, 182, 38, 3, 3, 'F');

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`${index + 1}. ${inq.name} (${inq.serviceType})`, 18, y + 8);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Email: ${inq.email} | Phone: ${inq.phone || 'N/A'}`, 18, y + 16);
    doc.text(`Budget: ${inq.budgetRange} | Timeline: ${inq.timeline} | Status: ${inq.status}`, 18, y + 23);

    // Message snippet
    const snippet = inq.message.length > 85 ? inq.message.substring(0, 85) + '...' : inq.message;
    doc.setTextColor(100, 116, 139);
    doc.text(`Message: "${snippet}"`, 18, y + 31);

    y += 44;
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Nakshatra Digital Arts — Get Your Business Online in 15 Days 🚀 | Zero Hidden Costs', 14, 285);

  doc.save(fileName);
}

/**
 * Export Security Audit Scan to PDF
 */
export function exportSecurityScanToPDF(targetUrl: string, results: { score: number; checks: { name: string; status: string; detail: string }[] }) {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('NAKSHATRA DIGITAL ARTS', 14, 18);

  doc.setFontSize(11);
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text('FREE WEBSITE SECURITY & FLAW AUDIT REPORT', 14, 28);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`Audited URL: ${targetUrl} | Date: ${new Date().toLocaleDateString()}`, 14, 35);

  // Score Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 48, 182, 30, 4, 4, 'F');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Overall Security & Performance Score: ${results.score} / 100`, 22, 60);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(
    results.score >= 80
      ? 'Status: GOOD — Minor optimizations recommended.'
      : 'Status: ATTENTION NEEDED — Flaws detected in security headers, mobile speed, or SSL.',
    22,
    68
  );

  let y = 88;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Security & Technical Checklist:', 14, y);

  y += 8;

  results.checks.forEach(check => {
    doc.setFillColor(check.status === 'PASS' ? 240 : 254, check.status === 'PASS' ? 253 : 242, check.status === 'PASS' ? 244 : 242);
    doc.roundedRect(14, y, 182, 22, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(check.status === 'PASS' ? 16 : 225, check.status === 'PASS' ? 185 : 29, check.status === 'PASS' ? 129 : 72);
    doc.text(`[${check.status}] ${check.name}`, 18, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(check.detail, 18, y + 16);

    y += 26;
  });

  // Call to action
  y += 10;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, y, 182, 35, 4, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Upgrade to a 100% Secure, Mobile-Ready Website in 15 Days!', 22, y + 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Nakshatra Digital Arts handles Domain, Hosting, SSL & Security Flaw fixes with zero hidden costs.', 22, y + 20);
  doc.text('DM us or WhatsApp +91 98765 43210 (Only 25% Advance, Pay balance on Go-Live)', 22, y + 27);

  doc.save(`security_scan_${targetUrl.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}
