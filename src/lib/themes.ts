export interface Theme {
  id: string;
  name: string;
  type: 'light' | 'dark';
  primary: string;
  primaryText: string;
  secondaryBg: string;
  accentBg: string;
  border: string;
  sidebarBg: string;
  highlight: string;
  cardBg: string;
  iconColor: string;
  buttonHover: string;
  inputBg: string;
  helpBtn: string;
  bodyBg: string;
}

// Base 4 themes (Air, Moss, Stone, Midnight) — Vivid is handled via VIVID_VARIANTS
export const themes: Theme[] = [
  {
    id: 'blue', name: 'Air', type: 'light',
    primary: 'bg-slate-600', primaryText: 'text-slate-600',
    secondaryBg: 'bg-slate-100', accentBg: 'bg-slate-50',
    border: 'border-slate-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-900', cardBg: 'bg-white',
    iconColor: 'text-slate-400', buttonHover: 'hover:bg-slate-50',
    inputBg: 'bg-white', helpBtn: 'bg-slate-50 text-slate-600',
    bodyBg: 'bg-slate-50',
  },
  {
    id: 'sage', name: 'Moss', type: 'light',
    primary: 'bg-[#5c6b5d]', primaryText: 'text-[#5c6b5d]',
    secondaryBg: 'bg-[#e6ebe7]', accentBg: 'bg-[#f2f5f3]',
    border: 'border-[#cfd6d0]', sidebarBg: 'bg-[#fbfdfc]',
    highlight: 'text-[#3d473e]', cardBg: 'bg-white',
    iconColor: 'text-[#849686]', buttonHover: 'hover:bg-[#e6ebe7]',
    inputBg: 'bg-white', helpBtn: 'bg-[#e6ebe7] text-[#5c6b5d]',
    bodyBg: 'bg-[#f2f5f3]',
  },
  {
    id: 'stone', name: 'Stone', type: 'light',
    primary: 'bg-[#78716c]', primaryText: 'text-[#78716c]',
    secondaryBg: 'bg-[#e7e5e4]', accentBg: 'bg-[#fafaf9]',
    border: 'border-[#e7e5e4]', sidebarBg: 'bg-[#fafaf9]',
    highlight: 'text-[#44403c]', cardBg: 'bg-white',
    iconColor: 'text-[#a8a29e]', buttonHover: 'hover:bg-[#e7e5e4]',
    inputBg: 'bg-white', helpBtn: 'bg-[#e7e5e4] text-[#78716c]',
    bodyBg: 'bg-[#fafaf9]',
  },
  {
    id: 'neon', name: 'Midnight', type: 'dark',
    primary: 'bg-indigo-500', primaryText: 'text-indigo-400',
    secondaryBg: 'bg-slate-800', accentBg: 'bg-slate-900',
    border: 'border-slate-800', sidebarBg: 'bg-slate-950',
    highlight: 'text-white', cardBg: 'bg-slate-900',
    iconColor: 'text-slate-500', buttonHover: 'hover:bg-slate-800',
    inputBg: 'bg-slate-950', helpBtn: 'bg-slate-800 text-indigo-300',
    bodyBg: 'bg-slate-950',
  },
];

