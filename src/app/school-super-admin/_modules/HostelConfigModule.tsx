'use client';
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

export default function HostelConfigModule({ theme }: { theme: Theme }) {
  const [curfewTime, setCurfewTime] = useState('21:00');
  const [hostelToggles, setHostelToggles] = useState<Record<string, boolean>>({
    'Mess Management': true, 'Visitor Log for Hostellers': true,
    'Fee Integration with Main Fee': true, 'Warden Assignment': true,
  });
  const [roomTypes, setRoomTypes] = useState(['Single', 'Double', 'Dormitory']);
  const [newRoomType, setNewRoomType] = useState('');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Hostel Configuration" subtitle="Room types, mess, visitor log, warden, and curfew settings" theme={theme} />
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Hostel Features" subtitle="Core hostel management features for boarding students" theme={theme}>
          <div className="space-y-2">
            {Object.entries(hostelToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Mess Management': 'Manage daily mess menu, meal schedules, and dietary preferences for hostellers',
                      'Visitor Log for Hostellers': 'Track all visitors to the hostel — log entry time, purpose, and exit time',
                      'Fee Integration with Main Fee': 'Hostel fees are combined with school fees in a single invoice to parents',
                      'Warden Assignment': 'Assign wardens to specific floors or wings — wardens get access to their students\' data',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setHostelToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Curfew Time</p>
              <InputField value={curfewTime} onChange={setCurfewTime} theme={theme} type="time" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Room Types" subtitle="Add or remove accommodation categories" theme={theme}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {roomTypes.map(r => (
              <span key={r} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight}`}>
                {r}
                <button onClick={() => setRoomTypes(p => p.filter(x => x !== r))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newRoomType} onChange={e => setNewRoomType(e.target.value)} placeholder="Add room type..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newRoomType.trim()) { setRoomTypes(p => [...p, newRoomType.trim()]); setNewRoomType(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Hostel Blocks" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Room Types" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Hostel Students" templateFields={['Student Name', 'Class', 'Block', 'Room No', 'Bed No', 'Guardian Phone']} sampleData={[['Arjun Mehta', 'Grade 9', 'Block A', '102', 'B1', '9876543210']]} theme={theme} />
      </SectionCard>
    </div>
  );
}
