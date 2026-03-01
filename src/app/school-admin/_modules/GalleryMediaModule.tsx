'use client';

import React, { useState } from 'react';
import { type Theme } from '@/lib/themes';
import { StatCard, TabBar, SearchBar } from '@/components/shared';
import {
  Image, Video, Monitor, BarChart3, Plus, X, Search, Eye, Edit,
  Trash2, Upload, Play, Star, Filter, Archive, Globe, Clock,
  Camera, Film, Layout, Download, Share2, Tag, Sparkles,
} from 'lucide-react';

// ─── MOCK DATA ──────────────────────────────────────
const photoAlbums = [
  { id: 'ALB-001', name: 'Annual Day 2025-26', date: '15 Jan 2026', photos: 45, category: 'Events', createdBy: 'Admin', status: 'Published', views: 320, coverColor: 'bg-blue-500' },
  { id: 'ALB-002', name: 'Republic Day Celebration', date: '26 Jan 2026', photos: 28, category: 'Events', createdBy: 'Admin', status: 'Published', views: 215, coverColor: 'bg-orange-500' },
  { id: 'ALB-003', name: 'Science Exhibition', date: '08 Feb 2026', photos: 62, category: 'Academic', createdBy: 'Mrs. Sharma', status: 'Published', views: 180, coverColor: 'bg-emerald-500' },
  { id: 'ALB-004', name: 'Sports Day 2026', date: '14 Feb 2026', photos: 78, category: 'Sports', createdBy: 'Mr. Singh', status: 'Published', views: 450, coverColor: 'bg-red-500' },
  { id: 'ALB-005', name: 'Classroom Activities - February', date: '20 Feb 2026', photos: 34, category: 'Classroom', createdBy: 'Mrs. Kulkarni', status: 'Draft', views: 0, coverColor: 'bg-purple-500' },
  { id: 'ALB-006', name: 'Teacher Training Workshop', date: '22 Feb 2026', photos: 15, category: 'Staff', createdBy: 'Admin', status: 'Published', views: 85, coverColor: 'bg-teal-500' },
];

const videoGallery = [
  { id: 'VID-001', title: 'Annual Day Highlights', date: '16 Jan 2026', duration: '12:45', type: 'Upload', category: 'Events', views: 580, status: 'Published' },
  { id: 'VID-002', title: 'Republic Day March Past', date: '26 Jan 2026', duration: '05:30', type: 'YouTube', category: 'Events', views: 320, status: 'Published' },
  { id: 'VID-003', title: 'Science Lab Demo - Class 10', date: '10 Feb 2026', duration: '18:20', type: 'Upload', category: 'Academic', views: 150, status: 'Published' },
  { id: 'VID-004', title: 'Sports Day Relay Race', date: '14 Feb 2026', duration: '03:15', type: 'YouTube', category: 'Sports', views: 890, status: 'Published' },
];

const noticeBoard = [
  { id: 'NB-001', title: 'Annual Day Award Winners', content: 'Congratulations to all award winners of Annual Day 2025-26. Full list on notice board.', location: 'Main Hall', duration: 7, status: 'Active' as string, startDate: '17 Jan 2026' },
  { id: 'NB-002', title: 'Exam Schedule - March', content: 'Unit Test 3 schedule for all classes has been published. Check class-wise timetable.', location: 'Corridor', duration: 14, status: 'Active' as string, startDate: '25 Feb 2026' },
  { id: 'NB-003', title: 'Sports Day Results', content: 'House-wise results: Red House - 1st, Blue House - 2nd. Individual event winners posted.', location: 'Lobby', duration: 5, status: 'Active' as string, startDate: '15 Feb 2026' },
  { id: 'NB-004', title: 'Library Book Fair - March 10-12', content: 'Annual book fair in the school library. Special discounts for students and staff.', location: 'Main Hall', duration: 10, status: 'Scheduled' as string, startDate: '05 Mar 2026' },
  { id: 'NB-005', title: 'Holiday Notice - Holi', content: 'School will remain closed on March 3 for Holi. Classes resume March 4.', location: 'Cafeteria', duration: 3, status: 'Expired' as string, startDate: '28 Feb 2026' },
];

const albumCategories = ['All', 'Events', 'Academic', 'Sports', 'Classroom', 'Staff'];

