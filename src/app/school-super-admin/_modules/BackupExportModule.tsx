'use client';

import React, { useState } from 'react';
import { Download, Upload, AlertTriangle, Cloud, HardDrive, Shield, Trash2, Bell, ScanLine } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function BackupExportModule({ theme }: { theme: Theme }) {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFreq, setBackupFreq] = useState('Daily');
  const [exportModules, setExportModules] = useState<Record<string, boolean>>({
    Students: true, Staff: true, Fees: true, Attendance: true, All: false,
  });
  const [exportFormat, setExportFormat] = useState('Excel');
  const [exportDateFrom, setExportDateFrom] = useState('2025-04-01');
  const [exportDateTo, setExportDateTo] = useState('2026-03-31');
  const [backupProgress, setBackupProgress] = useState<number | null>(null);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [restoreFile, setRestoreFile] = useState('');
  const [restoreConfirm, setRestoreConfirm] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState<number | null>(null);
  // Storage Management - Cloud Storage Settings
  const [storageProvider, setStorageProvider] = useState('AWS S3');
  const [storageRegion, setStorageRegion] = useState('ap-south-1 (Mumbai)');
  const [encryptionAtRest, setEncryptionAtRest] = useState(true);
  const [encryptionInTransit, setEncryptionInTransit] = useState(true);
  const [cdnIntegration, setCdnIntegration] = useState(false);
  const [cdnProvider, setCdnProvider] = useState('CloudFront');
  const [cdnCacheDuration, setCdnCacheDuration] = useState('24hr');

  // Storage Management - Storage Quota & Cleanup
  const [tempFileCleanup, setTempFileCleanup] = useState(true);
  const [tempCleanupFreq, setTempCleanupFreq] = useState('Daily');
  const [archiveOldData, setArchiveOldData] = useState(false);
  const [archiveAfter, setArchiveAfter] = useState('2yr');
  const [storageAlerts, setStorageAlerts] = useState(true);
  const [storageAlertThreshold, setStorageAlertThreshold] = useState('80%');
  const [virusScanOnUpload, setVirusScanOnUpload] = useState(true);

  const backupHistory = [
    { date: '25 Feb 2026 02:00', type: 'Auto', size: '2.3 GB', status: 'Complete' },
    { date: '24 Feb 2026 02:00', type: 'Auto', size: '2.3 GB', status: 'Complete' },
    { date: '23 Feb 2026 15:30', type: 'Manual', size: '2.2 GB', status: 'Complete' },
    { date: '23 Feb 2026 02:00', type: 'Auto', size: '2.2 GB', status: 'Complete' },
    { date: '22 Feb 2026 02:00', type: 'Auto', size: '2.1 GB', status: 'Failed' },
  ];

  const runManualBackup = () => {
    setBackupProgress(0); setBackupSuccess(false);
    const iv = setInterval(() => {
      setBackupProgress(p => {
        if (p !== null && p >= 100) { clearInterval(iv); setBackupSuccess(true); return 100; }
        return (p || 0) + 20;
      });
    }, 400);
  };

  const runExport = () => {
    setExportProgress(0); setExportSuccess(false);
    const iv = setInterval(() => {
      setExportProgress(p => {
        if (p !== null && p >= 100) { clearInterval(iv); setExportSuccess(true); return 100; }
        return (p || 0) + 25;
      });
    }, 300);
  };

  const runRestore = () => {
    setRestoreConfirm(false); setRestoreProgress(0);
    const iv = setInterval(() => {
      setRestoreProgress(p => {
        if (p !== null && p >= 100) { clearInterval(iv); return 100; }
        return (p || 0) + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Backup & Export" subtitle="Data backup scheduling, manual backup, and data export tools" theme={theme} />

      <SectionCard title="Last Backup" subtitle="Most recent successful backup" theme={theme}>
        <div className={`p-4 rounded-xl ${theme.secondaryBg} flex items-center justify-between`}>
          <div>
            <p className={`text-sm font-bold ${theme.highlight}`}>25 Feb 2026, 02:00 AM</p>
            <p className={`text-[10px] ${theme.iconColor}`}>Auto backup | Size: 2.3 GB | Status: Complete</p>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold">SUCCESS</span>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Backup Schedule" subtitle="Configure automatic backup frequency" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto Backup</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Automatically backup data on schedule</p>
              </div>
              <SSAToggle on={autoBackup} onChange={() => setAutoBackup(!autoBackup)} theme={theme} />
            </div>
            {autoBackup && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Frequency</p>
                <SelectField options={['Daily', 'Weekly', 'Monthly']} value={backupFreq} onChange={setBackupFreq} theme={theme} />
              </div>
            )}
            {/* Manual backup with progress */}
            {backupProgress !== null && (
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-200">
                  <div className={`h-full rounded-full transition-all duration-300 ${backupSuccess ? 'bg-emerald-500' : theme.primary}`} style={{ width: `${backupProgress}%` }} />
                </div>
                <p className={`text-[10px] ${backupSuccess ? 'text-emerald-600 font-bold' : theme.iconColor}`}>
                  {backupSuccess ? 'Backup completed successfully! Size: 2.3 GB' : `Backing up... ${backupProgress}%`}
                </p>
              </div>
            )}
            <button onClick={runManualBackup} disabled={backupProgress !== null && !backupSuccess}
              className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all disabled:opacity-50`}>
              <Download size={14} /> {backupSuccess ? 'Run Another Backup' : 'Run Manual Backup Now'}
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Export Data" subtitle="Export school data in various formats" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Select Data</p>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.entries(exportModules).map(([mod, enabled]) => (
                  <div key={mod} className={`flex items-center gap-1.5 p-1.5 rounded-lg ${theme.secondaryBg}`}>
                    <SSAToggle on={enabled} onChange={() => setExportModules(p => ({ ...p, [mod]: !p[mod] }))} theme={theme} />
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{mod}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Format</p>
              <div className="flex gap-1">
                {['CSV', 'Excel', 'JSON'].map(f => (
                  <button key={f} onClick={() => setExportFormat(f)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all ${exportFormat === f ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.highlight}`}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>From</p>
                <InputField value={exportDateFrom} onChange={setExportDateFrom} theme={theme} type="date" />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>To</p>
                <InputField value={exportDateTo} onChange={setExportDateTo} theme={theme} type="date" />
              </div>
            </div>
            {exportProgress !== null && (
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-200">
                  <div className={`h-full rounded-full transition-all duration-300 ${exportSuccess ? 'bg-emerald-500' : theme.primary}`} style={{ width: `${exportProgress}%` }} />
                </div>
                <p className={`text-[10px] ${exportSuccess ? 'text-emerald-600 font-bold' : theme.iconColor}`}>
                  {exportSuccess ? `${exportFormat} export ready for download!` : `Exporting ${exportFormat}... ${exportProgress}%`}
                </p>
              </div>
            )}
            <button onClick={runExport} disabled={exportProgress !== null && !exportSuccess}
              className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 transition-all disabled:opacity-50`}>
              <Download size={14} /> {exportSuccess ? 'Download Export' : 'Export Data'}
            </button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Restore from Backup" subtitle="Upload a backup file to restore data" theme={theme}>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 mb-3">
          <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700"><strong>Warning:</strong> Restoring from backup will overwrite current data. This action cannot be undone. Ensure you have a recent backup before proceeding.</p>
        </div>
        <div className={`p-3 rounded-xl ${theme.secondaryBg} space-y-3`}>
          <div className="flex items-center gap-3">
            <label className="flex-1 cursor-pointer">
              <input type="file" accept=".sql,.gz,.zip" className="hidden" onChange={(e) => setRestoreFile(e.target.files?.[0]?.name || '')} />
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border-2 border-dashed ${theme.border} ${theme.buttonHover} transition-all`}>
                <Upload size={16} className={theme.iconColor} />
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{restoreFile || 'Click to select backup file'}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Accepted formats: .sql, .gz, .zip</p>
                </div>
              </div>
            </label>
          </div>
          {restoreProgress !== null && (
            <div className="space-y-1">
              <div className="w-full h-2 rounded-full bg-slate-200">
                <div className={`h-full rounded-full transition-all duration-500 ${restoreProgress >= 100 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${restoreProgress}%` }} />
              </div>
              <p className={`text-[10px] ${restoreProgress >= 100 ? 'text-emerald-600 font-bold' : 'text-rose-600'}`}>
                {restoreProgress >= 100 ? 'Restore completed successfully!' : `Restoring data... ${restoreProgress}%`}
              </p>
            </div>
          )}
          {!restoreConfirm ? (
            <button onClick={() => { if (restoreFile) setRestoreConfirm(true); }} disabled={!restoreFile}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all disabled:opacity-50">
              Restore
            </button>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-2">
              <p className="text-xs text-rose-700 font-bold">Are you sure? This will overwrite all current data with the backup.</p>
              <div className="flex gap-2">
                <button onClick={() => setRestoreConfirm(false)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.secondaryBg} ${theme.highlight}`}>Cancel</button>
                <button onClick={runRestore} className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700">Yes, Restore Now</button>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Backup History" subtitle="Recent backup records" theme={theme}>
        <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
          <table className="w-full text-xs">
            <thead className={theme.secondaryBg}>
              <tr>
                {['Date', 'Type', 'Size', 'Status', 'Action'].map(h => (
                  <th key={h} className={`text-left px-4 py-2.5 font-bold ${theme.iconColor} text-[10px] uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((b, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-4 py-2.5 ${theme.iconColor} text-[10px]`}>{b.date}</td>
                  <td className={`px-4 py-2.5`}>
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${b.type === 'Auto' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{b.type}</span>
                  </td>
                  <td className={`px-4 py-2.5 font-bold ${theme.highlight}`}>{b.size}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold ${b.status === 'Complete' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    {b.status === 'Complete' && (
                      <button onClick={() => {
                        const link = document.createElement('a');
                        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Backup from ${b.date} (Blueprint demo)`)}`;
                        link.download = `backup-${b.date.replace(/[: ]/g, '-')}.sql`;
                        link.click();
                      }} className={`text-[10px] font-bold ${theme.iconColor} hover:underline flex items-center gap-1`}>
                        <Download size={10} /> Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ─── Storage Management (Gap Feature) ─── */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Cloud Storage Settings" subtitle="Configure primary cloud storage provider and security" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Primary Storage Provider</p>
              <SelectField options={['AWS S3', 'Google Cloud', 'Azure Blob', 'Local Server']} value={storageProvider} onChange={setStorageProvider} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Storage Region</p>
              <SelectField options={['ap-south-1 (Mumbai)', 'ap-south-2 (Hyderabad)', 'us-east-1 (N. Virginia)', 'us-west-2 (Oregon)', 'eu-west-1 (Ireland)', 'eu-central-1 (Frankfurt)', 'ap-southeast-1 (Singapore)']} value={storageRegion} onChange={setStorageRegion} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><Shield size={12} className="inline mr-1" />Encryption at Rest (AES-256)</p>
                <p className={`text-[10px] ${theme.iconColor}`}>All stored data is encrypted using AES-256 encryption</p>
              </div>
              <SSAToggle on={encryptionAtRest} onChange={() => setEncryptionAtRest(!encryptionAtRest)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><Shield size={12} className="inline mr-1" />Encryption in Transit (TLS 1.3)</p>
                <p className={`text-[10px] ${theme.iconColor}`}>All data transfers use TLS 1.3 encryption</p>
              </div>
              <SSAToggle on={encryptionInTransit} onChange={() => setEncryptionInTransit(!encryptionInTransit)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><Cloud size={12} className="inline mr-1" />CDN Integration</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Enable CDN for faster static asset delivery</p>
              </div>
              <SSAToggle on={cdnIntegration} onChange={() => setCdnIntegration(!cdnIntegration)} theme={theme} />
            </div>
            {cdnIntegration && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>CDN Provider</p>
                  <SelectField options={['CloudFront', 'Cloud CDN', 'Azure CDN']} value={cdnProvider} onChange={setCdnProvider} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cache Duration</p>
                  <SelectField options={['1hr', '6hr', '24hr', '7days']} value={cdnCacheDuration} onChange={setCdnCacheDuration} theme={theme} />
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Storage Quota &amp; Cleanup" subtitle="Monitor storage usage, cleanup, and archival policies" theme={theme}>
          <div className="space-y-3">
            {/* Total Storage Progress Bar */}
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex items-center justify-between mb-1.5">
                <p className={`text-xs font-bold ${theme.highlight}`}><HardDrive size={12} className="inline mr-1" />Total Storage: 50 GB</p>
                <span className={`text-[10px] font-bold ${theme.iconColor}`}>18.5 GB used (37%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div className={`h-full rounded-full ${theme.primary}`} style={{ width: '37%' }} />
              </div>
            </div>
            {/* Breakdown Mini-bars */}
            <div className="space-y-2">
              {[
                { label: 'Documents', size: '8.2 GB', pct: 16.4, color: 'bg-blue-500' },
                { label: 'Media / Photos', size: '6.1 GB', pct: 12.2, color: 'bg-purple-500' },
                { label: 'Backups', size: '3.4 GB', pct: 6.8, color: 'bg-amber-500' },
                { label: 'System', size: '0.8 GB', pct: 1.6, color: 'bg-slate-400' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[10px] font-medium ${theme.highlight}`}>{item.label}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{item.size}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.pct / 50) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><Trash2 size={12} className="inline mr-1" />Temp File Auto-Cleanup</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Automatically remove temporary and orphaned files</p>
              </div>
              <SSAToggle on={tempFileCleanup} onChange={() => setTempFileCleanup(!tempFileCleanup)} theme={theme} />
            </div>
            {tempFileCleanup && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cleanup Frequency</p>
                <SelectField options={['Daily', 'Weekly']} value={tempCleanupFreq} onChange={setTempCleanupFreq} theme={theme} />
              </div>
            )}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}>Archive Old Data</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Move old records to cold storage to free space</p>
              </div>
              <SSAToggle on={archiveOldData} onChange={() => setArchiveOldData(!archiveOldData)} theme={theme} />
            </div>
            {archiveOldData && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Archive After</p>
                <SelectField options={['1yr', '2yr', '3yr', '5yr']} value={archiveAfter} onChange={setArchiveAfter} theme={theme} />
              </div>
            )}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><Bell size={12} className="inline mr-1" />Storage Alerts</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Get notified when storage usage exceeds threshold</p>
              </div>
              <SSAToggle on={storageAlerts} onChange={() => setStorageAlerts(!storageAlerts)} theme={theme} />
            </div>
            {storageAlerts && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Alert at</p>
                <SelectField options={['80%', '90%', '95%']} value={storageAlertThreshold} onChange={setStorageAlertThreshold} theme={theme} />
              </div>
            )}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div className="flex-1 mr-3">
                <p className={`text-xs font-bold ${theme.highlight}`}><ScanLine size={12} className="inline mr-1" />Virus/Malware Scanning</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Scan all uploaded files for viruses and malware</p>
              </div>
              <SSAToggle on={virusScanOnUpload} onChange={() => setVirusScanOnUpload(!virusScanOnUpload)} theme={theme} />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
