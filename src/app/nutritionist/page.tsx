'use client';

import React, { useState } from 'react';
import BlueprintLayout from '@/components/BlueprintLayout';
import { StatCard, TabBar, StatusBadge, SearchBar, DataTable, Toggle } from '@/components/shared';
import { type Theme } from '@/lib/themes';
import StakeholderProfile from '@/components/StakeholderProfile';
import TaskTrackerPanel from '@/components/TaskTrackerPanel';
import { ChatsView } from '@/components/ChatModule';
import SupportModule from '@/components/SupportModule';
import {
  Home, UtensilsCrossed, AlertTriangle, Calendar, Package, MessageSquare,
  Search, Plus, Filter, Download, Eye, Edit, Phone, Clock,
  CheckCircle, Baby, Heart, Leaf, Apple, Wheat, Milk, Egg,
  Users, Bell, ChevronDown, FileText, ShieldAlert,
  PanelLeftClose, PanelLeftOpen, Headphones
} from 'lucide-react';

// ─── MODULE SIDEBAR ────────────────────────────────
const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'meal-plans', label: 'Meal Plans', icon: UtensilsCrossed },
  { id: 'allergy-register', label: 'Allergy Register', icon: AlertTriangle },
  { id: 'weekly-menu', label: 'Weekly Menu', icon: Calendar },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'support', label: 'Support', icon: Headphones },
];

// ─── MOCK DATA ──────────────────────────────────────

const mockWeeklyMenu = {
  Monday: { breakfast: 'Poha + Milk', lunch: 'Dal Rice + Aloo Gobi + Roti + Salad', snack: 'Banana + Biscuits' },
  Tuesday: { breakfast: 'Upma + Juice', lunch: 'Rajma Rice + Jeera Aloo + Roti + Raita', snack: 'Apple Slices + Mathri' },
  Wednesday: { breakfast: 'Idli Sambar + Milk', lunch: 'Paneer Butter Masala + Rice + Roti + Salad', snack: 'Orange + Makhana' },
  Thursday: { breakfast: 'Paratha + Curd', lunch: 'Chole + Rice + Puri + Onion Salad', snack: 'Seasonal Fruit + Chikki' },
  Friday: { breakfast: 'Dosa + Coconut Chutney', lunch: 'Mix Veg + Dal Tadka + Rice + Roti', snack: 'Sprouts Chaat + Juice' },
};

const mockAllergyRegister = [
  { id: 'AL-001', student: 'Siya Sharma', class: 'Playgroup-B', allergy: 'Peanuts', severity: 'Severe', reaction: 'Anaphylaxis risk', action: 'Epi-pen available in infirmary', parent: 'Vikram Sharma', phone: '98250 11112' },
  { id: 'AL-002', student: 'Ananya Mehta', class: 'Nursery-B', allergy: 'Lactose', severity: 'Moderate', reaction: 'Stomach upset, bloating', action: 'Substitute with soy milk', parent: 'Suresh Mehta', phone: '98250 22221' },
  { id: 'AL-003', student: 'Ishita Joshi', class: 'LKG-B', allergy: 'Eggs', severity: 'Mild', reaction: 'Skin rash', action: 'Avoid egg-based items', parent: 'Dinesh Joshi', phone: '98250 11114' },
  { id: 'AL-004', student: 'Myra Pandya', class: 'Playgroup-B', allergy: 'Gluten', severity: 'Moderate', reaction: 'Digestive issues', action: 'Gluten-free roti + separate snacks', parent: 'Harsh Pandya', phone: '98250 11115' },
  { id: 'AL-005', student: 'Arjun Patel', class: 'UKG-A', allergy: 'Soy', severity: 'Mild', reaction: 'Mild swelling', action: 'Avoid soy products, use regular milk', parent: 'Rajesh Patel', phone: '98250 33341' },
];

