'use client';

import { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { Theme } from '../_helpers/types';
import { modules } from '../_helpers/modules';
import SupportModule from '@/components/SupportModule';
import YourInputsModule from '@/components/YourInputsModule';
import { type TeamMember } from '@/lib/auth';

// ─── Module imports ──────────────────────────────────
import SSADashboardHome from './SSADashboardHome';
import OnboardingWizardModule from '../_modules/OnboardingWizardModule';
import SubscriptionMgmtModule from '../_modules/SubscriptionMgmtModule';
import FeeConfigModule from '../_modules/FeeConfigModule';
import AcademicConfigModule from '../_modules/AcademicConfigModule';
import HRConfigModule from '../_modules/HRConfigModule';
import TransportConfigModule from '../_modules/TransportConfigModule';
import AttendanceConfigModule from '../_modules/AttendanceConfigModule';
import ExamConfigModule from '../_modules/ExamConfigModule';
import CommunicationConfigModule from '../_modules/CommunicationConfigModule';
import TimetableConfigModule from '../_modules/TimetableConfigModule';
import LeaveConfigModule from '../_modules/LeaveConfigModule';
import VisitorConfigModule from '../_modules/VisitorConfigModule';
import CertificateConfigModule from '../_modules/CertificateConfigModule';
import LibraryConfigModule from '../_modules/LibraryConfigModule';
import CanteenConfigModule from '../_modules/CanteenConfigModule';
import HostelConfigModule from '../_modules/HostelConfigModule';
import InventoryConfigModule from '../_modules/InventoryConfigModule';
import ComplianceConfigModule from '../_modules/ComplianceConfigModule';
import RolePermissionModule from '../_modules/RolePermissionModule';
import HomeworkConfigModule from '../_modules/HomeworkConfigModule';
import EnquiryAdmissionConfigModule from '../_modules/EnquiryAdmissionConfigModule';
import OnlinePaymentConfigModule from '../_modules/OnlinePaymentConfigModule';
import DataMigrationModule from '../_modules/DataMigrationModule';
import CriticalLocksModule from '../_modules/CriticalLocksModule';
import AuditLogModule from '../_modules/AuditLogModule';
import BackupExportModule from '../_modules/BackupExportModule';
import ParentPortalConfigModule from '../_modules/ParentPortalConfigModule';
import StudentPortalConfigModule from '../_modules/StudentPortalConfigModule';
import AlumniConfigModule from '../_modules/AlumniConfigModule';
import AnalyticsBIConfigModule from '../_modules/AnalyticsBIConfigModule';
import ReportEngineConfigModule from '../_modules/ReportEngineConfigModule';
import APIIntegrationConfigModule from '../_modules/APIIntegrationConfigModule';
import BrandingWhitelabelConfigModule from '../_modules/BrandingWhitelabelConfigModule';
import SchoolIdentityConfigModule from '../_modules/SchoolIdentityConfigModule';
import DataPrivacyConfigModule from '../_modules/DataPrivacyConfigModule';
import DemoDataSeederModule from '../_modules/DemoDataSeederModule';
import MobileAppConfigModule from '../_modules/MobileAppConfigModule';
import RemarkBankConfigModule from '../_modules/RemarkBankConfigModule';
import LMSConfigModule from '../_modules/LMSConfigModule';
import YearEndOperationsModule from '../_modules/YearEndOperationsModule';
import IDCardConfigModule from '../_modules/IDCardConfigModule';
import DocumentMgmtConfigModule from '../_modules/DocumentMgmtConfigModule';
import HealthInfirmaryConfigModule from '../_modules/HealthInfirmaryConfigModule';
import BiometricHardwareConfigModule from '../_modules/BiometricHardwareConfigModule';
import WorkflowApprovalConfigModule from '../_modules/WorkflowApprovalConfigModule';
import AccreditationQualityConfigModule from '../_modules/AccreditationQualityConfigModule';
import ConsentESignatureConfigModule from '../_modules/ConsentESignatureConfigModule';
import FormBuilderConfigModule from '../_modules/FormBuilderConfigModule';

// ─── Module ID → Component mapping ──────────────────
const MODULE_COMPONENTS: Record<string, React.ComponentType<{ theme: Theme }>> = {
  'onboarding-wizard': OnboardingWizardModule,
  'subscription-mgmt': SubscriptionMgmtModule,
  'fee-config': FeeConfigModule,
  'academic-config': AcademicConfigModule,
  'hr-config': HRConfigModule,
  'transport-config': TransportConfigModule,
  'attendance-config': AttendanceConfigModule,
  'exam-config': ExamConfigModule,
  'communication-config': CommunicationConfigModule,
  'timetable-config': TimetableConfigModule,
  'leave-config': LeaveConfigModule,
  'visitor-config': VisitorConfigModule,
  'certificate-config': CertificateConfigModule,
  'library-config': LibraryConfigModule,
  'canteen-config': CanteenConfigModule,
  'hostel-config': HostelConfigModule,
  'inventory-config': InventoryConfigModule,
  'compliance-config': ComplianceConfigModule,
  'role-management': RolePermissionModule,
  'homework-config': HomeworkConfigModule,
  'enquiry-config': EnquiryAdmissionConfigModule,
  'payment-config': OnlinePaymentConfigModule,
  'data-migration': DataMigrationModule,
  'critical-locks': CriticalLocksModule,
  'audit-log': AuditLogModule,
  'backup-export': BackupExportModule,
  'parent-portal-config': ParentPortalConfigModule,
  'student-portal-config': StudentPortalConfigModule,
  'alumni-config': AlumniConfigModule,
  'analytics-config': AnalyticsBIConfigModule,
  'report-engine-config': ReportEngineConfigModule,
  'api-integration-config': APIIntegrationConfigModule,
  'branding-config': BrandingWhitelabelConfigModule,
  'school-identity-config': SchoolIdentityConfigModule,
  'data-privacy-config': DataPrivacyConfigModule,
  'demo-data-seeder': DemoDataSeederModule,
  'mobile-app-config': MobileAppConfigModule,
  'remark-bank-config': RemarkBankConfigModule,
  'lms-config': LMSConfigModule,
  'year-end-ops': YearEndOperationsModule,
  'id-card-config': IDCardConfigModule,
  'doc-mgmt-config': DocumentMgmtConfigModule,
  'health-config': HealthInfirmaryConfigModule,
  'biometric-config': BiometricHardwareConfigModule,
  'workflow-config': WorkflowApprovalConfigModule,
  'accreditation-config': AccreditationQualityConfigModule,
  'consent-config': ConsentESignatureConfigModule,
  'form-builder-config': FormBuilderConfigModule,
};

export default function SchoolSuperAdminDashboard({ theme, currentUser }: { theme?: Theme; currentUser?: TeamMember }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  const ActiveComponent = MODULE_COMPONENTS[activeModule];

  return (
    <div className="flex gap-4 -m-6">
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button key={m.id} onClick={() => setActiveModule(m.id)} title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}>
            <m.icon size={sidebarCollapsed ? 18 : 14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <SSADashboardHome theme={theme} onNavigate={setActiveModule} />}
        {activeModule === 'your-inputs' && <YourInputsModule theme={theme} userName={currentUser?.name || ''} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="school-super-admin" />}
        {ActiveComponent && activeModule !== 'dashboard' && activeModule !== 'support' && activeModule !== 'your-inputs' && <ActiveComponent theme={theme} />}
      </div>
    </div>
  );
}
