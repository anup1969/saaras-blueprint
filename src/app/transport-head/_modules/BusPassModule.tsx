'use client';

import React, { useState } from 'react';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import {
  CreditCard, Users, Printer, Search, Filter, Download, Plus,
  QrCode, Calendar, Bus, CheckCircle, XCircle, RefreshCw, Eye, X
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const mockPasses = [
  { passNo: 'BP-2026-001', student: 'Arjun Mehta', class: '8-A', route: 'Route A', stop: 'Jodhpur Cross Roads', type: 'Monthly', validFrom: '2026-03-01', validTo: '2026-03-31', status: 'Active' },
  { passNo: 'BP-2026-002', student: 'Priya Sharma', class: '6-B', route: 'Route A', stop: 'Satellite Circle', type: 'Quarterly', validFrom: '2026-01-01', validTo: '2026-03-31', status: 'Active' },
  { passNo: 'BP-2026-003', student: 'Ishaan Joshi', class: '10-A', route: 'Route B', stop: 'Prahlad Nagar Garden', type: 'Annual', validFrom: '2025-06-01', validTo: '2026-05-31', status: 'Active' },
  { passNo: 'BP-2026-004', student: 'Dev Chauhan', class: '9-B', route: 'Route C', stop: 'Bodakdev Circle', type: 'Monthly', validFrom: '2026-02-01', validTo: '2026-02-28', status: 'Expired' },
  { passNo: 'BP-2026-005', student: 'Harsh Panchal', class: '6-A', route: 'Route D', stop: 'Isanpur Circle', type: 'Monthly', validFrom: '2026-03-01', validTo: '2026-03-31', status: 'Active' },
  { passNo: 'BP-2026-006', student: 'Tanvi Vyas', class: '7-B', route: 'Route E', stop: 'Paldi', type: 'Quarterly', validFrom: '2026-01-01', validTo: '2026-03-31', status: 'Active' },
  { passNo: 'BP-2026-007', student: 'Mihir Acharya', class: '8-B', route: 'Route F', stop: 'Motera Stadium', type: 'Annual', validFrom: '2025-06-01', validTo: '2026-05-31', status: 'Active' },
  { passNo: 'BP-2026-008', student: 'Rohan Desai', class: '9-A', route: 'Route A', stop: 'Shyamal Cross Roads', type: 'Monthly', validFrom: '2026-01-01', validTo: '2026-01-31', status: 'Expired' },
  { passNo: 'BP-2026-009', student: 'Kavya Trivedi', class: '4-B', route: 'Route B', stop: 'Thaltej Cross Roads', type: 'Monthly', validFrom: '2026-03-01', validTo: '2026-03-31', status: 'Suspended' },
];

const mockRoutes = ['Route A', 'Route B', 'Route C', 'Route D', 'Route E', 'Route F'];
const mockClasses = ['3-A', '4-A', '4-B', '5-A', '5-B', '5-C', '6-A', '6-B', '6-C', '7-A', '7-B', '7-C', '8-A', '8-B', '8-C', '9-A', '9-B', '9-C', '10-A', '10-B'];

export default function BusPassModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Pass Status');
  const [passType, setPassType] = useState<'Monthly' | 'Quarterly' | 'Annual'>('Monthly');
  const [bulkRoute, setBulkRoute] = useState('');
  const [bulkClass, setBulkClass] = useState('');
  const [printQueue, setPrintQueue] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState<string | null>(null);

  const validityMap = { Monthly: '1 Month', Quarterly: '3 Months', Annual: '12 Months' };
  const previewPass = mockPasses.find(p => p.passNo === showPreview);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Bus Pass Management</h1>
        <div className="flex gap-2">
          {printQueue.length > 0 && (
            <button
              onClick={() => { window.alert(`Printing ${printQueue.length} pass(es)! (Blueprint demo)`); setPrintQueue([]); }}
              className="px-4 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-bold flex items-center gap-1"
            >
              <Printer size={14} /> Print Selected ({printQueue.length})
            </button>
          )}
        </div>
      </div>

      <TabBar tabs={['Pass Status', 'Generate Pass', 'Bulk Generation', 'Print Queue']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CreditCard} label="Total Passes" value={mockPasses.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Active" value={mockPasses.filter(p => p.status === 'Active').length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={XCircle} label="Expired" value={mockPasses.filter(p => p.status === 'Expired').length} color="bg-red-500" theme={theme} />
        <StatCard icon={Printer} label="Print Queue" value={printQueue.length} color="bg-amber-500" theme={theme} />
      </div>

      {/* Pass Status Tab */}
      {tab === 'Pass Status' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search by pass no, student, route..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
          </div>
          <DataTable
            headers={['', 'Pass No', 'Student', 'Class', 'Route', 'Type', 'Valid Until', 'Status', 'Actions']}
            rows={mockPasses.map(p => [
              <input key="check" type="checkbox" checked={printQueue.includes(p.passNo)} onChange={(e) => {
                if (e.target.checked) setPrintQueue([...printQueue, p.passNo]);
                else setPrintQueue(printQueue.filter(q => q !== p.passNo));
              }} className="rounded" />,
              <span key="no" className={`font-mono text-xs font-bold ${theme.primaryText}`}>{p.passNo}</span>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{p.student}</span>,
              <span key="class" className={theme.iconColor}>{p.class}</span>,
              <span key="route" className={theme.iconColor}>{p.route}</span>,
              <span key="type" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                p.type === 'Annual' ? 'bg-purple-100 text-purple-700' : p.type === 'Quarterly' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
              }`}>{p.type}</span>,
              <span key="valid" className={`text-xs font-mono ${theme.iconColor}`}>{p.validTo}</span>,
              <StatusBadge key="status" status={p.status === 'Active' ? 'Active' : p.status === 'Expired' ? 'Overdue' : 'Pending'} theme={theme} />,
              <div key="actions" className="flex gap-1">
                <button onClick={() => setShowPreview(p.passNo)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>
                {p.status === 'Expired' && (
                  <button onClick={() => window.alert(`Pass ${p.passNo} renewed! (Blueprint demo)`)} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5"><RefreshCw size={10} /> Renew</button>
                )}
                {p.status === 'Active' && (
                  <button onClick={() => window.alert(`Pass ${p.passNo} suspended! (Blueprint demo)`)} className="px-2 py-1 rounded-lg bg-red-100 text-red-600 text-[10px] font-bold flex items-center gap-0.5"><XCircle size={10} /> Suspend</button>
                )}
              </div>,
            ])}
            theme={theme}
          />
        </>
      )}

      {/* Generate Pass Tab */}
      {tab === 'Generate Pass' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Generate New Bus Pass</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Student Name *</label>
              <input placeholder="Search student..." className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Class / Section *</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                <option value="">Select...</option>
                {mockClasses.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Route *</label>
              <select className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                <option value="">Select route...</option>
                {mockRoutes.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Stop</label>
              <input placeholder="e.g. Jodhpur Cross Roads" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} mb-2 block`}>Pass Type *</label>
              <div className="flex gap-2">
                {(['Monthly', 'Quarterly', 'Annual'] as const).map(t => (
                  <button key={t} onClick={() => setPassType(t)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${passType === t ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                    {t}
                  </button>
                ))}
              </div>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>Validity: {validityMap[passType]}</p>
            </div>
            <div>
              <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Start Date *</label>
              <input type="date" defaultValue="2026-03-01" className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`} />
            </div>
          </div>

          {/* Pass Preview Card */}
          <div className="mt-6">
            <h4 className={`text-xs font-bold ${theme.iconColor} mb-2`}>Pass Preview</h4>
            <div className={`max-w-sm mx-auto p-4 rounded-2xl border-2 ${theme.border} ${theme.cardBg} shadow-lg`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bus size={16} className={`${theme.primaryText}`} />
                  <span className={`text-xs font-bold ${theme.highlight}`}>SCHOOL BUS PASS</span>
                </div>
                <span className={`text-[10px] font-mono font-bold ${theme.primaryText}`}>BP-2026-XXX</span>
              </div>
              <div className="flex gap-3">
                <div className={`w-16 h-16 rounded-xl ${theme.secondaryBg} flex items-center justify-center shrink-0`}>
                  <Users size={24} className={theme.iconColor} />
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className={`text-sm font-bold ${theme.highlight}`}>Student Name</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Class: -- | Route: --</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Stop: --</p>
                </div>
                <div className={`w-14 h-14 rounded-lg ${theme.secondaryBg} flex items-center justify-center shrink-0`}>
                  <QrCode size={28} className={theme.iconColor} />
                </div>
              </div>
              <div className={`mt-3 p-2 rounded-lg ${theme.accentBg} flex items-center justify-between`}>
                <div>
                  <p className={`text-[9px] ${theme.iconColor}`}>Valid From</p>
                  <p className={`text-[10px] font-bold ${theme.highlight}`}>01-Mar-2026</p>
                </div>
                <Calendar size={12} className={theme.iconColor} />
                <div className="text-right">
                  <p className={`text-[9px] ${theme.iconColor}`}>Valid To</p>
                  <p className={`text-[10px] font-bold ${theme.highlight}`}>{passType === 'Monthly' ? '31-Mar-2026' : passType === 'Quarterly' ? '31-May-2026' : '28-Feb-2027'}</p>
                </div>
              </div>
              <p className={`text-center text-[8px] ${theme.iconColor} mt-2`}>{passType} Pass</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Cancel</button>
            <button onClick={() => window.alert('Bus pass generated successfully! (Blueprint demo)')} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
              <CreditCard size={12} /> Generate Pass
            </button>
          </div>
        </div>
      )}

      {/* Bulk Generation Tab */}
      {tab === 'Bulk Generation' && (
        <div className="space-y-4">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-4`}>Bulk Pass Generation</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Filter by Route</label>
                <select value={bulkRoute} onChange={e => setBulkRoute(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">All Routes</option>
                  {mockRoutes.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-1 block`}>Filter by Class</label>
                <select value={bulkClass} onChange={e => setBulkClass(e.target.value)} className={`w-full px-3 py-2 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.highlight}`}>
                  <option value="">All Classes</option>
                  {mockClasses.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold ${theme.iconColor} mb-2 block`}>Pass Type</label>
                <div className="flex gap-2">
                  {(['Monthly', 'Quarterly', 'Annual'] as const).map(t => (
                    <button key={t} onClick={() => setPassType(t)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${passType === t ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={`mt-4 p-3 rounded-xl ${theme.accentBg} flex items-center justify-between`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>
                  {bulkRoute || 'All Routes'} {bulkClass ? ` | Class ${bulkClass}` : ' | All Classes'}
                </p>
                <p className={`text-[10px] ${theme.iconColor}`}>
                  Estimated: {bulkRoute ? mockPasses.filter(p => p.route === bulkRoute).length : mockPasses.length} students | {passType} passes
                </p>
              </div>
              <button
                onClick={() => {
                  const count = bulkRoute ? mockPasses.filter(p => p.route === bulkRoute).length : mockPasses.length;
                  window.alert(`${count} bus pass(es) generated for ${bulkRoute || 'all routes'}! (Blueprint demo)`);
                }}
                className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}
              >
                <Plus size={12} /> Generate All ({bulkRoute ? mockPasses.filter(p => p.route === bulkRoute).length : mockPasses.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Queue Tab */}
      {tab === 'Print Queue' && (
        <div className="space-y-4">
          {printQueue.length === 0 ? (
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-8 text-center`}>
              <Printer size={32} className={`${theme.iconColor} mx-auto mb-2`} />
              <p className={`text-sm font-bold ${theme.highlight}`}>Print Queue is Empty</p>
              <p className={`text-xs ${theme.iconColor} mt-1`}>Select passes from the Pass Status tab to add them to the print queue</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className={`text-xs ${theme.iconColor}`}>{printQueue.length} pass(es) selected for printing</p>
                <div className="flex gap-2">
                  <button onClick={() => setPrintQueue([])} className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor}`}>Clear All</button>
                  <button
                    onClick={() => { window.alert(`Printing ${printQueue.length} pass(es)! (Blueprint demo)`); setPrintQueue([]); }}
                    className={`px-4 py-2 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1`}
                  >
                    <Printer size={12} /> Print Selected
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {printQueue.map(pno => {
                  const pass = mockPasses.find(p => p.passNo === pno);
                  if (!pass) return null;
                  return (
                    <div key={pno} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 relative`}>
                      <button onClick={() => setPrintQueue(printQueue.filter(q => q !== pno))} className="absolute top-2 right-2 p-1 rounded-lg bg-red-100 text-red-600"><X size={10} /></button>
                      <div className="flex items-center gap-2 mb-2">
                        <Bus size={14} className={theme.primaryText} />
                        <span className={`text-[10px] font-mono font-bold ${theme.primaryText}`}>{pass.passNo}</span>
                      </div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{pass.student}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{pass.class} | {pass.route} | {pass.stop}</p>
                      <p className={`text-[10px] ${theme.iconColor} mt-1`}>{pass.type} | {pass.validFrom} to {pass.validTo}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Pass Preview Modal */}
      {showPreview && previewPass && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-sm`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Bus Pass Preview</h3>
              <button onClick={() => setShowPreview(null)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className={`p-4 rounded-2xl border-2 ${theme.border} ${theme.cardBg} shadow-lg`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bus size={16} className={theme.primaryText} />
                  <span className={`text-xs font-bold ${theme.highlight}`}>SCHOOL BUS PASS</span>
                </div>
                <span className={`text-[10px] font-mono font-bold ${theme.primaryText}`}>{previewPass.passNo}</span>
              </div>
              <div className="flex gap-3">
                <div className={`w-16 h-16 rounded-xl ${theme.secondaryBg} flex items-center justify-center shrink-0`}>
                  <Users size={24} className={theme.iconColor} />
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className={`text-sm font-bold ${theme.highlight}`}>{previewPass.student}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Class: {previewPass.class} | Route: {previewPass.route}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Stop: {previewPass.stop}</p>
                </div>
                <div className={`w-14 h-14 rounded-lg ${theme.secondaryBg} flex items-center justify-center shrink-0`}>
                  <QrCode size={28} className={theme.iconColor} />
                </div>
              </div>
              <div className={`mt-3 p-2 rounded-lg ${theme.accentBg} flex items-center justify-between`}>
                <div>
                  <p className={`text-[9px] ${theme.iconColor}`}>Valid From</p>
                  <p className={`text-[10px] font-bold ${theme.highlight}`}>{previewPass.validFrom}</p>
                </div>
                <Calendar size={12} className={theme.iconColor} />
                <div className="text-right">
                  <p className={`text-[9px] ${theme.iconColor}`}>Valid To</p>
                  <p className={`text-[10px] font-bold ${theme.highlight}`}>{previewPass.validTo}</p>
                </div>
              </div>
              <p className={`text-center text-[8px] ${theme.iconColor} mt-2`}>{previewPass.type} Pass | Status: {previewPass.status}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => { setPrintQueue([...new Set([...printQueue, previewPass.passNo])]); setShowPreview(null); }} className={`flex-1 py-2 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} flex items-center justify-center gap-1`}>
                <Printer size={12} /> Add to Print
              </button>
              <button onClick={() => { window.alert(`Printing pass ${previewPass.passNo}! (Blueprint demo)`); setShowPreview(null); }} className={`flex-1 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center justify-center gap-1`}>
                <Printer size={12} /> Print Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
