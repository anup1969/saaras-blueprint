'use client';
import React, { useState } from 'react';
import { SSAToggle, SectionCard, ModuleHeader, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

export default function CanteenConfigModule({ theme }: { theme: Theme }) {
  const [menuCycle, setMenuCycle] = useState('Weekly');
  const [canteenToggles, setCanteenToggles] = useState<Record<string, boolean>>({
    'Pre-order System': true, 'Wallet / Prepaid': false, 'Allergy Tracking': true,
  });
  const [mealTypes, setMealTypes] = useState<Record<string, boolean>>({
    Breakfast: true, Lunch: true, Snack: true,
  });
  const [preschoolMealPlan, setPreschoolMealPlan] = useState('None');
  const [dietaryPrefTracking, setDietaryPrefTracking] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="Canteen / Meal Configuration" subtitle="Pre-orders, wallet, allergy tracking, and meal scheduling" theme={theme} />
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
        </SectionCard>
        <SectionCard title="Meal Types" subtitle="Which meals does the school canteen serve?" theme={theme}>
          <div className="space-y-2">
            {Object.entries(mealTypes).map(([meal, enabled]) => (
              <div key={meal} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{meal}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Breakfast': 'Morning meal served before school hours (typically 7:30–8:30 AM)',
                      'Lunch': 'Mid-day meal served during lunch break',
                      'Snack': 'Light snack or tiffin served during short break',
                    } as Record<string, string>)[meal]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setMealTypes(p => ({ ...p, [meal]: !p[meal] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

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
      </SectionCard>

      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Menu Items" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
          <MasterPermissionGrid masterName="Meal Plans" roles={['Super Admin', 'Principal', 'School Admin', 'Teacher', 'Accountant']} theme={theme} />
        </div>
      </SectionCard>

      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Menu Items" templateFields={['Item Name', 'Category', 'Price', 'Availability', 'Allergens']} sampleData={[['Paneer Tikka Wrap', 'Lunch', '80', 'Mon-Fri', 'Dairy']]} theme={theme} />
      </SectionCard>
    </div>
  );
}
