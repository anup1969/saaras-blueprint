'use client';

import { useState } from 'react';
import { Plus, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function TransportConfigModule({ theme }: { theme: Theme }) {
  const [routes, setRoutes] = useState([
    { name: 'Route A', stops: '8', capacity: '40', morning: '7:00 AM', evening: '3:30 PM', driver: 'Ramesh Kumar', vehicle: 'GJ-01-AB-1234' },
    { name: 'Route B', stops: '12', capacity: '50', morning: '6:45 AM', evening: '3:45 PM', driver: 'Suresh Patel', vehicle: 'GJ-01-CD-5678' },
    { name: 'Route C', stops: '6', capacity: '30', morning: '7:15 AM', evening: '3:15 PM', driver: 'Mahesh Singh', vehicle: 'GJ-01-EF-9012' },
  ]);
  const [vehicles, setVehicles] = useState([
    { reg: 'GJ-01-AB-1234', type: 'Bus', capacity: '40', year: '2022', insurance: 'Valid till Dec 2025', gps: true },
    { reg: 'GJ-01-CD-5678', type: 'Bus', capacity: '50', year: '2021', insurance: 'Valid till Mar 2025', gps: true },
    { reg: 'GJ-01-EF-9012', type: 'Mini Bus', capacity: '30', year: '2023', insurance: 'Valid till Jun 2026', gps: true },
    { reg: 'GJ-01-GH-3456', type: 'Van', capacity: '15', year: '2023', insurance: 'Valid till Sep 2025', gps: false },
  ]);
  const [drivers, setDrivers] = useState([
    { name: 'Ramesh Kumar', phone: '98765-43210', license: 'GJ-01-2020-1234', expiry: 'Mar 2027', badge: true },
    { name: 'Suresh Patel', phone: '98765-43211', license: 'GJ-01-2019-5678', expiry: 'Dec 2026', badge: true },
    { name: 'Mahesh Singh', phone: '98765-43212', license: 'GJ-01-2021-9012', expiry: 'Jun 2028', badge: true },
  ]);
  const [transportPolicy, setTransportPolicy] = useState<'optional' | 'mandatory'>('optional');
  const [transportOperation, setTransportOperation] = useState<'in-house' | 'contract'>('in-house');
  const [contractorName, setContractorName] = useState('');
  const [feeCollectedBy, setFeeCollectedBy] = useState<'school' | 'contractor'>('school');
  const [tmCanAcceptFees, setTmCanAcceptFees] = useState(true);
  const [autoReceipt, setAutoReceipt] = useState(true);
  const [receiptPrefix, setReceiptPrefix] = useState('RCP-TRANS');
  const [feeSyncToSchool, setFeeSyncToSchool] = useState(true);
  const [ladyAttendant, setLadyAttendant] = useState(false);
  const [driverAssistant, setDriverAssistant] = useState(false);
  const [parentGpsTracking, setParentGpsTracking] = useState<'none' | 'normal' | 'premium'>('normal');
  const [premiumAlerts, setPremiumAlerts] = useState<Record<string, boolean>>({
    'Trip Start Alert': true, 'Proximity Alert (nearing stop)': true,
    'Reach School Confirmation': true, 'Student Board/Alight Alert': true,
    'Delay Alert (> 10 min late)': true, 'Route Deviation Alert': false,
  });
  const [safetyToggles, setSafetyToggles] = useState<Record<string, boolean>>({
    'GPS Live Tracking': true, 'RFID Student Tap': false,
    'Speed Alert': true, 'SOS Button in Vehicle': true,
    'CCTV Recording': false, 'Route Deviation Alert': true, 'Geo-fence Alert': true,
  });
  const [speedAlertLimit, setSpeedAlertLimit] = useState('40');
  const [feeModel, setFeeModel] = useState('route-wise');
  const [pickupPolicy, setPickupPolicy] = useState<Record<string, boolean>>({
    'Only registered guardians can pick up': true, 'OTP verification for pickup': true,
    'Photo verification at gate': false, 'Pre-registration for non-guardian pickup': true,
  });
  const [commuteTagging, setCommuteTagging] = useState(true);
  const [defaultCommuteMode, setDefaultCommuteMode] = useState('School Bus');
  const [hasTransportManager, setHasTransportManager] = useState(true);
  const [tmPermissions, setTmPermissions] = useState<Record<string, boolean>>({
    'View all routes & stops': true, 'Add/edit routes & stops': true, 'Delete routes': false,
    'View vehicle fleet': true, 'Add/edit vehicles': true, 'Delete vehicles': false,
    'View driver details': true, 'Add/edit drivers': true, 'Delete drivers': false,
    'Assign students to routes': true, 'Change student route/stop': true,
    'View transport fees': true, 'Modify transport fees': false, 'Accept/record fee payments': true,
    'View GPS tracking': true, 'Configure safety alerts': false,
    'Send notifications to parents': true, 'View attendance reports': true,
    'Export transport data': true, 'Manage pickup policies': false,
  });

  return (
    <div className="space-y-4">
      <ModuleHeader title="Transport Configuration" subtitle="Routes, vehicles, drivers, safety, and fee structure" theme={theme} />

      <SectionCard title="Transport Policy" subtitle="Define your school's student commute and transport operation policy" theme={theme}>
        <div className="space-y-4">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Student Commute Policy</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Does your school allow students to walk or use private vehicles, or is school transport mandatory for all?</p>
            <div className="flex gap-2">
              {[
                { id: 'optional' as const, label: 'Walking / Private Allowed', desc: 'Students may walk, use private vehicles, or opt for school transport' },
                { id: 'mandatory' as const, label: 'School Transport Mandatory', desc: 'All students must use school-provided transport — no walk-ins allowed' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setTransportPolicy(opt.id)}
                  className={`flex-1 text-left p-3 rounded-xl border transition-all ${transportPolicy === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${transportPolicy === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${transportPolicy === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Transport Operation Type</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Is transport managed by the school directly, or outsourced to a contractor?</p>
            <div className="flex gap-2">
              {[
                { id: 'in-house' as const, label: 'In-house (School-managed)', desc: 'School owns vehicles and employs drivers directly' },
                { id: 'contract' as const, label: 'Contracted (Outsourced)', desc: 'Transport is outsourced to a third-party contractor' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setTransportOperation(opt.id)}
                  className={`flex-1 text-left p-3 rounded-xl border transition-all ${transportOperation === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${transportOperation === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${transportOperation === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
            {transportOperation === 'contract' && (
              <div className="mt-3">
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Contractor Name</p>
                <InputField value={contractorName} onChange={setContractorName} theme={theme} placeholder="Enter transport contractor name" />
              </div>
            )}
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Transport Fee Collection</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Who collects the transport fees from parents?</p>
            <div className="flex gap-2">
              {[
                { id: 'school' as const, label: 'School Collects', desc: 'School collects transport fees as part of the school fee invoice' },
                { id: 'contractor' as const, label: 'Contractor / Transporter Collects', desc: 'Transport provider collects fees directly from parents' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setFeeCollectedBy(opt.id)}
                  className={`flex-1 text-left p-2.5 rounded-xl border transition-all ${feeCollectedBy === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${feeCollectedBy === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${feeCollectedBy === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Transport Head — Fee Acceptance</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Can the Transport Manager / Transport Head accept and record fee payments directly from parents?</p>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Allow Transport Head to Accept Fees</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Transport Manager can record cash, UPI, cheque payments from parents and issue receipts</p>
              </div>
              <SSAToggle on={tmCanAcceptFees} onChange={() => setTmCanAcceptFees(!tmCanAcceptFees)} theme={theme} />
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Receipt Generation</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Automatically generate receipts when transport fees are recorded?</p>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Auto-generate Receipt</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>System generates a numbered receipt on every payment entry — printable &amp; shareable via SMS/WhatsApp</p>
                </div>
                <SSAToggle on={autoReceipt} onChange={() => setAutoReceipt(!autoReceipt)} theme={theme} />
              </div>
              {autoReceipt && (
                <div className="ml-4">
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Receipt Number Prefix</p>
                  <InputField value={receiptPrefix} onChange={setReceiptPrefix} theme={theme} placeholder="e.g. RCP-TRANS" />
                  <p className={`text-[9px] ${theme.iconColor} mt-1`}>Receipt numbers will be: {receiptPrefix}-0001, {receiptPrefix}-0002, ...</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Fee Sync to School Fees Module</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Should transport fee payments automatically sync to the main school fees module?</p>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Sync Transport Fees → School Fees Module</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Every transport fee recorded here will automatically reflect in the school&apos;s main Fees module under &quot;Transport Fee&quot; head. Avoids double-entry.</p>
              </div>
              <SSAToggle on={feeSyncToSchool} onChange={() => setFeeSyncToSchool(!feeSyncToSchool)} theme={theme} />
            </div>
            {feeSyncToSchool && (
              <p className={`text-[9px] text-emerald-600 mt-1.5 flex items-center gap-1`}>
                <CheckCircle size={10} /> Transport fees will auto-appear under the &quot;Transport Fee&quot; head in the school&apos;s Fees module.
              </p>
            )}
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Vehicle Attendant Policy</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>Does your school provide attendants along with the driver in school vehicles?</p>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Lady Attendant</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>A female attendant accompanies students on the bus for safety (recommended for younger students)</p>
                </div>
                <SSAToggle on={ladyAttendant} onChange={() => setLadyAttendant(!ladyAttendant)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Driver Assistant</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>A helper/assistant accompanies the driver to manage boarding, alighting, and discipline</p>
                </div>
                <SSAToggle on={driverAssistant} onChange={() => setDriverAssistant(!driverAssistant)} theme={theme} />
              </div>
            </div>
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Parent GPS Tracking Level</p>
            <p className={`text-[10px] ${theme.iconColor} mb-2`}>What level of GPS tracking do you provide to parents via the app?</p>
            <div className="flex gap-2">
              {[
                { id: 'none' as const, label: 'No Tracking', desc: 'Parents do not get GPS tracking access' },
                { id: 'normal' as const, label: 'Normal Tracking', desc: 'Parents see live bus location on map' },
                { id: 'premium' as const, label: 'Premium Tracking', desc: 'Live location + alerts (trip start, proximity, attendance)' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setParentGpsTracking(opt.id)}
                  className={`flex-1 text-left p-2.5 rounded-xl border transition-all ${parentGpsTracking === opt.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${parentGpsTracking === opt.id ? '' : theme.highlight}`}>{opt.label}</p>
                  <p className={`text-[10px] ${parentGpsTracking === opt.id ? 'text-white/80' : theme.iconColor}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
            <div className="mt-3">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>Premium Alert Types {parentGpsTracking !== 'premium' && <span className="text-amber-500">(Premium feature)</span>}</p>
              <div className={`grid grid-cols-2 gap-1.5 ${parentGpsTracking !== 'premium' ? 'opacity-60' : ''}`}>
                {Object.entries(premiumAlerts).map(([alert, enabled]) => (
                  <div key={alert} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg} cursor-pointer group relative`}>
                    <span className={`text-[11px] ${theme.highlight}`}>{alert}</span>
                    <SSAToggle on={parentGpsTracking === 'premium' ? enabled : false}
                      onChange={() => { if (parentGpsTracking === 'premium') { setPremiumAlerts(p => ({ ...p, [alert]: !p[alert] })); } }} theme={theme} />
                    {parentGpsTracking !== 'premium' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-amber-50/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-bold text-amber-700">Premium feature — contact saaras.in</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {parentGpsTracking !== 'premium' && (
                <p className={`text-[10px] text-amber-600 mt-2 flex items-center gap-1`}>
                  <AlertTriangle size={10} /> Select &quot;Premium Tracking&quot; above to enable these alerts, or contact saaras.in for details.
                </p>
              )}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Routes" subtitle="Bus routes — assign drivers and vehicles from dropdowns (B2)" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Route', 'Stops', 'Capacity', 'Morning', 'Evening', 'Driver', 'Vehicle', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {routes.map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  {(['name', 'stops', 'capacity', 'morning', 'evening'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={r[field]} onChange={e => { const n = [...routes]; n[i] = { ...n[i], [field]: e.target.value }; setRoutes(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${field === 'name' ? `font-bold ${theme.highlight}` : theme.highlight} outline-none`} />
                    </td>
                  ))}
                  {/* B2: Driver dropdown */}
                  <td className="px-1 py-1.5">
                    <select value={r.driver} onChange={e => { const n = [...routes]; n[i] = { ...n[i], driver: e.target.value }; setRoutes(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option value="">Assign Driver</option>
                      {drivers.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                  </td>
                  {/* B2: Vehicle dropdown */}
                  <td className="px-1 py-1.5">
                    <select value={r.vehicle} onChange={e => { const n = [...routes]; n[i] = { ...n[i], vehicle: e.target.value }; setRoutes(n); }}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
                      <option value="">Assign Vehicle</option>
                      {vehicles.map(v => <option key={v.reg} value={v.reg}>{v.reg} ({v.type})</option>)}
                    </select>
                  </td>
                  <td className="px-1 py-1.5"><button onClick={() => setRoutes(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setRoutes(p => [...p, { name: '', stops: '', capacity: '', morning: '', evening: '', driver: '', vehicle: '' }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Route
        </button>
      </SectionCard>

      <SectionCard title="Vehicle Fleet" subtitle="Insurance/PUC expiry within 30 days is highlighted in red (B2)" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Registration', 'Type', 'Capacity', 'Year', 'Insurance Expiry', 'Route', 'GPS', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {vehicles.map((v, i) => {
                // B2: Check if insurance is expiring soon
                const insText = v.insurance.toLowerCase();
                const isExpiringSoon = insText.includes('mar 2025') || insText.includes('feb 2026') || insText.includes('mar 2026');
                const isExpired = insText.includes('dec 2025') || insText.includes('mar 2025') || insText.includes('sep 2025');
                const assignedRoute = routes.find(r => r.vehicle === v.reg);
                return (
                <tr key={i} className={`border-t ${theme.border} ${isExpired ? 'bg-red-50/50' : ''}`}>
                  {(['reg', 'type', 'capacity', 'year'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={v[field]} onChange={e => { const n = [...vehicles]; n[i] = { ...n[i], [field]: e.target.value }; setVehicles(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                  ))}
                  <td className="px-1 py-1.5">
                    <div className="flex flex-col">
                      <input value={v.insurance} onChange={e => { const n = [...vehicles]; n[i] = { ...n[i], insurance: e.target.value }; setVehicles(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${isExpired ? 'border-red-400 bg-red-50' : isExpiringSoon ? 'border-amber-400 bg-amber-50' : `${theme.border} ${theme.inputBg}`} text-xs ${theme.highlight} outline-none`} />
                      {isExpired && <span className="text-[7px] text-red-600 font-bold mt-0.5 flex items-center gap-0.5"><AlertTriangle size={7} /> EXPIRED</span>}
                      {isExpiringSoon && !isExpired && <span className="text-[7px] text-amber-600 font-bold mt-0.5 flex items-center gap-0.5"><AlertTriangle size={7} /> Expiring soon</span>}
                    </div>
                  </td>
                  {/* B2: Route assignment display */}
                  <td className="px-1 py-1.5">
                    <span className={`text-[10px] ${assignedRoute ? theme.highlight : theme.iconColor}`}>
                      {assignedRoute ? assignedRoute.name : 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-2 py-1.5"><SSAToggle on={v.gps} onChange={() => { const n = [...vehicles]; n[i] = { ...n[i], gps: !n[i].gps }; setVehicles(n); }} theme={theme} /></td>
                  <td className="px-1 py-1.5"><button onClick={() => setVehicles(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button onClick={() => setVehicles(p => [...p, { reg: '', type: 'Bus', capacity: '', year: '', insurance: '', gps: true }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Vehicle
        </button>
      </SectionCard>

      <SectionCard title="Driver Details" subtitle="Click any field to edit, toggle badge, X to delete" theme={theme}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Name', 'Phone', 'License No.', 'License Expiry', 'Badge', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {drivers.map((d, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  {(['name', 'phone', 'license', 'expiry'] as const).map(field => (
                    <td key={field} className="px-1 py-1.5">
                      <input value={d[field]} onChange={e => { const n = [...drivers]; n[i] = { ...n[i], [field]: e.target.value }; setDrivers(n); }}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                  ))}
                  <td className="px-2 py-1.5"><SSAToggle on={d.badge} onChange={() => { const n = [...drivers]; n[i] = { ...n[i], badge: !n[i].badge }; setDrivers(n); }} theme={theme} /></td>
                  <td className="px-1 py-1.5"><button onClick={() => setDrivers(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => setDrivers(p => [...p, { name: '', phone: '', license: '', expiry: '', badge: true }])}
          className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl mt-2`}>
          <Plus size={12} /> Add Driver
        </button>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Tracking &amp; Safety" subtitle="Safety features and alerts for school transport" theme={theme}>
          <div className="space-y-2">
            {Object.entries(safetyToggles).map(([feature, enabled]) => (
              <div key={feature} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feature}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'GPS Live Tracking': 'Track real-time location of all school vehicles on a live map',
                      'Parent App Tracking': 'Parents can see their child\'s bus location and ETA on their mobile app',
                      'RFID Student Tap': 'Students tap RFID card when boarding/alighting — auto-notifies parents',
                      'Speed Alert': 'Alert admin when vehicle exceeds the set speed limit in school zones',
                      'SOS Button in Vehicle': 'Emergency panic button in each vehicle — triggers instant alert to admin & parents',
                      'CCTV Recording': 'In-vehicle CCTV cameras record footage during all trips',
                      'Route Deviation Alert': 'Alert when a vehicle deviates from its assigned route',
                      'Geo-fence Alert': 'Alert when a vehicle enters or exits a defined geo-fence zone (e.g., school campus)',
                    } as Record<string, string>)[feature]
                  }</p>
                  {feature === 'Speed Alert' && enabled && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-bold ${theme.iconColor}`}>Limit:</span>
                      <input value={speedAlertLimit} onChange={e => setSpeedAlertLimit(e.target.value.replace(/\D/g, ''))}
                        className={`w-16 px-2 py-0.5 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none text-center`} />
                      <span className={`text-[10px] ${theme.iconColor}`}>kmph in school zone</span>
                    </div>
                  )}
                </div>
                <SSAToggle on={enabled} onChange={() => setSafetyToggles(p => ({ ...p, [feature]: !p[feature] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Transport Fee Model" subtitle="How transport fees are calculated" theme={theme}>
            <div className="space-y-2">
              {[
                { id: 'flat', name: 'Flat Rate', desc: 'Same fee for all routes — simplest to manage' },
                { id: 'route-wise', name: 'Route-wise', desc: 'Different fee per route based on route length/area' },
                { id: 'route-stop-wise', name: 'Route + Stop-wise', desc: 'Fee varies per stop on each route — closer stops pay less, farther stops pay more' },
                { id: 'distance-based', name: 'Distance-based', desc: 'Fee calculated by km distance of student\'s stop from school' },
              ].map(m => (
                <button key={m.id} onClick={() => setFeeModel(m.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all ${feeModel === m.id ? `border-2 ${theme.primary} text-white` : `${theme.secondaryBg} ${theme.border}`}`}>
                  <p className={`text-xs font-bold ${feeModel === m.id ? '' : theme.highlight}`}>{m.name}</p>
                  <p className={`text-[10px] ${feeModel === m.id ? 'text-white/80' : theme.iconColor}`}>{m.desc}</p>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Pickup Policies" subtitle="Student pickup verification rules at dismissal" theme={theme}>
            <div className="space-y-2">
              {Object.entries(pickupPolicy).map(([policy, enabled]) => (
                <div key={policy} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                  <div className="flex-1 mr-3">
                    <p className={`text-[11px] font-bold ${theme.highlight}`}>{policy}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>{
                      ({
                        'Only registered guardians can pick up': 'Only guardians listed in the student profile can collect the child',
                        'OTP verification for pickup': 'Guardian must enter a one-time password at gate before child is released',
                        'Photo verification at gate': 'Gate staff verifies guardian photo from student profile before releasing child',
                        'Pre-registration for non-guardian pickup': 'If someone other than registered guardian picks up, parent must pre-register them via app',
                      } as Record<string, string>)[policy]
                    }</p>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setPickupPolicy(p => ({ ...p, [policy]: !p[policy] }))} theme={theme} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Student Commute Tagging" subtitle="Tag how each student commutes to school" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Tag Students as Walk-in / Transport</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Enables commute-mode field on each student profile</p>
            </div>
            <SSAToggle on={commuteTagging} onChange={() => setCommuteTagging(!commuteTagging)} theme={theme} />
          </div>
          {commuteTagging && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Commute Mode</p>
              <SelectField options={['Walk-in', 'School Bus', 'Private Vehicle']} value={defaultCommuteMode} onChange={setDefaultCommuteMode} theme={theme} />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Transport Manager Permissions" subtitle="Define what the Transport Manager role can access and modify" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Transport Manager Role</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Enable a dedicated Transport Manager role with configurable permissions</p>
            </div>
            <SSAToggle on={hasTransportManager} onChange={() => setHasTransportManager(!hasTransportManager)} theme={theme} />
          </div>
          {hasTransportManager && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-2`}>CRUD Permissions — toggle what the Transport Manager can do</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(tmPermissions).map(([perm, enabled]) => (
                  <div key={perm} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-[11px] ${theme.highlight}`}>{perm}</span>
                    <SSAToggle on={enabled} onChange={() => setTmPermissions(p => ({ ...p, [perm]: !p[perm] }))} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
