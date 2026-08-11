import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Inquiry, CaseStudy, Service, AgencySettings } from '../types';

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
export function exportInquiriesToPDF(
  inquiries: Inquiry[],
  agencySettings?: AgencySettings,
  fileName = 'nakshatra_leads_report.pdf'
) {
  const doc = new jsPDF();
  const agencyName = agencySettings?.agencyName || 'NAKSHATRA DIGITAL SOLUTIONS';
  const phone = agencySettings?.contactPhone || '+91 70203 23182';
  const email = agencySettings?.contactEmail || 'nakshatradigitial@gmail.com';
  const tagline = agencySettings?.tagline || 'Get Your Business Online in 15 Days';

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 38, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(agencyName.toUpperCase(), 14, 16);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text('Client Leads & Project Inquiries Report', 14, 24);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8.5);
  doc.text(`Contact: ${phone} | Email: ${email}`, 14, 32);

  doc.setTextColor(148, 163, 184);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 140, 32);

  let y = 48;

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
  doc.text(`${agencyName} — ${tagline} 🚀 | Phone: ${phone} | Email: ${email}`, 14, 285);

  doc.save(fileName);
}

/**
 * Export Security Audit Scan to PDF
 */
export function exportSecurityScanToPDF(
  targetUrl: string,
  results: { score: number; checks: { name: string; status: string; detail: string }[] },
  agencySettings?: AgencySettings
) {
  const doc = new jsPDF();
  const agencyName = agencySettings?.agencyName || 'NAKSHATRA DIGITAL SOLUTIONS';
  const phone = agencySettings?.contactPhone || '+91 70203 23182';
  const email = agencySettings?.contactEmail || 'nakshatradigitial@gmail.com';
  const rawWhatsapp = agencySettings?.whatsappNumber || '917020323182';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 42, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(agencyName.toUpperCase(), 14, 16);

  doc.setFontSize(10);
  doc.setTextColor(56, 189, 248); // sky-400
  doc.text('FREE WEBSITE SECURITY & FLAW AUDIT REPORT', 14, 25);

  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text(`Phone: ${phone} | Email: ${email} | WhatsApp: +${cleanWhatsapp}`, 14, 34);

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Target URL: ${targetUrl}`, 130, 25);
  doc.text(`Audited Date: ${new Date().toLocaleDateString()}`, 130, 34);

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
      ? 'Status: EXCELLENT / GOOD — High-performance & secure configuration verified.'
      : 'Status: ATTENTION NEEDED — Flaws detected in security headers, mobile speed, or assets.',
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

  // Call to action box
  y += 8;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, y, 182, 38, 4, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`Upgrade to a 100% Secure, Mobile-Ready Website with ${agencyName}!`, 22, y + 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(`${agencyName} handles Domain, Hosting, SSL & Security Flaw fixes with zero hidden costs.`, 22, y + 20);
  doc.text(`Call/WhatsApp: ${phone} | Email: ${email}`, 22, y + 27);
  doc.text(`Only 25% Advance — Pay balance on final Go-Live after 100% satisfaction!`, 22, y + 33);

  doc.save(`security_scan_${targetUrl.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}