export default function GalleryMediaModule({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState('Photo Albums');
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showCreateNotice, setShowCreateNotice] = useState(false);
  const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [videoType, setVideoType] = useState('Upload');
  const [aiAutoTag, setAiAutoTag] = useState(false);
  const [autoApprove, setAutoApprove] = useState(true);

  const filteredAlbums = categoryFilter === 'All' ? photoAlbums : photoAlbums.filter(a => a.category === categoryFilter);
  const totalPhotos = photoAlbums.reduce((s, a) => s + a.photos, 0);
  const publishedAlbums = photoAlbums.filter(a => a.status === 'Published').length;
  const draftAlbums = photoAlbums.filter(a => a.status === 'Draft').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Gallery & Media</h1>
        <div className="flex items-center gap-2">
          {activeTab === 'Photo Albums' && (
            <button onClick={() => setShowCreateAlbum(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
              <Plus size={10} /> Create Album
            </button>
          )}
          {activeTab === 'Video Gallery' && (
            <button onClick={() => setShowAddVideo(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
              <Plus size={10} /> Add Video
            </button>
          )}
          {activeTab === 'Digital Notice Board' && (
            <button onClick={() => setShowCreateNotice(true)} className={`text-[10px] px-3 py-1.5 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-1`}>
              <Plus size={10} /> Create Notice
            </button>
          )}
        </div>
      </div>

      <TabBar tabs={['Photo Albums', 'Video Gallery', 'Digital Notice Board', 'Reports']} active={activeTab} onChange={setActiveTab} theme={theme} />

      {/* ─── Photo Albums Tab ─── */}
      {activeTab === 'Photo Albums' && (
        <>
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={Image} label="Total Albums" value={String(photoAlbums.length)} color="bg-blue-500" sub="all time" theme={theme} />
            <StatCard icon={Camera} label="Total Photos" value={String(totalPhotos)} color="bg-emerald-500" sub="across albums" theme={theme} />
            <StatCard icon={Globe} label="Published" value={String(publishedAlbums)} color="bg-purple-500" sub="visible to all" theme={theme} />
            <StatCard icon={Edit} label="Draft" value={String(draftAlbums)} color="bg-amber-500" sub="not published" theme={theme} />
          </div>

          <div className="flex items-center gap-3">
            <SearchBar placeholder="Search albums..." theme={theme} icon={Search} />
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              {albumCategories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Album Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredAlbums.map(album => (
              <div key={album.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden hover:shadow-md transition-all`}>
                {/* Cover Color Block */}
                <div className={`${album.coverColor} h-32 flex items-center justify-center relative`}>
                  <div className="text-center text-white">
                    <Camera size={28} className="mx-auto mb-1 opacity-80" />
                    <p className="text-lg font-bold">{album.photos}</p>
                    <p className="text-[10px] opacity-80">photos</p>
                  </div>
                  <span className={`absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    album.status === 'Published' ? 'bg-white/90 text-emerald-700' : 'bg-white/90 text-amber-700'
                  }`}>{album.status}</span>
                </div>
                {/* Album Info */}
                <div className="p-3">
                  <p className={`text-xs font-bold ${theme.highlight} truncate`}>{album.name}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{album.date} &middot; {album.createdBy}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      album.category === 'Events' ? 'bg-blue-100 text-blue-700' :
                      album.category === 'Academic' ? 'bg-emerald-100 text-emerald-700' :
                      album.category === 'Sports' ? 'bg-red-100 text-red-700' :
                      album.category === 'Classroom' ? 'bg-purple-100 text-purple-700' :
                      'bg-teal-100 text-teal-700'
                    }`}>{album.category}</span>
                    <span className={`text-[10px] ${theme.iconColor} flex items-center gap-0.5`}><Eye size={10} /> {album.views}</span>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-1 mt-3 pt-2 border-t border-gray-100">
                    <button onClick={() => setExpandedAlbum(expandedAlbum === album.id ? null : album.id)} className={`flex-1 text-[10px] py-1.5 rounded-lg ${theme.secondaryBg} ${theme.iconColor} font-bold flex items-center justify-center gap-0.5`}>
                      <Eye size={10} /> View
                    </button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Edit"><Edit size={11} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title={album.status === 'Published' ? 'Unpublish' : 'Publish'}>
                      <Globe size={11} className={album.status === 'Published' ? 'text-emerald-500' : theme.iconColor} />
                    </button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Archive"><Archive size={11} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Delete"><Trash2 size={11} className="text-red-400" /></button>
                  </div>
                </div>

                {/* Expanded Photo Grid */}
                {expandedAlbum === album.id && (
                  <div className={`p-3 border-t ${theme.border}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-[10px] font-bold ${theme.iconColor}`}>Photos ({album.photos})</p>
                      <button className={`text-[9px] px-2 py-1 rounded-lg ${theme.primary} text-white font-bold flex items-center gap-0.5`}>
                        <Upload size={8} /> Upload More
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {Array.from({ length: Math.min(8, album.photos) }).map((_, i) => (
                        <div key={i} className={`aspect-square rounded-lg ${theme.secondaryBg} flex items-center justify-center`}>
                          <Image size={14} className={theme.iconColor} />
                        </div>
                      ))}
                    </div>
                    {album.photos > 8 && (
                      <p className={`text-[9px] ${theme.iconColor} text-center mt-1.5`}>+{album.photos - 8} more photos</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AI Auto-Tag Notice */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-3 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              <div>
                <p className={`text-xs font-bold ${theme.highlight}`}>AI Auto-Tagging</p>
                <p className={`text-[10px] ${theme.iconColor}`}>Automatically tag photos by faces, objects, and events (future feature)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">Coming Soon</span>
              <button onClick={() => setAiAutoTag(!aiAutoTag)} className={`w-9 h-5 rounded-full relative transition-colors ${aiAutoTag ? theme.primary : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${aiAutoTag ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ─── Video Gallery Tab ─── */}
      {activeTab === 'Video Gallery' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <SearchBar placeholder="Search videos..." theme={theme} icon={Search} />
            <select className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight}`}>
              <option>All Categories</option>
              <option>Events</option>
              <option>Academic</option>
              <option>Sports</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoGallery.map(video => (
              <div key={video.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden hover:shadow-md transition-all`}>
                {/* Thumbnail Placeholder */}
                <div className={`${theme.secondaryBg} h-40 flex items-center justify-center relative`}>
                  <div className="w-14 h-14 rounded-full bg-black/30 flex items-center justify-center">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                  <span className={`absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-lg bg-black/70 text-white font-bold`}>{video.duration}</span>
                  <span className={`absolute top-2 left-2 text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    video.type === 'YouTube' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>{video.type}</span>
                </div>
                {/* Video Info */}
                <div className="p-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{video.title}</p>
                  <p className={`text-[10px] ${theme.iconColor} mt-0.5`}>{video.date}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      video.category === 'Events' ? 'bg-blue-100 text-blue-700' :
                      video.category === 'Academic' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>{video.category}</span>
                    <span className={`text-[10px] ${theme.iconColor} flex items-center gap-0.5`}><Eye size={10} /> {video.views}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-3 pt-2 border-t border-gray-100">
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Edit"><Edit size={11} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Delete"><Trash2 size={11} className="text-red-400" /></button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Feature"><Star size={11} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Share"><Share2 size={11} className={theme.iconColor} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Digital Notice Board Tab ─── */}
      {activeTab === 'Digital Notice Board' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={Monitor} label="Active Notices" value={String(noticeBoard.filter(n => n.status === 'Active').length)} color="bg-emerald-500" sub="displaying now" theme={theme} />
            <StatCard icon={Clock} label="Scheduled" value={String(noticeBoard.filter(n => n.status === 'Scheduled').length)} color="bg-blue-500" sub="upcoming" theme={theme} />
            <StatCard icon={Layout} label="Display Locations" value="4" color="bg-purple-500" sub="screens" theme={theme} />
            <StatCard icon={Archive} label="Expired" value={String(noticeBoard.filter(n => n.status === 'Expired').length)} color="bg-gray-500" sub="auto-archived" theme={theme} />
          </div>

          <div className="space-y-3">
            {noticeBoard.map(notice => (
              <div key={notice.id} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-bold ${theme.highlight}`}>{notice.title}</p>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        notice.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        notice.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{notice.status}</span>
                    </div>
                    <p className={`text-[10px] ${theme.iconColor} mt-1 line-clamp-2`}>{notice.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-[10px] ${theme.iconColor} flex items-center gap-0.5`}>
                        <Monitor size={10} /> {notice.location}
                      </span>
                      <span className={`text-[10px] ${theme.iconColor} flex items-center gap-0.5`}>
                        <Clock size={10} /> {notice.duration} days
                      </span>
                      <span className={`text-[10px] ${theme.iconColor}`}>From: {notice.startDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Preview"><Eye size={12} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Edit"><Edit size={12} className={theme.iconColor} /></button>
                    <button className={`p-1.5 rounded-lg ${theme.buttonHover}`} title="Delete"><Trash2 size={12} className="text-red-400" /></button>
                  </div>
                </div>

                {/* Preview Mockup */}
                <div className={`mt-3 p-3 rounded-xl ${theme.secondaryBg} border ${theme.border}`}>
                  <p className={`text-[9px] font-bold ${theme.iconColor} uppercase mb-1`}>Screen Preview</p>
                  <div className={`bg-gray-900 rounded-lg p-3 text-center`}>
                    <p className="text-white text-xs font-bold">{notice.title}</p>
                    <p className="text-gray-300 text-[10px] mt-1">{notice.content}</p>
                    <p className="text-gray-500 text-[8px] mt-2">Displaying on: {notice.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Reports Tab ─── */}
      {activeTab === 'Reports' && (
        <div className="space-y-4">
          {/* Album Engagement */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className={theme.primaryText} />
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Album Engagement — Views</h3>
            </div>
            <div className="space-y-2">
              {photoAlbums.sort((a, b) => b.views - a.views).map(album => (
                <div key={album.id} className="flex items-center gap-3">
                  <span className={`text-[10px] ${theme.iconColor} w-40 truncate`}>{album.name}</span>
                  <div className="flex-1">
                    <div className={`h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
                      <div className={`h-full rounded-full ${album.coverColor}`} style={{ width: `${(album.views / 450) * 100}%` }} />
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold ${theme.highlight} w-12 text-right`}>{album.views}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Storage Usage</h3>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs ${theme.iconColor}`}>Used: 2.4 GB</span>
              <span className={`text-xs font-bold ${theme.highlight}`}>Quota: 10 GB</span>
            </div>
            <div className={`w-full h-4 rounded-full ${theme.secondaryBg} overflow-hidden`}>
              <div className="h-full rounded-full bg-blue-500" style={{ width: '24%' }} />
            </div>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>24% used &middot; 7.6 GB available</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Most Viewed Albums */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Top 5 Albums by Views</h3>
              <div className="space-y-2">
                {photoAlbums.sort((a, b) => b.views - a.views).slice(0, 5).map((a, i) => (
                  <div key={a.id} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-xs font-bold ${theme.primaryText} w-5`}>#{i + 1}</span>
                    <span className={`text-[10px] font-bold ${theme.highlight} flex-1 truncate`}>{a.name}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{a.views} views</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Viewed Videos */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Top Videos by Views</h3>
              <div className="space-y-2">
                {videoGallery.sort((a, b) => b.views - a.views).map((v, i) => (
                  <div key={v.id} className={`flex items-center gap-2 p-2 rounded-xl ${theme.secondaryBg}`}>
                    <span className={`text-xs font-bold ${theme.primaryText} w-5`}>#{i + 1}</span>
                    <span className={`text-[10px] font-bold ${theme.highlight} flex-1 truncate`}>{v.title}</span>
                    <span className={`text-[10px] ${theme.iconColor}`}>{v.views} views</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Upload Stats */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Monthly Upload Stats</h3>
            <div className="flex items-end gap-2 h-32 px-2">
              {[
                { month: 'Sep', photos: 22, videos: 1 },
                { month: 'Oct', photos: 35, videos: 2 },
                { month: 'Nov', photos: 18, videos: 1 },
                { month: 'Dec', photos: 12, videos: 0 },
                { month: 'Jan', photos: 73, videos: 2 },
                { month: 'Feb', photos: 49, videos: 2 },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-[9px] font-bold ${theme.primaryText}`}>{d.photos}</span>
                  <div className={`w-full rounded-t-lg bg-blue-400`} style={{ height: `${(d.photos / 73) * 80}%`, minHeight: '4px' }} />
                  <div className={`w-full rounded-t-lg bg-purple-400`} style={{ height: `${(d.videos / 2) * 20}%`, minHeight: d.videos > 0 ? '4px' : '0px' }} />
                  <span className={`text-[9px] ${theme.iconColor}`}>{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2 justify-center">
              <span className="flex items-center gap-1 text-[10px]"><span className="w-3 h-3 rounded bg-blue-400" /> Photos</span>
              <span className="flex items-center gap-1 text-[10px]"><span className="w-3 h-3 rounded bg-purple-400" /> Videos</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Album Modal ─── */}
      {showCreateAlbum && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowCreateAlbum(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Create Photo Album</h3>
              <button onClick={() => setShowCreateAlbum(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Album Name <span className="text-red-500">*</span></label>
                <input placeholder="e.g. Sports Day 2026" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Category <span className="text-red-500">*</span></label>
                <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                  {albumCategories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Date</label>
                <input type="date" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Description</label>
                <textarea rows={2} placeholder="Album description..." className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight} resize-none`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Target Audience</label>
                <div className="flex gap-3">
                  {['All', 'Students', 'Parents', 'Staff'].map(a => (
                    <label key={a} className="flex items-center gap-1">
                      <input type="checkbox" className="accent-slate-600" defaultChecked={a === 'All'} />
                      <span className={`text-xs ${theme.iconColor}`}>{a}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Upload Photos</label>
                <div className={`border-2 border-dashed ${theme.border} rounded-xl p-6 text-center`}>
                  <Upload size={24} className={`${theme.iconColor} mx-auto mb-1`} />
                  <p className={`text-[10px] ${theme.iconColor}`}>Drag & drop photos or click to browse</p>
                  <p className={`text-[9px] ${theme.iconColor}`}>JPG, PNG (max 10 MB each)</p>
                  <button className={`mt-2 px-3 py-1.5 ${theme.primary} text-white rounded-lg text-[10px] font-bold`}>Browse Files</button>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setShowCreateAlbum(false); window.alert('Album saved as draft! (Blueprint demo)'); }} className={`flex-1 text-xs py-2.5 rounded-xl ${theme.secondaryBg} ${theme.iconColor} font-bold`}>Save as Draft</button>
                <button onClick={() => { setShowCreateAlbum(false); window.alert('Album published! (Blueprint demo)'); }} className={`flex-1 text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>Publish Album</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Add Video Modal ─── */}
      {showAddVideo && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAddVideo(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Add Video</h3>
              <button onClick={() => setShowAddVideo(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Title <span className="text-red-500">*</span></label>
                <input placeholder="Video title..." className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Type <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  {['Upload', 'YouTube'].map(t => (
                    <button key={t} onClick={() => setVideoType(t)}
                      className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all ${videoType === t ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                      {t === 'YouTube' ? <span className="flex items-center justify-center gap-1"><Film size={12} /> YouTube Link</span> : <span className="flex items-center justify-center gap-1"><Upload size={12} /> Upload</span>}
                    </button>
                  ))}
                </div>
              </div>
              {videoType === 'YouTube' && (
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>YouTube URL <span className="text-red-500">*</span></label>
                  <input placeholder="https://youtube.com/watch?v=..." className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                </div>
              )}
              {videoType === 'Upload' && (
                <div className={`border-2 border-dashed ${theme.border} rounded-xl p-6 text-center`}>
                  <Video size={24} className={`${theme.iconColor} mx-auto mb-1`} />
                  <p className={`text-[10px] ${theme.iconColor}`}>Drag & drop video or click to browse</p>
                  <p className={`text-[9px] ${theme.iconColor}`}>MP4 (max 500 MB)</p>
                  <button className={`mt-2 px-3 py-1.5 ${theme.primary} text-white rounded-lg text-[10px] font-bold`}>Browse Files</button>
                </div>
              )}
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Category</label>
                <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                  <option>Events</option><option>Academic</option><option>Sports</option><option>Classroom</option>
                </select>
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Description</label>
                <textarea rows={2} placeholder="Video description..." className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight} resize-none`} />
              </div>
              <button onClick={() => { setShowAddVideo(false); window.alert('Video added! (Blueprint demo)'); }} className={`w-full text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>Add Video</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Notice Modal ─── */}
      {showCreateNotice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowCreateNotice(false)}>
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 w-full max-w-lg shadow-xl max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${theme.highlight}`}>Create Digital Notice</h3>
              <button onClick={() => setShowCreateNotice(false)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor}`}><X size={14} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Title <span className="text-red-500">*</span></label>
                <input placeholder="Notice title..." className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Content <span className="text-red-500">*</span></label>
                <textarea rows={4} placeholder="Notice content..." className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight} resize-none`} />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Display Location</label>
                <select className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`}>
                  <option>Main Hall</option><option>Lobby</option><option>Corridor</option><option>Cafeteria</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Start Date</label>
                  <input type="date" className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                </div>
                <div>
                  <label className={`text-[10px] font-bold ${theme.iconColor} block mb-1`}>Duration (days)</label>
                  <input type="number" defaultValue={7} className={`w-full text-xs p-2 rounded-lg border ${theme.border} ${theme.cardBg} ${theme.highlight}`} />
                </div>
              </div>
              {/* Preview */}
              <div>
                <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Preview</p>
                <div className="bg-gray-900 rounded-lg p-3 text-center">
                  <p className="text-white text-xs font-bold">Your notice title here</p>
                  <p className="text-gray-300 text-[10px] mt-1">Your notice content will appear here</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setShowCreateNotice(false); window.alert('Notice scheduled! (Blueprint demo)'); }} className={`flex-1 text-xs py-2.5 rounded-xl ${theme.secondaryBg} ${theme.iconColor} font-bold`}>Schedule</button>
                <button onClick={() => { setShowCreateNotice(false); window.alert('Notice published now! (Blueprint demo)'); }} className={`flex-1 text-xs py-2.5 rounded-xl ${theme.primary} text-white font-bold`}>Publish Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