const mockSpecialDiets = [
  { student: 'Siya Sharma', class: 'Playgroup-B', type: 'Nut-Free', details: 'No peanuts, cashews, or tree nuts. Check all packaged items.', since: 'Apr 2025' },
  { student: 'Ananya Mehta', class: 'Nursery-B', type: 'Lactose-Free', details: 'Soy milk substitute. No paneer, curd, or cheese.', since: 'Jun 2025' },
  { student: 'Myra Pandya', class: 'Playgroup-B', type: 'Gluten-Free', details: 'Gluten-free roti. No regular bread, biscuits, or wheat snacks.', since: 'Aug 2025' },
  { student: 'Kavya Nair', class: 'LKG-A', type: 'Jain Diet', details: 'No root vegetables (onion, garlic, potato). Pure Jain meals.', since: 'Jan 2026' },
  { student: 'Riya Agarwal', class: 'UKG-B', type: 'Diabetic-Friendly', details: 'Low sugar, no sweets. Controlled carb portions. Doctor monitored.', since: 'Sep 2025' },
];

const mockInventory = [
  { item: 'Rice (Basmati)', unit: 'kg', stock: 45, minRequired: 20, status: 'OK', lastRefill: '10 Feb 2026' },
  { item: 'Wheat Flour (Atta)', unit: 'kg', stock: 30, minRequired: 15, status: 'OK', lastRefill: '08 Feb 2026' },
  { item: 'Toor Dal', unit: 'kg', stock: 12, minRequired: 10, status: 'Low', lastRefill: '05 Feb 2026' },
  { item: 'Cooking Oil', unit: 'ltr', stock: 8, minRequired: 5, status: 'OK', lastRefill: '10 Feb 2026' },
  { item: 'Milk (Amul)', unit: 'ltr', stock: 15, minRequired: 20, status: 'Low', lastRefill: '11 Feb 2026' },
  { item: 'Paneer', unit: 'kg', stock: 4, minRequired: 3, status: 'OK', lastRefill: '11 Feb 2026' },
  { item: 'Sugar', unit: 'kg', stock: 5, minRequired: 5, status: 'Low', lastRefill: '06 Feb 2026' },
  { item: 'Vegetables (Mixed)', unit: 'kg', stock: 25, minRequired: 15, status: 'OK', lastRefill: '11 Feb 2026' },
  { item: 'Fruits (Seasonal)', unit: 'kg', stock: 10, minRequired: 8, status: 'OK', lastRefill: '11 Feb 2026' },
  { item: 'Soy Milk (Special)', unit: 'ltr', stock: 3, minRequired: 2, status: 'OK', lastRefill: '09 Feb 2026' },
  { item: 'Gluten-Free Atta', unit: 'kg', stock: 2, minRequired: 2, status: 'Low', lastRefill: '04 Feb 2026' },
  { item: 'Biscuits (Parle-G)', unit: 'pkt', stock: 20, minRequired: 10, status: 'OK', lastRefill: '10 Feb 2026' },
];

const mockMealPlans = [
  { id: 'MP-001', name: 'Standard Plan', ageGroup: '2-6 years', calories: '800-1000 kcal', meals: 3, description: 'Balanced vegetarian plan for all children', students: 142 },
  { id: 'MP-002', name: 'Nut-Free Plan', ageGroup: '2-6 years', calories: '800-1000 kcal', meals: 3, description: 'Standard plan without any nut-based items', students: 3 },
  { id: 'MP-003', name: 'Lactose-Free Plan', ageGroup: '2-6 years', calories: '800-1000 kcal', meals: 3, description: 'Soy-based dairy substitutes', students: 2 },
  { id: 'MP-004', name: 'Gluten-Free Plan', ageGroup: '2-6 years', calories: '800-1000 kcal', meals: 3, description: 'Wheat substitutes for all meals', students: 1 },
  { id: 'MP-005', name: 'Jain Diet Plan', ageGroup: '2-6 years', calories: '800-1000 kcal', meals: 3, description: 'No root vegetables, pure Jain compliant', students: 1 },
  { id: 'MP-006', name: 'Diabetic-Friendly Plan', ageGroup: '2-6 years', calories: '700-900 kcal', meals: 3, description: 'Low sugar, controlled carbs. Doctor approved.', students: 1 },
];

// ─── MAIN COMPONENT ─────────────────────────────────

