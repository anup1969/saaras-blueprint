export interface TeamMember {
  id: string;
  name: string;
  role: string;
  password: string;
  allowed_dashboards: string[];
  is_admin: boolean;
}

// Hardcoded fallback — always works even if DB is down
const FALLBACK_ADMIN: TeamMember = {
  id: 'piush',
  name: 'Piush Thakker',
  role: 'PM / Founder',
  password: 'saaras2026',
  allowed_dashboards: [],
  is_admin: true,
};

export async function authenticate(userId: string, password: string): Promise<TeamMember | null> {
  // Try API route (proxied through Vercel → Supabase)
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password }),
    });
    const { user } = await res.json();
    if (user) {
      return { ...user, password: '' };
    }
  } catch {
    // API error — fall through to hardcoded
  }

  // Hardcoded piush fallback
  if (userId === FALLBACK_ADMIN.id && password === FALLBACK_ADMIN.password) {
    return { ...FALLBACK_ADMIN, password: '' };
  }

  return null;
}

/**
 * Check if user can access a specific dashboard.
 * Admins with empty allowed_dashboards = ALL access.
 * Non-admins with empty allowed_dashboards = NO access (except home).
 */
export function canAccessDashboard(user: TeamMember | null, dashboardId: string): boolean {
  if (!user) return false;
  if (dashboardId === '/' || dashboardId === '') return true;
  if (user.is_admin) {
    if (user.allowed_dashboards.length === 0) return true;
    return user.allowed_dashboards.includes(dashboardId);
  }
  if (user.allowed_dashboards.length === 0) return false;
  return user.allowed_dashboards.includes(dashboardId);
}

export function getLoggedInUser(): TeamMember | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('saaras-user');
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    // Auto-clear stale sessions that lack the new auth fields
    if (!('is_admin' in parsed) || !('allowed_dashboards' in parsed)) {
      localStorage.removeItem('saaras-user');
      return null;
    }
    return {
      id: parsed.id || '',
      name: parsed.name || '',
      role: parsed.role || '',
      password: '',
      allowed_dashboards: parsed.allowed_dashboards || [],
      is_admin: parsed.is_admin ?? false,
    };
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
