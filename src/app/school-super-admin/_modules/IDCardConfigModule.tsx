'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import type { Theme } from '../_helpers/types';

export default function IDCardConfigModule({ theme }: { theme: Theme }) {
  // Card Layout Settings
  const [cardSize, setCardSize] = useState('Standard (CR80)');
  const [orientation, setOrientation] = useState('Landscape');
  const [logoPosition, setLogoPosition] = useState('Top Center');

  // Student ID Fields
  const [studentFields, setStudentFields] = useState<Record<string, boolean>>({
    'Photo': true, 'Name': true, 'Class': true, 'Section': true, 'Roll No': true,
    'Blood Group': true, 'Transport Route': false, 'Barcode': true, 'QR Code': false,
    'Emergency Contact': true, 'Admission No': true, 'House': false,
  });

  // Staff ID Fields
  const [staffFields, setStaffFields] = useState<Record<string, boolean>>({
    'Photo': true, 'Name': true, 'Designation': true, 'Department': true,
    'Employee ID': true, 'Blood Group': true, 'Emergency Contact': true,
    'Barcode': true, 'QR Code': false,
  });

  // Design Templates
  const [selectedTemplate, setSelectedTemplate] = useState('Classic Blue');
  const templates = [
    { name: 'Classic Blue', color: 'bg-blue-600' },
    { name: 'Modern Green', color: 'bg-emerald-600' },
    { name: 'Minimal White', color: 'bg-gray-200' },
    { name: 'Custom', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  ];

  // Security Features
  const [hologram, setHologram] = useState(true);
  const [barcodeType, setBarcodeType] = useState('QR Code');
  const [expiryDate, setExpiryDate] = useState(true);
  const [validityPeriod, setValidityPeriod] = useState('1 Year');

  // Print Settings
  const [cardsPerPage, setCardsPerPage] = useState('4');
  const [paperSize, setPaperSize] = useState('A4');
  const [margins, setMargins] = useState('5mm');
  const [batchSize, setBatchSize] = useState('50');

  // Reprint Policy
  const [autoChargeReprint, setAutoChargeReprint] = useState(true);
  const [reprintFee, setReprintFee] = useState('100');
  const [approvalRequired, setApprovalRequired] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="ID Card Configuration" subtitle="Card layout, field selection, templates, security, and print settings" theme={theme} />

      {/* Card Layout Settings */}
      <SectionCard title="Card Layout Settings" subtitle="Physical card dimensions and school logo placement" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Card Size</p>
            <SelectField options={['Standard (CR80)', 'Custom (85x55mm)', 'Custom (90x60mm)']} value={cardSize} onChange={setCardSize} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Orientation</p>
            <SelectField options={['Landscape', 'Portrait']} value={orientation} onChange={setOrientation} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>School Logo Position</p>
            <SelectField options={['Top Left', 'Top Center', 'Top Right']} value={logoPosition} onChange={setLogoPosition} theme={theme} />
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        {/* Student ID Fields */}
        <SectionCard title="Student ID Fields" subtitle="Select which fields to display on student ID cards" theme={theme}>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(studentFields).map(([field, enabled]) => (
              <div key={field} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>{field}</span>
                <SSAToggle on={enabled} onChange={() => setStudentFields(p => ({ ...p, [field]: !p[field] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Staff ID Fields */}
        <SectionCard title="Staff ID Fields" subtitle="Select which fields to display on staff ID cards" theme={theme}>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(staffFields).map(([field, enabled]) => (
              <div key={field} className={`flex items-center justify-between p-2 rounded-xl ${theme.secondaryBg}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>{field}</span>
                <SSAToggle on={enabled} onChange={() => setStaffFields(p => ({ ...p, [field]: !p[field] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Design Templates */}
      <SectionCard title="Design Templates" subtitle="Choose a preset card design or create a custom layout" theme={theme}>
        <div className="grid grid-cols-4 gap-3">
          {templates.map(t => (
            <button key={t.name} onClick={() => setSelectedTemplate(t.name)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                selectedTemplate === t.name ? 'border-blue-500 shadow-lg scale-[1.02]' : `${theme.border}`
              }`}>
              <div className={`${t.color} h-20 flex flex-col items-center justify-center`}>
                <CreditCard size={20} className={t.name === 'Minimal White' ? 'text-gray-600' : 'text-white'} />
                <div className={`w-10 h-1.5 rounded-full mt-1.5 ${t.name === 'Minimal White' ? 'bg-gray-400' : 'bg-white/50'}`} />
                <div className={`w-8 h-1 rounded-full mt-1 ${t.name === 'Minimal White' ? 'bg-gray-300' : 'bg-white/30'}`} />
              </div>
              <div className={`px-2 py-1.5 ${theme.cardBg} text-center`}>
                <p className={`text-[10px] font-bold ${theme.highlight}`}>{t.name}</p>
              </div>
              {selectedTemplate === t.name && (
                <div className="absolute top-1 right-1">
                  <CheckCircle size={16} className="text-blue-500 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        {/* Security Features */}
        <SectionCard title="Security Features" subtitle="Anti-fraud measures and card authentication options" theme={theme}>
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Hologram Overlay</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Adds a holographic strip for tamper resistance</p>
              </div>
              <SSAToggle on={hologram} onChange={() => setHologram(!hologram)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Barcode Type</p>
              <SelectField options={['Code128', 'QR Code', 'Code39', 'None']} value={barcodeType} onChange={setBarcodeType} theme={theme} />
            </div>
            <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>Expiry Date on Card</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Print validity period on the card face</p>
              </div>
              <SSAToggle on={expiryDate} onChange={() => setExpiryDate(!expiryDate)} theme={theme} />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Card Validity Period</p>
              <SelectField options={['6 Months', '1 Year', '2 Years', 'Until Graduation']} value={validityPeriod} onChange={setValidityPeriod} theme={theme} />
            </div>
          </div>
        </SectionCard>

        {/* Print Settings */}
        <SectionCard title="Print Settings" subtitle="Page layout and batch printing configuration" theme={theme}>
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Cards Per Page</p>
                <SelectField options={['1', '2', '4', '8']} value={cardsPerPage} onChange={setCardsPerPage} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Paper Size</p>
                <SelectField options={['A4', 'A3', 'Letter', 'Legal']} value={paperSize} onChange={setPaperSize} theme={theme} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Margins</p>
                <SelectField options={['3mm', '5mm', '8mm', '10mm']} value={margins} onChange={setMargins} theme={theme} />
              </div>
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Print Batch Size</p>
                <InputField value={batchSize} onChange={setBatchSize} theme={theme} type="number" />
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Reprint Policy */}
      <SectionCard title="Reprint Policy" subtitle="Charges and approval for reprinted or replacement ID cards" theme={theme}>
        <div className="grid grid-cols-3 gap-3">
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Auto-Charge for Reprint</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Add reprint fee to student account</p>
            </div>
            <SSAToggle on={autoChargeReprint} onChange={() => setAutoChargeReprint(!autoChargeReprint)} theme={theme} />
          </div>
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Reprint Fee (INR)</p>
            <InputField value={reprintFee} onChange={setReprintFee} theme={theme} type="number" />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Approval Required</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Admin must approve reprint requests</p>
            </div>
            <SSAToggle on={approvalRequired} onChange={() => setApprovalRequired(!approvalRequired)} theme={theme} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
