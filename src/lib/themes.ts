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

// 10 Vivid theme variants — soft, light pastel colors
export const VIVID_VARIANTS: Record<string, Theme> = {
  Rose: {
    id: 'vivid', name: 'Vivid — Rose', type: 'light',
    primary: 'bg-rose-200', primaryText: 'text-rose-500',
    secondaryBg: 'bg-rose-50', accentBg: 'bg-rose-50/50',
    border: 'border-rose-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-rose-300', buttonHover: 'hover:bg-rose-50',
    inputBg: 'bg-white', helpBtn: 'bg-rose-100 text-rose-500',
    bodyBg: 'bg-gradient-to-br from-rose-50 via-white to-rose-50',
  },
  Red: {
    id: 'vivid', name: 'Vivid — Red', type: 'light',
    primary: 'bg-red-200', primaryText: 'text-red-500',
    secondaryBg: 'bg-red-50', accentBg: 'bg-red-50/50',
    border: 'border-red-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-red-300', buttonHover: 'hover:bg-red-50',
    inputBg: 'bg-white', helpBtn: 'bg-red-100 text-red-500',
    bodyBg: 'bg-gradient-to-br from-red-50 via-white to-red-50',
  },
  Orange: {
    id: 'vivid', name: 'Vivid — Orange', type: 'light',
    primary: 'bg-orange-200', primaryText: 'text-orange-500',
    secondaryBg: 'bg-orange-50', accentBg: 'bg-orange-50/50',
    border: 'border-orange-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-orange-300', buttonHover: 'hover:bg-orange-50',
    inputBg: 'bg-white', helpBtn: 'bg-orange-100 text-orange-500',
    bodyBg: 'bg-gradient-to-br from-orange-50 via-white to-orange-50',
  },
  Amber: {
    id: 'vivid', name: 'Vivid — Amber', type: 'light',
    primary: 'bg-amber-200', primaryText: 'text-amber-500',
    secondaryBg: 'bg-amber-50', accentBg: 'bg-amber-50/50',
    border: 'border-amber-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-amber-300', buttonHover: 'hover:bg-amber-50',
    inputBg: 'bg-white', helpBtn: 'bg-amber-100 text-amber-500',
    bodyBg: 'bg-gradient-to-br from-amber-50 via-white to-amber-50',
  },
  Emerald: {
    id: 'vivid', name: 'Vivid — Emerald', type: 'light',
    primary: 'bg-emerald-200', primaryText: 'text-emerald-500',
    secondaryBg: 'bg-emerald-50', accentBg: 'bg-emerald-50/50',
    border: 'border-emerald-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-emerald-300', buttonHover: 'hover:bg-emerald-50',
    inputBg: 'bg-white', helpBtn: 'bg-emerald-100 text-emerald-500',
    bodyBg: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50',
  },
  Teal: {
    id: 'vivid', name: 'Vivid — Teal', type: 'light',
    primary: 'bg-teal-200', primaryText: 'text-teal-500',
    secondaryBg: 'bg-teal-50', accentBg: 'bg-teal-50/50',
    border: 'border-teal-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-teal-300', buttonHover: 'hover:bg-teal-50',
    inputBg: 'bg-white', helpBtn: 'bg-teal-100 text-teal-500',
    bodyBg: 'bg-gradient-to-br from-teal-50 via-white to-teal-50',
  },
  Cyan: {
    id: 'vivid', name: 'Vivid — Cyan', type: 'light',
    primary: 'bg-cyan-200', primaryText: 'text-cyan-500',
    secondaryBg: 'bg-cyan-50', accentBg: 'bg-cyan-50/50',
    border: 'border-cyan-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-cyan-300', buttonHover: 'hover:bg-cyan-50',
    inputBg: 'bg-white', helpBtn: 'bg-cyan-100 text-cyan-500',
    bodyBg: 'bg-gradient-to-br from-cyan-50 via-white to-cyan-50',
  },
  Blue: {
    id: 'vivid', name: 'Vivid — Blue', type: 'light',
    primary: 'bg-blue-200', primaryText: 'text-blue-500',
    secondaryBg: 'bg-blue-50', accentBg: 'bg-blue-50/50',
    border: 'border-blue-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-blue-300', buttonHover: 'hover:bg-blue-50',
    inputBg: 'bg-white', helpBtn: 'bg-blue-100 text-blue-500',
    bodyBg: 'bg-gradient-to-br from-blue-50 via-white to-blue-50',
  },
  Indigo: {
    id: 'vivid', name: 'Vivid — Indigo', type: 'light',
    primary: 'bg-indigo-200', primaryText: 'text-indigo-500',
    secondaryBg: 'bg-indigo-50', accentBg: 'bg-indigo-50/50',
    border: 'border-indigo-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-indigo-300', buttonHover: 'hover:bg-indigo-50',
    inputBg: 'bg-white', helpBtn: 'bg-indigo-100 text-indigo-500',
    bodyBg: 'bg-gradient-to-br from-indigo-50 via-white to-indigo-50',
  },
  Purple: {
    id: 'vivid', name: 'Vivid — Purple', type: 'light',
    primary: 'bg-purple-200', primaryText: 'text-purple-500',
    secondaryBg: 'bg-purple-50', accentBg: 'bg-purple-50/50',
    border: 'border-purple-100', sidebarBg: 'bg-white',
    highlight: 'text-slate-800', cardBg: 'bg-white',
    iconColor: 'text-purple-300', buttonHover: 'hover:bg-purple-50',
    inputBg: 'bg-white', helpBtn: 'bg-purple-100 text-purple-500',
    bodyBg: 'bg-gradient-to-br from-purple-50 via-white to-purple-50',
  },
};

// Ordered list of vivid variant names (for the color picker UI)
export const VIVID_COLOR_NAMES = Object.keys(VIVID_VARIANTS);

// Default vivid theme is Indigo (softer, user-preferred)
export const defaultVividTheme = VIVID_VARIANTS['Indigo'];
