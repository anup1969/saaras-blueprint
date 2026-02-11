import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (url && key) {
    _supabase = createClient(url, key);
  }
  return _supabase;
}

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
}

export async function submitFeedback(feedback: Omit<FeedbackItem, 'id' | 'created_at' | 'resolved_at' | 'status'>) {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from('feedback')
      .insert({ ...feedback, status: 'open' })
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
  const item = { ...feedback, id: crypto.randomUUID(), status: 'open' as const, created_at: new Date().toISOString(), resolved_at: null };
  items.push(item);
  localStorage.setItem('saaras-feedback', JSON.stringify(items));
  return item;
}

export async function getFeedback(page?: string): Promise<FeedbackItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    let query = supabase.from('feedback').select('*').order('created_at', { ascending: false });
    if (page) query = query.eq('page', page);
    const { data, error } = await query;
    if (error) {
      console.error('Supabase fetch error:', error);
    } else {
      return data || [];
    }
  }
  const items: FeedbackItem[] = JSON.parse(localStorage.getItem('saaras-feedback') || '[]');
  return page ? items.filter(i => i.page === page) : items;
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
