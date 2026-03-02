'use client';

import React, { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen, ChevronDown, ChevronRight } from 'lucide-react';
import type { Theme } from '../_helpers/types';
import { modules } from '../_helpers/modules';
import SupportModule from '@/components/SupportModule';
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
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  if (!theme) return null;

  const isFeeModule = activeModule.startsWith('fee-config');
  const feeTab = activeModule.startsWith('fee-config:') ? activeModule.split(':')[1] : 'structure';
  const ActiveComponent = MODULE_COMPONENTS[activeModule];

  const toggleExpand = (id: string) => {
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleModuleClick = (m: typeof modules[0]) => {
    if ('children' in m && m.children) {
      if (!expandedMenus[m.id]) {
        toggleExpand(m.id);
        setActiveModule(`${m.id}:${m.children[0].id.split(':')[1]}`);
      } else {
        toggleExpand(m.id);
      }
    } else {
      setActiveModule(m.id);
    }
  };

  return (
    <div className="flex gap-4 -m-6">
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => {
          const hasChildren = 'children' in m && m.children;
          const isParentActive = activeModule.startsWith(m.id);
          const isExpanded = expandedMenus[m.id] || isParentActive;

          return (
            <React.Fragment key={m.id}>
              <button
                onClick={() => handleModuleClick(m)}
                title={sidebarCollapsed ? m.label : undefined}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
                  (hasChildren ? isParentActive : activeModule === m.id) ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
                }`}
              >
                <m.icon size={sidebarCollapsed ? 18 : 14} />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">{m.label}</span>
                    {hasChildren && (
                      isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />
                    )}
                  </>
                )}
              </button>
              {hasChildren && isExpanded && !sidebarCollapsed && m.children!.map(child => (
                <button
                  key={child.id}
                  onClick={() => setActiveModule(child.id)}
                  className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    activeModule === child.id ? `${theme.accentBg} ${theme.primaryText} font-bold` : `${theme.iconColor} ${theme.buttonHover}`
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${activeModule === child.id ? 'bg-current' : 'bg-current opacity-30'}`} />
                  {child.label}
                </button>
              ))}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <SSADashboardHome theme={theme} onNavigate={setActiveModule} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="school-super-admin" />}
        {isFeeModule && <FeeConfigModule theme={theme} activeTab={feeTab} onTabChange={(tab: string) => setActiveModule(`fee-config:${tab}`)} />}
        {ActiveComponent && !isFeeModule && activeModule !== 'dashboard' && activeModule !== 'support' && <ActiveComponent theme={theme} />}
      </div>
    </div>
  );
}
