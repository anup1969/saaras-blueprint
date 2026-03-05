'use client';
import React, { useState } from 'react';
import { X, Plus, Search, Trash2, Download, Upload, Save, Eye, AlertTriangle, Edit } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Asset {
  id: number; name: string; category: string; quantity: number;
  location: string; condition: 'Good' | 'Fair' | 'Poor' | 'Disposed';
  purchaseDate: string; value: number; assignedTo: string;
}
interface ApprovalTier {
  id: number; tierName: string; minAmount: number; maxAmount: number;
  approver: string; autoApprove: boolean;
}
interface LowStockItem {
  id: number; item: string; category: string; currentQty: number; minQty: number;
  status: 'Critical' | 'Low' | 'OK';
}

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const INITIAL_ASSETS: Asset[] = [
  { id: 1, name: 'Projector BenQ MX535', category: 'Electronics', quantity: 8, location: 'AV Room', condition: 'Good', purchaseDate: '2024-06-15', value: 45000, assignedTo: 'AV Department' },
  { id: 2, name: 'Student Desk Set (Table + Chair)', category: 'Furniture', quantity: 240, location: 'Various Classrooms', condition: 'Good', purchaseDate: '2023-03-10', value: 3200, assignedTo: 'School Admin' },
  { id: 3, name: 'Microscope (Compound)', category: 'Lab Equipment', quantity: 24, location: 'Science Lab', condition: 'Good', purchaseDate: '2022-08-20', value: 18500, assignedTo: 'Science Dept' },
  { id: 4, name: 'Whiteboard 6x4 ft', category: 'Furniture', quantity: 32, location: 'Classrooms', condition: 'Fair', purchaseDate: '2021-04-05', value: 4500, assignedTo: 'School Admin' },
  { id: 5, name: 'Cricket Kit (Full)', category: 'Sports', quantity: 4, location: 'Sports Room', condition: 'Fair', purchaseDate: '2023-11-15', value: 12000, assignedTo: 'Sports Dept' },
  { id: 6, name: 'Laptop Dell Inspiron 15', category: 'Electronics', quantity: 30, location: 'Computer Lab', condition: 'Good', purchaseDate: '2024-01-10', value: 58000, assignedTo: 'IT Department' },
  { id: 7, name: 'School Bus (Tata Starbus)', category: 'Vehicles', quantity: 3, location: 'Parking Lot', condition: 'Good', purchaseDate: '2023-07-01', value: 2400000, assignedTo: 'Transport Dept' },
  { id: 8, name: 'Old OHP Projector', category: 'Electronics', quantity: 2, location: 'Storage', condition: 'Disposed', purchaseDate: '2015-01-01', value: 8000, assignedTo: 'Store' },
];

const INITIAL_TIERS: ApprovalTier[] = [
  { id: 1, tierName: 'Petty Purchase', minAmount: 0, maxAmount: 5000, approver: 'School Admin', autoApprove: true },
  { id: 2, tierName: 'Standard Purchase', minAmount: 5001, maxAmount: 50000, approver: 'Principal', autoApprove: false },
  { id: 3, tierName: 'Major Purchase', minAmount: 50001, maxAmount: 500000, approver: 'Trust / Management', autoApprove: false },
  { id: 4, tierName: 'Capital Expenditure', minAmount: 500001, maxAmount: 99999999, approver: 'Board of Directors', autoApprove: false },
];

const INITIAL_LOW_STOCK: LowStockItem[] = [
  { id: 1, item: 'A4 Paper (Reams)', category: 'Stationery', currentQty: 12, minQty: 50, status: 'Critical' },
  { id: 2, item: 'Whiteboard Markers', category: 'Stationery', currentQty: 28, minQty: 40, status: 'Low' },
  { id: 3, item: 'Chemistry Reagents Kit', category: 'Lab Supplies', currentQty: 3, minQty: 10, status: 'Critical' },
  { id: 4, item: 'Printer Ink Cartridges', category: 'Electronics', currentQty: 6, minQty: 12, status: 'Low' },
  { id: 5, item: 'Basketball', category: 'Sports', currentQty: 8, minQty: 6, status: 'OK' },
];

