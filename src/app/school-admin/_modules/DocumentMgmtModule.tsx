'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, SearchBar } from '@/components/shared';
import {
  FileText, FolderOpen, Bell, Upload, Plus, Search, Download, Eye, Trash2,
  Pin, Clock, Users, CheckCircle, File, FileSpreadsheet, Image, X, Filter,
  ChevronDown, ChevronUp
} from 'lucide-react';

// ── Mock Data ──
const documents = [
  { id: 'DOC001', title: 'Annual Academic Calendar 2025-26', category: 'Circulars', uploadedBy: 'Dr. Priya Sharma', uploadDate: '01-Jun-2025', fileType: 'PDF', fileSize: '1.2 MB', version: 'v2.0', status: 'Active', acknowledgements: 85 },
  { id: 'DOC002', title: 'Fee Payment Guidelines', category: 'Notices', uploadedBy: 'Accounts Head', uploadDate: '15-Jan-2026', fileType: 'PDF', fileSize: '450 KB', version: 'v1.0', status: 'Active', acknowledgements: 72 },
  { id: 'DOC003', title: 'Anti-Bullying Policy', category: 'Policies', uploadedBy: 'Vice Principal', uploadDate: '10-Aug-2025', fileType: 'PDF', fileSize: '320 KB', version: 'v3.1', status: 'Active', acknowledgements: 90 },
  { id: 'DOC004', title: 'Leave Application Form', category: 'Forms', uploadedBy: 'HR Manager', uploadDate: '01-Apr-2025', fileType: 'DOCX', fileSize: '85 KB', version: 'v1.2', status: 'Active', acknowledgements: 0 },
  { id: 'DOC005', title: 'Transfer Certificate Template', category: 'Templates', uploadedBy: 'School Admin', uploadDate: '20-May-2025', fileType: 'DOCX', fileSize: '120 KB', version: 'v2.0', status: 'Active', acknowledgements: 0 },
  { id: 'DOC006', title: 'Exam Hall Ticket Format', category: 'Templates', uploadedBy: 'Exam Controller', uploadDate: '28-Feb-2026', fileType: 'PDF', fileSize: '200 KB', version: 'v1.0', status: 'Active', acknowledgements: 0 },
  { id: 'DOC007', title: 'Parent-Teacher Meeting Schedule', category: 'Notices', uploadedBy: 'Dr. Priya Sharma', uploadDate: '25-Feb-2026', fileType: 'PDF', fileSize: '180 KB', version: 'v1.0', status: 'Active', acknowledgements: 58 },
  { id: 'DOC008', title: 'CBSE Compliance Report 2024-25', category: 'Policies', uploadedBy: 'School Admin', uploadDate: '15-Sep-2025', fileType: 'PDF', fileSize: '2.1 MB', version: 'v1.0', status: 'Active', acknowledgements: 45 },
  { id: 'DOC009', title: 'Admission Form 2026-27', category: 'Forms', uploadedBy: 'Admissions', uploadDate: '01-Feb-2026', fileType: 'PDF', fileSize: '350 KB', version: 'v1.0', status: 'Active', acknowledgements: 0 },
  { id: 'DOC010', title: 'Winter Break Notice (Expired)', category: 'Notices', uploadedBy: 'Dr. Priya Sharma', uploadDate: '15-Dec-2025', fileType: 'PDF', fileSize: '90 KB', version: 'v1.0', status: 'Expired', acknowledgements: 95 },
];

