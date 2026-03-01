'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, StatusBadge, TabBar, DataTable, MobileFrame, MobilePreviewToggle } from '@/components/shared';
import { mockEnquiries } from '@/lib/mock-data';
import { UserPlus, Clock, CheckCircle, TrendingUp, Plus, Eye, X, UserCheck, Download, Trash2, Archive, Info, Gift, Calculator, Award, Smartphone } from 'lucide-react';
import { FormField, InputField, SelectField, TextAreaField } from '../_components/FormHelpers';

export default function EnquiriesModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Enquiries');
  const [showNewEnquiry, setShowNewEnquiry] = useState(false);
  const [convertEnquiry, setConvertEnquiry] = useState<typeof mockEnquiries[0] | null>(null);

  // New enquiry form state
  const [enqForm, setEnqForm] = useState({ studentName: '', dob: '', gender: '', classSeeking: '', parentName: '', phone: '', email: '', source: '', notes: '' });

  // Gap #16-Tab3 — Counselor assignments (mock per-row state)
  const [counselorAssignments, setCounselorAssignments] = useState<Record<string, string>>({});
  const [counselorSaved, setCounselorSaved] = useState<Record<string, boolean>>({});

  // Gap #143 — Referral Tracking detail view
  const [showReferralDetail, setShowReferralDetail] = useState<string | null>(null);

  // Mock lead scores for Gap #34
  const leadScores: Record<number, number> = { 0: 88, 1: 72, 2: 55, 3: 91, 4: 42, 5: 67, 6: 83, 7: 30 };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Enquiry Management</h1>
        <div className="flex gap-2">
          {/* Gap #27-Tab3 — Export CSV */}
          <button onClick={() => window.alert('Exporting 45 enquiries... (Blueprint demo)')} className={`px-3 py-2.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.iconColor} flex items-center gap-1 ${theme.buttonHover}`}>
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => setShowNewEnquiry(true)} className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}><Plus size={14} /> New Enquiry</button>
        </div>
      </div>
      <TabBar tabs={['All Enquiries', 'New', 'Follow-up', 'Converted', 'Lost']} active={tab} onChange={setTab} theme={theme} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={UserPlus} label="Total Enquiries" value="45" color="bg-blue-500" theme={theme} />
        <StatCard icon={Clock} label="Pending Follow-up" value="12" color="bg-amber-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Converted" value="28" color="bg-emerald-500" theme={theme} />
        <StatCard icon={TrendingUp} label="Conversion Rate" value="62%" color="bg-purple-500" theme={theme} />

      </div>

      {/* ─── MOBILE APP PREVIEW ─── */}
      <MobilePreviewToggle theme={theme} mobileContent={
        <MobileFrame title="Enquiries" theme={theme}>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-xl p-2.5 text-center"><p className="text-lg font-bold text-blue-700">45</p><p className="text-[9px] text-blue-600 font-medium">Total Enquiries</p></div>
            <div className="bg-amber-50 rounded-xl p-2.5 text-center"><p className="text-lg font-bold text-amber-700">12</p><p className="text-[9px] text-amber-600 font-medium">Follow-up Due</p></div>
          </div>
          <div className="space-y-2">
            {[{ child: "Arjun Patel", cls: "Class 5", parent: "Rajesh Patel", phone: "98765 43210", source: "Walk-in", status: "New", score: 88, date: "25-Feb" },{ child: "Meera Sharma", cls: "Class 3", parent: "Amit Sharma", phone: "87654 32109", source: "Referral", status: "Follow-up", score: 72, date: "22-Feb" },{ child: "Kabir Joshi", cls: "Class 8", parent: "Vikram Joshi", phone: "76543 21098", source: "Website", status: "New", score: 55, date: "20-Feb" },{ child: "Sanya Reddy", cls: "Class 1", parent: "Srinivas Reddy", phone: "65432 10987", source: "Phone", status: "Follow-up", score: 91, date: "18-Feb" }].map((enq, i) => (<div key={i} className="bg-white rounded-xl border border-gray-200 p-2.5"><div className="flex items-center justify-between mb-1.5"><div><p className="text-[11px] font-bold text-gray-800">{enq.child}</p><p className="text-[9px] text-gray-500">{enq.cls} {"•"} {enq.source} {"•"} {enq.date}</p></div><div className="flex flex-col items-end gap-1"><span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${enq.status === "New" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{enq.status}</span><span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${enq.score >= 85 ? "bg-red-100 text-red-700" : enq.score >= 60 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{enq.score >= 85 ? "Hot" : enq.score >= 60 ? "Warm" : "Cold"} ({enq.score})</span></div></div><p className="text-[9px] text-gray-600">{enq.parent} {"•"} {enq.phone}</p><div className="flex gap-1.5 mt-2 pt-2 border-t border-gray-100"><button className="flex-1 py-1.5 rounded-lg bg-green-500 text-white text-[8px] font-bold flex items-center justify-center gap-0.5">{"📞"} Call Now</button><button className="flex-1 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[8px] font-bold text-emerald-700 flex items-center justify-center gap-0.5">{"✓"} Convert</button></div></div>))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-2.5">
            <span className="text-[10px] font-bold text-gray-800 mb-2 block">Quick Fee Estimate</span>
            <div className="space-y-1">
              <div className="flex justify-between text-[9px]"><span className="text-gray-600">Tuition Fee</span><span className="font-bold text-gray-800">{"₹"}35,000</span></div>
              <div className="flex justify-between text-[9px]"><span className="text-gray-600">Activity Fee</span><span className="font-bold text-gray-800">{"₹"}5,000</span></div>
              <div className="flex justify-between text-[9px]"><span className="text-gray-600">Transport (if opted)</span><span className="font-bold text-gray-800">{"₹"}18,000</span></div>
              <div className="flex justify-between text-[9px] pt-1 border-t border-gray-200"><span className="font-bold text-gray-800">Estimated Total</span><span className="font-bold text-emerald-700">{"₹"}58,000/yr</span></div>
            </div>
            <button className="w-full mt-2 py-1.5 rounded-lg bg-green-500 text-white text-[9px] font-bold flex items-center justify-center gap-1">{"📱"} Share via WhatsApp</button>
          </div>
        </MobileFrame>
      } />
      {/* Gap #41-Tab3 — Marketing ROI Report Card */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className={theme.primaryText} />
          <h3 className={`text-sm font-bold ${theme.highlight}`}>Marketing ROI</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={`${theme.secondaryBg}`}>
                {['Channel', 'Spend', 'Enquiries', 'Conversions', 'Cost/Lead', 'ROI'].map(h => (
                  <th key={h} className={`px-3 py-2 text-left text-[10px] font-bold ${theme.iconColor} uppercase`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { channel: 'Google Ads', spend: '45,000', enquiries: 18, conversions: 12, costLead: '2,500', roi: '267%' },
                { channel: 'Facebook', spend: '30,000', enquiries: 14, conversions: 8, costLead: '2,143', roi: '213%' },
                { channel: 'Newspaper', spend: '25,000', enquiries: 6, conversions: 3, costLead: '4,167', roi: '96%' },
                { channel: 'Referral Program', spend: '10,000', enquiries: 12, conversions: 9, costLead: '833', roi: '720%' },
                { channel: 'Walk-in', spend: '0', enquiries: 8, conversions: 5, costLead: '0', roi: '--' },
              ].map((r, i) => (
                <tr key={i} className={`border-t ${theme.border}`}>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.channel}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{r.spend}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{r.enquiries}</td>
                  <td className={`px-3 py-2 font-bold ${theme.highlight}`}>{r.conversions}</td>
                  <td className={`px-3 py-2 ${theme.iconColor}`}>{r.costLead}</td>
                  <td className={`px-3 py-2 font-bold ${r.roi === '--' ? theme.iconColor : 'text-emerald-600'}`}>{r.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DataTable
        headers={['ID', 'Child Name', 'Class', 'Score', 'Counselor', 'Source', 'Date', 'Status', '']}
        rows={mockEnquiries.map((e, idx) => {
          const counselorOptions = ['Unassigned', 'Ms. Priya', 'Mr. Rahul', 'Mrs. Sunita', 'Mr. Vikram'];
          const defaultCounselors = ['Ms. Priya', 'Mr. Rahul', 'Mrs. Sunita', 'Mr. Vikram', 'Ms. Priya'];
          const currentCounselor = counselorAssignments[e.id] || defaultCounselors[idx % defaultCounselors.length];
          const isWaitlisted = idx === 1 || idx === 4;
          const score = leadScores[idx] ?? 50;
          const scoreLabel = score >= 85 ? 'Hot' : score >= 60 ? 'Warm' : 'Cold';
          const scoreColor = score >= 85 ? 'bg-red-100 text-red-700' : score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700';
          return [
            <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{e.id}</span>,
            <span key="name" className={`font-bold ${theme.highlight}`}>
              {e.child}
              {isWaitlisted && (
                <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold" title={`Waitlist Position: #${idx === 1 ? 3 : 7}`}>Waitlisted #{idx === 1 ? 3 : 7}</span>
              )}
            </span>,
            <span key="class" className={theme.iconColor}>{e.class}</span>,
            /* Gap #34 — Lead Scoring */
            <span key="score" className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${scoreColor} cursor-help`} title="Based on: engagement, response time, form completeness">
              {scoreLabel} ({score})
            </span>,
            /* Gap #16-Tab3 — Counselor Assignment */
            <span key="counselor" className="flex items-center gap-1">
              <select
                value={currentCounselor}
                onChange={ev => {
                  setCounselorAssignments(p => ({ ...p, [e.id]: ev.target.value }));
                  setCounselorSaved(p => ({ ...p, [e.id]: true }));
                  setTimeout(() => setCounselorSaved(p => ({ ...p, [e.id]: false })), 2000);
                }}
                className={`px-1.5 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${theme.inputBg} ${theme.highlight}`}
              >
                {counselorOptions.map(c => <option key={c}>{c}</option>)}
              </select>
              {counselorSaved[e.id] && <CheckCircle size={12} className="text-emerald-500" />}
            </span>,
            <span key="source" className={theme.iconColor}>{e.source}</span>,
            <span key="date" className={theme.iconColor}>{e.date}</span>,
            <StatusBadge key="status" status={e.status} theme={theme} />,
            <div key="action" className="flex gap-1">
              <button onClick={() => setShowReferralDetail(showReferralDetail === e.id ? null : e.id)} className={`p-1.5 rounded-lg ${theme.secondaryBg}`} title="View Details"><Eye size={12} className={theme.iconColor} /></button>
              {(e.status === 'New' || e.status === 'Follow-up') && (
                <>
                  <button onClick={() => setConvertEnquiry(e)} className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">Convert</button>
                  <button onClick={() => window.alert('Enquiry ' + e.id + ' rejected. (Blueprint demo)')} className="px-2 py-1 rounded-lg bg-red-100 text-red-600 text-[10px] font-bold" title="Are you sure? This will mark the enquiry as rejected.">Reject</button>
                </>
              )}
              {/* Gap #43 — Delete/Archive Dead Leads on Lost tab */}
              {(tab === 'Lost' || e.status === 'Lost') && (
                <>
                  <button onClick={() => window.alert('Enquiry ' + e.id + ' deleted. (Blueprint demo)')} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-all" title="Delete"><Trash2 size={12} className="text-red-500" /></button>
                  <button onClick={() => window.alert('Enquiry ' + e.id + ' archived. (Blueprint demo)')} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all" title="Archive"><Archive size={12} className="text-slate-500" /></button>
                </>
              )}
            </div>,
          ];
        })}
        theme={theme}
      />

      {/* Gap #143 — Referral Tracking Detail */}
      {showReferralDetail && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-3`}>
          <div className="flex items-center gap-2">
            <Gift size={16} className={theme.primaryText} />
            <h3 className={`text-sm font-bold ${theme.highlight}`}>Referral Details — {showReferralDetail}</h3>
            <button onClick={() => setShowReferralDetail(null)} className={`ml-auto p-1 rounded-lg ${theme.buttonHover}`}><X size={14} className={theme.iconColor} /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Referred By</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>Rajesh Patel</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Referral Type</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>Parent</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Referral Chain</p>
              <p className={`text-xs font-bold ${theme.highlight}`}>Rajesh Patel &rarr; Amit Sharma &rarr; Current</p>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg}`}>
              <p className={`text-[10px] ${theme.iconColor} mb-0.5`}>Reward Status</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">Pending</span>
            </div>
          </div>
          <p className={`text-[10px] ${theme.iconColor} italic`}>Referral types: Parent, Staff, Alumni, Advertisement</p>

          {/* ── Fee Estimation Calculator ── */}
          <div className={`p-4 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
            <div className="flex items-center gap-2">
              <Calculator size={16} className={theme.primaryText} />
              <h4 className={`text-sm font-bold ${theme.highlight}`}>Fee Estimate</h4>
              <span title="Show parents estimated annual fee during admission enquiry"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
            </div>
            <p className={`text-[10px] ${theme.iconColor}`}>Auto-populated based on class applied</p>
            <div className="space-y-1.5">
              {[
                { item: 'Tuition Fee', amount: '35,000' },
                { item: 'Activity Fee', amount: '5,000' },
                { item: 'Transport (if opted)', amount: '18,000' },
                { item: 'Uniform', amount: '3,500' },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className={`text-xs ${theme.iconColor}`}>{f.item}</span>
                  <span className={`text-xs font-bold ${theme.highlight}`}>{'\u20B9'}{f.amount}</span>
                </div>
              ))}
              <div className={`flex items-center justify-between pt-2 border-t ${theme.border}`}>
                <span className={`text-xs font-bold ${theme.highlight}`}>Gross Total</span>
                <span className={`text-xs font-bold ${theme.primaryText}`}>{'\u20B9'}61,500</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${theme.cardBg} border ${theme.border} space-y-1.5`}>
              <p className={`text-[10px] font-bold ${theme.iconColor} uppercase`}>Applicable Concessions</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${theme.iconColor}`}>EWS (if eligible)</span>
                <span className="text-xs font-bold text-red-600">-{'\u20B9'}35,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${theme.iconColor}`}>Sibling (if applicable)</span>
                <span className="text-xs font-bold text-red-600">-{'\u20B9'}3,500</span>
              </div>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200`}>
              <span className="text-sm font-bold text-emerald-800">Net Estimated Fee</span>
              <span className="text-sm font-bold text-emerald-800">{'\u20B9'}23,000</span>
            </div>
            <button onClick={() => window.alert('Fee estimate shared with parent via WhatsApp/Email. (Blueprint demo)')} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
              <Smartphone size={12} /> Share with Parent
            </button>
            <p className={`text-[10px] ${theme.iconColor} flex items-center gap-1`}>
              <Smartphone size={10} /> Sends to parent WhatsApp/email
            </p>
          </div>

          {/* ── Available Scholarships ── */}
          <div className={`p-4 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-3`}>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-amber-500" />
              <h4 className={`text-sm font-bold ${theme.highlight}`}>Available Scholarships</h4>
              <span title="Show applicable scholarships during admission process"><Info size={14} className={`${theme.iconColor} cursor-help`} /></span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Merit Scholarship', criteria: 'Top 10% in entrance test', amount: '\u20B95,000 / year' },
                { name: 'EWS Scholarship', criteria: 'Family income < \u20B93L / year', amount: '100% fee waiver' },
                { name: 'Sports Scholarship', criteria: 'State-level player', amount: '\u20B910,000 / year' },
              ].map((s, i) => (
                <div key={i} className={`p-3 rounded-xl ${theme.cardBg} border ${theme.border}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${theme.highlight}`}>{s.name}</span>
                    <span className={`text-[10px] font-bold ${theme.primaryText}`}>{s.amount}</span>
                  </div>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{s.criteria}</p>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-xs font-bold text-emerald-800">This student may be eligible for: <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold ml-1">EWS</span></p>
              <p className="text-[10px] text-emerald-700 mt-0.5">Based on category field in enquiry form</p>
            </div>
          </div>
        </div>
      )}



      {/* New Enquiry Modal */}
      {showNewEnquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewEnquiry(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${theme.highlight}`}>New Enquiry</h2>
              <button onClick={() => setShowNewEnquiry(false)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Student Name" required theme={theme}>
                <InputField placeholder="Full name" value={enqForm.studentName} onChange={v => setEnqForm(p => ({ ...p, studentName: v }))} theme={theme} />
              </FormField>
              <FormField label="Date of Birth" theme={theme}>
                <InputField type="date" value={enqForm.dob} onChange={v => setEnqForm(p => ({ ...p, dob: v }))} theme={theme} />
              </FormField>
              <FormField label="Gender" theme={theme}>
                <SelectField options={['Male', 'Female', 'Other']} value={enqForm.gender} onChange={v => setEnqForm(p => ({ ...p, gender: v }))} theme={theme} placeholder="Select" />
              </FormField>
              <FormField label="Class Seeking" required theme={theme}>
                <SelectField options={['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']} value={enqForm.classSeeking} onChange={v => setEnqForm(p => ({ ...p, classSeeking: v }))} theme={theme} placeholder="Select class" />
              </FormField>
              <FormField label="Parent Name" required theme={theme}>
                <InputField placeholder="Father/Mother/Guardian name" value={enqForm.parentName} onChange={v => setEnqForm(p => ({ ...p, parentName: v }))} theme={theme} />
              </FormField>
              <FormField label="Phone" required theme={theme}>
                <InputField placeholder="10-digit mobile" value={enqForm.phone} onChange={v => setEnqForm(p => ({ ...p, phone: v }))} theme={theme} />
              </FormField>
              <FormField label="Email" theme={theme}>
                <InputField placeholder="email@example.com" type="email" value={enqForm.email} onChange={v => setEnqForm(p => ({ ...p, email: v }))} theme={theme} />
              </FormField>
              <FormField label="Source" required theme={theme}>
                <SelectField options={['Walk-in', 'Phone', 'Website', 'Referral']} value={enqForm.source} onChange={v => setEnqForm(p => ({ ...p, source: v }))} theme={theme} placeholder="Select source" />
              </FormField>
            </div>
            <FormField label="Notes" theme={theme}>
              <TextAreaField placeholder="Any additional notes about the enquiry..." value={enqForm.notes} onChange={v => setEnqForm(p => ({ ...p, notes: v }))} theme={theme} rows={3} />
            </FormField>
            <div className="flex gap-2">
              <button onClick={() => setShowNewEnquiry(false)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button onClick={() => { window.alert('Enquiry created for ' + (enqForm.studentName || 'student') + '! (Blueprint demo)'); setShowNewEnquiry(false); setEnqForm({ studentName: '', dob: '', gender: '', classSeeking: '', parentName: '', phone: '', email: '', source: '', notes: '' }); }} className={`flex-1 py-2.5 rounded-xl ${theme.primary} text-white text-sm font-bold`}>Create Enquiry</button>
            </div>
          </div>
        </div>
      )}

      {/* Convert Enquiry to Admission Modal */}
      {convertEnquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setConvertEnquiry(null)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-full max-w-lg p-6 space-y-4`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white`}><UserCheck size={18} /></div>
                <h2 className={`text-lg font-bold ${theme.highlight}`}>Convert to Admission</h2>
              </div>
              <button onClick={() => setConvertEnquiry(null)} className={`p-1.5 rounded-lg ${theme.buttonHover}`}><X size={16} className={theme.iconColor} /></button>
            </div>
            <div className={`p-3 rounded-xl ${theme.secondaryBg} text-xs ${theme.iconColor}`}>
              Converting enquiry <strong className={theme.primaryText}>{convertEnquiry.id}</strong> to a confirmed admission.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Student Name" theme={theme}>
                <InputField value={convertEnquiry.child} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Class" theme={theme}>
                <InputField value={convertEnquiry.class} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Parent Name" theme={theme}>
                <InputField value={convertEnquiry.parent} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Phone" theme={theme}>
                <InputField value={convertEnquiry.phone} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Admission Number" theme={theme}>
                <InputField value={'ADM-2026-' + String(Math.floor(Math.random() * 9000) + 1000)} onChange={() => {}} theme={theme} readOnly />
              </FormField>
              <FormField label="Section" theme={theme}>
                <SelectField options={['A', 'B', 'C', 'D']} value="" onChange={() => {}} theme={theme} placeholder="Select section" />
              </FormField>
              <FormField label="Fee Plan" theme={theme}>
                <SelectField options={['Standard', 'Sibling Discount', 'Merit Scholarship', 'Staff Child']} value="" onChange={() => {}} theme={theme} placeholder="Select plan" />
              </FormField>
              <FormField label="Admission Date" theme={theme}>
                <InputField type="date" value="2026-02-25" onChange={() => {}} theme={theme} />
              </FormField>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setConvertEnquiry(null)} className={`flex-1 py-2.5 rounded-xl ${theme.secondaryBg} text-xs font-bold ${theme.highlight} ${theme.buttonHover}`}>Cancel</button>
              <button onClick={() => { window.alert('Enquiry ' + convertEnquiry.id + ' converted to admission for ' + convertEnquiry.child + '! (Blueprint demo)'); setConvertEnquiry(null); }} className={`flex-1 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-bold`}>Confirm Admission</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
