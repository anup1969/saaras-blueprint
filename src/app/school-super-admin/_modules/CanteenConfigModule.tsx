'use client';
import React, { useState } from 'react';
import { X, Plus, Search, Download, Upload, Save, Trash2, Filter } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type MenuItem = {
  id: number; name: string; category: string; price: number;
  available: boolean; vegetarian: boolean; allergens: string;
};
type DailyMenuEntry = { day: string; mealType: string; items: number[] };   // item IDs
type PricingEntry   = { itemId: number; studentType: string; price: number };

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const INIT_MENU_ITEMS: MenuItem[] = [
  { id: 1,  name: 'Paneer Tikka Wrap',  category: 'Main Course', price: 80,  available: true,  vegetarian: true,  allergens: 'Dairy, Gluten'   },
  { id: 2,  name: 'Masala Dosa',        category: 'Breakfast',   price: 40,  available: true,  vegetarian: true,  allergens: 'Gluten'           },
  { id: 3,  name: 'Chicken Biryani',    category: 'Main Course', price: 110, available: true,  vegetarian: false, allergens: 'None'             },
  { id: 4,  name: 'Veg Pulao',          category: 'Main Course', price: 70,  available: true,  vegetarian: true,  allergens: 'None'             },
  { id: 5,  name: 'Samosa (2 pcs)',     category: 'Snack',       price: 20,  available: true,  vegetarian: true,  allergens: 'Gluten'           },
  { id: 6,  name: 'Fruit Salad Cup',    category: 'Snack',       price: 35,  available: true,  vegetarian: true,  allergens: 'None'             },
  { id: 7,  name: 'Idli Sambhar (3)',   category: 'Breakfast',   price: 35,  available: true,  vegetarian: true,  allergens: 'None'             },
  { id: 8,  name: 'Chocolate Milk',     category: 'Beverage',    price: 25,  available: false, vegetarian: true,  allergens: 'Dairy'            },
  { id: 9,  name: 'Dal Rice Combo',     category: 'Main Course', price: 55,  available: true,  vegetarian: true,  allergens: 'None'             },
  { id: 10, name: 'Egg Sandwich',       category: 'Breakfast',   price: 30,  available: true,  vegetarian: false, allergens: 'Egg, Gluten'      },
];

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const INIT_DAILY_MENU: DailyMenuEntry[] = [
  { day: 'Monday',    mealType: 'Breakfast', items: [2, 7]  },
  { day: 'Monday',    mealType: 'Lunch',     items: [4, 9]  },
  { day: 'Monday',    mealType: 'Snack',     items: [5, 6]  },
  { day: 'Tuesday',   mealType: 'Breakfast', items: [10]    },
  { day: 'Tuesday',   mealType: 'Lunch',     items: [3]     },
  { day: 'Wednesday', mealType: 'Breakfast', items: [2]     },
  { day: 'Wednesday', mealType: 'Lunch',     items: [1, 9]  },
  { day: 'Thursday',  mealType: 'Breakfast', items: [7]     },
  { day: 'Thursday',  mealType: 'Lunch',     items: [4]     },
  { day: 'Friday',    mealType: 'Breakfast', items: [2, 10] },
  { day: 'Friday',    mealType: 'Lunch',     items: [3, 4]  },
  { day: 'Friday',    mealType: 'Snack',     items: [5]     },
];

const STUDENT_TYPES = ['Day Scholar', 'Hosteller', 'Staff Child', 'Pre-school'];

const INIT_PRICING: PricingEntry[] = [
  { itemId: 1, studentType: 'Day Scholar',  price: 80  },
  { itemId: 1, studentType: 'Hosteller',    price: 70  },
  { itemId: 1, studentType: 'Staff Child',  price: 60  },
  { itemId: 2, studentType: 'Day Scholar',  price: 40  },
  { itemId: 2, studentType: 'Hosteller',    price: 35  },
  { itemId: 2, studentType: 'Staff Child',  price: 30  },
  { itemId: 3, studentType: 'Day Scholar',  price: 110 },
  { itemId: 3, studentType: 'Hosteller',    price: 95  },
  { itemId: 3, studentType: 'Staff Child',  price: 80  },
  { itemId: 5, studentType: 'Day Scholar',  price: 20  },
  { itemId: 5, studentType: 'Hosteller',    price: 15  },
  { itemId: 5, studentType: 'Staff Child',  price: 10  },
];

