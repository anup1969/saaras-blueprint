'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { TabBar, StatCard, SearchBar } from '@/components/shared';
import {
  FileText, Users, Download, Printer, Plus, X, Search,
  Upload, Image, QrCode, PenTool, CheckCircle, Eye,
  BarChart3, Filter, Settings,
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockStudentCerts = [
  { id: 'CERT-001', student: 'Aarav Patel', class: '10-A', type: 'Bonafide Certificate', serial: 'BON-2026-0001', date: 'Feb 10, 2026', status: 'Generated' },
  { id: 'CERT-002', student: 'Siya Mehta', class: '10-A', type: 'Character Certificate', serial: 'CHR-2026-0015', date: 'Feb 08, 2026', status: 'Generated' },
  { id: 'CERT-003', student: 'Rohan Desai', class: '10-B', type: 'Transfer Certificate', serial: 'TC-2026-0003', date: 'Feb 12, 2026', status: 'Pending Approval' },
  { id: 'CERT-004', student: 'Vivaan Shah', class: '9-A', type: 'Study Certificate', serial: 'STD-2026-0008', date: 'Feb 05, 2026', status: 'Generated' },
  { id: 'CERT-005', student: 'Ananya Joshi', class: '9-B', type: 'Bonafide Certificate', serial: 'BON-2026-0002', date: 'Feb 11, 2026', status: 'Generated' },
];

const mockStaffCerts = [
  { id: 'SC-001', staff: 'Mr. Sharma', department: 'Mathematics', type: 'Experience Letter', serial: 'EXP-2026-001', date: 'Feb 10, 2026', status: 'Generated' },
  { id: 'SC-002', staff: 'Mrs. Iyer', department: 'Science', type: 'Service Certificate', serial: 'SVC-2026-002', date: 'Feb 08, 2026', status: 'Generated' },
  { id: 'SC-003', staff: 'Ms. D\'Souza', department: 'English', type: 'Salary Certificate', serial: 'SAL-2026-001', date: 'Jan 25, 2026', status: 'Generated' },
  { id: 'SC-004', staff: 'Mr. Reddy', department: 'Social Science', type: 'NOC', serial: 'NOC-2026-001', date: 'Feb 05, 2026', status: 'Revoked' },
];

const certTypes = ['Transfer Certificate', 'Bonafide Certificate', 'Character Certificate', 'Study Certificate'];
const staffCertTypes = ['Experience Letter', 'Service Certificate', 'Salary Certificate', 'NOC', 'Bonafide'];

export default function CertificatesModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState('Student Certificates');
  const [showBulkGenerate, setShowBulkGenerate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState(certTypes[0]);
  const [selectedClass, setSelectedClass] = useState('All');
  const [showSettings, setShowSettings] = useState(false);
  const [includePhoto, setIncludePhoto] = useState(false);
  const [includeQR, setIncludeQR] = useState(true);
  const [qrPosition, setQrPosition] = useState('bottom-right');
  const [serialPrefix, setSerialPrefix] = useState('BON');

  const handleBulkGenerate = () => {
    setIsBulkGenerating(true);
    setBulkProgress(0);
    const interval = setInterval(() => {
      setBulkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBulkGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Certificates</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowSettings(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center gap-1`}>
            <Settings size={10} /> Settings
          </button>
          <button onClick={() => setShowBulkGenerate(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
            <Users size={10} /> Bulk Generate
          </button>
        </div>
      </div>

      <TabBar tabs={['Student Certificates', 'Staff Certificates', 'Reports']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {/* ─── Student Certificates Tab ─── */}
      {activeTab === 'Student Certificates' && (
        <>
          {/* Quick Generate Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certTypes.map(c => (
              <div key={c} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 text-center cursor-pointer hover:shadow-md transition-all`}>
                <FileText size={24} className={`${theme.iconColor} mx-auto mb-2`} />
                <p className={`text-xs font-bold ${theme.highlight}`}>{c}</p>
                <button className={`text-[10px] ${theme.primaryText} font-bold mt-2`}>Generate</button>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={FileText} label="Total Generated" value="156" color="bg-blue-500" sub="this session" theme={theme} />
            <StatCard icon={CheckCircle} label="Approved" value="142" color="bg-emerald-500" sub="ready to print" theme={theme} />
            <StatCard icon={FileText} label="Pending Approval" value="14" color="bg-amber-500" sub="awaiting principal" theme={theme} />
            <StatCard icon={Download} label="Downloaded" value="98" color="bg-purple-500" sub="this month" theme={theme} />
          </div>

          {/* Certificate History Table */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Recent Student Certificates</h3>
              <div className="flex items-center gap-2">
                <SearchBar placeholder="Search student..." theme={theme} icon={Search} />
                <button className={`text-[10px] px-2 py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center gap-1`}>
                  <Filter size={10} /> Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    {['Student', 'Class', 'Certificate Type', 'Serial No', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockStudentCerts.map((c, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{c.student}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.class}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.type}</td>
                      <td className={`py-2.5 px-3 ${theme.primaryText} font-bold text-[10px]`}>{c.serial}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.date}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          c.status === 'Generated' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{c.status}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <button className={`p-1 rounded ${theme.buttonHover}`} title="Preview"><Eye size={12} className={theme.iconColor} /></button>
                          <button className={`p-1 rounded ${theme.buttonHover}`} title="Download"><Download size={12} className={theme.iconColor} /></button>
                          <button className={`p-1 rounded ${theme.buttonHover}`} title="Print"><Printer size={12} className={theme.iconColor} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ─── Staff Certificates Tab ─── */}
      {activeTab === 'Staff Certificates' && (
        <>
          {/* Staff Cert Type Cards */}
          <div className="grid grid-cols-5 gap-3">
            {staffCertTypes.map(c => (
              <div key={c} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 text-center cursor-pointer hover:shadow-md transition-all`}>
                <FileText size={20} className={`${theme.iconColor} mx-auto mb-1.5`} />
                <p className={`text-[10px] font-bold ${theme.highlight}`}>{c}</p>
                <button className={`text-[9px] ${theme.primaryText} font-bold mt-1`}>Generate</button>
              </div>
            ))}
          </div>

          {/* Staff Certificate Table */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Staff Certificate History</h3>
              <SearchBar placeholder="Search staff..." theme={theme} icon={Search} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    {['Staff Name', 'Department', 'Certificate Type', 'Serial No', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} className={`text-left py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockStaffCerts.map((c, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2.5 px-3 font-bold ${theme.highlight}`}>{c.staff}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.department}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.type}</td>
                      <td className={`py-2.5 px-3 ${theme.primaryText} font-bold text-[10px]`}>{c.serial}</td>
                      <td className={`py-2.5 px-3 ${theme.iconColor}`}>{c.date}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          c.status === 'Generated' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>{c.status}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <button className={`p-1 rounded ${theme.buttonHover}`} title="Download"><Download size={12} className={theme.iconColor} /></button>
                          <button className={`p-1 rounded ${theme.buttonHover}`} title="Print"><Printer size={12} className={theme.iconColor} /></button>
                          {c.status !== 'Revoked' && <button className={`p-1 rounded ${theme.buttonHover}`} title="Revoke"><X size={12} className="text-red-500" /></button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ─── Reports Tab ─── */}
      {activeTab === 'Reports' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={FileText} label="Bonafide" value="68" color="bg-blue-500" sub="this year" theme={theme} />
            <StatCard icon={FileText} label="Character" value="42" color="bg-emerald-500" sub="this year" theme={theme} />
            <StatCard icon={FileText} label="Transfer" value="15" color="bg-amber-500" sub="this year" theme={theme} />
            <StatCard icon={FileText} label="Staff Certs" value="31" color="bg-purple-500" sub="this year" theme={theme} />
          </div>

          {/* Monthly Breakdown */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Certificates Generated — Monthly Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    {['Month', 'Bonafide', 'Character', 'Transfer', 'Study', 'Staff', 'Total'].map(h => (
                      <th key={h} className={`text-center py-2 px-3 ${theme.iconColor} font-bold`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { month: 'Apr 2025', bon: 8, chr: 5, tc: 2, std: 3, staff: 4, total: 22 },
                    { month: 'May 2025', bon: 5, chr: 3, tc: 1, std: 2, staff: 2, total: 13 },
                    { month: 'Jun 2025', bon: 3, chr: 2, tc: 0, std: 1, staff: 1, total: 7 },
                    { month: 'Jul 2025', bon: 6, chr: 4, tc: 1, std: 2, staff: 3, total: 16 },
                    { month: 'Aug 2025', bon: 7, chr: 3, tc: 2, std: 2, staff: 2, total: 16 },
                    { month: 'Sep 2025', bon: 5, chr: 4, tc: 1, std: 3, staff: 3, total: 16 },
                    { month: 'Oct 2025', bon: 8, chr: 5, tc: 2, std: 2, staff: 4, total: 21 },
                    { month: 'Nov 2025', bon: 6, chr: 4, tc: 1, std: 3, staff: 3, total: 17 },
                    { month: 'Dec 2025', bon: 4, chr: 3, tc: 1, std: 1, staff: 2, total: 11 },
                    { month: 'Jan 2026', bon: 10, chr: 6, tc: 3, std: 4, staff: 5, total: 28 },
                    { month: 'Feb 2026', bon: 6, chr: 3, tc: 1, std: 2, staff: 2, total: 14 },
                  ].map((r, i) => (
                    <tr key={i} className={`border-b ${theme.border} ${theme.buttonHover}`}>
                      <td className={`py-2 px-3 text-center font-bold ${theme.highlight}`}>{r.month}</td>
                      <td className={`py-2 px-3 text-center ${theme.iconColor}`}>{r.bon}</td>
                      <td className={`py-2 px-3 text-center ${theme.iconColor}`}>{r.chr}</td>
                      <td className={`py-2 px-3 text-center ${theme.iconColor}`}>{r.tc}</td>
                      <td className={`py-2 px-3 text-center ${theme.iconColor}`}>{r.std}</td>
                      <td className={`py-2 px-3 text-center ${theme.iconColor}`}>{r.staff}</td>
                      <td className={`py-2 px-3 text-center font-bold ${theme.highlight}`}>{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── Bulk Generate Modal ─── */}
      {showBulkGenerate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => { if (!isBulkGenerating) setShowBulkGenerate(false); }}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Bulk Certificate Generation</h3>
              {!isBulkGenerating && <button onClick={() => setShowBulkGenerate(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>}
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Certificate Type</label>
                <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                  {certTypes.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Class / Section Filter</label>
                <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                  <option>All</option><option>10-A</option><option>10-B</option><option>9-A</option><option>9-B</option><option>8-A</option><option>8-B</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Serial Number Prefix</label>
                <input type="text" value={serialPrefix} onChange={e => setSerialPrefix(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
              </div>
              <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.secondaryBg}`}>
                <input type="checkbox" id="selectAll" defaultChecked className="w-4 h-4 rounded accent-blue-600" />
                <label htmlFor="selectAll" className={`text-xs font-bold ${theme.highlight}`}>Select all students in selected class ({selectedClass === 'All' ? '365' : '42'} students)</label>
              </div>

              {/* Progress */}
              {isBulkGenerating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold ${theme.iconColor}`}>Generating certificates...</span>
                    <span className={`text-[10px] font-bold ${theme.highlight}`}>{bulkProgress}%</span>
                  </div>
                  <div className={`h-2.5 rounded-full ${theme.secondaryBg}`}>
                    <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${bulkProgress}%` }} />
                  </div>
                </div>
              )}

              {bulkProgress === 100 && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <CheckCircle size={14} className="text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">42 certificates generated successfully!</span>
                </div>
              )}

              <div className="flex gap-2">
                {bulkProgress < 100 ? (
                  <button onClick={handleBulkGenerate} disabled={isBulkGenerating} className={`flex-1 text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold ${isBulkGenerating ? 'opacity-50' : ''}`}>
                    {isBulkGenerating ? 'Generating...' : `Generate ${selectedClass === 'All' ? '365' : '42'} Certificates`}
                  </button>
                ) : (
                  <>
                    <button onClick={() => alert('Downloaded as ZIP! (Blueprint demo)')} className="flex-1 text-xs py-2.5 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center gap-1">
                      <Download size={12} /> Download ZIP
                    </button>
                    <button onClick={() => alert('Print batch queued! (Blueprint demo)')} className={`flex-1 text-xs py-2.5 rounded-xl ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center justify-center gap-1`}>
                      <Printer size={12} /> Print Batch
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Settings Modal (Background, Photo, QR, Signature) ─── */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowSettings(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Certificate Settings</h3>
              <button onClick={() => setShowSettings(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
            </div>
            <div className="space-y-4">
              {/* Background Image */}
              <div>
                <label className={`text-xs font-bold ${theme.highlight} block mb-2`}>Background Image</label>
                <div className={`h-32 rounded-xl border-2 border-dashed ${theme.border} flex flex-col items-center justify-center gap-2 cursor-pointer ${theme.buttonHover} transition-all`}>
                  <Upload size={20} className={theme.iconColor} />
                  <span className={`text-[10px] ${theme.iconColor}`}>Click to upload certificate background (PNG, JPG)</span>
                  <span className={`text-[9px] ${theme.iconColor}`}>Recommended: 2480 x 3508 px (A4)</span>
                </div>
              </div>

              {/* Photo Embed */}
              <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-2">
                  <Image size={14} className={theme.iconColor} />
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Include Student/Staff Photo</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Embed passport-size photo on certificate</p>
                  </div>
                </div>
                <button
                  onClick={() => setIncludePhoto(!includePhoto)}
                  className={`w-10 h-5 rounded-full transition-all ${includePhoto ? 'bg-emerald-500' : 'bg-gray-300'} relative`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${includePhoto ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>

              {/* QR Code / Barcode */}
              <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-2`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode size={14} className={theme.iconColor} />
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>QR Code / Barcode</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>Add verification QR code to certificate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIncludeQR(!includeQR)}
                    className={`w-10 h-5 rounded-full transition-all ${includeQR ? 'bg-emerald-500' : 'bg-gray-300'} relative`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${includeQR ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
                {includeQR && (
                  <div>
                    <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>QR Position</label>
                    <select value={qrPosition} onChange={e => setQrPosition(e.target.value)} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom-right">Bottom Right</option>
                      <option value="center-bottom">Center Bottom</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Digital Signature */}
              <div>
                <label className={`text-xs font-bold ${theme.highlight} block mb-2`}>Digital Signature</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border} text-center cursor-pointer ${theme.buttonHover}`}>
                    <PenTool size={16} className={`${theme.iconColor} mx-auto mb-1`} />
                    <p className={`text-[10px] font-bold ${theme.iconColor}`}>Upload Principal&apos;s Signature</p>
                    <p className={`text-[9px] ${theme.iconColor}`}>PNG with transparent bg</p>
                  </div>
                  <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border} text-center cursor-pointer ${theme.buttonHover}`}>
                    <PenTool size={16} className={`${theme.iconColor} mx-auto mb-1`} />
                    <p className={`text-[10px] font-bold ${theme.iconColor}`}>Upload School Seal</p>
                    <p className={`text-[9px] ${theme.iconColor}`}>PNG with transparent bg</p>
                  </div>
                </div>
              </div>

              <button onClick={() => { alert('Settings saved! (Blueprint demo)'); setShowSettings(false); }} className={`w-full text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
