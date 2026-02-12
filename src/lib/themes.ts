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
  {
    id: 'vivid', name: 'Vivid', type: 'light',
    primary: 'bg-pink-500', primaryText: 'text-pink-600',
    secondaryBg: 'bg-pink-50', accentBg: 'bg-fuchsia-50',
    border: 'border-pink-200', sidebarBg: 'bg-white',
    highlight: 'text-pink-950', cardBg: 'bg-white',
    iconColor: 'text-pink-400', buttonHover: 'hover:bg-pink-50',
    inputBg: 'bg-white', helpBtn: 'bg-pink-50 text-pink-600',
    bodyBg: 'bg-gradient-to-br from-pink-50 via-fuchsia-50 to-rose-50',
  },
];
