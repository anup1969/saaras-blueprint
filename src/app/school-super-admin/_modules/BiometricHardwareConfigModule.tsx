'use client';

import React, { useState } from 'react';
import { Plus, Wifi, WifiOff, X, Search, Download, Upload, ChevronLeft, ChevronRight, Save, Pencil, Check, Trash2, Wrench } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

// ─── Types ─────────────────────────────────────────
interface Device {
  id: number;
  name: string;
  type: string;
  location: string;
  status: 'Online' | 'Offline' | 'Maintenance';
  lastSync: string;
  enabled: boolean;
}

const PAGE_SIZE = 5;

// ─── Sub-component: Table Toolbar ─────────────────
function TableToolbar({
  search, onSearch, count, label, onAdd, onExport, onImport, theme,
}: {
  search: string; onSearch: (v: string) => void; count: number; label: string;
  onAdd: () => void; onExport: () => void; onImport: () => void; theme: Theme;
}) {
  return (
    <div className="flex items-center gap-2 mb-3 flex-wrap">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} flex-1 min-w-[160px]`}>
        <Search size={13} className={theme.iconColor} />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder={`Search ${label}...`}
          className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none placeholder-gray-400`} />
        {search && <button onClick={() => onSearch('')}><X size={12} className="text-gray-400 hover:text-red-400" /></button>}
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${theme.secondaryBg} ${theme.iconColor} shrink-0`}>{count} records</span>
      <button onClick={onAdd}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white ${theme.primary} hover:opacity-90 shrink-0`}>
        <Plus size={12} /> Add
      </button>
      <button onClick={onExport}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover} shrink-0`}>
        <Download size={12} /> Export
      </button>
      <button onClick={onImport}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.border} ${theme.iconColor} ${theme.buttonHover} shrink-0`}>
        <Upload size={12} /> Import
      </button>
    </div>
  );
}

// ─── Sub-component: Pagination ─────────────────────
function Pagination({ page, total, pageSize, onChange, theme }: { page: number; total: number; pageSize: number; onChange: (p: number) => void; theme: Theme }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-2 mt-2">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}
        className={`p-1 rounded-lg border ${theme.border} disabled:opacity-30 ${theme.buttonHover}`}>
        <ChevronLeft size={13} className={theme.iconColor} />
      </button>
      <span className={`text-[10px] ${theme.iconColor}`}>Page {page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}
        className={`p-1 rounded-lg border ${theme.border} disabled:opacity-30 ${theme.buttonHover}`}>
        <ChevronRight size={13} className={theme.iconColor} />
      </button>
    </div>
  );
}