const CONDITION_OPTIONS = ['Good', 'Fair', 'Poor', 'Disposed'];
const PAGE_SIZE = 5;

type TabId = 'assets' | 'procurement' | 'settings';

export default function InventoryConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ── Feature Toggles ──────────────────────────────────────────────────────────
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [invToggles, setInvToggles] = useState<Record<string, boolean>>({
    'Barcode/QR Asset Tagging': true,
    'Low Stock Alerts': true,
    'Depreciation Tracking': false,
  });

  // ── Asset Register ───────────────────────────────────────────────────────────
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [assetSearch, setAssetSearch] = useState('');
  const [assetPage, setAssetPage] = useState(1);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [newAsset, setNewAsset] = useState<Omit<Asset, 'id'>>({
    name: '', category: 'Furniture', quantity: 1, location: '', condition: 'Good', purchaseDate: '', value: 0, assignedTo: '',
  });

  // ── Asset Categories ─────────────────────────────────────────────────────────
  const [assetCategories, setAssetCategories] = useState(['Furniture', 'Electronics', 'Lab Equipment', 'Sports', 'Books', 'Vehicles', 'Stationery']);
  const [newAssetCat, setNewAssetCat] = useState('');
  const [catSearch, setCatSearch] = useState('');

  // ── Approval Tiers ───────────────────────────────────────────────────────────
  const [tiers, setTiers] = useState<ApprovalTier[]>(INITIAL_TIERS);
  const [editTierId, setEditTierId] = useState<number | null>(null);
  const [showAddTier, setShowAddTier] = useState(false);
  const [newTier, setNewTier] = useState<Omit<ApprovalTier, 'id'>>({
    tierName: '', minAmount: 0, maxAmount: 0, approver: '', autoApprove: false,
  });

  // ── Low Stock Alerts ─────────────────────────────────────────────────────────
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>(INITIAL_LOW_STOCK);
  const [lowStockSearch, setLowStockSearch] = useState('');

  // ── Tab State ──────────────────────────────────────────────────────────────
  const [internalTab, setInternalTab] = useState<TabId>('assets');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(assetSearch.toLowerCase()) ||
    a.category.toLowerCase().includes(assetSearch.toLowerCase()) ||
    a.location.toLowerCase().includes(assetSearch.toLowerCase())
  );
  const assetPages = Math.ceil(filteredAssets.length / PAGE_SIZE);
  const pagedAssets = filteredAssets.slice((assetPage - 1) * PAGE_SIZE, assetPage * PAGE_SIZE);

  const filteredCats = assetCategories.filter(c => c.toLowerCase().includes(catSearch.toLowerCase()));
  const filteredLowStock = lowStockItems.filter(i =>
    i.item.toLowerCase().includes(lowStockSearch.toLowerCase()) ||
    i.category.toLowerCase().includes(lowStockSearch.toLowerCase())
  );
  const criticalCount = lowStockItems.filter(i => i.status === 'Critical').length;

  function handleAddAsset() {
    if (!newAsset.name.trim()) return;
    setAssets(p => [...p, { ...newAsset, id: Date.now() }]);
    setNewAsset({ name: '', category: 'Furniture', quantity: 1, location: '', condition: 'Good', purchaseDate: '', value: 0, assignedTo: '' });
    setShowAddAsset(false);
  }
  function handleDeleteAsset(id: number) { setAssets(p => p.filter(a => a.id !== id)); }

  function handleSaveTier(tier: ApprovalTier) {
    setTiers(p => p.map(t => t.id === tier.id ? tier : t));
    setEditTierId(null);
  }
  function handleAddTier() {
    if (!newTier.tierName.trim() || !newTier.approver.trim()) return;
    setTiers(p => [...p, { ...newTier, id: Date.now() }]);
    setNewTier({ tierName: '', minAmount: 0, maxAmount: 0, approver: '', autoApprove: false });
    setShowAddTier(false);
  }
  function handleDeleteTier(id: number) { setTiers(p => p.filter(t => t.id !== id)); }

  const conditionColor = (c: string) => ({
    Good: 'bg-green-100 text-green-700', Fair: 'bg-yellow-100 text-yellow-700',
    Poor: 'bg-orange-100 text-orange-700', Disposed: 'bg-gray-100 text-gray-500',
  }[c] ?? 'bg-gray-100 text-gray-500');

  const statusColor = (s: string) => ({
    Critical: 'bg-red-100 text-red-700', Low: 'bg-orange-100 text-orange-700', OK: 'bg-green-100 text-green-700',
  }[s] ?? 'bg-gray-100 text-gray-500');

  return (
    <div className="space-y-4">
      <ModuleHeader title="Inventory & Asset Configuration" subtitle="Asset register, approval tiers, low stock alerts, and feature toggles" theme={theme} />

      {/* ── TAB: assets ─────────────────────────────────────────────────────── */}
      {activeTab === 'assets' && (<div className="space-y-4">
      {/* ── Asset Register ──────────────────────────────────────────────────── */}
      <SectionCard title="Asset Register" subtitle="Master list of all school assets — CRUD with condition and assignment tracking" theme={theme}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={13} className={theme.iconColor} />
            <input value={assetSearch} onChange={e => { setAssetSearch(e.target.value); setAssetPage(1); }}
              placeholder="Search by name, category, or location..."
              className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
          </div>
          <span className={`text-[10px] px-2 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold whitespace-nowrap`}>{filteredAssets.length} assets</span>
          <button onClick={() => {}} className={`flex items-center gap-1 px-3 py-2 rounded-xl border ${theme.border} text-xs ${theme.iconColor} hover:opacity-80`}><Download size={13} /> Export</button>
          <button onClick={() => {}} className={`flex items-center gap-1 px-3 py-2 rounded-xl border ${theme.border} text-xs ${theme.iconColor} hover:opacity-80`}><Upload size={13} /> Import</button>
          <button onClick={() => setShowAddAsset(v => !v)} className={`flex items-center gap-1 px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={13} /> Add Asset</button>
        </div>

        {/* Add Asset inline form */}
        {showAddAsset && (
          <div className={`mb-3 p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>New Asset</p>
            <div className="grid grid-cols-4 gap-2">
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Asset Name *</p><InputField value={newAsset.name} onChange={v => setNewAsset(p => ({ ...p, name: v }))} theme={theme} placeholder="e.g. Projector" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Category</p><SelectField value={newAsset.category} onChange={v => setNewAsset(p => ({ ...p, category: v }))} options={assetCategories} theme={theme} /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Quantity</p><InputField value={String(newAsset.quantity)} onChange={v => setNewAsset(p => ({ ...p, quantity: Number(v) }))} theme={theme} type="number" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Location</p><InputField value={newAsset.location} onChange={v => setNewAsset(p => ({ ...p, location: v }))} theme={theme} placeholder="e.g. Room 204" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Condition</p><SelectField value={newAsset.condition} onChange={v => setNewAsset(p => ({ ...p, condition: v as Asset['condition'] }))} options={CONDITION_OPTIONS} theme={theme} /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Purchase Date</p><InputField value={newAsset.purchaseDate} onChange={v => setNewAsset(p => ({ ...p, purchaseDate: v }))} theme={theme} type="date" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Value (₹)</p><InputField value={String(newAsset.value)} onChange={v => setNewAsset(p => ({ ...p, value: Number(v) }))} theme={theme} type="number" placeholder="0" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Assigned To</p><InputField value={newAsset.assignedTo} onChange={v => setNewAsset(p => ({ ...p, assignedTo: v }))} theme={theme} placeholder="Dept or person" /></div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={handleAddAsset} className={`px-4 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add</button>
              <button onClick={() => setShowAddAsset(false)} className={`px-4 py-1.5 rounded-xl border ${theme.border} text-xs ${theme.iconColor}`}>Cancel</button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Asset Name', 'Category', 'Qty', 'Location', 'Condition', 'Purchase Date', 'Value (₹)', 'Assigned To', 'Actions'].map(h => (
                  <th key={h} className={`text-[10px] font-bold ${theme.iconColor} px-3 py-2 text-left whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedAssets.map((a, i) => (
                <tr key={a.id} className={`border-t ${theme.border} ${i % 2 === 0 ? '' : theme.secondaryBg + '/40'} hover:${theme.secondaryBg} transition-colors`}>
                  <td className={`px-3 py-2 text-xs font-semibold ${theme.highlight} max-w-[160px] truncate`}>{a.name}</td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor} font-medium`}>{a.category}</span>
                  </td>
                  <td className={`px-3 py-2 text-xs font-bold ${theme.highlight} text-center`}>{a.quantity}</td>
                  <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{a.location}</td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${conditionColor(a.condition)}`}>{a.condition}</span>
                  </td>
                  <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{a.purchaseDate || '—'}</td>
                  <td className={`px-3 py-2 text-xs font-semibold ${theme.highlight}`}>{a.value > 0 ? `₹${a.value.toLocaleString('en-IN')}` : '—'}</td>
                  <td className={`px-3 py-2 text-[10px] ${theme.iconColor} max-w-[100px] truncate`}>{a.assignedTo || '—'}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <button className={`p-1 rounded-lg hover:${theme.secondaryBg} ${theme.iconColor}`}><Eye size={12} /></button>
                      <button onClick={() => handleDeleteAsset(a.id)} className="p-1 rounded-lg hover:bg-red-50 text-red-400"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {assetPages > 1 && (
          <div className="flex items-center justify-between mt-3">
            <span className={`text-[10px] ${theme.iconColor}`}>Page {assetPage} of {assetPages}</span>
            <div className="flex gap-1">
              {Array.from({ length: assetPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setAssetPage(p)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-bold ${p === assetPage ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>{p}</button>
              ))}
            </div>
          </div>
        )}
      </SectionCard>

      {/* ── Asset Categories ────────────────────────────────────────────────── */}
      <SectionCard title="Asset Categories" subtitle="Manage inventory categories used in the asset register" theme={theme}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
              <Search size={12} className={theme.iconColor} />
              <input value={catSearch} onChange={e => setCatSearch(e.target.value)} placeholder="Search..."
                className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
            </div>
            <span className={`text-[10px] px-2 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{filteredCats.length}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {filteredCats.map(c => (
              <span key={c} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
                {c}
                <button onClick={() => setAssetCategories(p => p.filter(x => x !== c))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newAssetCat} onChange={e => setNewAssetCat(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && newAssetCat.trim()) { setAssetCategories(p => [...p, newAssetCat.trim()]); setNewAssetCat(''); } }}
              placeholder="Add category..."
              className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
            <button onClick={() => { if (newAssetCat.trim()) { setAssetCategories(p => [...p, newAssetCat.trim()]); setNewAssetCat(''); } }}
              className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
          </div>
      </SectionCard>

      {/* ── Inventory Features ──────────────────────────────────────────────── */}
      <SectionCard title="Inventory Features" subtitle="Asset tracking, stock alerts, and depreciation management" theme={theme}>
          <div className="space-y-2">
            {Object.entries(invToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Barcode/QR Asset Tagging': 'Each asset gets a unique barcode/QR label — scan to view details, location, and condition',
                      'Low Stock Alerts': 'Auto-alert admin when consumable items fall below the minimum quantity threshold',
                      'Depreciation Tracking': 'Automatically calculate asset depreciation over time for accounting and budgeting',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setInvToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Global Low Stock Threshold (qty)</p>
              <InputField value={lowStockThreshold} onChange={setLowStockThreshold} theme={theme} type="number" />
            </div>
          </div>
      </SectionCard>
      </div>)}

      {/* ── TAB: procurement ──────────────────────────────────────────────────── */}
      {activeTab === 'procurement' && (<div className="space-y-4">
      {/* ── Purchase Approval Tiers (editable) ────────────────────────────────── */}
      <SectionCard title="Purchase Approval Tiers" subtitle="Editable tiered approval chains based on purchase value — click a tier to edit" theme={theme}>
        <div className="flex justify-end mb-3">
          <button onClick={() => setShowAddTier(v => !v)} className={`flex items-center gap-1 px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={13} /> Add Tier</button>
        </div>

        {showAddTier && (
          <div className={`mb-3 p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>New Tier</p>
            <div className="grid grid-cols-4 gap-2">
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Tier Name *</p><InputField value={newTier.tierName} onChange={v => setNewTier(p => ({ ...p, tierName: v }))} theme={theme} placeholder="e.g. Petty Purchase" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Min Amount (₹)</p><InputField value={String(newTier.minAmount)} onChange={v => setNewTier(p => ({ ...p, minAmount: Number(v) }))} theme={theme} type="number" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Amount (₹)</p><InputField value={String(newTier.maxAmount)} onChange={v => setNewTier(p => ({ ...p, maxAmount: Number(v) }))} theme={theme} type="number" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Approver *</p><InputField value={newTier.approver} onChange={v => setNewTier(p => ({ ...p, approver: v }))} theme={theme} placeholder="e.g. Principal" /></div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <label className={`flex items-center gap-2 text-xs ${theme.iconColor} cursor-pointer`}>
                <input type="checkbox" checked={newTier.autoApprove} onChange={e => setNewTier(p => ({ ...p, autoApprove: e.target.checked }))}
                  className="rounded" />
                Auto-approve (no human approval required)
              </label>
              <div className="flex gap-2 ml-auto">
                <button onClick={handleAddTier} className={`px-4 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add</button>
                <button onClick={() => setShowAddTier(false)} className={`px-4 py-1.5 rounded-xl border ${theme.border} text-xs ${theme.iconColor}`}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {tiers.map(tier => (
            editTierId === tier.id ? (
              /* Inline edit mode */
              <EditableTierRow key={tier.id} tier={tier} theme={theme} onSave={handleSaveTier} onCancel={() => setEditTierId(null)} />
            ) : (
              /* Display mode */
              <div key={tier.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme.border} ${theme.secondaryBg}`}>
                <div className="flex items-center gap-3 flex-1">
                  <div>
                    <p className={`text-xs font-bold ${theme.highlight}`}>{tier.tierName}</p>
                    <p className={`text-[10px] ${theme.iconColor}`}>
                      ₹{tier.minAmount.toLocaleString('en-IN')} — {tier.maxAmount >= 99999999 ? 'above' : '₹' + tier.maxAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{tier.approver}</span>
                    {tier.autoApprove && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">Auto-approve</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditTierId(tier.id)} className={`p-1.5 rounded-lg hover:${theme.secondaryBg} ${theme.iconColor}`}><Edit size={12} /></button>
                  <button onClick={() => handleDeleteTier(tier.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><Trash2 size={12} /></button>
                </div>
              </div>
            )
          ))}
        </div>
      </SectionCard>

      {/* ── Low Stock Alerts ─────────────────────────────────────────────────── */}
      <SectionCard title="Low Stock Alerts" subtitle="Consumable items that have fallen below minimum quantity threshold" theme={theme}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={13} className={theme.iconColor} />
            <input value={lowStockSearch} onChange={e => setLowStockSearch(e.target.value)}
              placeholder="Search items..."
              className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
          </div>
          {criticalCount > 0 && (
            <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-red-50 text-red-600 font-bold">
              <AlertTriangle size={11} /> {criticalCount} critical
            </span>
          )}
          <button onClick={() => {}} className={`flex items-center gap-1 px-3 py-2 rounded-xl border ${theme.border} text-xs ${theme.iconColor} hover:opacity-80`}><Download size={13} /> Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Item', 'Category', 'Current Qty', 'Min Qty', 'Shortfall', 'Status', 'Action'].map(h => (
                  <th key={h} className={`text-[10px] font-bold ${theme.iconColor} px-3 py-2 text-left whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLowStock.map((item, i) => (
                <tr key={item.id} className={`border-t ${theme.border} ${i % 2 === 0 ? '' : theme.secondaryBg + '/40'}`}>
                  <td className={`px-3 py-2 text-xs font-semibold ${theme.highlight}`}>{item.item}</td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor} font-medium`}>{item.category}</span>
                  </td>
                  <td className={`px-3 py-2 text-xs font-bold text-center ${item.currentQty < item.minQty ? 'text-red-600' : 'text-green-600'}`}>{item.currentQty}</td>
                  <td className={`px-3 py-2 text-xs text-center ${theme.iconColor}`}>{item.minQty}</td>
                  <td className={`px-3 py-2 text-xs font-bold text-center ${item.minQty > item.currentQty ? 'text-red-500' : theme.iconColor}`}>
                    {item.minQty > item.currentQty ? `−${item.minQty - item.currentQty}` : '—'}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(item.status)}`}>{item.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    <button className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.primary} text-white font-bold hover:opacity-80`}>Raise PO</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      </div>)}

      {/* ── TAB: settings ─────────────────────────────────────────────────────── */}
      {activeTab === 'settings' && (<div className="space-y-4">
      {/* ── Permissions ──────────────────────────────────────────────────────── */}
      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Asset Register" roles={['Super Admin', 'Principal', 'School Admin', 'Store Keeper', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Asset Categories" roles={['Super Admin', 'Principal', 'School Admin', 'Store Keeper', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Vendor List" roles={['Super Admin', 'Principal', 'School Admin', 'Store Keeper', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      {/* ── Bulk Import ──────────────────────────────────────────────────────── */}
      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Assets" templateFields={['Asset Name', 'Category', 'Serial No', 'Quantity', 'Location', 'Condition', 'Purchase Date', 'Value (₹)', 'Assigned To']} sampleData={[['Projector BenQ MX535', 'Electronics', 'PRJ-2026-001', '1', 'Room 204', 'Good', '2026-01-15', '45000', 'AV Department']]} theme={theme} />
      </SectionCard>
      </div>)}
    </div>
  );
}

// ─── INLINE EDIT TIER ROW (sub-component to avoid hook-in-loop) ──────────────
function EditableTierRow({ tier, theme, onSave, onCancel }: {
  tier: ApprovalTier; theme: Theme;
  onSave: (t: ApprovalTier) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(tier);
  return (
    <div className={`p-3 rounded-xl border-2 ${theme.border} ${theme.secondaryBg} space-y-2`}>
      <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Editing: {tier.tierName}</p>
      <div className="grid grid-cols-4 gap-2">
        <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Tier Name</p><InputField value={draft.tierName} onChange={v => setDraft(p => ({ ...p, tierName: v }))} theme={theme} /></div>
        <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Min Amount (₹)</p><InputField value={String(draft.minAmount)} onChange={v => setDraft(p => ({ ...p, minAmount: Number(v) }))} theme={theme} type="number" /></div>
        <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Amount (₹)</p><InputField value={String(draft.maxAmount)} onChange={v => setDraft(p => ({ ...p, maxAmount: Number(v) }))} theme={theme} type="number" /></div>
        <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Approver</p><InputField value={draft.approver} onChange={v => setDraft(p => ({ ...p, approver: v }))} theme={theme} /></div>
      </div>
      <div className="flex items-center gap-3">
        <label className={`flex items-center gap-2 text-xs ${theme.iconColor} cursor-pointer`}>
          <input type="checkbox" checked={draft.autoApprove} onChange={e => setDraft(p => ({ ...p, autoApprove: e.target.checked }))} className="rounded" />
          Auto-approve
        </label>
        <div className="flex gap-2 ml-auto">
          <button onClick={() => onSave(draft)} className={`flex items-center gap-1 px-4 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Save size={12} /> Save</button>
          <button onClick={onCancel} className={`px-4 py-1.5 rounded-xl border ${theme.border} text-xs ${theme.iconColor}`}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
