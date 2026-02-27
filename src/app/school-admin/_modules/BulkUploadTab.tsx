'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { DataTable } from '@/components/shared';
import { Download, Upload, File, CheckCircle } from 'lucide-react';

export default function BulkUploadTab({ theme }: { theme: Theme }) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const previewRows = [
    { name: 'Aarav Mehta', class: '5-A', gender: 'Male', dob: '2016-03-15', father: 'Rajesh Mehta', phone: '9876543210' },
    { name: 'Priya Sharma', class: '3-B', gender: 'Female', dob: '2018-07-22', father: 'Amit Sharma', phone: '9876543211' },
    { name: 'Rohan Patel', class: '7-C', gender: 'Male', dob: '2014-11-08', father: 'Suresh Patel', phone: '9876543212' },
    { name: 'Ananya Gupta', class: '1-A', gender: 'Female', dob: '2020-01-30', father: 'Vivek Gupta', phone: '9876543213' },
    { name: 'Kabir Singh', class: '9-A', gender: 'Male', dob: '2012-06-05', father: 'Harpreet Singh', phone: '9876543214' },
  ];

  return (
    <div className="space-y-4">
      {/* Step 1: Download Template */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Step 1: Download Template</h3>
        <p className={`text-xs ${theme.iconColor} mb-3`}>Download the template file, fill in student details, and upload it below.</p>
        <div className="flex gap-3">
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5 transition-all`}>
            <Download size={12} /> Download CSV Template
          </button>
          <button className={`px-4 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5 transition-all`}>
            <Download size={12} /> Download Excel Template
          </button>
        </div>
      </div>

      {/* Step 2: Upload File */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Step 2: Upload File</h3>
        <div
          onClick={() => { setUploadedFile('students_batch_feb2026.csv'); setShowPreview(true); }}
          className={`border-2 border-dashed ${theme.border} rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer ${theme.buttonHover} transition-all`}
        >
          {uploadedFile ? (
            <>
              <File size={32} className="text-emerald-500 mb-2" />
              <p className={`text-xs font-bold ${theme.highlight}`}>{uploadedFile}</p>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>5 records detected. Click to change file.</p>
            </>
          ) : (
            <>
              <Upload size={32} className={theme.iconColor} />
              <p className={`text-xs font-bold ${theme.highlight} mt-2`}>Drag & drop your file here</p>
              <p className={`text-[10px] ${theme.iconColor} mt-1`}>or click to browse. Supported: CSV, XLSX (max 10MB)</p>
            </>
          )}
        </div>
      </div>

      {/* Step 3: Preview */}
      {showPreview && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-5`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Step 3: Preview (First 5 Rows)</h3>
            <span className={`text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold`}>5 records found</span>
          </div>
          <DataTable
            headers={['Student Name', 'Class', 'Gender', 'DOB', 'Father Name', 'Phone']}
            rows={previewRows.map(r => [
              <span key="n" className={`font-bold ${theme.highlight}`}>{r.name}</span>,
              <span key="c" className={theme.iconColor}>{r.class}</span>,
              <span key="g" className={theme.iconColor}>{r.gender}</span>,
              <span key="d" className={theme.iconColor}>{r.dob}</span>,
              <span key="f" className={theme.iconColor}>{r.father}</span>,
              <span key="p" className={theme.iconColor}>{r.phone}</span>,
            ])}
            theme={theme}
          />
          <div className="flex gap-3 mt-4">
            <button className={`px-5 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight} ${theme.buttonHover} flex items-center gap-1.5 transition-all`}>
              <CheckCircle size={12} /> Upload & Validate
            </button>
            <button className={`px-6 py-2.5 ${theme.primary} text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm`}>
              <Upload size={12} /> Import Students
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
