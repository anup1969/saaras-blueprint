'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function MobileAppConfigModule({ theme }: { theme: Theme }) {
  // Dashboard Behaviour
  const [pullToRefresh, setPullToRefresh] = useState(true);
  const [widgetMiniMode, setWidgetMiniMode] = useState('Card');
  const [offlineSnapshot, setOfflineSnapshot] = useState(true);

  // Mobile-Specific Settings
  const [pushFrequency, setPushFrequency] = useState('Instant');
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [geofenceAttendance, setGeofenceAttendance] = useState(true);
  const [geofenceRadius, setGeofenceRadius] = useState('200');

  // Role-Specific Mobile Views
  const [roleViews, setRoleViews] = useState<Record<string, Record<string, boolean>>>({
    'Security Guard': { 'Visitor Management': true, 'Student Pickup Verification': true, 'Emergency Alerts': true, 'Attendance': false, 'Fees': false },
    'Driver / Bus Attendant': { 'Route & GPS Tracking': true, 'Student Boarding List': true, 'Emergency Alerts': true, 'Attendance': false, 'Communication': false },
    'Teacher': { 'Attendance Marking': true, 'Timetable': true, 'Homework': true, 'Communication': true, 'Exam Marks Entry': true },
    'Parent': { 'Fee Payment': true, 'Attendance Tracking': true, 'Communication': true, 'Homework': true, 'Transport Tracking': true },
    'Student': { 'Timetable': true, 'Homework Submission': true, 'Exam Results': true, 'Library': true, 'Communication': false },
  });

  // Version Control
  const [currentVersion, setCurrentVersion] = useState('2.1.0');
  const [minVersion, setMinVersion] = useState('2.0.0');
  const [forceUpdate, setForceUpdate] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [playStoreUrl, setPlayStoreUrl] = useState('https://play.google.com/store/apps/details?id=com.saaras.school');
  const [appStoreUrl, setAppStoreUrl] = useState('https://apps.apple.com/app/saaras-school/id123456789');

  // Dark Mode
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [defaultMode, setDefaultMode] = useState('System');
  // Crash Reporting
  const [crashReportEnabled, setCrashReportEnabled] = useState(true);
  const [crashService, setCrashService] = useState('Firebase Crashlytics');
  const [autoSendCrash, setAutoSendCrash] = useState(true);
  // Accessibility
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);
  const [fontSizeAdjust, setFontSizeAdjust] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReaderSupport, setScreenReaderSupport] = useState(true);
  // Parental Controls
  const [parentalControlsEnabled, setParentalControlsEnabled] = useState(false);
  const [screenTimeLimit, setScreenTimeLimit] = useState('60');
  const [contentFiltering, setContentFiltering] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Mobile App Configuration" subtitle="Dashboard behaviour, push notifications, geofencing, and version control for mobile users" theme={theme} />

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Dashboard Behaviour" subtitle="Mobile-specific dashboard UX settings" theme={theme}>
          <div className="space-y-2">
            {[
              { label: 'Pull-to-Refresh', desc: 'Users can pull down to refresh dashboard data', value: pullToRefresh, toggle: () => setPullToRefresh(!pullToRefresh) },
              { label: 'Offline Snapshot', desc: 'Cache last-seen dashboard data for offline viewing', value: offlineSnapshot, toggle: () => setOfflineSnapshot(!offlineSnapshot) },
            ].map(item => (
              <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
                </div>
                <SSAToggle on={item.value} onChange={item.toggle} theme={theme} />
              </div>
            ))}
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Widget Display Mode</p>
              <SelectField options={['Card', 'List (Compact)', 'Auto (Card on tablet, List on phone)']} value={widgetMiniMode} onChange={setWidgetMiniMode} theme={theme} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Mobile-Specific Settings" subtitle="Notifications, biometrics, and data usage" theme={theme}>
          <div className="space-y-2">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Push Notification Frequency</p>
              <SelectField options={['Instant', 'Batched every 15 min', 'Batched every hour', 'Manual only']} value={pushFrequency} onChange={setPushFrequency} theme={theme} />
            </div>
            {[
              { label: 'Biometric Login', desc: 'Allow fingerprint/face unlock for app access', value: biometricLogin, toggle: () => setBiometricLogin(!biometricLogin) },
              { label: 'Data Saver Mode', desc: 'Compress images and reduce data usage on mobile networks', value: dataSaver, toggle: () => setDataSaver(!dataSaver) },
              { label: 'Geofence-Based Staff Attendance', desc: 'Staff can mark self-attendance when within school geofence', value: geofenceAttendance, toggle: () => setGeofenceAttendance(!geofenceAttendance) },
            ].map(item => (
              <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
                </div>
                <SSAToggle on={item.value} onChange={item.toggle} theme={theme} />
              </div>
            ))}
            {geofenceAttendance && (
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Geofence Radius (meters)</p>
                <InputField value={geofenceRadius} onChange={setGeofenceRadius} theme={theme} type="number" />
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Role-Specific Mobile Views" subtitle="Control which features each role sees on mobile" theme={theme}>
        <div className="space-y-3">
          {Object.entries(roleViews).map(([role, features]) => (
            <div key={role} className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-xs font-bold ${theme.highlight} mb-2`}>{role}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(features).map(([feat, enabled]) => (
                  <div key={feat} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${enabled ? 'border-emerald-300 bg-emerald-50' : `${theme.border} ${theme.cardBg}`}`}>
                    <span className={`text-[10px] font-medium ${enabled ? 'text-emerald-700' : theme.iconColor}`}>{feat}</span>
                    <SSAToggle on={enabled} onChange={() => setRoleViews(p => ({
                      ...p, [role]: { ...p[role], [feat]: !p[role][feat] }
                    }))} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Version Control & Updates" subtitle="Manage mobile app versions and force-update rules" theme={theme}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Current App Version</p>
              <InputField value={currentVersion} onChange={setCurrentVersion} theme={theme} placeholder="e.g., 2.1.0" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Minimum Supported Version</p>
              <InputField value={minVersion} onChange={setMinVersion} theme={theme} placeholder="e.g., 2.0.0" />
            </div>
            {[
              { label: 'Force Update', desc: 'Users below minimum version must update before using the app', value: forceUpdate, toggle: () => setForceUpdate(!forceUpdate) },
              { label: 'Maintenance Mode', desc: 'Show "Under Maintenance" screen on all mobile devices', value: maintenanceMode, toggle: () => setMaintenanceMode(!maintenanceMode) },
            ].map(item => (
              <div key={item.label} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{item.label}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{item.desc}</p>
                </div>
                <SSAToggle on={item.value} onChange={item.toggle} theme={theme} />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Google Play Store URL</p>
              <InputField value={playStoreUrl} onChange={setPlayStoreUrl} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Apple App Store URL</p>
              <InputField value={appStoreUrl} onChange={setAppStoreUrl} theme={theme} />
            </div>
            {maintenanceMode && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                <p className="text-[10px] text-red-700 flex items-center gap-1 font-bold"><AlertTriangle size={10} /> Maintenance mode is ACTIVE — all mobile users see a maintenance screen</p>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Dark Mode" subtitle="Allow users to switch between light and dark themes" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Dark Mode</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Users can toggle dark mode in app settings</p>
            </div>
            <SSAToggle on={darkModeEnabled} onChange={() => setDarkModeEnabled(!darkModeEnabled)} theme={theme} />
          </div>
          {darkModeEnabled && (
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Default Mode</p>
              <SelectField options={['Light', 'Dark', 'System']} value={defaultMode} onChange={setDefaultMode} theme={theme} />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Crash Reporting" subtitle="Automatically capture and report app crashes" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Crash Reporting</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Automatically capture crash logs for debugging</p>
            </div>
            <SSAToggle on={crashReportEnabled} onChange={() => setCrashReportEnabled(!crashReportEnabled)} theme={theme} />
          </div>
          {crashReportEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Reporting Service</p>
                <SelectField options={['Firebase Crashlytics', 'Sentry', 'Bugsnag', 'Custom']} value={crashService} onChange={setCrashService} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Send Reports</p>
                <SSAToggle on={autoSendCrash} onChange={() => setAutoSendCrash(!autoSendCrash)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Accessibility" subtitle="Make the app accessible to users with disabilities" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Accessibility Features</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Provide enhanced accessibility options for all users</p>
            </div>
            <SSAToggle on={accessibilityEnabled} onChange={() => setAccessibilityEnabled(!accessibilityEnabled)} theme={theme} />
          </div>
          {accessibilityEnabled && (
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Font Size Adjustment</p>
                <SSAToggle on={fontSizeAdjust} onChange={() => setFontSizeAdjust(!fontSizeAdjust)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>High Contrast Mode</p>
                <SSAToggle on={highContrast} onChange={() => setHighContrast(!highContrast)} theme={theme} />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <p className={`text-xs font-bold ${theme.highlight}`}>Screen Reader Support</p>
                <SSAToggle on={screenReaderSupport} onChange={() => setScreenReaderSupport(!screenReaderSupport)} theme={theme} />
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Parental Controls" subtitle="Controls for student app usage and content access" theme={theme}>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div className="flex-1 mr-3">
              <p className={`text-xs font-bold ${theme.highlight}`}>Enable Parental Controls</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Allow parents to set limits on their child's app usage</p>
            </div>
            <SSAToggle on={parentalControlsEnabled} onChange={() => setParentalControlsEnabled(!parentalControlsEnabled)} theme={theme} />
          </div>
          {parentalControlsEnabled && (
            <>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Screen Time Limit (minutes/day)</p>
                <InputField value={screenTimeLimit} onChange={setScreenTimeLimit} theme={theme} type="number" />
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>Content Filtering</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Filter external links and content for age-appropriateness</p>
                </div>
                <SSAToggle on={contentFiltering} onChange={() => setContentFiltering(!contentFiltering)} theme={theme} />
              </div>
            </>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
