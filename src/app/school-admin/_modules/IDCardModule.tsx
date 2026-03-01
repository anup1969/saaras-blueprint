'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar, DataTable } from '@/components/shared';
import {
  CreditCard, Printer, Eye, Search, Filter, Plus, Trash2, RefreshCw,
  Check, Layout, User, QrCode, X, Download
} from 'lucide-react';

// ── Mock Data ──
const studentCards = [
  { id: 'SC001', studentName: 'Aarav Patel', class: '10-A', section: 'A', rollNo: 12, admissionNo: 'SAR-2025-0001', bloodGroup: 'B+', photo: 'AP', status: 'Active', validUntil: '31-Mar-2027', printedOn: '15-Jun-2025' },
  { id: 'SC002', studentName: 'Saanvi Sharma', class: '8-B', section: 'B', rollNo: 5, admissionNo: 'SAR-2025-0002', bloodGroup: 'O+', photo: 'SS', status: 'Active', validUntil: '31-Mar-2027', printedOn: '15-Jun-2025' },
  { id: 'SC003', studentName: 'Vivaan Mehta', class: '6-A', section: 'A', rollNo: 18, admissionNo: 'SAR-2025-0003', bloodGroup: 'A+', photo: 'VM', status: 'Pending Print', validUntil: '', printedOn: '' },
  { id: 'SC004', studentName: 'Diya Reddy', class: '9-C', section: 'C', rollNo: 8, admissionNo: 'SAR-2025-0004', bloodGroup: 'AB+', photo: 'DR', status: 'Active', validUntil: '31-Mar-2027', printedOn: '15-Jun-2025' },
  { id: 'SC005', studentName: 'Kabir Joshi', class: '5-B', section: 'B', rollNo: 22, admissionNo: 'SAR-2025-0005', bloodGroup: 'B-', photo: 'KJ', status: 'Expired', validUntil: '31-Mar-2025', printedOn: '10-Jun-2024' },
  { id: 'SC006', studentName: 'Ananya Gupta', class: '7-A', section: 'A', rollNo: 3, admissionNo: 'SAR-2025-0006', bloodGroup: 'O-', photo: 'AG', status: 'Pending Print', validUntil: '', printedOn: '' },
  { id: 'SC007', studentName: 'Rohan Singh', class: '4-C', section: 'C', rollNo: 15, admissionNo: 'SAR-2025-0007', bloodGroup: 'A+', photo: 'RS', status: 'Active', validUntil: '31-Mar-2027', printedOn: '16-Jun-2025' },
  { id: 'SC008', studentName: 'Priya Nair', class: '3-A', section: 'A', rollNo: 9, admissionNo: 'SAR-2025-0008', bloodGroup: 'O+', photo: 'PN', status: 'Suspended', validUntil: '31-Mar-2027', printedOn: '15-Jun-2025' },
];

const staffCards = [
  { id: 'ST001', staffName: 'Mr. Sharma', designation: 'Mathematics Teacher', department: 'Academics', employeeId: 'EMP-001', bloodGroup: 'A+', photo: 'MS', status: 'Active', validUntil: '31-Mar-2027', printedOn: '01-Jun-2025' },
  { id: 'ST002', staffName: 'Mrs. Iyer', designation: 'Science Teacher', department: 'Academics', employeeId: 'EMP-002', bloodGroup: 'B+', photo: 'MI', status: 'Active', validUntil: '31-Mar-2027', printedOn: '01-Jun-2025' },
  { id: 'ST003', staffName: 'Ms. D\'Souza', designation: 'English Teacher', department: 'Academics', employeeId: 'EMP-003', bloodGroup: 'O+', photo: 'MD', status: 'Pending Print', validUntil: '', printedOn: '' },
  { id: 'ST004', staffName: 'Mr. Patil', designation: 'PT Teacher', department: 'Sports', employeeId: 'EMP-004', bloodGroup: 'AB+', photo: 'MP', status: 'Active', validUntil: '31-Mar-2027', printedOn: '01-Jun-2025' },
  { id: 'ST005', staffName: 'Mrs. Kulkarni', designation: 'Art Teacher', department: 'Arts', employeeId: 'EMP-005', bloodGroup: 'A-', photo: 'MK', status: 'Active', validUntil: '31-Mar-2027', printedOn: '01-Jun-2025' },
  { id: 'ST006', staffName: 'Mr. Joshi', designation: 'Lab Assistant', department: 'Academics', employeeId: 'EMP-006', bloodGroup: 'B-', photo: 'MJ', status: 'Pending Print', validUntil: '', printedOn: '' },
];