const CATEGORIES = ['Breakfast', 'Main Course', 'Snack', 'Beverage', 'Dessert', 'Special'];
const STATUS_COLOR: Record<string, string> = {
  true:  'bg-emerald-100 text-emerald-700',
  false: 'bg-gray-100 text-gray-500',
};

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────
function SectionSaveBar({ label, theme }: { label: string; theme: Theme }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex justify-end mt-3 pt-3 border-t border-dashed border-gray-200">
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl ${saved ? 'bg-emerald-500' : theme.primary} text-white text-xs font-bold transition-colors`}>
        <Save size={12} /> {saved ? 'Saved!' : `Save ${label}`}
      </button>
    </div>
  );
}

// ─── TAB TYPE ─────────────────────────────────────────────────────────────────
type TabId = 'menu' | 'pricing' | 'settings';

// ─── MAIN MODULE ──────────────────────────────────────────────────────────────
export default function CanteenConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ── existing config state ──
  const [menuCycle, setMenuCycle] = useState('Weekly');
  const [canteenToggles, setCanteenToggles] = useState<Record<string, boolean>>({
    'Pre-order System': true, 'Wallet / Prepaid': false, 'Allergy Tracking': true,
  });
  const [preschoolMealPlan, setPreschoolMealPlan] = useState('None');
  const [dietaryPrefTracking, setDietaryPrefTracking] = useState(true);

  // ── meal types (upgraded from toggles to full master table) ──
  const [mealTypes, setMealTypes] = useState([
    { id: 1, name: 'Breakfast', enabled: true,  startTime: '07:30', endTime: '08:30', description: 'Morning meal before school hours'        },
    { id: 2, name: 'Lunch',     enabled: true,  startTime: '12:00', endTime: '13:00', description: 'Mid-day meal during lunch break'         },
    { id: 3, name: 'Snack',     enabled: true,  startTime: '15:30', endTime: '16:00', description: 'Light snack during short break'          },
    { id: 4, name: 'Dinner',    enabled: false, startTime: '19:00', endTime: '20:00', description: 'Evening meal — hostellers only'          },
  ]);
  const [addingMealType, setAddingMealType] = useState(false);
  const [newMealType, setNewMealType] = useState({ name: '', startTime: '', endTime: '', description: '' });

  // ── menu items ──
  const [menuItems, setMenuItems]   = useState<MenuItem[]>(INIT_MENU_ITEMS);
  const [itemSearch, setItemSearch] = useState('');
  const [filterCat, setFilterCat]   = useState('All');
  const [filterVeg, setFilterVeg]   = useState<'all' | 'veg' | 'nonveg'>('all');
  const [addingItem, setAddingItem] = useState(false);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '', category: 'Main Course', price: 0, available: true, vegetarian: true, allergens: '',
  });

  // ── daily menu planner ──
  const [dailyMenu, setDailyMenu]     = useState<DailyMenuEntry[]>(INIT_DAILY_MENU);
  const [plannerDay, setPlannerDay]   = useState('Monday');
  const [plannerMeal, setPlannerMeal] = useState('Lunch');
  const [showItemPicker, setShowItemPicker] = useState(false);
  const [pickerSearch, setPickerSearch]     = useState('');

  // ── pricing matrix ──
  const [pricing, setPricing]           = useState<PricingEntry[]>(INIT_PRICING);
  const [pricingItemId, setPricingItemId] = useState<number | 'all'>('all');

  // ── tab state ──
  const [internalTab, setInternalTab] = useState<TabId>('menu');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ── derived ──
  const activeMealTypeNames = mealTypes.filter(m => m.enabled).map(m => m.name);

  const filteredItems = menuItems.filter(i =>
    (filterCat === 'All' || i.category === filterCat) &&
    (filterVeg === 'all' || (filterVeg === 'veg' ? i.vegetarian : !i.vegetarian)) &&
    (i.name.toLowerCase().includes(itemSearch.toLowerCase()) || i.category.toLowerCase().includes(itemSearch.toLowerCase()))
  );

  const currentPlannerEntry = dailyMenu.find(e => e.day === plannerDay && e.mealType === plannerMeal);
  const currentPlannerItems = currentPlannerEntry?.items ?? [];

  const pickerItems = menuItems.filter(i =>
    i.name.toLowerCase().includes(pickerSearch.toLowerCase()) &&
    !currentPlannerItems.includes(i.id)
  );

  function addItemToPlanner(itemId: number) {
    setDailyMenu(prev => {
      const existing = prev.find(e => e.day === plannerDay && e.mealType === plannerMeal);
      if (existing) {
        return prev.map(e => (e.day === plannerDay && e.mealType === plannerMeal)
          ? { ...e, items: [...e.items, itemId] }
          : e
        );
      }
      return [...prev, { day: plannerDay, mealType: plannerMeal, items: [itemId] }];
    });
  }
  function removeItemFromPlanner(itemId: number) {
    setDailyMenu(prev => prev.map(e =>
      (e.day === plannerDay && e.mealType === plannerMeal)
        ? { ...e, items: e.items.filter(x => x !== itemId) }
        : e
    ));
  }

  function getPriceForItem(itemId: number, studentType: string) {
    return pricing.find(p => p.itemId === itemId && p.studentType === studentType)?.price ?? '';
  }
  function setPriceForItem(itemId: number, studentType: string, val: number) {
    setPricing(prev => {
      const exists = prev.find(p => p.itemId === itemId && p.studentType === studentType);
      if (exists) return prev.map(p => (p.itemId === itemId && p.studentType === studentType) ? { ...p, price: val } : p);
      return [...prev, { itemId, studentType, price: val }];
    });
  }

  const pricingDisplayItems = pricingItemId === 'all' ? menuItems : menuItems.filter(i => i.id === pricingItemId);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Canteen / Meal Configuration" subtitle="Menu items, daily planner, pricing matrix, and canteen feature settings" theme={theme} />

      {activeTab === 'menu' && (<div className="space-y-4">
      {/* ── CANTEEN FEATURES + MEAL TYPES ── */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Canteen Features" subtitle="Ordering, wallet, and dietary safety features for school canteen" theme={theme}>
          <div className="space-y-2">
            {Object.entries(canteenToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Pre-order System': 'Parents/students can order meals in advance via app — reduces canteen queues',
                      'Wallet / Prepaid': 'Students use a prepaid digital wallet to pay at canteen — no cash handling',
                      'Allergy Tracking': 'Track student allergies and auto-flag menu items that contain allergens',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setCanteenToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
            <div className="pt-1">
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Menu Cycle</p>
              <SelectField options={['Weekly', 'Bi-weekly', 'Monthly']} value={menuCycle} onChange={setMenuCycle} theme={theme} />
            </div>
          </div>
          <SectionSaveBar label="Features" theme={theme} />
        </SectionCard>

        {/* ── MEAL TYPES TABLE (upgraded from toggles) ── */}
        <SectionCard title="Meal Types" subtitle="Define canteen meal slots — name, time window, and active status" theme={theme}>
          <div className="overflow-x-auto mb-2">
            <table className="w-full text-xs">
              <thead><tr className={theme.secondaryBg}>
                {['Meal', 'Start', 'End', 'Description', 'Active', ''].map(h => (
                  <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {mealTypes.map((mt, i) => (
                  <tr key={mt.id} className={`border-t ${theme.border}`}>
                    <td className="px-1 py-1.5">
                      <input value={mt.name} onChange={e => setMealTypes(p => p.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                        className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input type="time" value={mt.startTime} onChange={e => setMealTypes(p => p.map((x, j) => j === i ? { ...x, startTime: e.target.value } : x))}
                        className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input type="time" value={mt.endTime} onChange={e => setMealTypes(p => p.map((x, j) => j === i ? { ...x, endTime: e.target.value } : x))}
                        className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
                    </td>
                    <td className="px-1 py-1.5">
                      <input value={mt.description} onChange={e => setMealTypes(p => p.map((x, j) => j === i ? { ...x, description: e.target.value } : x))}
                        className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.iconColor} outline-none`} />
                    </td>
                    <td className="px-2 py-1.5">
                      <SSAToggle on={mt.enabled} onChange={() => setMealTypes(p => p.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))} theme={theme} />
                    </td>
                    <td className="px-1 py-1.5">
                      <button onClick={() => setMealTypes(p => p.filter(x => x.id !== mt.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </td>
                  </tr>
                ))}
                {addingMealType && (
                  <tr className={`border-t ${theme.border} bg-emerald-50/30`}>
                    <td className="px-1 py-1.5"><input value={newMealType.name} onChange={e => setNewMealType(p => ({ ...p, name: e.target.value }))} placeholder="Dinner"
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} /></td>
                    <td className="px-1 py-1.5"><input type="time" value={newMealType.startTime} onChange={e => setNewMealType(p => ({ ...p, startTime: e.target.value }))}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} /></td>
                    <td className="px-1 py-1.5"><input type="time" value={newMealType.endTime} onChange={e => setNewMealType(p => ({ ...p, endTime: e.target.value }))}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} /></td>
                    <td className="px-1 py-1.5"><input value={newMealType.description} onChange={e => setNewMealType(p => ({ ...p, description: e.target.value }))} placeholder="Description"
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.iconColor} outline-none`} /></td>
                    <td colSpan={1} />
                    <td className="px-1 py-1.5 flex items-center gap-1">
                      <button onClick={() => {
                        if (!newMealType.name.trim()) return;
                        setMealTypes(p => [...p, { id: Date.now(), ...newMealType, enabled: true }]);
                        setNewMealType({ name: '', startTime: '', endTime: '', description: '' }); setAddingMealType(false);
                      }} className="text-emerald-500 hover:text-emerald-700"><Plus size={13} /></button>
                      <button onClick={() => setAddingMealType(false)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {!addingMealType && (
            <button onClick={() => setAddingMealType(true)} className={`flex items-center gap-1 text-xs ${theme.iconColor} ${theme.buttonHover} px-2 py-1 rounded-xl`}>
              <Plus size={12} /> Add Meal Type
            </button>
          )}
          <SectionSaveBar label="Meal Types" theme={theme} />
        </SectionCard>
      </div>

      {/* ── MENU ITEMS MASTER TABLE ── */}
      <SectionCard title="Menu Items" subtitle="Master catalogue of all canteen items — name, category, price, availability, and dietary info" theme={theme}>
        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={12} className={theme.iconColor} />
            <input value={itemSearch} onChange={e => setItemSearch(e.target.value)} placeholder="Search items..."
              className={`bg-transparent text-xs ${theme.highlight} outline-none w-32`} />
            {itemSearch && <button onClick={() => setItemSearch('')}><X size={10} className="text-gray-400" /></button>}
          </div>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className={`px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
            {(['all', 'veg', 'nonveg'] as const).map(v => (
              <button key={v} onClick={() => setFilterVeg(v)}
                className={`px-2.5 py-1.5 text-[10px] font-bold transition-colors border-0 ${filterVeg === v ? (v === 'veg' ? 'bg-emerald-500 text-white' : v === 'nonveg' ? 'bg-red-500 text-white' : `${theme.primary} text-white`) : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                {v === 'all' ? 'All' : v === 'veg' ? '🟢 Veg' : '🔴 Non-veg'}
              </button>
            ))}
          </div>
          <span className={`px-2 py-1 rounded-lg ${theme.secondaryBg} text-[10px] font-bold ${theme.iconColor}`}>{filteredItems.length} items</span>
          <div className="flex-1" />
          <button onClick={() => {}} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.iconColor}`}><Upload size={11} /> Import</button>
          <button onClick={() => {}} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.secondaryBg} text-xs ${theme.iconColor}`}><Download size={11} /> Export</button>
          <button onClick={() => setAddingItem(true)} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={12} /> Add Item</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              {['Item Name', 'Category', 'Price (₹)', 'Allergens', 'Veg', 'Available', ''].map(h => (
                <th key={h} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filteredItems.map((item, i) => (
                <tr key={item.id} className={`border-t ${theme.border}`}>
                  <td className="px-1 py-1.5">
                    <input value={item.name} onChange={e => setMenuItems(p => p.map(x => x.id === item.id ? { ...x, name: e.target.value } : x))}
                      className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <select value={item.category} onChange={e => setMenuItems(p => p.map(x => x.id === item.id ? { ...x, category: e.target.value } : x))}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="px-1 py-1.5">
                    <input type="number" value={item.price} onChange={e => setMenuItems(p => p.map(x => x.id === item.id ? { ...x, price: +e.target.value } : x))}
                      className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-right`} />
                  </td>
                  <td className="px-1 py-1.5">
                    <input value={item.allergens} onChange={e => setMenuItems(p => p.map(x => x.id === item.id ? { ...x, allergens: e.target.value } : x))}
                      placeholder="None" className={`w-28 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.iconColor} outline-none`} />
                  </td>
                  <td className="px-2 py-1.5">
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${item.vegetarian ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {item.vegetarian ? 'Veg' : 'Non-veg'}
                    </span>
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={item.available} onChange={() => setMenuItems(p => p.map(x => x.id === item.id ? { ...x, available: !x.available } : x))} theme={theme} />
                  </td>
                  <td className="px-1 py-1.5">
                    <button onClick={() => setMenuItems(p => p.filter(x => x.id !== item.id))} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                  </td>
                </tr>
              ))}
              {addingItem && (
                <tr className={`border-t ${theme.border} bg-emerald-50/30`}>
                  <td className="px-1 py-1.5"><input value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} placeholder="Item name..."
                    className={`w-full px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs font-bold ${theme.highlight} outline-none`} /></td>
                  <td className="px-1 py-1.5">
                    <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}
                      className={`px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="px-1 py-1.5"><input type="number" value={newItem.price || ''} onChange={e => setNewItem(p => ({ ...p, price: +e.target.value }))} placeholder="0"
                    className={`w-20 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-right`} /></td>
                  <td className="px-1 py-1.5"><input value={newItem.allergens} onChange={e => setNewItem(p => ({ ...p, allergens: e.target.value }))} placeholder="None"
                    className={`w-28 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.iconColor} outline-none`} /></td>
                  <td className="px-2 py-1.5">
                    <button onClick={() => setNewItem(p => ({ ...p, vegetarian: !p.vegetarian }))}
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${newItem.vegetarian ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {newItem.vegetarian ? 'Veg' : 'Non-veg'}
                    </button>
                  </td>
                  <td className="px-2 py-1.5">
                    <SSAToggle on={newItem.available} onChange={() => setNewItem(p => ({ ...p, available: !p.available }))} theme={theme} />
                  </td>
                  <td className="px-1 py-1.5 flex items-center gap-1">
                    <button onClick={() => {
                      if (!newItem.name.trim()) return;
                      setMenuItems(p => [...p, { id: Date.now(), ...newItem }]);
                      setNewItem({ name: '', category: 'Main Course', price: 0, available: true, vegetarian: true, allergens: '' });
                      setAddingItem(false);
                    }} className="text-emerald-500 hover:text-emerald-700"><Plus size={13} /></button>
                    <button onClick={() => setAddingItem(false)} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <SectionSaveBar label="Menu Items" theme={theme} />
      </SectionCard>

      {/* ── DAILY MENU PLANNER ── */}
      <SectionCard title="Daily Menu Planner" subtitle="Assign menu items to each meal slot for each day of the week" theme={theme}>
        {/* Day + Meal selector */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {DAYS_OF_WEEK.map(d => (
              <button key={d} onClick={() => setPlannerDay(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${plannerDay === d ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                {d.slice(0, 3)}
              </button>
            ))}
          </div>
          <div className={`w-px h-5 bg-gray-200`} />
          <div className="flex gap-1">
            {activeMealTypeNames.map(m => (
              <button key={m} onClick={() => setPlannerMeal(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${plannerMeal === m ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Current slot items */}
        <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-3 min-h-[80px]`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-[10px] font-bold ${theme.iconColor} uppercase tracking-wide`}>{plannerDay} — {plannerMeal}</p>
            <button onClick={() => { setShowItemPicker(true); setPickerSearch(''); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl ${theme.primary} text-white text-[10px] font-bold`}>
              <Plus size={10} /> Add Item
            </button>
          </div>
          {currentPlannerItems.length === 0 ? (
            <p className={`text-xs ${theme.iconColor} italic`}>No items assigned — click Add Item above</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {currentPlannerItems.map(itemId => {
                const item = menuItems.find(x => x.id === itemId);
                if (!item) return null;
                return (
                  <span key={itemId} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border ${theme.border} text-xs font-bold ${theme.highlight}`}>
                    <span className={`w-2 h-2 rounded-full ${item.vegetarian ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {item.name}
                    <span className={`text-[10px] ${theme.iconColor}`}>₹{item.price}</span>
                    <button onClick={() => removeItemFromPlanner(itemId)} className="text-gray-400 hover:text-red-500"><X size={10} /></button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Weekly summary grid */}
        <p className={`text-[10px] font-bold ${theme.iconColor} mb-2 uppercase tracking-wide`}>Weekly Overview</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              <th className={`text-left px-2 py-2 font-bold ${theme.iconColor} w-24`}>Day</th>
              {activeMealTypeNames.map(m => (
                <th key={m} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{m}</th>
              ))}
            </tr></thead>
            <tbody>
              {DAYS_OF_WEEK.map(day => (
                <tr key={day} className={`border-t ${theme.border} ${plannerDay === day ? `${theme.secondaryBg}` : ''}`}>
                  <td className={`px-2 py-1.5 font-bold text-xs ${plannerDay === day ? theme.highlight : theme.iconColor}`}>{day}</td>
                  {activeMealTypeNames.map(meal => {
                    const entry = dailyMenu.find(e => e.day === day && e.mealType === meal);
                    const names  = (entry?.items ?? []).map(id => menuItems.find(x => x.id === id)?.name).filter(Boolean);
                    return (
                      <td key={meal} className="px-2 py-1.5 cursor-pointer" onClick={() => { setPlannerDay(day); setPlannerMeal(meal); }}>
                        {names.length === 0
                          ? <span className={`text-[10px] ${theme.iconColor} italic`}>—</span>
                          : <span className={`text-[10px] ${theme.highlight}`}>{names.join(', ')}</span>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SectionSaveBar label="Menu Plan" theme={theme} />
      </SectionCard>

      {/* ── ITEM PICKER MODAL ── */}
      {showItemPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl w-80 p-5`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`text-sm font-bold ${theme.highlight}`}>Add Item to {plannerDay} — {plannerMeal}</h4>
              <button onClick={() => setShowItemPicker(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} mb-3`}>
              <Search size={13} className={theme.iconColor} />
              <input autoFocus value={pickerSearch} onChange={e => setPickerSearch(e.target.value)} placeholder="Search items..."
                className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto">
              {pickerItems.map(item => (
                <button key={item.id} onClick={() => { addItemToPlanner(item.id); setShowItemPicker(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl ${theme.secondaryBg} border ${theme.border} hover:opacity-80 text-left`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${item.vegetarian ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <div>
                      <p className={`text-xs font-bold ${theme.highlight}`}>{item.name}</p>
                      <p className={`text-[10px] ${theme.iconColor}`}>{item.category}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${theme.highlight}`}>₹{item.price}</span>
                </button>
              ))}
              {pickerItems.length === 0 && (
                <p className={`text-center text-xs py-4 ${theme.iconColor}`}>No items available to add</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PRESCHOOL MEAL PLAN (existing) ── */}
      <SectionCard title="Preschool Meal Plan" subtitle="Meal plan type for nursery and kindergarten students" theme={theme}>
        <div className="space-y-3">
          <div>
            <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Meal Plan Type</p>
            <SelectField options={['None', 'Snacks Only', 'Breakfast + Lunch', 'Full Day Meals']} value={preschoolMealPlan} onChange={setPreschoolMealPlan} theme={theme} />
          </div>
          <div className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
            <div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Dietary Preferences Tracking</p>
              <p className={`text-[10px] ${theme.iconColor}`}>Record dietary restrictions or preferences per preschool child</p>
            </div>
            <SSAToggle on={dietaryPrefTracking} onChange={() => setDietaryPrefTracking(!dietaryPrefTracking)} theme={theme} />
          </div>
        </div>
        <SectionSaveBar label="Preschool Plan" theme={theme} />
      </SectionCard>
      </div>)}

      {activeTab === 'pricing' && (<div className="space-y-4">
      {/* ── PRICING TABLE ── */}
      <SectionCard title="Pricing Table" subtitle="Set different prices for the same item by student type — Day Scholar, Hosteller, Staff Child, Pre-school" theme={theme}>
        <div className="flex items-center gap-2 mb-3">
          <select value={pricingItemId === 'all' ? 'all' : pricingItemId} onChange={e => setPricingItemId(e.target.value === 'all' ? 'all' : +e.target.value)}
            className={`px-2.5 py-1.5 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`}>
            <option value="all">All Items</option>
            {menuItems.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
          <span className={`text-[10px] ${theme.iconColor}`}>Click any price cell to edit directly</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className={theme.secondaryBg}>
              <th className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>Item</th>
              <th className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>Base ₹</th>
              {STUDENT_TYPES.map(st => (
                <th key={st} className={`text-left px-2 py-2 font-bold ${theme.iconColor}`}>{st}</th>
              ))}
            </tr></thead>
            <tbody>
              {pricingDisplayItems.map(item => (
                <tr key={item.id} className={`border-t ${theme.border}`}>
                  <td className={`px-2 py-1.5 text-xs font-bold ${theme.highlight} whitespace-nowrap`}>
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${item.vegetarian ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {item.name}
                  </td>
                  <td className={`px-2 py-1.5 text-xs ${theme.iconColor}`}>₹{item.price}</td>
                  {STUDENT_TYPES.map(st => (
                    <td key={st} className="px-1 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <span className={`text-[10px] ${theme.iconColor}`}>₹</span>
                        <input type="number"
                          value={getPriceForItem(item.id, st)}
                          onChange={e => setPriceForItem(item.id, st, +e.target.value)}
                          placeholder={String(item.price)}
                          className={`w-16 px-1.5 py-1 rounded-lg border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none text-right`} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SectionSaveBar label="Pricing" theme={theme} />
      </SectionCard>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      {/* ── PERMISSIONS + IMPORT ── */}
      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Menu Items"  roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Meal Plans"  roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Pricing"     roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Menu Items" templateFields={['Item Name', 'Category', 'Price', 'Vegetarian (Y/N)', 'Allergens', 'Available (Y/N)']} sampleData={[['Paneer Tikka Wrap', 'Main Course', '80', 'Y', 'Dairy, Gluten', 'Y']]} theme={theme} />
      </SectionCard>
      </div>)}
    </div>
  );
}