// 10 Vivid theme variants — soft, muted colors using -300/-200 shades
export const VIVID_VARIANTS: Record<string, Theme> = {
  Rose: {
    id: 'vivid', name: 'Vivid — Rose', type: 'light',
    primary: 'bg-rose-300', primaryText: 'text-rose-600',
    secondaryBg: 'bg-rose-50', accentBg: 'bg-rose-50',
    border: 'border-rose-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-rose-400', buttonHover: 'hover:bg-rose-100',
    inputBg: 'bg-white', helpBtn: 'bg-rose-200',
    bodyBg: 'bg-gradient-to-br from-rose-50 via-white to-rose-50',
  },
  Red: {
    id: 'vivid', name: 'Vivid — Red', type: 'light',
    primary: 'bg-red-300', primaryText: 'text-red-600',
    secondaryBg: 'bg-red-50', accentBg: 'bg-red-50',
    border: 'border-red-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-red-400', buttonHover: 'hover:bg-red-100',
    inputBg: 'bg-white', helpBtn: 'bg-red-200',
    bodyBg: 'bg-gradient-to-br from-red-50 via-white to-red-50',
  },
  Orange: {
    id: 'vivid', name: 'Vivid — Orange', type: 'light',
    primary: 'bg-orange-300', primaryText: 'text-orange-600',
    secondaryBg: 'bg-orange-50', accentBg: 'bg-orange-50',
    border: 'border-orange-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-orange-400', buttonHover: 'hover:bg-orange-100',
    inputBg: 'bg-white', helpBtn: 'bg-orange-200',
    bodyBg: 'bg-gradient-to-br from-orange-50 via-white to-orange-50',
  },
  Amber: {
    id: 'vivid', name: 'Vivid — Amber', type: 'light',
    primary: 'bg-amber-300', primaryText: 'text-amber-600',
    secondaryBg: 'bg-amber-50', accentBg: 'bg-amber-50',
    border: 'border-amber-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-amber-400', buttonHover: 'hover:bg-amber-100',
    inputBg: 'bg-white', helpBtn: 'bg-amber-200',
    bodyBg: 'bg-gradient-to-br from-amber-50 via-white to-amber-50',
  },
  Emerald: {
    id: 'vivid', name: 'Vivid — Emerald', type: 'light',
    primary: 'bg-emerald-300', primaryText: 'text-emerald-600',
    secondaryBg: 'bg-emerald-50', accentBg: 'bg-emerald-50',
    border: 'border-emerald-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-emerald-400', buttonHover: 'hover:bg-emerald-100',
    inputBg: 'bg-white', helpBtn: 'bg-emerald-200',
    bodyBg: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50',
  },
  Teal: {
    id: 'vivid', name: 'Vivid — Teal', type: 'light',
    primary: 'bg-teal-300', primaryText: 'text-teal-600',
    secondaryBg: 'bg-teal-50', accentBg: 'bg-teal-50',
    border: 'border-teal-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-teal-400', buttonHover: 'hover:bg-teal-100',
    inputBg: 'bg-white', helpBtn: 'bg-teal-200',
    bodyBg: 'bg-gradient-to-br from-teal-50 via-white to-teal-50',
  },
  Cyan: {
    id: 'vivid', name: 'Vivid — Cyan', type: 'light',
    primary: 'bg-cyan-300', primaryText: 'text-cyan-600',
    secondaryBg: 'bg-cyan-50', accentBg: 'bg-cyan-50',
    border: 'border-cyan-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-cyan-400', buttonHover: 'hover:bg-cyan-100',
    inputBg: 'bg-white', helpBtn: 'bg-cyan-200',
    bodyBg: 'bg-gradient-to-br from-cyan-50 via-white to-cyan-50',
  },
  Blue: {
    id: 'vivid', name: 'Vivid — Blue', type: 'light',
    primary: 'bg-blue-300', primaryText: 'text-blue-600',
    secondaryBg: 'bg-blue-50', accentBg: 'bg-blue-50',
    border: 'border-blue-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-blue-400', buttonHover: 'hover:bg-blue-100',
    inputBg: 'bg-white', helpBtn: 'bg-blue-200',
    bodyBg: 'bg-gradient-to-br from-blue-50 via-white to-blue-50',
  },
  Indigo: {
    id: 'vivid', name: 'Vivid — Indigo', type: 'light',
    primary: 'bg-indigo-300', primaryText: 'text-indigo-600',
    secondaryBg: 'bg-indigo-50', accentBg: 'bg-indigo-50',
    border: 'border-indigo-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-indigo-400', buttonHover: 'hover:bg-indigo-100',
    inputBg: 'bg-white', helpBtn: 'bg-indigo-200',
    bodyBg: 'bg-gradient-to-br from-indigo-50 via-white to-indigo-50',
  },
  Purple: {
    id: 'vivid', name: 'Vivid — Purple', type: 'light',
    primary: 'bg-purple-300', primaryText: 'text-purple-600',
    secondaryBg: 'bg-purple-50', accentBg: 'bg-purple-50',
    border: 'border-purple-200', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-purple-400', buttonHover: 'hover:bg-purple-100',
    inputBg: 'bg-white', helpBtn: 'bg-purple-200',
    bodyBg: 'bg-gradient-to-br from-purple-50 via-white to-purple-50',
  },
};

// Ordered list of vivid variant names (for the color picker UI)
export const VIVID_COLOR_NAMES = Object.keys(VIVID_VARIANTS);

// Default vivid theme is Rose
export const defaultVividTheme = VIVID_VARIANTS['Rose'];
