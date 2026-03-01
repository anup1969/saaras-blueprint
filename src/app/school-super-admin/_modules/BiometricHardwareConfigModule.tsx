'use client';

import React, { useState } from 'react';
import { Plus, Wifi, WifiOff } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

interface Device {
  name: string;
  type: string;
  location: string;
  status: 'Online' | 'Offline';
  lastSync: string;
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

  // ─── Device Management ────────────────────────────
  const [devices, setDevices] = useState<Device[]>([
    { name: 'Main Gate Fingerprint', type: 'Fingerprint', location: 'Main Gate', status: 'Online', lastSync: '2 min ago' },
    { name: 'Staff Room RFID', type: 'RFID', location: 'Staff Room', status: 'Online', lastSync: '5 min ago' },
    { name: 'Library QR Scanner', type: 'QR/Barcode', location: 'Library', status: 'Online', lastSync: '1 min ago' },
    { name: 'Back Gate Face Rec', type: 'Face Rec', location: 'Back Gate', status: 'Offline', lastSync: '2 hrs ago' },
    { name: 'Bus #1 GPS Tracker', type: 'GPS', location: 'Bus Route A', status: 'Online', lastSync: '10 sec ago' },
  ]);
  const [firmwareAutoUpdate, setFirmwareAutoUpdate] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [deviceAccessRole, setDeviceAccessRole] = useState('Admin Only');

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

      {/* Row 3: Device Management (full width) */}
      <SectionCard title="Device Management" subtitle="Master inventory of all connected devices, firmware updates, and access control" theme={theme}>
        <div className="space-y-3">
          {/* Device Table */}
          <div className={`rounded-xl border ${theme.border} overflow-hidden`}>
            <table className="w-full text-xs">
              <thead>
                <tr className={theme.secondaryBg}>
                  <th className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>Device Name</th>
                  <th className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>Type</th>
                  <th className={`text-left px-3 py-2 font-bold ${theme.iconColor}`}>Location</th>
                  <th className={`text-center px-3 py-2 font-bold ${theme.iconColor}`}>Status</th>
                  <th className={`text-right px-3 py-2 font-bold ${theme.iconColor}`}>Last Sync</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((d, i) => (
                  <tr key={i} className={`border-t ${theme.border}`}>
                    <td className={`px-3 py-2 font-medium ${theme.highlight}`}>{d.name}</td>
                    <td className="px-3 py-2">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${theme.accentBg} ${theme.iconColor}`}>{d.type}</span>
                    </td>
                    <td className={`px-3 py-2 ${theme.iconColor}`}>{d.location}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold ${d.status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {d.status === 'Online' ? <Wifi size={8} /> : <WifiOff size={8} />} {d.status}
                      </span>
                    </td>
                    <td className={`px-3 py-2 text-right ${theme.iconColor}`}>{d.lastSync}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => setDevices(p => [...p, { name: 'New Device', type: 'Other', location: '', status: 'Offline', lastSync: 'Never' }])}
            className={`flex items-center gap-1 text-xs font-bold ${theme.iconColor} ${theme.buttonHover} px-3 py-2 rounded-xl`}>
            <Plus size={12} /> Add Device
          </button>

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
    </div>
  );
}