function NutritionistDashboard({ theme, themeIdx, onThemeChange, isPreschool }: { theme?: Theme; themeIdx?: number; onThemeChange?: (idx: number) => void; isPreschool?: boolean }) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  if (!theme) return null;

  return (
    <div className="flex gap-4 -m-6">
      {/* Module sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-48'} ${theme.cardBg} border-r ${theme.border} min-h-screen p-2 space-y-0.5 shrink-0 transition-all duration-200`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2 py-2`}>
          {!sidebarCollapsed && <p className={`text-[10px] font-bold ${theme.iconColor} uppercase px-1`}>Nutrition Modules</p>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-lg ${theme.buttonHover} ${theme.iconColor} transition-all`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={14} />}
          </button>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            title={sidebarCollapsed ? m.label : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'gap-2 px-3 py-2'} rounded-lg text-xs font-medium transition-all ${
              activeModule === m.id ? `${theme.primary} text-white` : `${theme.iconColor} ${theme.buttonHover}`
            }`}
          >
            <m.icon size={sidebarCollapsed ? 18 : 14} /> {!sidebarCollapsed && m.label}
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="flex-1 p-6 space-y-4 overflow-x-hidden">
        {activeModule === 'dashboard' && <DashboardHome theme={theme} onProfileClick={() => setActiveModule('profile')} />}
        {activeModule === 'meal-plans' && <MealPlansModule theme={theme} />}
        {activeModule === 'allergy-register' && <AllergyRegisterModule theme={theme} />}
        {activeModule === 'weekly-menu' && <WeeklyMenuModule theme={theme} />}
        {activeModule === 'inventory' && <InventoryModule theme={theme} />}
        {activeModule === 'communication' && <CommunicationModule theme={theme} />}
        {activeModule === 'support' && <SupportModule theme={theme} role="nutritionist" />}
        {activeModule === 'profile' && <StakeholderProfile role="nutritionist" theme={theme} onClose={() => setActiveModule('dashboard')} themeIdx={themeIdx} onThemeChange={onThemeChange} />}
      </div>
    </div>
  );
}

// ─── DASHBOARD HOME ──────────────────────────────────
function DashboardHome({ theme, onProfileClick }: { theme: Theme; onProfileClick: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme.highlight}`}>Nutritionist Dashboard</h1>
          <p className={`text-xs ${theme.iconColor}`}>Diet &amp; nutrition overview &mdash; {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <button onClick={onProfileClick} title="My Profile" className={`w-9 h-9 rounded-full ${theme.primary} text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity`}>DP</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UtensilsCrossed} label="Today's Menu" value="Paneer + Rice" color="bg-emerald-500" sub="Wednesday special" theme={theme} />
        <StatCard icon={AlertTriangle} label="Allergies Flagged" value={3} color="bg-red-500" sub="Peanut, Lactose, Gluten" theme={theme} />
        <StatCard icon={Heart} label="Children with Special Diet" value={5} color="bg-amber-500" sub="Active diet plans" theme={theme} />
        <StatCard icon={Users} label="Meals Served Today" value="142/156" color="bg-blue-500" sub="91% served" theme={theme} />
      </div>

      {/* Today's Menu Summary */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Today&apos;s Menu — Wednesday</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-4 rounded-xl ${theme.accentBg}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white"><Apple size={14} /></div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Breakfast</p>
            </div>
            <p className={`text-sm font-bold ${theme.primaryText}`}>Idli Sambar + Milk</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Served: 8:00 - 8:30 AM</p>
          </div>
          <div className={`p-4 rounded-xl ${theme.accentBg}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white"><UtensilsCrossed size={14} /></div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Lunch</p>
            </div>
            <p className={`text-sm font-bold ${theme.primaryText}`}>Paneer Butter Masala + Rice + Roti + Salad</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Served: 12:00 - 12:45 PM</p>
          </div>
          <div className={`p-4 rounded-xl ${theme.accentBg}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-white"><Leaf size={14} /></div>
              <p className={`text-xs font-bold ${theme.highlight}`}>Snack</p>
            </div>
            <p className={`text-sm font-bold ${theme.primaryText}`}>Orange + Makhana</p>
            <p className={`text-[10px] ${theme.iconColor} mt-1`}>Served: 3:00 - 3:15 PM</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Update Menu', icon: Edit, color: 'bg-blue-500' },
            { label: 'Log Allergy', icon: ShieldAlert, color: 'bg-red-500' },
            { label: 'Inventory Check', icon: Package, color: 'bg-amber-500' },
            { label: 'Meal Report', icon: FileText, color: 'bg-emerald-500' },
          ].map(a => (
            <button key={a.label} className={`flex items-center gap-2 p-3 rounded-xl ${theme.secondaryBg} ${theme.buttonHover} transition-all`}>
              <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-white`}><a.icon size={14} /></div>
              <span className={`text-xs font-bold ${theme.highlight}`}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Allergy Alerts */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Active Allergy Alerts</h3>
        <div className="space-y-2">
          {mockAllergyRegister.filter(a => a.severity === 'Severe' || a.severity === 'Moderate').map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${a.severity === 'Severe' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
              <AlertTriangle size={16} className={a.severity === 'Severe' ? 'text-red-500' : 'text-amber-500'} />
              <div className="flex-1">
                <p className={`text-xs font-bold ${a.severity === 'Severe' ? 'text-red-700' : 'text-amber-700'}`}>{a.student} ({a.class}) — {a.allergy}</p>
                <p className={`text-[10px] ${a.severity === 'Severe' ? 'text-red-500' : 'text-amber-500'}`}>{a.reaction}. Action: {a.action}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${a.severity === 'Severe' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{a.severity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
        <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Low Stock Items</h3>
        <div className="space-y-2">
          {mockInventory.filter(item => item.status === 'Low').map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl bg-amber-50 border border-amber-200`}>
              <Package size={14} className="text-amber-500" />
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-700">{item.item}</p>
                <p className="text-[10px] text-amber-500">Stock: {item.stock} {item.unit} (Min: {item.minRequired} {item.unit})</p>
              </div>
              <button className="px-2 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-700">Reorder</button>
            </div>
          ))}
        </div>
      </div>

      {/* Task Tracker */}
      <TaskTrackerPanel theme={theme} role="nutritionist" />
    </div>
  );
}