const circulars = [
  { id: 'CIR001', title: 'Annual Day Celebration — March 15', date: '01-Mar-2026', issuedBy: 'Principal', targetAudience: 'All', status: 'Active', acknowledgementRate: 72 },
  { id: 'CIR002', title: 'Unit Test 3 Schedule Released', date: '25-Feb-2026', issuedBy: 'Exam Controller', targetAudience: 'Students', status: 'Active', acknowledgementRate: 85 },
  { id: 'CIR003', title: 'Staff Professional Development — Mar 5', date: '20-Feb-2026', issuedBy: 'Vice Principal', targetAudience: 'Teachers', status: 'Active', acknowledgementRate: 91 },
  { id: 'CIR004', title: 'Updated Transport Route for Zone 3', date: '18-Feb-2026', issuedBy: 'Transport Head', targetAudience: 'Parents', status: 'Active', acknowledgementRate: 65 },
  { id: 'CIR005', title: 'Library Book Return Deadline', date: '15-Feb-2026', issuedBy: 'Librarian', targetAudience: 'Students', status: 'Active', acknowledgementRate: 48 },
  { id: 'CIR006', title: 'Winter Vacation Notice', date: '10-Dec-2025', issuedBy: 'Principal', targetAudience: 'All', status: 'Expired', acknowledgementRate: 96 },
];

const categories = ['All', 'Circulars', 'Notices', 'Policies', 'Forms', 'Templates'];

const fileIcon = (type: string) => {
  if (type === 'PDF') return <File size={16} className="text-red-500" />;
  if (type === 'DOCX') return <FileText size={16} className="text-blue-500" />;
  if (type === 'XLSX') return <FileSpreadsheet size={16} className="text-emerald-500" />;
  return <Image size={16} className="text-purple-500" />;
};

const audienceColor = (a: string) => {
  if (a === 'All') return 'bg-blue-100 text-blue-700';
  if (a === 'Teachers') return 'bg-purple-100 text-purple-700';
  if (a === 'Parents') return 'bg-emerald-100 text-emerald-700';
  return 'bg-amber-100 text-amber-700';
};

