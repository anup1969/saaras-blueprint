'use client';

import { useState } from 'react';
import { type Theme } from '@/lib/themes';
import {
  BookOpen, Search, Play, CheckCircle, BarChart3, Plus, Edit2,
  Trash2, Archive, ThumbsUp, Eye, Clock, ChevronDown, X, Video,
  ClipboardCheck, Users, ExternalLink, Filter, Star, AlertTriangle,
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────

interface Article {
  id: string; title: string; category: string; views: number;
  lastUpdated: string; author: string; helpful: number; expanded?: boolean;
}

interface VideoTutorial {
  id: string; title: string; duration: string; category: string; views: number;
}

interface ChecklistItem { step: string; done: boolean; }

const initialArticles: Article[] = [
  { id: 'KB-001', title: 'How to Add a New Student', category: 'Students', views: 245, lastUpdated: '15 Feb 2026', author: 'Admin', helpful: 89 },
  { id: 'KB-002', title: 'Fee Collection Process', category: 'Finance', views: 180, lastUpdated: '10 Feb 2026', author: 'Accounts', helpful: 76 },
  { id: 'KB-003', title: 'Setting Up Timetable', category: 'Timetable', views: 130, lastUpdated: '20 Jan 2026', author: 'Admin', helpful: 65 },
  { id: 'KB-004', title: 'Transport Route Management', category: 'Transport', views: 95, lastUpdated: '05 Feb 2026', author: 'Transport', helpful: 54 },
  { id: 'KB-005', title: 'Generating Certificates', category: 'Certificates', views: 110, lastUpdated: '12 Feb 2026', author: 'Admin', helpful: 72 },
  { id: 'KB-006', title: 'Managing Visitor Check-in', category: 'Security', views: 88, lastUpdated: '08 Feb 2026', author: 'Security', helpful: 60 },
  { id: 'KB-007', title: 'Leave Application Workflow', category: 'HR', views: 156, lastUpdated: '01 Feb 2026', author: 'HR', helpful: 82 },
  { id: 'KB-008', title: 'Exam Configuration Guide', category: 'Exams', views: 200, lastUpdated: '18 Feb 2026', author: 'Academic', helpful: 91 },
];

const videoTutorials: VideoTutorial[] = [
  { id: 'VT-001', title: 'Getting Started with Saaras ERP', duration: '5:30', category: 'General', views: 450 },
  { id: 'VT-002', title: 'Student Admission Process', duration: '8:15', category: 'Students', views: 320 },
  { id: 'VT-003', title: 'Fee Collection & Receipts', duration: '6:45', category: 'Finance', views: 280 },
  { id: 'VT-004', title: 'Timetable Setup Guide', duration: '10:20', category: 'Timetable', views: 195 },
  { id: 'VT-005', title: 'Report Card Generation', duration: '7:00', category: 'Exams', views: 240 },
];

const onboardingChecklists: Record<string, ChecklistItem[]> = {
  'School Admin': [
    { step: 'Complete school profile setup', done: true },
    { step: 'Add departments and designations', done: true },
    { step: 'Configure fee structure', done: true },
    { step: 'Import student data', done: false },
    { step: 'Set up transport routes', done: false },
    { step: 'Configure timetable', done: false },
    { step: 'Enable communication channels', done: true },
    { step: 'Generate staff ID cards', done: false },
  ],
  'Teacher': [
    { step: 'Update profile and contact info', done: true },
    { step: 'View assigned classes and subjects', done: true },
    { step: 'Set up grade book', done: false },
    { step: 'Create first homework assignment', done: false },
    { step: 'Record attendance for a class', done: false },
  ],
};

const zeroResultSearches = [
  'biometric integration', 'alumni management', 'hostel allocation', 'canteen menu',
  'bus GPS tracking setup', 'RFID configuration',
];

// ─── MAIN COMPONENT ──────────────────────────────

type HelpTab = 'knowledge' | 'videos' | 'onboarding' | 'analytics';

export default function HelpDeskModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState<HelpTab>('knowledge');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Students');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');

  // Video state
  const [videoCategory, setVideoCategory] = useState('All');
  const [showAddVideo, setShowAddVideo] = useState(false);

  // Onboarding state
  const [selectedRole, setSelectedRole] = useState('School Admin');
  const [checklists, setChecklists] = useState(onboardingChecklists);

  const categories = ['All', 'Students', 'Finance', 'Timetable', 'Transport', 'Certificates', 'Security', 'HR', 'Exams'];
  const tabs: { id: HelpTab; label: string; icon: React.ElementType }[] = [
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'videos', label: 'Video Tutorials', icon: Video },
    { id: 'onboarding', label: 'Onboarding', icon: ClipboardCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const filtered = articles.filter(a =>
    (selectedCategory === 'All' || a.category === selectedCategory) &&
    (searchQuery === '' || a.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleChecklist = (role: string, idx: number) => {
    setChecklists(prev => {
      const updated = { ...prev };
      updated[role] = [...updated[role]];
      updated[role][idx] = { ...updated[role][idx], done: !updated[role][idx].done };
      return updated;
    });
  };

  // ─── KNOWLEDGE BASE TAB ──────────────────────
  const renderKnowledgeBase = () => (
    <div className="grid grid-cols-5 gap-4">
      {/* Category sidebar */}
      <div className="space-y-1">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}>
            {cat}
            <span className={`float-right text-[9px] px-1.5 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-white/20' : theme.secondaryBg}`}>
              {cat === 'All' ? articles.length : articles.filter(a => a.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="col-span-4 space-y-3">
        {/* Search + Create */}
        <div className="flex items-center gap-2">
          <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={14} className={theme.iconColor} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..." className={`flex-1 text-xs ${theme.highlight} bg-transparent outline-none`} />
          </div>
          <button onClick={() => setShowCreateArticle(!showCreateArticle)}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold flex items-center gap-1`}>
            <Plus size={12} /> Create Article
          </button>
        </div>

        {/* Create Article Form */}
        {showCreateArticle && (
          <div className={`p-4 rounded-xl border-2 border-dashed ${theme.border} space-y-3`}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Title</label>
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Article title..."
                  className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`}>
                  {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Content</label>
              <textarea value={newContent} onChange={e => setNewContent(e.target.value)} rows={3} placeholder="Step-by-step instructions..."
                className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight} resize-none`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold ${theme.iconColor} uppercase block mb-1`}>Tags (comma-separated)</label>
              <input value={newTags} onChange={e => setNewTags(e.target.value)} placeholder="admission, new student, registration"
                className={`w-full px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                if (!newTitle.trim()) return;
                setArticles(prev => [...prev, { id: `KB-${String(prev.length + 1).padStart(3, '0')}`, title: newTitle, category: newCategory, views: 0, lastUpdated: 'Just now', author: 'Admin', helpful: 0 }]);
                setShowCreateArticle(false); setNewTitle(''); setNewContent(''); setNewTags('');
              }} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Save Article</button>
              <button onClick={() => setShowCreateArticle(false)} className={`px-4 py-2 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>Cancel</button>
            </div>
          </div>
        )}

        {/* Article Cards */}
        {filtered.map(article => (
          <div key={article.id} className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
            <div className={`px-4 py-3 flex items-center gap-3 cursor-pointer ${theme.buttonHover}`}
              onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}>
              <BookOpen size={14} className={theme.iconColor} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${theme.highlight}`}>{article.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{article.category}</span>
                  <span className={`text-[9px] ${theme.iconColor} flex items-center gap-0.5`}><Eye size={8} /> {article.views}</span>
                  <span className={`text-[9px] ${theme.iconColor} flex items-center gap-0.5`}><ThumbsUp size={8} /> {article.helpful}</span>
                  <span className={`text-[9px] ${theme.iconColor}`}>Updated: {article.lastUpdated}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={e => { e.stopPropagation(); }} className={`p-1 rounded ${theme.buttonHover}`}><Edit2 size={10} className={theme.iconColor} /></button>
                <button onClick={e => { e.stopPropagation(); }} className={`p-1 rounded ${theme.buttonHover}`}><Archive size={10} className={theme.iconColor} /></button>
                <button onClick={e => { e.stopPropagation(); setArticles(prev => prev.filter(a => a.id !== article.id)); }}
                  className={`p-1 rounded hover:bg-red-50`}><Trash2 size={10} className="text-red-400" /></button>
              </div>
              <ChevronDown size={14} className={`${theme.iconColor} transition-transform ${expandedArticle === article.id ? 'rotate-180' : ''}`} />
            </div>
            {expandedArticle === article.id && (
              <div className={`px-4 py-3 border-t ${theme.border} ${theme.accentBg}`}>
                <div className={`text-xs ${theme.highlight} space-y-2`}>
                  <p className="font-bold">Step-by-step instructions:</p>
                  <p>1. Navigate to the relevant module from the sidebar</p>
                  <p>2. Click on the action button (e.g., &quot;Add New&quot;, &quot;Create&quot;)</p>
                  <p>3. Fill in the required fields marked with an asterisk (*)</p>
                  <p>4. Review the information and click &quot;Save&quot; or &quot;Submit&quot;</p>
                  <p>5. Verify the entry appears in the list view</p>
                </div>
                <div className={`mt-3 flex items-center gap-2`}>
                  <span className={`text-[10px] ${theme.iconColor}`}>Was this helpful?</span>
                  <button className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${theme.buttonHover} ${theme.highlight}`}><ThumbsUp size={9} /> Yes</button>
                  <button className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${theme.border} ${theme.buttonHover} ${theme.highlight}`}>No</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ─── VIDEO TUTORIALS TAB ──────────────────────
  const renderVideoTutorials = () => {
    const filteredVids = videoTutorials.filter(v => videoCategory === 'All' || v.category === videoCategory);
    const featured = videoTutorials.slice(0, 2);
    return (
      <div className="space-y-4">
        {/* Featured */}
        <div>
          <h3 className={`text-xs font-bold ${theme.highlight} uppercase tracking-wider mb-2`}>Featured Tutorials</h3>
          <div className="grid grid-cols-2 gap-3">
            {featured.map(vid => (
              <div key={vid.id} className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
                <div className={`h-28 ${theme.secondaryBg} flex items-center justify-center relative`}>
                  <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-all">
                    <Play size={20} className="text-white ml-0.5" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded bg-black/60 text-white font-bold">{vid.duration}</span>
                  <Star size={12} className="text-amber-400 absolute top-2 left-2" />
                </div>
                <div className="p-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{vid.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{vid.category}</span>
                    <span className={`text-[9px] ${theme.iconColor} flex items-center gap-0.5`}><Eye size={8} /> {vid.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Videos */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className={`text-xs font-bold ${theme.highlight} uppercase tracking-wider flex-1`}>All Tutorials</h3>
          <div className="flex items-center gap-1">
            <Filter size={10} className={theme.iconColor} />
            <select value={videoCategory} onChange={e => setVideoCategory(e.target.value)}
              className={`px-2 py-1 rounded-lg text-[10px] ${theme.inputBg} border ${theme.border} ${theme.highlight}`}>
              {['All', 'General', 'Students', 'Finance', 'Timetable', 'Exams'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={() => setShowAddVideo(!showAddVideo)}
            className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-[10px] font-bold flex items-center gap-1`}>
            <Plus size={10} /> Add Tutorial
          </button>
        </div>

        {showAddVideo && (
          <div className={`p-3 rounded-xl border-2 border-dashed ${theme.border} space-y-2`}>
            <div className="grid grid-cols-3 gap-2">
              <input placeholder="Video Title" className={`px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              <input placeholder="YouTube URL" className={`px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`} />
              <select className={`px-2 py-1.5 rounded-lg text-xs ${theme.inputBg} border ${theme.border} ${theme.highlight}`}>
                {['General', 'Students', 'Finance', 'Timetable', 'Exams'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button className={`px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Save</button>
              <button onClick={() => setShowAddVideo(false)} className={`px-3 py-1.5 rounded-xl border ${theme.border} text-xs font-bold ${theme.highlight}`}>Cancel</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          {filteredVids.map(vid => (
            <div key={vid.id} className={`${theme.cardBg} rounded-xl border ${theme.border} overflow-hidden`}>
              <div className={`h-24 ${theme.secondaryBg} flex items-center justify-center relative`}>
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-all">
                  <Play size={16} className="text-white ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-white font-bold">{vid.duration}</span>
              </div>
              <div className="p-2.5">
                <p className={`text-xs font-bold ${theme.highlight} mb-1`}>{vid.title}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-bold`}>{vid.category}</span>
                  <span className={`text-[9px] ${theme.iconColor}`}>{vid.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── ONBOARDING TAB ──────────────────────
  const renderOnboarding = () => {
    const roles = Object.keys(checklists);
    const currentChecklist = checklists[selectedRole] || [];
    const doneCount = currentChecklist.filter(c => c.done).length;
    const totalCount = currentChecklist.length;
    const moduleLinks: Record<string, string> = {
      'Complete school profile setup': 'Settings', 'Add departments and designations': 'Configuration',
      'Configure fee structure': 'Fees', 'Import student data': 'Students', 'Set up transport routes': 'Transport',
      'Configure timetable': 'Timetable', 'Enable communication channels': 'Communication', 'Generate staff ID cards': 'ID Cards',
      'Update profile and contact info': 'Profile', 'View assigned classes and subjects': 'Timetable',
      'Set up grade book': 'Academics', 'Create first homework assignment': 'Homework', 'Record attendance for a class': 'Attendance',
    };

    return (
      <div className="space-y-4">
        {/* Role Selector */}
        <div className="flex items-center gap-2">
          <Users size={14} className={theme.iconColor} />
          <span className={`text-xs font-bold ${theme.highlight}`}>Select Role:</span>
          <div className={`flex gap-1 p-0.5 rounded-xl ${theme.secondaryBg}`}>
            {roles.map(role => (
              <button key={role} onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === role ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
                }`}>{role}</button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-bold ${theme.highlight}`}>{selectedRole} Onboarding</h3>
            <span className={`text-xs font-bold ${doneCount === totalCount ? 'text-emerald-600' : theme.iconColor}`}>
              {doneCount}/{totalCount} steps completed
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-4">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(doneCount / totalCount) * 100}%` }} />
          </div>

          <div className="space-y-2">
            {currentChecklist.map((item, idx) => (
              <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl ${item.done ? 'bg-emerald-50 border border-emerald-200' : `${theme.secondaryBg}`}`}>
                <button onClick={() => toggleChecklist(selectedRole, idx)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    item.done ? 'border-emerald-500 bg-emerald-500' : theme.border
                  }`}>
                  {item.done && <CheckCircle size={12} className="text-white" />}
                </button>
                <span className={`text-xs flex-1 ${item.done ? 'line-through text-emerald-600' : theme.highlight}`}>{item.step}</span>
                {moduleLinks[item.step] && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center gap-0.5`}>
                    <ExternalLink size={8} /> {moduleLinks[item.step]}
                  </span>
                )}
                {!item.done && (
                  <button onClick={() => toggleChecklist(selectedRole, idx)}
                    className={`text-[10px] px-2 py-1 rounded-lg ${theme.primary} text-white font-bold`}>
                    Mark Done
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h4 className={`text-xs font-bold ${theme.highlight} mb-2`}>Contextual Tips</h4>
          <div className="space-y-2">
            {currentChecklist.filter(c => !c.done).slice(0, 3).map((item, idx) => (
              <div key={idx} className={`p-2.5 rounded-lg ${theme.accentBg} border ${theme.border}`}>
                <p className={`text-[10px] font-bold ${theme.highlight}`}>Tip for &quot;{item.step}&quot;</p>
                <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>
                  Navigate to the {moduleLinks[item.step] || 'relevant'} module from the sidebar and follow the guided setup wizard to complete this step.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── ANALYTICS TAB ──────────────────────
  const renderAnalytics = () => {
    const sortedByViews = [...articles].sort((a, b) => b.views - a.views);
    const sortedByHelpful = [...articles].sort((a, b) => b.helpful - a.helpful);
    const saChecklist = checklists['School Admin'] || [];
    const teacherChecklist = checklists['Teacher'] || [];
    const saProgress = Math.round((saChecklist.filter(c => c.done).length / saChecklist.length) * 100);
    const teacherProgress = Math.round((teacherChecklist.filter(c => c.done).length / teacherChecklist.length) * 100);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total Article Views', value: articles.reduce((s, a) => s + a.views, 0).toLocaleString(), sub: 'This month' },
            { label: 'Avg. Helpfulness', value: `${Math.round(articles.reduce((s, a) => s + a.helpful, 0) / articles.length)}%`, sub: 'Per article' },
            { label: 'Tutorial Views', value: videoTutorials.reduce((s, v) => s + v.views, 0).toLocaleString(), sub: '5 videos' },
            { label: 'Zero-result Searches', value: String(zeroResultSearches.length), sub: 'Need attention' },
          ].map((stat, i) => (
            <div key={i} className={`${theme.cardBg} rounded-xl border ${theme.border} p-3 text-center`}>
              <p className={`text-lg font-bold ${theme.highlight}`}>{stat.value}</p>
              <p className={`text-[10px] font-bold ${theme.iconColor}`}>{stat.label}</p>
              <p className={`text-[9px] ${theme.iconColor}`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Most Viewed */}
          <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
            <h4 className={`text-xs font-bold ${theme.highlight} mb-3 flex items-center gap-1`}><Eye size={12} /> Most Viewed Articles</h4>
            <div className="space-y-2">
              {sortedByViews.slice(0, 5).map((a, i) => (
                <div key={a.id} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                  <span className={`text-xs font-bold ${theme.iconColor} w-5`}>#{i + 1}</span>
                  <p className={`text-xs ${theme.highlight} flex-1 truncate`}>{a.title}</p>
                  <span className={`text-[10px] font-bold ${theme.iconColor}`}>{a.views}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Helpful */}
          <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
            <h4 className={`text-xs font-bold ${theme.highlight} mb-3 flex items-center gap-1`}><ThumbsUp size={12} /> Most Helpful Articles</h4>
            <div className="space-y-2">
              {sortedByHelpful.slice(0, 5).map((a, i) => (
                <div key={a.id} className={`flex items-center gap-2 p-2 rounded-lg ${theme.secondaryBg}`}>
                  <span className={`text-xs font-bold ${theme.iconColor} w-5`}>#{i + 1}</span>
                  <p className={`text-xs ${theme.highlight} flex-1 truncate`}>{a.title}</p>
                  <span className={`text-[10px] font-bold text-emerald-600`}>{a.helpful}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zero-result Searches */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h4 className={`text-xs font-bold ${theme.highlight} mb-3 flex items-center gap-1`}>
            <AlertTriangle size={12} className="text-amber-500" /> Searches with No Results
          </h4>
          <p className={`text-[10px] ${theme.iconColor} mb-2`}>These search queries returned no articles. Consider creating content for these topics.</p>
          <div className="flex flex-wrap gap-2">
            {zeroResultSearches.map((q, i) => (
              <span key={i} className={`text-[10px] px-2.5 py-1 rounded-full border ${theme.border} ${theme.highlight} font-medium`}>{q}</span>
            ))}
          </div>
        </div>

        {/* Onboarding Completion by Role */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h4 className={`text-xs font-bold ${theme.highlight} mb-3 flex items-center gap-1`}><ClipboardCheck size={12} /> Onboarding Completion by Role</h4>
          <div className="space-y-3">
            {[
              { role: 'School Admin', progress: saProgress },
              { role: 'Teacher', progress: teacherProgress },
            ].map(r => (
              <div key={r.role}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${theme.highlight}`}>{r.role}</span>
                  <span className={`text-xs font-bold ${r.progress === 100 ? 'text-emerald-600' : theme.iconColor}`}>{r.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${r.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tutorial Completion Rates */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
          <h4 className={`text-xs font-bold ${theme.highlight} mb-3 flex items-center gap-1`}><Video size={12} /> Tutorial Engagement</h4>
          <div className="space-y-2">
            {videoTutorials.map(v => (
              <div key={v.id} className={`flex items-center gap-3 p-2 rounded-lg ${theme.secondaryBg}`}>
                <Play size={10} className={theme.iconColor} />
                <p className={`text-xs ${theme.highlight} flex-1 truncate`}>{v.title}</p>
                <span className={`text-[10px] ${theme.iconColor}`}>{v.views} views</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full ${theme.secondaryBg} font-bold ${v.views > 300 ? 'text-emerald-600' : theme.iconColor}`}>
                  {v.views > 300 ? 'Popular' : 'Growing'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} flex items-center justify-center`}>
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${theme.highlight}`}>Help Desk</h1>
            <p className={`text-xs ${theme.iconColor}`}>Knowledge base, tutorials, and onboarding guides</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`flex gap-1 p-1 rounded-xl ${theme.secondaryBg} w-fit`}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === tab.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}>
            <tab.icon size={12} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'knowledge' && renderKnowledgeBase()}
      {activeTab === 'videos' && renderVideoTutorials()}
      {activeTab === 'onboarding' && renderOnboarding()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}
