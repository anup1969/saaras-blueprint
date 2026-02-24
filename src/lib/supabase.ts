import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (url && key) {
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// ─── Feedback ────────────────────────────────────────

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
  // Moderation fields
  moderation_status?: 'approved' | 'pending' | 'rejected' | 'modified';
  admin_notes?: string;
  moderated_by?: string | null;
  moderated_at?: string | null;
  original_remark?: string | null;
}

export async function submitFeedback(
  feedback: Omit<FeedbackItem, 'id' | 'created_at' | 'resolved_at' | 'status' | 'moderated_by' | 'moderated_at' | 'original_remark'>,
  isAdmin: boolean = false
) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        ...feedback,
        status: 'open',
        moderation_status: isAdmin ? 'approved' : 'pending',
      })
      .select()
      .single();
    if (error) {
      console.error('Supabase insert error:', error);
      // Fall through to localStorage
    } else {
      return data;
    }
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
  const supabase = getSupabase();
  if (supabase) {
    let query = supabase.from('feedback').select('*').order('created_at', { ascending: false });
    if (page) query = query.eq('page', page);
    // Non-admins only see approved/modified remarks
    if (!isAdmin) {
      query = query.in('moderation_status', ['approved', 'modified']);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Supabase fetch error:', error);
    } else {
      return data || [];
    }
  }
  const items: FeedbackItem[] = JSON.parse(localStorage.getItem('saaras-feedback') || '[]');
  const filtered = page ? items.filter(i => i.page === page) : items;
  if (!isAdmin) return filtered.filter(i => !i.moderation_status || i.moderation_status === 'approved' || i.moderation_status === 'modified');
  return filtered;
}

export async function updateFeedbackStatus(id: string, status: 'open' | 'in_progress' | 'resolved') {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from('feedback')
      .update({ status, resolved_at: status === 'resolved' ? new Date().toISOString() : null })
      .eq('id', id);
    if (error) console.error('Supabase update error:', error);
    return;
  }
  const items: FeedbackItem[] = JSON.parse(localStorage.getItem('saaras-feedback') || '[]');
  const idx = items.findIndex(i => i.id === id);
  if (idx >= 0) {
    items[idx].status = status;
    if (status === 'resolved') items[idx].resolved_at = new Date().toISOString();
    localStorage.setItem('saaras-feedback', JSON.stringify(items));
  }
}

// ─── Moderation ──────────────────────────────────────

export async function getPendingFeedback(): Promise<FeedbackItem[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('moderation_status', 'pending')
    .order('created_at', { ascending: false });
  if (error) { console.error('Error fetching pending:', error); return []; }
  return data || [];
}

export async function getAllFeedbackForAdmin(): Promise<FeedbackItem[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('Error fetching all feedback:', error); return []; }
  return data || [];
}

export async function moderateFeedback(
  id: string,
  action: 'approved' | 'rejected' | 'modified',
  moderatedBy: string,
  adminNotes?: string,
  editedRemark?: string
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const updates: Record<string, unknown> = {
    moderation_status: action,
    moderated_by: moderatedBy,
    moderated_at: new Date().toISOString(),
    admin_notes: adminNotes || '',
  };

  // If modified, store original and replace remark
  if (action === 'modified' && editedRemark !== undefined) {
    // First get original remark
    const { data: existing } = await supabase.from('feedback').select('remark').eq('id', id).single();
    if (existing) {
      updates.original_remark = existing.remark;
      updates.remark = editedRemark;
    }
  }

  const { error } = await supabase.from('feedback').update(updates).eq('id', id);
  if (error) { console.error('Moderation error:', error); return false; }
  return true;
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
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('blueprint_users')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) { console.error('Error fetching users:', error); return []; }
  return data || [];
}

export async function createUser(user: Omit<BlueprintUser, 'id' | 'created_at'>): Promise<BlueprintUser | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('blueprint_users')
    .insert(user)
    .select()
    .single();
  if (error) { console.error('Error creating user:', error); return null; }
  return data;
}

export async function updateUser(userId: string, updates: Partial<Omit<BlueprintUser, 'id' | 'created_at'>>): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase
    .from('blueprint_users')
    .update(updates)
    .eq('user_id', userId);
  if (error) { console.error('Error updating user:', error); return false; }
  return true;
}

export async function deleteUser(userId: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase
    .from('blueprint_users')
    .delete()
    .eq('user_id', userId);
  if (error) { console.error('Error deleting user:', error); return false; }
  return true;
}
