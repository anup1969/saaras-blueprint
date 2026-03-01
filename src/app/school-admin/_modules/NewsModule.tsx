'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, TabBar, SearchBar } from '@/components/shared';
import {
  Newspaper, FileText, Clock, Eye, Star, Plus, X, Search,
  Edit, Trash2, Send, Calendar, Users, BarChart3, Filter,
  Bold, Italic, Heading, List, Image, Video, Paperclip,
  Bell, Mail, MessageSquare, Globe, PieChart, TrendingUp,
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const newsArticles = [
  { id: 'NEWS-001', title: 'Annual Day Performances Dazzle Audience', date: '17 Jan 2026', author: 'Admin', status: 'Published', category: 'Events', views: 450, audience: 'All', featured: true },
  { id: 'NEWS-002', title: 'Science Exhibition Winners Announced', date: '09 Feb 2026', author: 'Mrs. Sharma', status: 'Published', category: 'Academic', views: 280, audience: 'All', featured: false },
  { id: 'NEWS-003', title: 'Sports Day 2026 — A Grand Success', date: '15 Feb 2026', author: 'Mr. Singh', status: 'Published', category: 'Sports', views: 520, audience: 'All', featured: true },
  { id: 'NEWS-004', title: 'Fee Payment Deadline Extended to March 15', date: '25 Feb 2026', author: 'Accounts', status: 'Published', category: 'Finance', views: 890, audience: 'Parents', featured: false },
  { id: 'NEWS-005', title: 'Board Exam Preparation Tips from HODs', date: '26 Feb 2026', author: 'Dr. Joshi', status: 'Draft', category: 'Academic', views: 0, audience: 'Students', featured: false },
  { id: 'NEWS-006', title: 'Summer Camp Registration Opens April 1', date: '28 Feb 2026', author: 'Admin', status: 'Scheduled', publishDate: '01 Mar 2026', category: 'Events', views: 0, audience: 'Parents', featured: false },
];

const newsCategories = ['All', 'Events', 'Academic', 'Sports', 'Finance'];

export default function NewsModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState('All News');
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [publishMode, setPublishMode] = useState<'draft' | 'publish' | 'schedule'>('draft');
  const [isFeatured, setIsFeatured] = useState(false);
  const [notifChannels, setNotifChannels] = useState({ push: true, sms: false, email: false });

  const published = newsArticles.filter(a => a.status === 'Published');
  const drafts = newsArticles.filter(a => a.status === 'Draft');
  const scheduled = newsArticles.filter(a => a.status === 'Scheduled');

  const getFilteredArticles = (tab: string) => {
    let filtered = newsArticles;
    if (tab === 'Published') filtered = published;
    else if (tab === 'Draft') filtered = drafts;
    else if (tab === 'Scheduled') filtered = scheduled;
    if (categoryFilter !== 'All') filtered = filtered.filter(a => a.category === categoryFilter);
    return filtered;
  };

  const categoryColor = (cat: string) => {
    if (cat === 'Events') return 'bg-blue-100 text-blue-700';
    if (cat === 'Academic') return 'bg-emerald-100 text-emerald-700';
    if (cat === 'Sports') return 'bg-red-100 text-red-700';
    if (cat === 'Finance') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };

  const audienceColor = (aud: string) => {
    if (aud === 'All') return 'bg-purple-100 text-purple-700';
    if (aud === 'Parents') return 'bg-emerald-100 text-emerald-700';
    if (aud === 'Students') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  const renderNewsList = (tab: string) => {
    const articles = getFilteredArticles(tab);
    return (
      <div className="space-y-3">
        {articles.map(article => (
          <div key={article.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 hover:shadow-md transition-all`}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {article.featured && <Star size={12} className="text-amber-500 fill-amber-500" />}
                  <p className={`text-xs font-bold ${theme.highlight}`}>{article.title}</p>
                </div>
                <p className={`text-[10px] ${theme.iconColor} mt-1 line-clamp-2`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-[10px] ${theme.iconColor}`}>{article.author}</span>
                  <span className={`text-[10px] ${theme.iconColor}`}>{article.date}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${categoryColor(article.category)}`}>{article.category}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${audienceColor(article.audience)}`}>{article.audience}</span>
                  {article.views > 0 && (
                    <span className={`text-[10px] ${theme.iconColor} flex items-center gap-0.5`}><Eye size={10} /> {article.views}</span>
                  )}
                </div>
                {article.status === 'Scheduled' && 'publishDate' in article && (
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={10} className="text-blue-500" />
                    <span className="text-[10px] text-blue-600 font-bold">Scheduled for: {(article as typeof article & { publishDate: string }).publishDate}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                  article.status === 'Published' ? 'bg-emerald-100 text-emerald-700' :
                  article.status === 'Draft' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{article.status}</span>
                <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Edit"><Edit size={12} className={theme.iconColor} /></button>
                {article.status === 'Draft' && (
                  <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Publish"><Send size={12} className="text-emerald-500" /></button>
                )}
                {article.status === 'Published' && (
                  <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Unpublish"><Globe size={12} className={theme.iconColor} /></button>
                )}
                <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title={article.featured ? 'Unfeature' : 'Feature'}>
                  <Star size={12} className={article.featured ? 'text-amber-500 fill-amber-500' : theme.iconColor} />
                </button>
                <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Delete"><Trash2 size={12} className="text-red-400" /></button>
              </div>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div className={`text-center py-8 ${theme.iconColor}`}>
            <Newspaper size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-xs">No articles found</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>News</h1>
        <button onClick={() => setShowCreateArticle(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
          <Plus size={10} /> Create Article
        </button>
      </div>

      <TabBar tabs={['All News', 'Published', 'Draft', 'Scheduled', 'Analytics']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {/* ─── All News / Published / Draft / Scheduled Tabs ─── */}
      {['All News', 'Published', 'Draft', 'Scheduled'].includes(activeTab) && (
        <>
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={Newspaper} label="Total Articles" value={String(newsArticles.length)} color="bg-blue-500" sub="all time" theme={theme} />
            <StatCard icon={Globe} label="Published" value={String(published.length)} color="bg-emerald-500" sub="live now" theme={theme} />
            <StatCard icon={Edit} label="Draft" value={String(drafts.length)} color="bg-amber-500" sub="in progress" theme={theme} />
            <StatCard icon={Clock} label="Scheduled" value={String(scheduled.length)} color="bg-purple-500" sub="upcoming" theme={theme} />
          </div>

          <div className="flex items-center gap-3">
            <SearchBar placeholder="Search articles..." theme={theme} icon={Search} />
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              {newsCategories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {renderNewsList(activeTab)}
        </>
      )}

      {/* ─── Analytics Tab ─── */}
      {activeTab === 'Analytics' && (
        <div className="space-y-4">
          {/* Most Read Articles */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Most Read Articles — Top 5</h3>
            </div>
            <div className="space-y-2">
              {[...published].sort((a, b) => b.views - a.views).slice(0, 5).map((article, i) => (
                <div key={article.id} className="flex items-center gap-3">
                  <span className={`text-xs font-bold ${theme.primaryText} w-5`}>#{i + 1}</span>
                  <span className={`text-[10px] ${theme.highlight} font-bold flex-1 truncate`}>{article.title}</span>
                  <div className="w-32">
                    <div className={`h-3 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${(article.views / 890) * 100}%` }} />
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold ${theme.iconColor} w-16 text-right`}>{article.views} views</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Views by Category */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <PieChart size={16} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Views by Category</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 rounded-full relative" style={{ background: 'conic-gradient(#3b82f6 0% 36%, #10b981 36% 49%, #ef4444 49% 73%, #f59e0b 73% 100%)' }}>
                  <div className={`absolute inset-3 rounded-full ${theme.cardBg} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${theme.highlight}`}>2,140</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[
                    { label: 'Events', pct: '36%', views: 770, color: 'bg-blue-500' },
                    { label: 'Academic', pct: '13%', views: 280, color: 'bg-emerald-500' },
                    { label: 'Sports', pct: '24%', views: 520, color: 'bg-red-500' },
                    { label: 'Finance', pct: '27%', views: 890, color: 'bg-amber-500' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                      <span className={`text-[10px] ${theme.iconColor} flex-1`}>{c.label}</span>
                      <span className={`text-[10px] font-bold ${theme.highlight}`}>{c.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience Breakdown */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className={theme.primaryText} />
                <h3 className={`text-sm font-bold ${theme.highlight}`}>Audience Breakdown</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Parents', pct: 45, color: 'bg-emerald-500' },
                  { label: 'Students', pct: 30, color: 'bg-blue-500' },
                  { label: 'Staff', pct: 20, color: 'bg-purple-500' },
                  { label: 'Others', pct: 5, color: 'bg-gray-400' },
                ].map((seg, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] ${theme.iconColor}`}>{seg.label}</span>
                      <span className={`text-[10px] font-bold ${theme.highlight}`}>{seg.pct}%</span>
                    </div>
                    <div className={`h-2 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div className={`h-full rounded-full ${seg.color}`} style={{ width: `${seg.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Over Time */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Weekly View Counts</h3>
            </div>
            <div className="flex items-end gap-2 h-32 px-2">
              {[
                { week: 'W1 Jan', views: 120 },
                { week: 'W2 Jan', views: 340 },
                { week: 'W3 Jan', views: 180 },
                { week: 'W4 Jan', views: 95 },
                { week: 'W1 Feb', views: 250 },
                { week: 'W2 Feb', views: 310 },
                { week: 'W3 Feb', views: 420 },
                { week: 'W4 Feb', views: 525 },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-[8px] font-bold ${theme.primaryText}`}>{d.views}</span>
                  <div className={`w-full rounded-t-lg ${theme.primary}`} style={{ height: `${(d.views / 525) * 100}%`, minHeight: '4px' }} />
                  <span className={`text-[7px] ${theme.iconColor}`}>{d.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Article Modal ─── */}
      {showCreateArticle && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowCreateArticle(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Create News Article</h3>
              <button onClick={() => setShowCreateArticle(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
            </div>
            <div className="space-y-3">
              {/* Title */}
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Title <span className="text-red-500">*</span></label>
                <input placeholder="Article headline..." className={`w-full text-xs p-2.5 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight} font-bold`} />
              </div>

              {/* Rich Content Area */}
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Content <span className="text-red-500">*</span></label>
                <div className={`border ${theme.border} rounded-xl overflow-hidden`}>
                  {/* Formatting Toolbar */}
                  <div className={`flex items-center gap-1 px-2 py-1.5 border-b ${theme.border} ${theme.secondaryBg}`}>
                    <button className={`p-1 rounded ${theme.buttonHover}`} title="Bold"><Bold size={12} className={theme.iconColor} /></button>
                    <button className={`p-1 rounded ${theme.buttonHover}`} title="Italic"><Italic size={12} className={theme.iconColor} /></button>
                    <button className={`p-1 rounded ${theme.buttonHover}`} title="Heading"><Heading size={12} className={theme.iconColor} /></button>
                    <button className={`p-1 rounded ${theme.buttonHover}`} title="List"><List size={12} className={theme.iconColor} /></button>
                    <div className={`w-px h-4 ${theme.border} bg-gray-300 mx-1`} />
                    <button className={`p-1 rounded ${theme.buttonHover}`} title="Insert Image"><Image size={12} className={theme.iconColor} /></button>
                    <button className={`p-1 rounded ${theme.buttonHover}`} title="Insert Video"><Video size={12} className={theme.iconColor} /></button>
                    <button className={`p-1 rounded ${theme.buttonHover}`} title="Attach File"><Paperclip size={12} className={theme.iconColor} /></button>
                  </div>
                  <textarea rows={6} placeholder="Write your article content here..." className={`w-full text-xs p-3 ${theme.cardBg} ${theme.highlight} resize-none outline-none`} />
                </div>
              </div>

              {/* Category & Audience */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Category</label>
                  <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                    {newsCategories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Target Audience</label>
                  <div className="flex gap-2 flex-wrap">
                    {['All', 'Students', 'Parents', 'Staff'].map(a => (
                      <label key={a} className="flex items-center gap-1">
                        <input type="checkbox" className="accent-slate-600" defaultChecked={a === 'All'} />
                        <span className={`text-xs ${theme.iconColor}`}>{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Publish Mode */}
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Status</label>
                <div className="flex gap-2">
                  {[
                    { id: 'draft' as const, label: 'Draft' },
                    { id: 'publish' as const, label: 'Publish Now' },
                    { id: 'schedule' as const, label: 'Schedule' },
                  ].map(m => (
                    <button key={m.id} onClick={() => setPublishMode(m.id)}
                      className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all ${publishMode === m.id ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule Date (conditional) */}
              {publishMode === 'schedule' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Publish Date</label>
                    <input type="date" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                  </div>
                  <div>
                    <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Publish Time</label>
                    <input type="time" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                  </div>
                </div>
              )}

              {/* Featured Toggle */}
              <div className={`flex items-center justify-between p-3 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex items-center gap-2">
                  <Star size={14} className={isFeatured ? 'text-amber-500 fill-amber-500' : theme.iconColor} />
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>Featured Article</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>Display prominently on dashboards</p>
                  </div>
                </div>
                <button onClick={() => setIsFeatured(!isFeatured)} className={`w-9 h-5 rounded-full relative transition-colors ${isFeatured ? 'bg-amber-500' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${isFeatured ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>

              {/* Notification Channels */}
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Notify via</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" checked={notifChannels.push} onChange={() => setNotifChannels(p => ({ ...p, push: !p.push }))} className="accent-slate-600" />
                    <Bell size={12} className={theme.iconColor} />
                    <span className={`text-xs ${theme.iconColor}`}>Push</span>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" checked={notifChannels.sms} onChange={() => setNotifChannels(p => ({ ...p, sms: !p.sms }))} className="accent-slate-600" />
                    <MessageSquare size={12} className={theme.iconColor} />
                    <span className={`text-xs ${theme.iconColor}`}>SMS</span>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input type="checkbox" checked={notifChannels.email} onChange={() => setNotifChannels(p => ({ ...p, email: !p.email }))} className="accent-slate-600" />
                    <Mail size={12} className={theme.iconColor} />
                    <span className={`text-xs ${theme.iconColor}`}>Email</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => setShowCreateArticle(false)} className={`flex-1 text-xs py-2.5 rounded-xl ${theme.secondaryBg} ${theme.iconColor} font-bold`}>Cancel</button>
                <button onClick={() => { setShowCreateArticle(false); window.alert(`Article ${publishMode === 'draft' ? 'saved as draft' : publishMode === 'publish' ? 'published' : 'scheduled'}! (Blueprint demo)`); }}
                  className={`flex-1 text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>
                  {publishMode === 'draft' ? 'Save Draft' : publishMode === 'publish' ? 'Publish Now' : 'Schedule'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