const cardStatusColor = (s: string) => {
  if (s === 'Active') return 'bg-emerald-100 text-emerald-700';
  if (s === 'Expired') return 'bg-red-100 text-red-700';
  if (s === 'Suspended') return 'bg-slate-100 text-slate-600';
  return 'bg-amber-100 text-amber-700';
};

const templates = [
  { id: 'T1', name: 'Classic Blue', desc: 'Blue header, centered photo, white body', headerColor: 'bg-blue-600', bodyColor: 'bg-white', selected: true },
  { id: 'T2', name: 'Modern Green', desc: 'Green sidebar, right-aligned info', headerColor: 'bg-emerald-600', bodyColor: 'bg-white', selected: false },
  { id: 'T3', name: 'Minimal White', desc: 'Clean white, minimal color accents', headerColor: 'bg-slate-700', bodyColor: 'bg-white', selected: false },
  { id: 'T4', name: 'Custom', desc: 'Upload your own design', headerColor: 'bg-purple-600', bodyColor: 'bg-white', selected: false },
];

export default function IDCardModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Student IDs');
  const [selectedTemplate, setSelectedTemplate] = useState('T1');
  const [showPreview, setShowPreview] = useState(false);
  const [previewCard, setPreviewCard] = useState<typeof studentCards[0] | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const pendingPrint = [...studentCards, ...staffCards].filter(c => c.status === 'Pending Print');

  const toggleSelect = (id: string) => {
    setSelectedCards(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>ID Card Management</h1>
      <TabBar tabs={['Student IDs', 'Staff IDs', 'Print Queue', 'Templates']} active={tab} onChange={setTab} theme={theme} />

      {/* ── Student IDs ── */}
      {tab === 'Student IDs' && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <SearchBar placeholder="Search by name, class, admission no..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
            <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1 whitespace-nowrap`}><Plus size={14} /> Generate IDs</button>
          </div>
          {selectedCards.length > 0 && (
            <div className={`p-3 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
              <span className={`text-xs font-bold ${theme.highlight}`}>{selectedCards.length} selected</span>
              <button onClick={() => { window.alert(`Printing ${selectedCards.length} cards... (Blueprint demo)`); setSelectedCards([]); }} className={`px-3 py-1.5 ${theme.primary} text-white rounded-lg text-xs font-bold flex items-center gap-1`}><Printer size={12} /> Print Selected</button>
            </div>
          )}
          <DataTable
            headers={['', 'Photo', 'Name', 'Class', 'Roll No', 'Adm. No', 'Blood', 'Status', 'Valid Until', 'Actions']}
            rows={studentCards.map(c => [
              <input key="cb" type="checkbox" checked={selectedCards.includes(c.id)} onChange={() => toggleSelect(c.id)} className="accent-slate-600" />,
              <div key="photo" className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">{c.photo}</div>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{c.studentName}</span>,
              <span key="cls" className={theme.iconColor}>{c.class}</span>,
              <span key="roll" className={theme.iconColor}>{c.rollNo}</span>,
              <span key="adm" className={`font-mono text-[10px] ${theme.primaryText}`}>{c.admissionNo}</span>,
              <span key="blood" className="text-red-600 font-bold text-xs">{c.bloodGroup}</span>,
              <span key="st" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${cardStatusColor(c.status)}`}>{c.status}</span>,
              <span key="valid" className={theme.iconColor}>{c.validUntil || '-'}</span>,
              <div key="actions" className="flex gap-1">
                <button onClick={() => { setPreviewCard(c); setShowPreview(true); }} className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Preview"><Eye size={12} className={theme.iconColor} /></button>
                <button onClick={() => window.alert(`Printing ID for ${c.studentName}... (Blueprint demo)`)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Print"><Printer size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Reprint"><RefreshCw size={12} className={theme.iconColor} /></button>
              </div>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* ── Staff IDs ── */}
      {tab === 'Staff IDs' && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <SearchBar placeholder="Search by name, department, employee ID..." theme={theme} icon={Search} />
            <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1 whitespace-nowrap`}><Plus size={14} /> Generate IDs</button>
          </div>
          <DataTable
            headers={['Photo', 'Name', 'Designation', 'Department', 'Emp ID', 'Blood', 'Status', 'Valid Until', 'Actions']}
            rows={staffCards.map(c => [
              <div key="photo" className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold">{c.photo}</div>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{c.staffName}</span>,
              <span key="des" className={`text-xs ${theme.iconColor}`}>{c.designation}</span>,
              <span key="dept" className={theme.iconColor}>{c.department}</span>,
              <span key="emp" className={`font-mono text-[10px] ${theme.primaryText}`}>{c.employeeId}</span>,
              <span key="blood" className="text-red-600 font-bold text-xs">{c.bloodGroup}</span>,
              <span key="st" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${cardStatusColor(c.status)}`}>{c.status}</span>,
              <span key="valid" className={theme.iconColor}>{c.validUntil || '-'}</span>,
              <div key="actions" className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Preview"><Eye size={12} className={theme.iconColor} /></button>
                <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Print"><Printer size={12} className={theme.iconColor} /></button>
              </div>,
            ])}
            theme={theme}
          />
        </div>
      )}

      {/* ── Print Queue ── */}
      {tab === 'Print Queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className={`text-xs ${theme.iconColor}`}>{pendingPrint.length} card(s) waiting to be printed</p>
            <div className="flex gap-2">
              <button onClick={() => window.alert('Clearing print queue... (Blueprint demo)')} className={`px-3 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1`}><Trash2 size={12} /> Clear Queue</button>
              <button onClick={() => window.alert(`Printing all ${pendingPrint.length} cards... (Blueprint demo)`)} className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}><Printer size={14} /> Print All</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pendingPrint.map(c => {
              const name = 'studentName' in c ? (c as typeof studentCards[0]).studentName : (c as typeof staffCards[0]).staffName;
              const subtitle = 'class' in c && 'rollNo' in c
                ? `Class ${(c as typeof studentCards[0]).class} | Roll ${(c as typeof studentCards[0]).rollNo}`
                : `${(c as typeof staffCards[0]).designation}`;
              const initials = 'photo' in c ? c.photo : '';
              return (
                <div key={c.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
                  {/* Mini card preview — 80x50 style */}
                  <div className="bg-blue-600 px-3 py-1.5">
                    <p className="text-[8px] text-white font-bold text-center">SAARAS INTERNATIONAL SCHOOL</p>
                  </div>
                  <div className="p-2.5 flex gap-2">
                    <div className="w-10 h-12 rounded bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-500">{initials}</div>
                    <div className="flex-1">
                      <p className={`text-[10px] font-bold ${theme.highlight}`}>{name}</p>
                      <p className={`text-[8px] ${theme.iconColor}`}>{subtitle}</p>
                      <div className="w-12 h-3 bg-gray-200 rounded mt-1 flex items-center justify-center">
                        <span className="text-[6px] text-gray-500">BARCODE</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Print History</h3>
            <div className="space-y-2">
              {[
                { date: '15-Jun-2025', count: 320, type: 'Student' },
                { date: '01-Jun-2025', count: 45, type: 'Staff' },
                { date: '20-Jan-2025', count: 15, type: 'Student (Reprint)' },
              ].map((h, i) => (
                <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <span className={`text-xs ${theme.iconColor}`}>{h.date}</span>
                  <span className={`text-xs font-bold ${theme.highlight}`}>{h.count} cards</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700`}>{h.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Templates ── */}
      {tab === 'Templates' && (
        <div className="space-y-4">
          <p className={`text-xs ${theme.iconColor}`}>Select a card template for ID generation. Currently selected template will be used for all new cards.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map(t => (
              <div
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`${theme.cardBg} rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${selectedTemplate === t.id ? 'border-blue-500 shadow-lg' : `${theme.border} hover:shadow-md`}`}
              >
                {/* Mini card preview */}
                <div className={`${t.headerColor} px-3 py-2`}>
                  <p className="text-[8px] text-white font-bold text-center">SCHOOL NAME</p>
                </div>
                <div className={`${t.bodyColor} p-3 space-y-2`}>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-12 rounded bg-gray-200 flex items-center justify-center">
                      <User size={14} className="text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="w-16 h-2 bg-gray-200 rounded" />
                      <div className="w-12 h-2 bg-gray-100 rounded" />
                      <div className="w-14 h-2 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-20 h-4 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-[6px] text-gray-500">BARCODE / QR</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{t.name}</p>
                    {selectedTemplate === t.id && <Check size={14} className="text-blue-600" />}
                  </div>
                  <p className={`text-[10px] ${theme.iconColor}`}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Card Preview Modal ── */}
      {showPreview && previewCard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-md p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>Card Preview</h2>
              <button onClick={() => setShowPreview(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            {/* Front */}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Front</p>
              <div className="border-2 border-blue-600 rounded-xl overflow-hidden" style={{ maxWidth: 300 }}>
                <div className="bg-blue-600 px-4 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center text-[8px] text-white font-bold">LOGO</div>
                  <div className="flex-1 text-center">
                    <p className="text-[10px] text-white font-bold">SAARAS INTERNATIONAL SCHOOL</p>
                    <p className="text-[7px] text-blue-200">Affiliated to CBSE | Ahmedabad</p>
                  </div>
                </div>
                <div className="bg-white p-3 space-y-2">
                  <div className="flex gap-3">
                    <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">{previewCard.photo}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs font-bold text-gray-800">{previewCard.studentName}</p>
                      <p className="text-[10px] text-gray-600">Class: {previewCard.class}</p>
                      <p className="text-[10px] text-gray-600">Roll No: {previewCard.rollNo}</p>
                      <p className="text-[10px] text-gray-600">Adm: {previewCard.admissionNo}</p>
                      <p className="text-[10px] text-red-600 font-bold">Blood: {previewCard.bloodGroup}</p>
                    </div>
                  </div>
                  <div className="flex justify-center pt-1">
                    <div className="w-32 h-5 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-[7px] text-gray-500">|||| {previewCard.admissionNo} ||||</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Back */}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase mb-2`}>Back</p>
              <div className="border-2 border-blue-600 rounded-xl overflow-hidden bg-white p-3 space-y-2" style={{ maxWidth: 300 }}>
                <p className="text-[10px] font-bold text-gray-800">Emergency Contact</p>
                <p className="text-[9px] text-gray-600">Parent: Rajesh Patel | Ph: 98765 43210</p>
                <p className="text-[9px] text-gray-600">Address: Satellite Rd, Ahmedabad</p>
                <hr className="border-gray-200" />
                <p className="text-[8px] text-gray-500 italic">If found, please return to school reception.</p>
                <p className="text-[8px] text-gray-500">Valid Until: {previewCard.validUntil || 'TBD'}</p>
                <div className="flex justify-end">
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <QrCode size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowPreview(false)} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Close</button>
              <button onClick={() => window.alert(`Printing ID for ${previewCard.studentName}... (Blueprint demo)`)} className={`flex-1 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center justify-center gap-1`}><Printer size={14} /> Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
