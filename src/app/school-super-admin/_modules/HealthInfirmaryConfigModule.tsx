'use client';

import React, { useState } from 'react';
import { X, Plus, Search, Download, Upload, ChevronLeft, ChevronRight, Save, Pencil } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

const PAGE_SIZE = 5;

type TabId = 'setup' | 'tracking' | 'settings';

export default function HealthInfirmaryConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ── Infirmary Setup ──────────────────────────────────────────────────────
  const [enableInfirmary, setEnableInfirmary] = useState(true);
  const [infirmaryLocation, setInfirmaryLocation] = useState('Ground Floor, Block A');
  const [nurseName, setNurseName] = useState('Sister Mary');

  // ── Vaccines — full table ────────────────────────────────────────────────
  const [enableVaccination, setEnableVaccination] = useState(true);
  const [vaccines, setVaccines] = useState([
    { name: 'BCG', enabled: true },
    { name: 'OPV', enabled: true },
    { name: 'DPT', enabled: true },
    { name: 'Hepatitis B', enabled: true },
    { name: 'MMR', enabled: true },
    { name: 'Varicella', enabled: false },
    { name: 'Typhoid', enabled: true },
  ]);
  const [vaccSearch, setVaccSearch] = useState('');
  const [vaccPage, setVaccPage] = useState(1);
  const [vaccEdit, setVaccEdit] = useState<number | null>(null);
  const [newVaccine, setNewVaccine] = useState('');
  const [showVaccImport, setShowVaccImport] = useState(false);
  const [gracePeriodDays, setGracePeriodDays] = useState('30');

  const filteredVacc = vaccines.filter(v => v.name.toLowerCase().includes(vaccSearch.toLowerCase()));
  const vaccPages = Math.ceil(filteredVacc.length / PAGE_SIZE);
  const pagedVacc = filteredVacc.slice((vaccPage - 1) * PAGE_SIZE, vaccPage * PAGE_SIZE);

  // ── Health Checkup Schedule ──────────────────────────────────────────────
  const [annualCheckup, setAnnualCheckup] = useState(true);
  const [checkupMonth, setCheckupMonth] = useState('July');

  // ── Health Parameters — full table ──────────────────────────────────────
  const [healthParams, setHealthParams] = useState([
    { name: 'Height', unit: 'cm', enabled: true },
    { name: 'Weight', unit: 'kg', enabled: true },
    { name: 'Vision', unit: '', enabled: true },
    { name: 'Dental', unit: '', enabled: true },
    { name: 'BMI', unit: 'kg/m²', enabled: true },
  ]);
  const [paramSearch, setParamSearch] = useState('');
  const [paramPage, setParamPage] = useState(1);
  const [paramEdit, setParamEdit] = useState<number | null>(null);
  const [showParamImport, setShowParamImport] = useState(false);

  const filteredParam = healthParams.filter(p => p.name.toLowerCase().includes(paramSearch.toLowerCase()));
  const paramPages = Math.ceil(filteredParam.length / PAGE_SIZE);
  const pagedParam = filteredParam.slice((paramPage - 1) * PAGE_SIZE, paramPage * PAGE_SIZE);

  // ── Medicine Inventory ───────────────────────────────────────────────────
  const [enableMedicineLog, setEnableMedicineLog] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [autoReorder, setAutoReorder] = useState(false);

  // ── Emergency Contacts — full table ─────────────────────────────────────
  const [emergencyContacts, setEmergencyContacts] = useState([
    { role: 'Class Teacher', phone: '', enabled: true },
    { role: 'School Nurse', phone: '9876543210', enabled: true },
    { role: 'School Admin', phone: '9988776655', enabled: true },
    { role: 'Parent/Guardian', phone: '', enabled: true },
  ]);
  const [ecSearch, setEcSearch] = useState('');
  const [ecPage, setEcPage] = useState(1);
  const [ecEdit, setEcEdit] = useState<number | null>(null);
  const [showEcImport, setShowEcImport] = useState(false);
  const [ambulanceService, setAmbulanceService] = useState('108 (Govt. Ambulance)');
  const [nearestHospital, setNearestHospital] = useState('City General Hospital - 2.5 km');

  const filteredEc = emergencyContacts.filter(c => c.role.toLowerCase().includes(ecSearch.toLowerCase()));
  const ecPages = Math.ceil(filteredEc.length / PAGE_SIZE);
  const pagedEc = filteredEc.slice((ecPage - 1) * PAGE_SIZE, ecPage * PAGE_SIZE);

  // ── Parent Notification ──────────────────────────────────────────────────
  const [autoNotifyOnVisit, setAutoNotifyOnVisit] = useState(true);
  const [notifChannels, setNotifChannels] = useState<Record<string, boolean>>({
    SMS: true, WhatsApp: true, App: true, Email: false,
  });

  // ── Health Report ────────────────────────────────────────────────────────
  const [pdfExport, setPdfExport] = useState(true);
  const [includeInReportCard, setIncludeInReportCard] = useState(false);

  // ── Tab State ──────────────────────────────────────────────────────────
  const [internalTab, setInternalTab] = useState<TabId>('setup');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Health & Infirmary Configuration" subtitle="Infirmary setup, vaccinations, checkups, medicine inventory, and emergency protocols" theme={theme} />

      {/* ── TAB: setup ── */}
      {activeTab === 'setup' && (
        <div className="space-y-4">
          {/* ── Infirmary Setup ── */}
          <SectionCard title="Infirmary Setup" subtitle="Basic infirmary details and availability" theme={theme}>
            <div className="space-y-2.5">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Enable Infirmary Module</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Activate health and infirmary tracking for the school</p>
                </div>
                <SSAToggle on={enableInfirmary} onChange={() => setEnableInfirmary(!enableInfirmary)} theme={theme} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Infirmary Location</p>
                  <InputField value={infirmaryLocation} onChange={setInfirmaryLocation} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Nurse / Doctor Name</p>
                  <InputField value={nurseName} onChange={setNurseName} theme={theme} />
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="grid grid-cols-2 gap-4">
            {/* ── Medicine Inventory ── */}
            <SectionCard title="Medicine Inventory" subtitle="Track medicine stock and automatic reorder settings" theme={theme}>
              <div className="space-y-2.5">
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Enable Medicine Log</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Log all medicines dispensed to students from infirmary</p>
                  </div>
                  <SSAToggle on={enableMedicineLog} onChange={() => setEnableMedicineLog(!enableMedicineLog)} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Low Stock Threshold</p>
                  <InputField value={lowStockThreshold} onChange={setLowStockThreshold} theme={theme} type="number" />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Reorder</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Automatically generate purchase orders when stock is low</p>
                  </div>
                  <SSAToggle on={autoReorder} onChange={() => setAutoReorder(!autoReorder)} theme={theme} />
                </div>
              </div>
            </SectionCard>

            {/* ── Emergency Contacts ── */}
            <SectionCard title="Emergency Contacts" subtitle="Add, edit, enable/disable emergency contact hierarchy" theme={theme}>
              {/* Count + Toolbar */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.primary} text-white shrink-0`}>{emergencyContacts.length} contacts</span>
                <div className={`flex items-center gap-1 flex-1 px-2 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
                  <Search size={11} className={theme.iconColor} />
                  <input value={ecSearch} onChange={e => { setEcSearch(e.target.value); setEcPage(1); }}
                    placeholder="Search…"
                    className={`flex-1 bg-transparent text-xs outline-none ${theme.highlight}`} />
                </div>
                <button onClick={() => console.log(emergencyContacts.map(c => `${c.role},${c.phone},${c.enabled}`).join('\n'))}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
                  <Download size={11} /> Export
                </button>
                <button onClick={() => setShowEcImport(v => !v)}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
                  <Upload size={11} /> Import
                </button>
                <button
                  onClick={() => setEmergencyContacts(p => [...p, { role: '', phone: '', enabled: true }])}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
                  <Plus size={11} /> Add
                </button>
              </div>

              {showEcImport && (
                <div className="mb-2">
                  <BulkImportWizard entityName="Emergency Contacts" templateFields={['Role', 'Phone', 'Enabled']} sampleData={[['School Nurse', '9876543210', 'true']]} theme={theme} />
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={theme.secondaryBg}>
                      {['#', 'Role', 'Phone', 'Enabled', 'Actions'].map(h => (
                        <th key={h} className={`text-left px-2 py-1.5 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pagedEc.map((c, i) => {
                      const realIdx = emergencyContacts.indexOf(c);
                      const displayNum = (ecPage - 1) * PAGE_SIZE + i + 1;
                      return (
                        <tr key={i} className={`border-t ${theme.border}`}>
                          <td className="px-2 py-1.5">
                            <span className={`text-[10px] w-5 h-5 inline-flex items-center justify-center rounded-full ${theme.primary} text-white font-bold`}>{displayNum}</span>
                          </td>
                          <td className="px-2 py-1.5">
                            {ecEdit === realIdx ? (
                              <input autoFocus value={c.role}
                                onChange={e => { const n = [...emergencyContacts]; n[realIdx] = { ...n[realIdx], role: e.target.value }; setEmergencyContacts(n); }}
                                className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                            ) : (
                              <span className={`font-bold ${theme.highlight}`}>{c.role}</span>
                            )}
                          </td>
                          <td className="px-2 py-1.5">
                            {ecEdit === realIdx ? (
                              <input value={c.phone}
                                onChange={e => { const n = [...emergencyContacts]; n[realIdx] = { ...n[realIdx], phone: e.target.value }; setEmergencyContacts(n); }}
                                className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} placeholder="Phone" />
                            ) : (
                              <span className={`text-[10px] ${theme.iconColor}`}>{c.phone || '—'}</span>
                            )}
                          </td>
                          <td className="px-2 py-1.5">
                            <SSAToggle on={c.enabled} onChange={() => { const n = [...emergencyContacts]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setEmergencyContacts(n); }} theme={theme} />
                          </td>
                          <td className="px-2 py-1.5">
                            <div className="flex items-center gap-1.5">
                              {ecEdit === realIdx ? (
                                <button onClick={() => setEcEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                              ) : (
                                <button onClick={() => setEcEdit(realIdx)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                              )}
                              <button onClick={() => setEmergencyContacts(prev => prev.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={11} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {ecPages > 1 && (
                <div className="flex items-center justify-between mt-1.5">
                  <span className={`text-[10px] ${theme.iconColor}`}>{(ecPage - 1) * PAGE_SIZE + 1}–{Math.min(ecPage * PAGE_SIZE, filteredEc.length)} of {filteredEc.length}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEcPage(p => Math.max(1, p - 1))} disabled={ecPage === 1} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronLeft size={11} className={theme.iconColor} /></button>
                    {Array.from({ length: ecPages }, (_, i) => (
                      <button key={i} onClick={() => setEcPage(i + 1)} className={`w-5 h-5 text-[9px] rounded font-bold ${ecPage === i + 1 ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => setEcPage(p => Math.min(ecPages, p + 1))} disabled={ecPage === ecPages} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronRight size={11} className={theme.iconColor} /></button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 mt-2.5">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Ambulance Service</p>
                  <InputField value={ambulanceService} onChange={setAmbulanceService} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Nearest Hospital</p>
                  <InputField value={nearestHospital} onChange={setNearestHospital} theme={theme} />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── TAB: tracking ── */}
      {activeTab === 'tracking' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* ── Vaccination Tracking ── */}
            <SectionCard title="Vaccination Tracking" subtitle="Manage mandatory vaccines — add, edit, enable/disable" theme={theme}>
              <div className="space-y-2.5">
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Enable Vaccination Schedule</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Track and remind parents about pending vaccinations</p>
                  </div>
                  <SSAToggle on={enableVaccination} onChange={() => setEnableVaccination(!enableVaccination)} theme={theme} />
                </div>

                {/* Count + Toolbar */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.primary} text-white shrink-0`}>{vaccines.length} vaccines</span>
                  <div className={`flex items-center gap-1 flex-1 px-2 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
                    <Search size={11} className={theme.iconColor} />
                    <input value={vaccSearch} onChange={e => { setVaccSearch(e.target.value); setVaccPage(1); }}
                      placeholder="Search…"
                      className={`flex-1 bg-transparent text-xs outline-none ${theme.highlight}`} />
                  </div>
                  <button onClick={() => console.log(vaccines.map(v => `${v.name},${v.enabled}`).join('\n'))}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
                    <Download size={11} /> Export
                  </button>
                  <button onClick={() => setShowVaccImport(v => !v)}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
                    <Upload size={11} /> Import
                  </button>
                </div>

                {showVaccImport && (
                  <BulkImportWizard entityName="Vaccines" templateFields={['Vaccine Name', 'Enabled']} sampleData={[['Polio', 'true']]} theme={theme} />
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={theme.secondaryBg}>
                        {['Vaccine Name', 'Enabled', 'Actions'].map(h => (
                          <th key={h} className={`text-left px-2 py-1.5 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pagedVacc.map((v, i) => {
                        const realIdx = vaccines.indexOf(v);
                        return (
                          <tr key={i} className={`border-t ${theme.border}`}>
                            <td className="px-2 py-1.5">
                              {vaccEdit === realIdx ? (
                                <input
                                  autoFocus
                                  value={v.name}
                                  onChange={e => { const n = [...vaccines]; n[realIdx] = { ...n[realIdx], name: e.target.value }; setVaccines(n); }}
                                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                                />
                              ) : (
                                <span className={`font-bold ${theme.highlight}`}>{v.name}</span>
                              )}
                            </td>
                            <td className="px-2 py-1.5">
                              <SSAToggle on={v.enabled} onChange={() => { const n = [...vaccines]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setVaccines(n); }} theme={theme} />
                            </td>
                            <td className="px-2 py-1.5">
                              <div className="flex items-center gap-1.5">
                                {vaccEdit === realIdx ? (
                                  <button onClick={() => setVaccEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                                ) : (
                                  <button onClick={() => setVaccEdit(realIdx)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                                )}
                                <button onClick={() => setVaccines(p => p.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={11} /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Add inline */}
                <div className="flex gap-2">
                  <InputField value={newVaccine} onChange={setNewVaccine} theme={theme} placeholder="Add vaccine name" />
                  <button
                    onClick={() => { if (newVaccine.trim()) { setVaccines(p => [...p, { name: newVaccine.trim(), enabled: true }]); setNewVaccine(''); } }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
                    <Plus size={12} />
                  </button>
                </div>

                {/* Pagination */}
                {vaccPages > 1 && (
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] ${theme.iconColor}`}>{(vaccPage - 1) * PAGE_SIZE + 1}–{Math.min(vaccPage * PAGE_SIZE, filteredVacc.length)} of {filteredVacc.length}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setVaccPage(p => Math.max(1, p - 1))} disabled={vaccPage === 1} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronLeft size={11} className={theme.iconColor} /></button>
                      {Array.from({ length: vaccPages }, (_, i) => (
                        <button key={i} onClick={() => setVaccPage(i + 1)} className={`w-5 h-5 text-[9px] rounded font-bold ${vaccPage === i + 1 ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}>{i + 1}</button>
                      ))}
                      <button onClick={() => setVaccPage(p => Math.min(vaccPages, p + 1))} disabled={vaccPage === vaccPages} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronRight size={11} className={theme.iconColor} /></button>
                    </div>
                  </div>
                )}

                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace Period (days)</p>
                  <InputField value={gracePeriodDays} onChange={setGracePeriodDays} theme={theme} type="number" />
                </div>
              </div>
            </SectionCard>

            {/* ── Health Checkup Schedule + Health Parameters stacked ── */}
            <div className="space-y-4">
              <SectionCard title="Health Checkup Schedule" subtitle="Annual checkup month configuration" theme={theme}>
                <div className="space-y-2.5">
                  <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>Annual Health Checkup</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>Conduct mandatory health screening once a year</p>
                    </div>
                    <SSAToggle on={annualCheckup} onChange={() => setAnnualCheckup(!annualCheckup)} theme={theme} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Checkup Month</p>
                    <SelectField options={['January','February','March','April','May','June','July','August','September','October','November','December']} value={checkupMonth} onChange={setCheckupMonth} theme={theme} />
                  </div>
                </div>
              </SectionCard>

              {/* ── Health Parameters ── */}
              <SectionCard title="Health Parameters" subtitle="Add, edit, enable/disable health checkup parameters" theme={theme}>
                {/* Count + Toolbar */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.primary} text-white shrink-0`}>{healthParams.length} params</span>
                  <div className={`flex items-center gap-1 flex-1 px-2 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
                    <Search size={11} className={theme.iconColor} />
                    <input value={paramSearch} onChange={e => { setParamSearch(e.target.value); setParamPage(1); }}
                      placeholder="Search params…"
                      className={`flex-1 bg-transparent text-xs outline-none ${theme.highlight}`} />
                  </div>
                  <button onClick={() => console.log(healthParams.map(p => `${p.name},${p.unit},${p.enabled}`).join('\n'))}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
                    <Download size={11} /> Export
                  </button>
                  <button onClick={() => setShowParamImport(v => !v)}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
                    <Upload size={11} /> Import
                  </button>
                  <button
                    onClick={() => setHealthParams(p => [...p, { name: '', unit: '', enabled: true }])}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold ${theme.primary} text-white`}>
                    <Plus size={11} />
                  </button>
                </div>

                {showParamImport && (
                  <div className="mb-2">
                    <BulkImportWizard entityName="Health Parameters" templateFields={['Parameter Name', 'Unit', 'Enabled']} sampleData={[['Blood Pressure', 'mmHg', 'true']]} theme={theme} />
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={theme.secondaryBg}>
                        {['Parameter', 'Unit', 'Enabled', 'Actions'].map(h => (
                          <th key={h} className={`text-left px-2 py-1.5 font-bold ${theme.iconColor} uppercase text-[10px]`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pagedParam.map((p, i) => {
                        const realIdx = healthParams.indexOf(p);
                        return (
                          <tr key={i} className={`border-t ${theme.border}`}>
                            <td className="px-2 py-1.5">
                              {paramEdit === realIdx ? (
                                <input
                                  autoFocus
                                  value={p.name}
                                  onChange={e => { const n = [...healthParams]; n[realIdx] = { ...n[realIdx], name: e.target.value }; setHealthParams(n); }}
                                  className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                                />
                              ) : (
                                <span className={`font-bold ${theme.highlight}`}>{p.name}</span>
                              )}
                            </td>
                            <td className="px-2 py-1.5">
                              {paramEdit === realIdx ? (
                                <input
                                  value={p.unit}
                                  onChange={e => { const n = [...healthParams]; n[realIdx] = { ...n[realIdx], unit: e.target.value }; setHealthParams(n); }}
                                  className={`w-16 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                                />
                              ) : (
                                <span className={`text-[10px] ${theme.iconColor}`}>{p.unit || '—'}</span>
                              )}
                            </td>
                            <td className="px-2 py-1.5">
                              <SSAToggle on={p.enabled} onChange={() => { const n = [...healthParams]; n[realIdx] = { ...n[realIdx], enabled: !n[realIdx].enabled }; setHealthParams(n); }} theme={theme} />
                            </td>
                            <td className="px-2 py-1.5">
                              <div className="flex items-center gap-1.5">
                                {paramEdit === realIdx ? (
                                  <button onClick={() => setParamEdit(null)} className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${theme.primary} text-white`}>Done</button>
                                ) : (
                                  <button onClick={() => setParamEdit(realIdx)} className={`p-1 rounded-lg ${theme.buttonHover}`}><Pencil size={11} className={theme.iconColor} /></button>
                                )}
                                <button onClick={() => setHealthParams(prev => prev.filter((_, j) => j !== realIdx))} className="text-red-400 hover:text-red-600"><X size={11} /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {paramPages > 1 && (
                  <div className="flex items-center justify-between mt-1.5">
                    <span className={`text-[10px] ${theme.iconColor}`}>{(paramPage - 1) * PAGE_SIZE + 1}–{Math.min(paramPage * PAGE_SIZE, filteredParam.length)} of {filteredParam.length}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setParamPage(p => Math.max(1, p - 1))} disabled={paramPage === 1} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronLeft size={11} className={theme.iconColor} /></button>
                      {Array.from({ length: paramPages }, (_, i) => (
                        <button key={i} onClick={() => setParamPage(i + 1)} className={`w-5 h-5 text-[9px] rounded font-bold ${paramPage === i + 1 ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`}`}>{i + 1}</button>
                      ))}
                      <button onClick={() => setParamPage(p => Math.min(paramPages, p + 1))} disabled={paramPage === paramPages} className={`p-1 rounded-lg ${theme.buttonHover} disabled:opacity-30`}><ChevronRight size={11} className={theme.iconColor} /></button>
                    </div>
                  </div>
                )}
              </SectionCard>
            </div>
          </div>

          {/* ── Health Report ── */}
          <SectionCard title="Health Report" subtitle="Export and report card integration settings" theme={theme}>
            <div className="space-y-2.5">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>PDF Export</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Allow health reports to be exported as PDF documents</p>
                </div>
                <SSAToggle on={pdfExport} onChange={() => setPdfExport(!pdfExport)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Include in Report Card</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Add health summary section to the student report card</p>
                </div>
                <SSAToggle on={includeInReportCard} onChange={() => setIncludeInReportCard(!includeInReportCard)} theme={theme} />
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── TAB: settings ── */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* ── Parent Notification ── */}
          <SectionCard title="Parent Notification" subtitle="How parents are notified when their child visits the infirmary" theme={theme}>
            <div className="space-y-2.5">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div>
                  <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Notify on Infirmary Visit</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Parents receive instant notification when child visits infirmary</p>
                </div>
                <SSAToggle on={autoNotifyOnVisit} onChange={() => setAutoNotifyOnVisit(!autoNotifyOnVisit)} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Notification Channels</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(notifChannels).map(([ch, enabled]) => (
                    <div key={ch} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                      <span className={`text-xs font-bold ${theme.highlight}`}>{ch}</span>
                      <SSAToggle on={enabled} onChange={() => setNotifChannels(p => ({ ...p, [ch]: !p[ch] }))} theme={theme} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── Save ── */}
      <div className="flex justify-end pt-1">
        <button className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold ${theme.primary} text-white shadow`}>
          <Save size={14} /> Save Health &amp; Infirmary Configuration
        </button>
      </div>
    </div>
  );
}
