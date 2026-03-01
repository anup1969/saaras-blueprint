'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function HealthInfirmaryConfigModule({ theme }: { theme: Theme }) {
  // Infirmary Setup
  const [enableInfirmary, setEnableInfirmary] = useState(true);
  const [infirmaryLocation, setInfirmaryLocation] = useState('Ground Floor, Block A');
  const [nurseName, setNurseName] = useState('Sister Mary');

  // Vaccination Tracking
  const [enableVaccination, setEnableVaccination] = useState(true);
  const [vaccines, setVaccines] = useState(['BCG', 'OPV', 'DPT', 'Hepatitis B', 'MMR', 'Varicella', 'Typhoid']);
  const [newVaccine, setNewVaccine] = useState('');
  const [gracePeriodDays, setGracePeriodDays] = useState('30');

  // Health Checkup Schedule
  const [annualCheckup, setAnnualCheckup] = useState(true);
  const [checkupMonth, setCheckupMonth] = useState('July');
  const [checkupParams, setCheckupParams] = useState<Record<string, boolean>>({
    'Height': true, 'Weight': true, 'Vision': true, 'Dental': true, 'BMI': true,
  });

  // Medicine Inventory
  const [enableMedicineLog, setEnableMedicineLog] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [autoReorder, setAutoReorder] = useState(false);

  // Emergency Protocols
  const [emergencyContacts, setEmergencyContacts] = useState([
    'Class Teacher', 'School Nurse', 'School Admin', 'Parent/Guardian',
  ]);
  const [ambulanceService, setAmbulanceService] = useState('108 (Govt. Ambulance)');
  const [nearestHospital, setNearestHospital] = useState('City General Hospital - 2.5 km');

  // Parent Notification
  const [autoNotifyOnVisit, setAutoNotifyOnVisit] = useState(true);
  const [notifChannels, setNotifChannels] = useState<Record<string, boolean>>({
    'SMS': true, 'WhatsApp': true, 'App': true, 'Email': false,
  });

  // Health Report
  const [pdfExport, setPdfExport] = useState(true);
  const [includeInReportCard, setIncludeInReportCard] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Health & Infirmary Configuration" subtitle="Infirmary setup, vaccinations, checkups, medicine inventory, and emergency protocols" theme={theme} />

      {/* Infirmary Setup */}
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
        {/* Vaccination Tracking */}
        <SectionCard title="Vaccination Tracking" subtitle="Manage mandatory vaccine schedules and grace periods" theme={theme}>
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Enable Vaccination Schedule</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Track and remind parents about pending vaccinations</p>
              </div>
              <SSAToggle on={enableVaccination} onChange={() => setEnableVaccination(!enableVaccination)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Mandatory Vaccines</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {vaccines.map((v, i) => (
                  <div key={v} className={`flex items-center gap-1 px-2 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.highlight}`}>
                    {v}
                    <button onClick={() => setVaccines(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={9} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <InputField value={newVaccine} onChange={setNewVaccine} theme={theme} placeholder="Add vaccine" />
                <button onClick={() => { if (newVaccine.trim()) { setVaccines(p => [...p, newVaccine.trim()]); setNewVaccine(''); } }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold ${theme.iconColor} ${theme.buttonHover} border ${theme.border}`}>
                  <Plus size={12} />
                </button>
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Grace Period (days)</p>
              <InputField value={gracePeriodDays} onChange={setGracePeriodDays} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>

        {/* Health Checkup Schedule */}
        <SectionCard title="Health Checkup Schedule" subtitle="Annual checkup configuration and health parameters" theme={theme}>
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
              <SelectField options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']} value={checkupMonth} onChange={setCheckupMonth} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Health Parameters</p>
              <div className="space-y-1.5">
                {Object.entries(checkupParams).map(([param, enabled]) => (
                  <div key={param} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-xs font-bold ${theme.highlight}`}>{param}</span>
                    <SSAToggle on={enabled} onChange={() => setCheckupParams(p => ({ ...p, [param]: !p[param] }))} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Medicine Inventory */}
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

        {/* Emergency Protocols */}
        <SectionCard title="Emergency Protocols" subtitle="Emergency contact hierarchy, ambulance, and hospital details" theme={theme}>
          <div className="space-y-2.5">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1.5`}>Emergency Contact Hierarchy</p>
              <div className="space-y-1.5">
                {emergencyContacts.map((contact, i) => (
                  <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-[10px] w-5 h-5 rounded-full ${theme.primary} text-white flex items-center justify-center font-bold shrink-0`}>{i + 1}</span>
                    <input value={contact} onChange={e => { const n = [...emergencyContacts]; n[i] = e.target.value; setEmergencyContacts(n); }}
                      className={`flex-1 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    <button onClick={() => setEmergencyContacts(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                  </div>
                ))}
              </div>
            </div>
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

      <div className="grid grid-cols-2 gap-4">
        {/* Parent Notification */}
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

        {/* Health Report */}
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
    </div>
  );
}