export default function DocumentMgmtModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Documents');
  const [catFilter, setCatFilter] = useState('All');
  const [showCreateCircular, setShowCreateCircular] = useState(false);
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [ackRequired, setAckRequired] = useState(true);
  const [sendNotif, setSendNotif] = useState(true);

  const filteredDocs = catFilter === 'All' ? documents : documents.filter(d => d.category === catFilter);
  const newThisWeek = documents.filter(d => ['28-Feb-2026', '01-Mar-2026', '25-Feb-2026'].includes(d.uploadDate)).length;
  const pendingAck = documents.filter(d => d.acknowledgements > 0 && d.acknowledgements < 80).length;

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Document Management</h1>
      <TabBar tabs={['All Documents', 'Circulars', 'Notices', 'Forms & Templates', 'Upload']} active={tab} onChange={setTab} theme={theme} />

      {/* ── All Documents ── */}
      {tab === 'All Documents' && (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={FolderOpen} label="Total Documents" value={String(documents.length)} color="bg-blue-500" theme={theme} />
            <StatCard icon={Plus} label="New This Week" value={String(newThisWeek)} color="bg-emerald-500" theme={theme} />
            <StatCard icon={Bell} label="Pending Acknowledgements" value={String(pendingAck)} color="bg-amber-500" theme={theme} />
            <StatCard icon={FileText} label="Categories" value={String(categories.length - 1)} color="bg-purple-500" theme={theme} />
          </div>
          <div className="flex gap-3">
            <SearchBar placeholder="Search documents..." theme={theme} icon={Search} />
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredDocs.map(doc => (
              <div key={doc.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 hover:shadow-md transition-all`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${theme.secondaryBg} flex items-center justify-center shrink-0`}>
                    {fileIcon(doc.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-bold ${theme.highlight} truncate`}>{doc.title}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${doc.category === 'Circulars' ? 'bg-blue-100 text-blue-700' : doc.category === 'Notices' ? 'bg-amber-100 text-amber-700' : doc.category === 'Policies' ? 'bg-purple-100 text-purple-700' : doc.category === 'Forms' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{doc.category}</span>
                    </div>
                    <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{doc.uploadedBy} &middot; {doc.uploadDate} &middot; {doc.fileSize}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[9px] ${theme.iconColor}`}>{doc.version}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${doc.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{doc.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="View"><Eye size={12} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Download"><Download size={12} className={theme.iconColor} /></button>
                    <button onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="Version History">
                      {expandedDoc === doc.id ? <ChevronUp size={12} className={theme.iconColor} /> : <ChevronDown size={12} className={theme.iconColor} />}
                    </button>
                  </div>
                </div>
                {expandedDoc === doc.id && (
                  <div className={`mt-3 p-3 rounded-xl ${theme.secondaryBg} space-y-1`}>
                    <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Version History</p>
                    <div className="flex justify-between text-[10px]"><span className={theme.iconColor}>{doc.version} (Current)</span><span className={theme.iconColor}>{doc.uploadDate}</span></div>
                    <div className="flex justify-between text-[10px]"><span className={theme.iconColor}>v1.0 (Original)</span><span className={theme.iconColor}>{doc.uploadDate.replace('2026', '2025')}</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Circulars ── */}
      {tab === 'Circulars' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button onClick={() => setShowCreateCircular(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> Create Circular</button>
          </div>
          <div className="space-y-2">
            {circulars.map(c => (
              <div key={c.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className={theme.primaryText} />
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{c.title}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{c.date} &middot; Issued by: {c.issuedBy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${audienceColor(c.targetAudience)}`}>{c.targetAudience}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{c.status}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] ${theme.iconColor}`}>Acknowledged</span>
                    <span className={`text-[10px] font-bold ${c.acknowledgementRate >= 80 ? 'text-emerald-600' : c.acknowledgementRate >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{c.acknowledgementRate}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                    <div className={`h-full rounded-full ${c.acknowledgementRate >= 80 ? 'bg-emerald-500' : c.acknowledgementRate >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${c.acknowledgementRate}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Notices ── */}
      {tab === 'Notices' && (
        <div className="space-y-2">
          <p className={`text-xs ${theme.iconColor}`}>Notice board — pinned items appear at top</p>
          {[
            { title: 'Parent-Teacher Meeting — March 8', date: '25-Feb-2026', pinned: true, expiry: '08-Mar-2026', status: 'Active' },
            { title: 'School will remain closed on March 3 (Holi)', date: '20-Feb-2026', pinned: true, expiry: '03-Mar-2026', status: 'Active' },
            { title: 'Library fine clearance notice', date: '18-Feb-2026', pinned: false, expiry: '15-Mar-2026', status: 'Active' },
            { title: 'Lost & found — items will be donated after March 10', date: '15-Feb-2026', pinned: false, expiry: '10-Mar-2026', status: 'Active' },
            { title: 'Winter break notice', date: '10-Dec-2025', pinned: false, expiry: '05-Jan-2026', status: 'Expired' },
          ].map((n, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${n.pinned ? 'border-amber-300' : theme.border} p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                {n.pinned && <Pin size={14} className="text-amber-500" />}
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{n.title}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Posted: {n.date} &middot; Expires: {n.expiry}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${n.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{n.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Forms & Templates ── */}
      {tab === 'Forms & Templates' && (
        <div className="space-y-4">
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Downloadable Forms</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { name: 'Admission Form', version: 'v1.0', type: 'PDF' },
              { name: 'TC Application', version: 'v2.1', type: 'DOCX' },
              { name: 'Leave Application', version: 'v1.2', type: 'DOCX' },
              { name: 'Fee Concession Request', version: 'v1.0', type: 'PDF' },
              { name: 'Transport Opt-In Form', version: 'v1.0', type: 'PDF' },
              { name: 'Medical Fitness Certificate', version: 'v1.0', type: 'PDF' },
            ].map((f, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 hover:shadow-md cursor-pointer transition-all`}>
                {fileIcon(f.type)}
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{f.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{f.type} &middot; {f.version}</p>
                </div>
                <Download size={14} className={theme.iconColor} />
              </div>
            ))}
          </div>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Certificate Templates</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { name: 'Transfer Certificate', version: 'v2.0' },
              { name: 'Bonafide Certificate', version: 'v1.1' },
              { name: 'Character Certificate', version: 'v1.0' },
              { name: 'Exam Hall Ticket', version: 'v1.0' },
            ].map((t, i) => (
              <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 flex items-center gap-3 hover:shadow-md cursor-pointer transition-all`}>
                <FileText size={16} className="text-purple-500" />
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{t.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{t.version}</p>
                </div>
                <Download size={14} className={theme.iconColor} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Upload ── */}
      {tab === 'Upload' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 space-y-4 max-w-2xl`}>
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Upload New Document</h3>
          {/* Drop zone */}
          <div className={`border-2 border-dashed ${theme.border} rounded-2xl p-8 text-center`}>
            <Upload size={32} className={`${theme.iconColor} mx-auto mb-2`} />
            <p className={`text-xs font-bold ${theme.highlight}`}>Drag & drop files here</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>or click to browse (PDF, DOCX, XLSX, JPG, PNG — max 10 MB)</p>
            <button className={`mt-3 px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold`}>Browse Files</button>
          </div>
          <div className="space-y-3">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Title <span className="text-red-500">*</span></label>
              <input placeholder="Document title..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Category <span className="text-red-500">*</span></label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                {categories.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Description</label>
              <textarea rows={2} placeholder="Brief description..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Version Note</label>
              <input placeholder="e.g. Updated fee structure for 2026-27" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Target Audience</label>
              <div className="flex gap-2">
                {['All', 'Teachers', 'Parents', 'Students', 'Staff'].map(a => (
                  <label key={a} className="flex items-center gap-1">
                    <input type="checkbox" className="accent-slate-600" />
                    <span className={`text-xs ${theme.iconColor}`}>{a}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className={`flex items-center justify-between flex-1 p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Acknowledgement Required</span>
                <button onClick={() => setAckRequired(!ackRequired)} className={`w-9 h-5 rounded-full relative transition-colors ${ackRequired ? theme.primary : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${ackRequired ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className={`flex items-center justify-between flex-1 p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Send Notification</span>
                <button onClick={() => setSendNotif(!sendNotif)} className={`w-9 h-5 rounded-full relative transition-colors ${sendNotif ? theme.primary : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${sendNotif ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            {/* Upload progress placeholder */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex justify-between mb-1">
                <span className={`text-[10px] ${theme.iconColor}`}>Upload Progress</span>
                <span className={`text-[10px] font-bold ${theme.highlight}`}>Ready</span>
              </div>
              <div className={`w-full h-2 rounded-full bg-gray-200`}>
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
          <button onClick={() => window.alert('Document uploaded successfully! (Blueprint demo)')} className={`w-full py-3 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1`}>
            <Upload size={14} /> Upload Document
          </button>
        </div>
      )}

      {/* ── Create Circular Modal ── */}
      {showCreateCircular && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateCircular(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={16} className={theme.primaryText} />
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Create Circular</h2>
              </div>
              <button onClick={() => setShowCreateCircular(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Title <span className="text-red-500">*</span></label>
                <input placeholder="Circular title..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Content <span className="text-red-500">*</span></label>
                <textarea rows={4} placeholder="Circular content..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} resize-none`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} block mb-1`}>Target Audience</label>
                <div className="flex gap-3">
                  {['All', 'Teachers', 'Parents', 'Students'].map(a => (
                    <label key={a} className="flex items-center gap-1">
                      <input type="checkbox" className="accent-slate-600" defaultChecked={a === 'All'} />
                      <span className={`text-xs ${theme.iconColor}`}>{a}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-[10px] ${theme.iconColor}`}>Attachments</p>
                <div className={`mt-2 border-2 border-dashed ${theme.border} rounded-xl p-3 text-center`}>
                  <p className={`text-[10px] ${theme.iconColor}`}>Drag & drop or click to attach files</p>
                </div>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Acknowledgement Required</span>
                <button onClick={() => setAckRequired(!ackRequired)} className={`w-9 h-5 rounded-full relative transition-colors ${ackRequired ? theme.primary : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${ackRequired ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Send Notification</span>
                <button onClick={() => setSendNotif(!sendNotif)} className={`w-9 h-5 rounded-full relative transition-colors ${sendNotif ? theme.primary : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${sendNotif ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowCreateCircular(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button onClick={() => { window.alert('Circular published successfully! (Blueprint demo)'); setShowCreateCircular(false); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Publish Circular</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