// ─── MEAL PLANS MODULE ──────────────────────────────
function MealPlansModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Active Plans');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Meal Plans</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> New Plan
        </button>
      </div>
      <TabBar tabs={['Active Plans', 'Templates', 'History']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UtensilsCrossed} label="Active Plans" value={mockMealPlans.length} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Users} label="Children Covered" value={156} color="bg-blue-500" sub="All enrolled" theme={theme} />
        <StatCard icon={Heart} label="Special Diets" value={5} color="bg-amber-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Compliance" value="98%" color="bg-purple-500" sub="This month" theme={theme} />
      </div>

      {tab === 'Active Plans' && (
        <div className="space-y-3">
          {mockMealPlans.map((plan, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${i === 0 ? 'bg-emerald-500' : 'bg-amber-500'} flex items-center justify-center text-white font-bold text-sm`}>
                    <UtensilsCrossed size={18} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>{plan.name}</p>
                    <p className={`text-xs ${theme.iconColor}`}>{plan.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${theme.primaryText}`}>{plan.students} children</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{plan.calories}</p>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${theme.accentBg} flex items-center justify-between`}>
                <span className={`text-xs ${theme.iconColor}`}>Age Group: {plan.ageGroup}</span>
                <span className={`text-xs ${theme.iconColor}`}>{plan.meals} meals/day</span>
                <button className={`px-3 py-1 rounded-lg text-xs font-bold ${theme.secondaryBg} ${theme.iconColor}`}><Eye size={10} className="inline mr-1" /> View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Templates' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Pre-built Meal Plan Templates</h3>
          <p className={`text-xs ${theme.iconColor} mb-4`}>Select a template to create a new customized plan.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: 'Standard Indian Vegetarian', desc: 'Balanced veg meals with dal, sabji, roti, rice', age: '2-6 years' },
              { name: 'Jain Compliant', desc: 'No root vegetables, onion, garlic free', age: '2-6 years' },
              { name: 'Allergy-Safe Universal', desc: 'Free from top 8 allergens', age: '2-6 years' },
              { name: 'High-Energy Active', desc: 'Extra calories for very active toddlers', age: '3-5 years' },
            ].map((t, i) => (
              <div key={i} className={`p-4 rounded-xl ${theme.accentBg} flex items-center gap-3`}>
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white"><FileText size={16} /></div>
                <div className="flex-1">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{t.name}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{t.desc}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>Age: {t.age}</p>
                </div>
                <button className={`px-3 py-1.5 rounded-lg text-xs font-bold ${theme.primary} text-white`}>Use</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'History' && (
        <DataTable
          headers={['Month', 'Meals Served', 'Avg Calories', 'Special Diets', 'Complaints', 'Rating']}
          rows={[
            [
              <span key="m" className={`font-bold ${theme.highlight}`}>February 2026</span>,
              <span key="s" className={theme.iconColor}>1,420</span>,
              <span key="c" className={`font-bold ${theme.primaryText}`}>920 kcal</span>,
              <span key="d" className={theme.iconColor}>5</span>,
              <span key="co" className={theme.iconColor}>0</span>,
              <span key="r" className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">Excellent</span>,
            ],
            [
              <span key="m" className={`font-bold ${theme.highlight}`}>January 2026</span>,
              <span key="s" className={theme.iconColor}>3,120</span>,
              <span key="c" className={`font-bold ${theme.primaryText}`}>905 kcal</span>,
              <span key="d" className={theme.iconColor}>4</span>,
              <span key="co" className={theme.iconColor}>1</span>,
              <span key="r" className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">Good</span>,
            ],
            [
              <span key="m" className={`font-bold ${theme.highlight}`}>December 2025</span>,
              <span key="s" className={theme.iconColor}>2,890</span>,
              <span key="c" className={`font-bold ${theme.primaryText}`}>935 kcal</span>,
              <span key="d" className={theme.iconColor}>4</span>,
              <span key="co" className={theme.iconColor}>0</span>,
              <span key="r" className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">Excellent</span>,
            ],
          ]}
          theme={theme}
        />
      )}
    </div>
  );
}

// ─── ALLERGY REGISTER MODULE ────────────────────────
function AllergyRegisterModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('All Allergies');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Allergy Register</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Add Entry
        </button>
      </div>
      <TabBar tabs={['All Allergies', 'Special Diets', 'Emergency Cards']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={AlertTriangle} label="Total Allergies" value={mockAllergyRegister.length} color="bg-red-500" theme={theme} />
        <StatCard icon={ShieldAlert} label="Severe" value={mockAllergyRegister.filter(a => a.severity === 'Severe').length} color="bg-red-600" sub="Epi-pen required" theme={theme} />
        <StatCard icon={Heart} label="Special Diets" value={mockSpecialDiets.length} color="bg-amber-500" theme={theme} />
        <StatCard icon={CheckCircle} label="Updated This Month" value={mockAllergyRegister.length} color="bg-emerald-500" theme={theme} />
      </div>

      {tab === 'All Allergies' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search student, allergy type..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Filter size={12} /> Filter</button>
          </div>
          <DataTable
            headers={['ID', 'Student', 'Class', 'Allergy', 'Severity', 'Reaction', 'Action', '']}
            rows={mockAllergyRegister.map(a => [
              <span key="id" className={`font-mono text-xs ${theme.primaryText}`}>{a.id}</span>,
              <span key="name" className={`font-bold ${theme.highlight}`}>{a.student}</span>,
              <span key="class" className={theme.iconColor}>{a.class}</span>,
              <span key="allergy" className={`text-xs px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-600`}>{a.allergy}</span>,
              <span key="severity" className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                a.severity === 'Severe' ? 'bg-red-100 text-red-700' : a.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}>{a.severity}</span>,
              <span key="reaction" className={`text-xs ${theme.iconColor}`}>{a.reaction}</span>,
              <span key="action" className={`text-xs ${theme.iconColor}`}>{a.action}</span>,
              <button key="view" className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Eye size={12} className={theme.iconColor} /></button>,
            ])}
            theme={theme}
          />
        </>
      )}

      {tab === 'Special Diets' && (
        <div className="space-y-3">
          {mockSpecialDiets.map((d, i) => (
            <div key={i} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                    {d.student.charAt(0)}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.highlight}`}>{d.student}</p>
                    <p className={`text-xs ${theme.iconColor}`}>{d.class} &bull; Since {d.since}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-100 text-amber-700">{d.type}</span>
              </div>
              <div className={`p-3 rounded-xl ${theme.accentBg}`}>
                <p className={`text-xs ${theme.highlight}`}>{d.details}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Emergency Cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockAllergyRegister.filter(a => a.severity === 'Severe').map((a, i) => (
            <div key={i} className="p-4 rounded-2xl bg-red-50 border-2 border-red-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center text-white font-bold text-lg">
                  {a.student.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-red-700">{a.student}</p>
                  <p className="text-xs text-red-500">{a.class}</p>
                </div>
                <span className="ml-auto text-xs px-3 py-1 rounded-full font-bold bg-red-200 text-red-800">SEVERE</span>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-red-700"><strong>Allergy:</strong> {a.allergy}</p>
                <p className="text-red-700"><strong>Reaction:</strong> {a.reaction}</p>
                <p className="text-red-700"><strong>Action:</strong> {a.action}</p>
                <p className="text-red-700"><strong>Parent:</strong> {a.parent} — {a.phone}</p>
              </div>
            </div>
          ))}
          {mockAllergyRegister.filter(a => a.severity === 'Severe').length === 0 && (
            <p className={`text-sm ${theme.iconColor} col-span-2 text-center py-8`}>No severe allergies registered. All clear.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── WEEKLY MENU MODULE ─────────────────────────────
function WeeklyMenuModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('This Week');

  const days = Object.entries(mockWeeklyMenu) as [string, { breakfast: string; lunch: string; snack: string }][];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Weekly Menu</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Edit size={14} /> Edit Menu
        </button>
      </div>
      <TabBar tabs={['This Week', 'Next Week', 'Nutrition Info']} active={tab} onChange={setTab} theme={theme} />

      {tab === 'This Week' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={theme.secondaryBg}>
                <tr>
                  <th className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase w-28`}>Day</th>
                  <th className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Breakfast</th>
                  <th className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Lunch</th>
                  <th className={`text-left px-4 py-3 text-xs font-bold ${theme.iconColor} uppercase`}>Snack</th>
                </tr>
              </thead>
              <tbody>
                {days.map(([day, meals], i) => (
                  <tr key={i} className={`border-t ${theme.border} ${day === today ? 'bg-emerald-50' : ''}`}>
                    <td className={`px-4 py-3 font-bold ${day === today ? 'text-emerald-700' : theme.highlight}`}>
                      {day}
                      {day === today && <span className="block text-[10px] text-emerald-600 font-bold">TODAY</span>}
                    </td>
                    <td className={`px-4 py-3 ${theme.highlight}`}>
                      <div className="flex items-center gap-2">
                        <Apple size={14} className="text-amber-500 shrink-0" />
                        <span className="text-xs">{meals.breakfast}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 ${theme.highlight}`}>
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed size={14} className="text-emerald-500 shrink-0" />
                        <span className="text-xs">{meals.lunch}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 ${theme.highlight}`}>
                      <div className="flex items-center gap-2">
                        <Leaf size={14} className="text-purple-500 shrink-0" />
                        <span className="text-xs">{meals.snack}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'Next Week' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 text-center`}>
          <Calendar size={32} className={`${theme.iconColor} mx-auto mb-2`} />
          <p className={`text-sm font-bold ${theme.highlight}`}>Next Week&apos;s Menu</p>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Menu for next week can be planned and published here.</p>
          <button className={`mt-4 px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold`}>Plan Next Week</button>
        </div>
      )}

      {tab === 'Nutrition Info' && (
        <div className="space-y-3">
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4`}>
            <h3 className={`text-sm font-bold ${theme.highlight} mb-3`}>Daily Nutritional Targets (Age 2-6)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Calories', target: '800-1000 kcal', icon: '🔥' },
                { label: 'Protein', target: '15-20 g', icon: '💪' },
                { label: 'Carbohydrates', target: '100-130 g', icon: '🌾' },
                { label: 'Fat', target: '25-35 g', icon: '🥑' },
                { label: 'Calcium', target: '500-800 mg', icon: '🦴' },
                { label: 'Iron', target: '7-10 mg', icon: '🩸' },
                { label: 'Vitamin C', target: '25-30 mg', icon: '🍊' },
                { label: 'Fiber', target: '14-17 g', icon: '🥬' },
              ].map((n, i) => (
                <div key={i} className={`p-3 rounded-xl ${theme.accentBg} text-center`}>
                  <p className="text-lg mb-1">{n.icon}</p>
                  <p className={`text-xs font-bold ${theme.highlight}`}>{n.label}</p>
                  <p className={`text-[10px] ${theme.primaryText} font-bold`}>{n.target}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── INVENTORY MODULE ───────────────────────────────
function InventoryModule({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState('Current Stock');

  const lowStockCount = mockInventory.filter(item => item.status === 'Low').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${theme.highlight}`}>Kitchen Inventory</h1>
        <button className={`px-4 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-bold flex items-center gap-1`}>
          <Plus size={14} /> Add Item
        </button>
      </div>
      <TabBar tabs={['Current Stock', 'Purchase Orders', 'Wastage Log']} active={tab} onChange={setTab} theme={theme} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Items" value={mockInventory.length} color="bg-blue-500" theme={theme} />
        <StatCard icon={AlertTriangle} label="Low Stock" value={lowStockCount} color="bg-amber-500" sub="Needs reorder" theme={theme} />
        <StatCard icon={CheckCircle} label="OK Items" value={mockInventory.length - lowStockCount} color="bg-emerald-500" theme={theme} />
        <StatCard icon={Clock} label="Last Updated" value="Today" color="bg-purple-500" sub="11 Feb 2026" theme={theme} />
      </div>

      {tab === 'Current Stock' && (
        <>
          <div className="flex gap-3">
            <SearchBar placeholder="Search item name..." theme={theme} icon={Search} />
            <button className={`px-3 py-2 rounded-xl border ${theme.border} ${theme.cardBg} text-xs font-bold ${theme.iconColor} flex items-center gap-1`}><Download size={12} /> Export</button>
          </div>
          <DataTable
            headers={['Item', 'Unit', 'Stock', 'Min Required', 'Status', 'Last Refill', '']}
            rows={mockInventory.map(item => [
              <span key="item" className={`font-bold ${theme.highlight}`}>{item.item}</span>,
              <span key="unit" className={theme.iconColor}>{item.unit}</span>,
              <span key="stock" className={`font-bold ${item.status === 'Low' ? 'text-amber-600' : theme.primaryText}`}>{item.stock}</span>,
              <span key="min" className={theme.iconColor}>{item.minRequired}</span>,
              <StatusBadge key="status" status={item.status === 'OK' ? 'Active' : 'Pending'} theme={theme} />,
              <span key="refill" className={`text-xs ${theme.iconColor}`}>{item.lastRefill}</span>,
              item.status === 'Low' ? (
                <button key="action" className="px-2 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-700">Reorder</button>
              ) : (
                <button key="action" className={`p-1.5 rounded-lg ${theme.secondaryBg}`}><Edit size={12} className={theme.iconColor} /></button>
              ),
            ])}
            theme={theme}
          />
        </>
      )}

      {tab === 'Purchase Orders' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 text-center`}>
          <Package size={32} className={`${theme.iconColor} mx-auto mb-2`} />
          <p className={`text-sm font-bold ${theme.highlight}`}>Purchase Orders</p>
          <p className={`text-xs ${theme.iconColor} mt-1`}>Track and manage kitchen purchase orders from vendors.</p>
          <button className={`mt-4 px-4 py-2 ${theme.primary} text-white rounded-xl text-sm font-bold`}>Create Order</button>
        </div>
      )}

      {tab === 'Wastage Log' && (
        <DataTable
          headers={['Date', 'Item', 'Quantity Wasted', 'Reason', 'Logged By']}
          rows={[
            [
              <span key="d" className={`text-xs ${theme.iconColor}`}>10 Feb 2026</span>,
              <span key="i" className={`font-bold ${theme.highlight}`}>Milk (Amul)</span>,
              <span key="q" className="text-amber-600 font-bold">2 ltr</span>,
              <span key="r" className={theme.iconColor}>Expired — not used in time</span>,
              <span key="l" className={theme.iconColor}>Kitchen Staff</span>,
            ],
            [
              <span key="d" className={`text-xs ${theme.iconColor}`}>07 Feb 2026</span>,
              <span key="i" className={`font-bold ${theme.highlight}`}>Vegetables (Mixed)</span>,
              <span key="q" className="text-amber-600 font-bold">1.5 kg</span>,
              <span key="r" className={theme.iconColor}>Leftover from lunch — excess preparation</span>,
              <span key="l" className={theme.iconColor}>Kitchen Staff</span>,
            ],
          ]}
          theme={theme}
        />
      )}
    </div>
  );
}

// ─── COMMUNICATION MODULE ────────────────────────────

function CommunicationModule({ theme }: { theme: Theme }) {
  const [commTab, setCommTab] = useState('Chat');
  const tabs = ['Alerts', 'Messages', 'Chat'];

  return (
    <div className="space-y-4">
      <h1 className={`text-2xl font-bold ${theme.highlight}`}>Communication</h1>
      <TabBar tabs={tabs} active={commTab} onChange={setCommTab} theme={theme} />

      {commTab === 'Chat' && (
        <div className="h-[calc(100vh-220px)]">
          <ChatsView theme={theme} compact />
        </div>
      )}

      {commTab === 'Alerts' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Nutrition Alerts</h3>
          {[
            { title: 'Severe Allergy — Siya Sharma (Peanuts)', detail: 'Ensure today\'s menu items are 100% peanut-free. Cross-check with kitchen.', time: '07:00 AM', severity: 'Critical' },
            { title: 'Low stock — Gluten-Free Atta', detail: 'Only 2 kg remaining. Reorder before Friday.', time: '09:00 AM', severity: 'Warning' },
            { title: 'New special diet request — Kavya Nair', detail: 'Jain diet requested. Plan approved by parent and principal.', time: '10:30 AM', severity: 'Info' },
          ].map((a, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg} flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full ${a.severity === 'Critical' ? 'bg-red-500' : a.severity === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <div className="flex-1">
                <p className={`text-xs font-bold ${theme.highlight}`}>{a.title}</p>
                <p className={`text-[10px] ${theme.iconColor}`}>{a.detail}</p>
              </div>
              <span className={`text-[10px] ${theme.iconColor}`}>{a.time}</span>
            </div>
          ))}
        </div>
      )}

      {commTab === 'Messages' && (
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-4 space-y-2`}>
          <h3 className={`text-sm font-bold ${theme.highlight} mb-2`}>Recent Messages</h3>
          {[
            { from: 'School Admin', text: 'Annual Day on 25th Feb — special snack menu needed for 200 guests.', time: '09:00 AM' },
            { from: 'Parent — Mrs. Mehta', text: 'Ananya\'s lactose intolerance has improved. Doctor says try small amounts of curd.', time: '08:30 AM' },
            { from: 'Kitchen Head', text: 'Paneer delivery arrived. Quality checked — all good for today\'s lunch.', time: '07:45 AM' },
          ].map((m, i) => (
            <div key={i} className={`p-3 rounded-xl ${theme.accentBg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${theme.highlight}`}>{m.from}</span>
                <span className={`text-[10px] ${theme.iconColor}`}>{m.time}</span>
              </div>
              <p className={`text-xs ${theme.iconColor}`}>{m.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── EXPORT ──────────────────────────────────────────
export default function Page() {
  return (
    <BlueprintLayout>
      <NutritionistDashboard />
    </BlueprintLayout>
  );
}