export default function BiometricHardwareConfigModule({ theme }: { theme: Theme }) {
  // ─── Attendance Devices ────────────────────────────
  const [attendanceDevices, setAttendanceDevices] = useState<Record<string, boolean>>({
    'Fingerprint Scanner': true, 'RFID Card Reader': true, 'Face Recognition': false, 'QR/Barcode Scanner': true,
  });
  const [deviceBrands, setDeviceBrands] = useState<Record<string, string>>({
    'Fingerprint Scanner': 'ZKTeco', 'RFID Card Reader': 'HID Global', 'Face Recognition': '', 'QR/Barcode Scanner': 'Honeywell',
  });
  const [deviceModels, setDeviceModels] = useState<Record<string, string>>({
    'Fingerprint Scanner': 'K40', 'RFID Card Reader': 'iCLASS SE', 'Face Recognition': '', 'QR/Barcode Scanner': 'Voyager 1250g',
  });
  const [deviceStatuses] = useState<Record<string, 'Connected' | 'Offline'>>({
    'Fingerprint Scanner': 'Connected', 'RFID Card Reader': 'Connected', 'Face Recognition': 'Offline', 'QR/Barcode Scanner': 'Connected',
  });
  const [deviceLastSync] = useState<Record<string, string>>({
    'Fingerprint Scanner': '2 min ago', 'RFID Card Reader': '5 min ago', 'Face Recognition': 'Never', 'QR/Barcode Scanner': '1 min ago',
  });

  // ─── GPS & Transport ──────────────────────────────
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [gpsRefresh, setGpsRefresh] = useState('30s');
  const [geofenceRadius, setGeofenceRadius] = useState('200');
  const [liveMap, setLiveMap] = useState(true);
  const [speedAlert, setSpeedAlert] = useState('60');

  // ─── CCTV & Surveillance ──────────────────────────
  const [cctvEnabled, setCctvEnabled] = useState(true);
  const [cameraCount, setCameraCount] = useState('24');
  const [retentionDays, setRetentionDays] = useState('30');
  const [motionDetection, setMotionDetection] = useState(true);
  const [nvrBrand, setNvrBrand] = useState('Hikvision');
  const [nvrModel, setNvrModel] = useState('DS-7608NI-K2');

  // ─── Smart Boards & Printers ──────────────────────
  const [smartBoardEnabled, setSmartBoardEnabled] = useState(true);
  const [smartBoardCount, setSmartBoardCount] = useState('12');
  const [smartBoardBrand, setSmartBoardBrand] = useState('BenQ');
  const [printerEnabled, setPrinterEnabled] = useState(true);
  const [printerModel, setPrinterModel] = useState('Evolis Primacy 2');
  const [paperSize, setPaperSize] = useState('CR80');
  const [doubleSided, setDoubleSided] = useState(true);

  // ─── Device Management CRUD ─────────────────────────
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Main Gate Fingerprint', type: 'Fingerprint', location: 'Main Gate', status: 'Online', lastSync: '2 min ago', enabled: true },
    { id: 2, name: 'Staff Room RFID', type: 'RFID', location: 'Staff Room', status: 'Online', lastSync: '5 min ago', enabled: true },
    { id: 3, name: 'Library QR Scanner', type: 'QR/Barcode', location: 'Library', status: 'Online', lastSync: '1 min ago', enabled: true },
    { id: 4, name: 'Back Gate Face Rec', type: 'Face Rec', location: 'Back Gate', status: 'Offline', lastSync: '2 hrs ago', enabled: true },
    { id: 5, name: 'Bus #1 GPS Tracker', type: 'GPS', location: 'Bus Route A', status: 'Online', lastSync: '10 sec ago', enabled: true },
    { id: 6, name: 'Parking Lot Camera', type: 'CCTV', location: 'Parking', status: 'Maintenance', lastSync: '1 day ago', enabled: false },
  ]);
  const [deviceSearch, setDeviceSearch] = useState('');
  const [devicePage, setDevicePage] = useState(1);
  const [editingDeviceId, setEditingDeviceId] = useState<number | null>(null);
  const [editDeviceDraft, setEditDeviceDraft] = useState<Device | null>(null);

  const filteredDevices = devices.filter(d =>
    d.name.toLowerCase().includes(deviceSearch.toLowerCase()) ||
    d.type.toLowerCase().includes(deviceSearch.toLowerCase()) ||
    d.location.toLowerCase().includes(deviceSearch.toLowerCase()) ||
    d.status.toLowerCase().includes(deviceSearch.toLowerCase())
  );
  const pagedDevices = filteredDevices.slice((devicePage - 1) * PAGE_SIZE, devicePage * PAGE_SIZE);

  function addDevice() {
    const newDevice: Device = { id: Date.now(), name: '', type: 'Other', location: '', status: 'Offline', lastSync: 'Never', enabled: true };
    setDevices(p => [newDevice, ...p]);
    setEditingDeviceId(newDevice.id);
    setEditDeviceDraft(newDevice);
    setDevicePage(1);
  }
  function deleteDevice(id: number) {
    setDevices(p => p.filter(d => d.id !== id));
    if (editingDeviceId === id) { setEditingDeviceId(null); setEditDeviceDraft(null); }
  }
  function startEditDevice(device: Device) {
    setEditingDeviceId(device.id);
    setEditDeviceDraft({ ...device });
  }
  function saveEditDevice() {
    if (editDeviceDraft) {
      setDevices(p => p.map(d => d.id === editDeviceDraft.id ? editDeviceDraft : d));
    }
    setEditingDeviceId(null);
    setEditDeviceDraft(null);
  }
  function toggleDeviceEnabled(id: number) {
    setDevices(p => p.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d));
  }

  const [firmwareAutoUpdate, setFirmwareAutoUpdate] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [deviceAccessRole, setDeviceAccessRole] = useState('Admin Only');

  const statusIcon = (s: Device['status']) => {
    if (s === 'Online') return <Wifi size={8} />;
    if (s === 'Maintenance') return <Wrench size={8} />;
    return <WifiOff size={8} />;
  };
  const statusColor = (s: Device['status']) => {
    if (s === 'Online') return 'bg-green-100 text-green-700';
    if (s === 'Maintenance') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-600';
  };

  return (
    <div className="space-y-4">
      <ModuleHeader title="Biometric & Hardware Configuration" subtitle="Manage attendance devices, GPS trackers, CCTV, smart boards, and device inventory" theme={theme} />

      {/* Row 1: Attendance Devices + GPS & Transport */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Attendance Devices" subtitle="Biometric and scanning devices for student/staff attendance" theme={theme}>
          <div className="space-y-2">
            {Object.entries(attendanceDevices).map(([device, enabled]) => (
              <div key={device} className={`p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className={`text-xs font-bold ${theme.highlight}`}>{device}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${deviceStatuses[device] === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {deviceStatuses[device]}
                    </span>
                  </div>
                  <SSAToggle on={enabled} onChange={() => setAttendanceDevices(p => ({ ...p, [device]: !p[device] }))} theme={theme} />
                </div>
                {enabled && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Brand</p>
                      <InputField value={deviceBrands[device]} onChange={v => setDeviceBrands(p => ({ ...p, [device]: v }))} theme={theme} placeholder="Brand" />
                    </div>
                    <div>
                      <p className={`text-[9px] ${theme.iconColor} mb-0.5`}>Model</p>
                      <InputField value={deviceModels[device]} onChange={v => setDeviceModels(p => ({ ...p, [device]: v }))} theme={theme} placeholder="Model" />
                    </div>
                  </div>
                )}
                <p className={`text-[9px] ${theme.iconColor} mt-1`}>Last sync: {deviceLastSync[device]}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="GPS & Transport Tracking" subtitle="Live vehicle tracking, geofencing, and speed alerts" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>GPS Tracker</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Enable GPS tracking for school buses</p>
              </div>
              <SSAToggle on={gpsEnabled} onChange={() => setGpsEnabled(!gpsEnabled)} theme={theme} />
            </div>
            {gpsEnabled && (
              <>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Refresh Interval</p>
                  <SelectField options={['10s', '30s', '60s']} value={gpsRefresh} onChange={setGpsRefresh} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Geofence Radius (meters)</p>
                  <InputField value={geofenceRadius} onChange={setGeofenceRadius} theme={theme} placeholder="200" type="number" />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Live Map View</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Show real-time bus positions on map</p>
                  </div>
                  <SSAToggle on={liveMap} onChange={() => setLiveMap(!liveMap)} theme={theme} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Speed Alert Threshold (km/h)</p>
                  <InputField value={speedAlert} onChange={setSpeedAlert} theme={theme} placeholder="60" type="number" />
                </div>
              </>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Row 2: CCTV + Smart Boards & Printers */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="CCTV & Surveillance" subtitle="Camera integration, recording retention, and motion detection" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>CCTV Integration</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Connect NVR/DVR system to school platform</p>
              </div>
              <SSAToggle on={cctvEnabled} onChange={() => setCctvEnabled(!cctvEnabled)} theme={theme} />
            </div>
            {cctvEnabled && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Camera Count</p>
                    <InputField value={cameraCount} onChange={setCameraCount} theme={theme} type="number" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Retention (days)</p>
                    <InputField value={retentionDays} onChange={setRetentionDays} theme={theme} type="number" />
                  </div>
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Motion Detection</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Alert on unusual motion after hours</p>
                  </div>
                  <SSAToggle on={motionDetection} onChange={() => setMotionDetection(!motionDetection)} theme={theme} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>NVR Brand</p>
                    <InputField value={nvrBrand} onChange={setNvrBrand} theme={theme} placeholder="e.g. Hikvision" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>NVR Model</p>
                    <InputField value={nvrModel} onChange={setNvrModel} theme={theme} placeholder="Model number" />
                  </div>
                </div>
              </>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Smart Boards & Printers" subtitle="Classroom smart boards and ID card printer configuration" theme={theme}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Smart Board Integration</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Interactive boards in classrooms</p>
              </div>
              <SSAToggle on={smartBoardEnabled} onChange={() => setSmartBoardEnabled(!smartBoardEnabled)} theme={theme} />
            </div>
            {smartBoardEnabled && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Count</p>
                  <InputField value={smartBoardCount} onChange={setSmartBoardCount} theme={theme} type="number" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Brand</p>
                  <InputField value={smartBoardBrand} onChange={setSmartBoardBrand} theme={theme} placeholder="e.g. BenQ" />
                </div>
              </div>
            )}
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>ID Card Printer</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Print student and staff ID cards</p>
              </div>
              <SSAToggle on={printerEnabled} onChange={() => setPrinterEnabled(!printerEnabled)} theme={theme} />
            </div>
            {printerEnabled && (
              <>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Printer Model</p>
                  <InputField value={printerModel} onChange={setPrinterModel} theme={theme} placeholder="e.g. Evolis Primacy 2" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Card Size</p>
                  <SelectField options={['PVC', 'CR80', 'CR79']} value={paperSize} onChange={setPaperSize} theme={theme} />
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Double-Sided Printing</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Print on both sides of ID card</p>
                  </div>
                  <SSAToggle on={doubleSided} onChange={() => setDoubleSided(!doubleSided)} theme={theme} />
                </div>
              </>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Row 3: Device Management (full width) — Full CRUD table */}
      <SectionCard title="Device Management" subtitle="Master inventory of all connected devices — add, edit, delete, enable/disable" theme={theme}>
        <div className="space-y-3">
          <TableToolbar
            search={deviceSearch} onSearch={v => { setDeviceSearch(v); setDevicePage(1); }}
            count={filteredDevices.length} label="devices"
            onAdd={addDevice}
            onExport={() => alert('Export device list as CSV')}
            onImport={() => alert('Import devices from CSV')}
            theme={theme}
          />

          {/* Device Table */}
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className={theme.secondaryBg}>
                    {['Device Name', 'Type', 'Location', 'Status', 'Last Sync', 'Enabled', 'Actions'].map(h => (
                      <th key={h} className={`text-left px-3 py-2 font-bold ${theme.iconColor} text-[10px] uppercase whitespace-nowrap`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagedDevices.length === 0 ? (
                    <tr><td colSpan={7} className={`text-center py-6 text-xs ${theme.iconColor}`}>No devices found</td></tr>
                  ) : pagedDevices.map(d => {
                    const isEditing = editingDeviceId === d.id;
                    const draft = isEditing ? editDeviceDraft! : d;
                    return (
                      <tr key={d.id} className={`border-t ${theme.border} ${!d.enabled ? 'opacity-50' : ''}`}>
                        {/* Device Name */}
                        <td className="px-2 py-1.5">
                          {isEditing ? (
                            <input value={draft.name} onChange={e => setEditDeviceDraft({ ...draft, name: e.target.value })}
                              className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`}
                              placeholder="Device name" />
                          ) : (
                            <span className={`font-medium ${theme.highlight}`}>{d.name}</span>
                          )}
                        </td>
                        {/* Type */}
                        <td className="px-2 py-1.5">
                          {isEditing ? (
                            <select value={draft.type} onChange={e => setEditDeviceDraft({ ...draft, type: e.target.value })}
                              className={`w-28 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                              {['Fingerprint', 'RFID', 'Face Rec', 'QR/Barcode', 'GPS', 'CCTV', 'Smart Board', 'Printer', 'Other'].map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${theme.accentBg} ${theme.iconColor}`}>{d.type}</span>
                          )}
                        </td>
                        {/* Location */}
                        <td className="px-2 py-1.5">
                          {isEditing ? (
                            <input value={draft.location} onChange={e => setEditDeviceDraft({ ...draft, location: e.target.value })}
                              className={`w-full px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}
                              placeholder="Location" />
                          ) : (
                            <span className={theme.iconColor}>{d.location}</span>
                          )}
                        </td>
                        {/* Status (interactive dropdown) */}
                        <td className="px-2 py-1.5 text-center">
                          {isEditing ? (
                            <select value={draft.status} onChange={e => setEditDeviceDraft({ ...draft, status: e.target.value as Device['status'] })}
                              className={`w-28 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                              <option value="Online">Online</option>
                              <option value="Offline">Offline</option>
                              <option value="Maintenance">Maintenance</option>
                            </select>
                          ) : (
                            <span className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold ${statusColor(d.status)}`}>
                              {statusIcon(d.status)} {d.status}
                            </span>
                          )}
                        </td>
                        {/* Last Sync */}
                        <td className="px-2 py-1.5">
                          {isEditing ? (
                            <input value={draft.lastSync} onChange={e => setEditDeviceDraft({ ...draft, lastSync: e.target.value })}
                              className={`w-24 px-2 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-[10px] ${theme.iconColor} outline-none`}
                              placeholder="e.g. 5 min ago" />
                          ) : (
                            <span className={`text-[10px] ${theme.iconColor}`}>{d.lastSync}</span>
                          )}
                        </td>
                        {/* Enabled toggle */}
                        <td className="px-3 py-1.5">
                          <SSAToggle on={d.enabled} onChange={() => toggleDeviceEnabled(d.id)} theme={theme} />
                        </td>
                        {/* Actions */}
                        <td className="px-2 py-1.5">
                          <div className="flex items-center gap-1.5">
                            {isEditing ? (
                              <button onClick={saveEditDevice} className="text-emerald-500 hover:text-emerald-700" title="Save">
                                <Check size={13} />
                              </button>
                            ) : (
                              <button onClick={() => startEditDevice(d)} className={`${theme.iconColor} hover:text-blue-500`} title="Edit">
                                <Pencil size={12} />
                              </button>
                            )}
                            <button onClick={() => deleteDevice(d.id)} className="text-red-400 hover:text-red-600" title="Delete">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination page={devicePage} total={filteredDevices.length} pageSize={PAGE_SIZE} onChange={setDevicePage} theme={theme} />

          {/* Controls */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Firmware Auto-Update</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Automatically update device firmware</p>
              </div>
              <SSAToggle on={firmwareAutoUpdate} onChange={() => setFirmwareAutoUpdate(!firmwareAutoUpdate)} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Offline Data Sync</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Queue data when device is offline</p>
              </div>
              <SSAToggle on={offlineSync} onChange={() => setOfflineSync(!offlineSync)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Device Access Control</p>
              <SelectField options={['Admin Only', 'Admin + Principal', 'All Staff', 'IT Department']} value={deviceAccessRole} onChange={setDeviceAccessRole} theme={theme} />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── Save Configuration ────────────────────────── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => alert('Biometric & hardware configuration saved!')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primary} hover:opacity-90 transition-all shadow-sm`}>
          <Save size={15} /> Save Configuration
        </button>
      </div>
    </div>
  );
}
