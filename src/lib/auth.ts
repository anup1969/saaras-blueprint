export interface TeamMember {
  id: string;
  name: string;
  role: string;
  password: string;
}

export const teamMembers: TeamMember[] = [
  { id: 'piush', name: 'Piush Thakker', role: 'PM / Founder', password: 'saaras2026' },
  { id: 'dhavalbhai', name: 'Dhavalbhai', role: 'Developer', password: 'dhaval2026' },
  { id: 'manishbhai', name: 'Manishbhai', role: 'Consultant', password: 'manish2026' },
  { id: 'farheen', name: 'Farheen', role: 'Consultant', password: 'farheen2026' },
  { id: 'kunjal', name: 'Kunjal', role: 'Consultant', password: 'kunjal2026' },
];

export function authenticate(userId: string, password: string): TeamMember | null {
  const member = teamMembers.find(m => m.id === userId && m.password === password);
  return member || null;
}

export function getLoggedInUser(): TeamMember | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('saaras-user');
  if (!stored) return null;
  try {
    return JSON.parse(stored) as TeamMember;
  } catch {
    return null;
  }
}

export function loginUser(member: TeamMember) {
  const { password, ...safe } = member;
  localStorage.setItem('saaras-user', JSON.stringify({ ...safe, password: '' }));
}

export function logoutUser() {
  localStorage.removeItem('saaras-user');
}
