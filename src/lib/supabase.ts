// ─── All Supabase operations go through /api routes ──
// Browser → Vercel API route → Supabase (server-side)
// This avoids ISP blocks on *.supabase.co

export interface FeedbackItem {
  id?: string;
  page: string;
  element_label: string;
  element_selector: string;
  feedback_type: 'remove' | 'move' | 'change' | 'add' | 'comment';
  remark: string;
  submitted_by: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  created_at?: string;
  resolved_at?: string | null;
  moderation_status?: 'approved' | 'pending' | 'rejected' | 'modified';
  admin_notes?: string;
  moderated_by?: string | null;
  moderated_at?: string | null;
  original_remark?: string | null;
  click_x?: number | null;
  click_y?: number | null;
  viewport_width?: number | null;
  viewport_height?: number | null;
  screenshot_base64?: string | null;
}

export async function submitFeedback(
  feedback: Omit<FeedbackItem, 'id' | 'created_at' | 'resolved_at' | 'status' | 'moderated_by' | 'moderated_at' | 'original_remark'>,
  isAdmin: boolean = false
) {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...feedback, isAdmin }),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Submit feedback error:', e);
  }
  // localStorage fallback
  const items = JSON.parse(localStorage.getItem('saaras-feedback') || '[]');
  const item = {
    ...feedback,
    id: crypto.randomUUID(),
    status: 'open' as const,
    moderation_status: isAdmin ? 'approved' as const : 'pending' as const,
    created_at: new Date().toISOString(),
    resolved_at: null,
  };
  items.push(item);
  localStorage.setItem('saaras-feedback', JSON.stringify(items));
  return item;
}

export async function getFeedback(page?: string, isAdmin: boolean = false): Promise<FeedbackItem[]> {
  try {
    const params = new URLSearchParams();
    if (page) params.set('page', page);
    if (isAdmin) params.set('isAdmin', 'true');
    const res = await fetch(`/api/feedback?${params}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Get feedback error:', e);
  }
  const items: FeedbackItem[] = JSON.parse(localStorage.getItem('saaras-feedback') || '[]');
  const filtered = page ? items.filter(i => i.page === page) : items;
  if (!isAdmin) return filtered.filter(i => !i.moderation_status || i.moderation_status === 'approved' || i.moderation_status === 'modified');
  return filtered;
}

export async function updateFeedbackStatus(id: string, status: 'open' | 'in_progress' | 'resolved') {
  try {
    await fetch('/api/feedback/moderate', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
  } catch (e) {
    console.error('Update feedback status error:', e);
  }
}

// ─── Moderation ──────────────────────────────────────

export async function getPendingFeedback(): Promise<FeedbackItem[]> {
  try {
    const res = await fetch('/api/feedback?pending=true');
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Get pending error:', e);
  }
  return [];
}

export async function getAllFeedbackForAdmin(): Promise<FeedbackItem[]> {
  try {
    const res = await fetch('/api/feedback?isAdmin=true');
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Get all feedback error:', e);
  }
  return [];
}

export async function moderateFeedback(
  id: string,
  action: 'approved' | 'rejected' | 'modified',
  moderatedBy: string,
  adminNotes?: string,
  editedRemark?: string
): Promise<boolean> {
  try {
    const res = await fetch('/api/feedback/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action, moderatedBy, adminNotes, editedRemark }),
    });
    return res.ok;
  } catch (e) {
    console.error('Moderation error:', e);
    return false;
  }
}

// ─── Single Feedback Detail (with screenshot) ────────

export async function getFeedbackDetail(id: string): Promise<FeedbackItem | null> {
  try {
    const res = await fetch(`/api/feedback/${id}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Get feedback detail error:', e);
  }
  return null;
}

// ─── User Management ─────────────────────────────────

export interface BlueprintUser {
  id: string;
  user_id: string;
  name: string;
  password: string;
  role: string;
  allowed_dashboards: string[];
  is_admin: boolean;
  created_at: string;
}

export async function getUsers(): Promise<BlueprintUser[]> {
  try {
    const res = await fetch('/api/users');
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Get users error:', e);
  }
  return [];
}

export async function createUser(user: Omit<BlueprintUser, 'id' | 'created_at'>): Promise<BlueprintUser | null> {
  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Create user error:', e);
  }
  return null;
}

export async function updateUser(userId: string, updates: Partial<Omit<BlueprintUser, 'id' | 'created_at'>>): Promise<boolean> {
  try {
    const res = await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, ...updates }),
    });
    return res.ok;
  } catch (e) {
    console.error('Update user error:', e);
    return false;
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    const res = await fetch('/api/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    });
    return res.ok;
  } catch (e) {
    console.error('Delete user error:', e);
    return false;
  }
}
