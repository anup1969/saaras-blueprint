import { createClient } from '@supabase/supabase-js';

// These will be set via environment variables
// For now, feedback works in localStorage fallback mode
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
  if (supabase) {
    const { data, error } = await supabase
      .from('feedback')
      .insert({ ...feedback, status: 'open' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  // localStorage fallback
  const items = JSON.parse(localStorage.getItem('saaras-feedback') || '[]');
  const item = { ...feedback, id: crypto.randomUUID(), status: 'open' as const, created_at: new Date().toISOString(), resolved_at: null };
  items.push(item);
  localStorage.setItem('saaras-feedback', JSON.stringify(items));
  return item;
}

export async function getFeedback(page?: string): Promise<FeedbackItem[]> {
  if (supabase) {
    let query = supabase.from('feedback').select('*').order('created_at', { ascending: false });
    if (page) query = query.eq('page', page);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
  const items: FeedbackItem[] = JSON.parse(localStorage.getItem('saaras-feedback') || '[]');
  return page ? items.filter(i => i.page === page) : items;
}

export async function updateFeedbackStatus(id: string, status: 'open' | 'in_progress' | 'resolved') {
  if (supabase) {
    const { error } = await supabase
      .from('feedback')
      .update({ status, resolved_at: status === 'resolved' ? new Date().toISOString() : null })
      .eq('id', id);
    if (error) throw error;
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

// SQL to run in Supabase SQL Editor:
/*
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  element_label TEXT NOT NULL DEFAULT '',
  element_selector TEXT NOT NULL DEFAULT '',
  feedback_type TEXT NOT NULL DEFAULT 'comment',
  remark TEXT NOT NULL,
  submitted_by TEXT NOT NULL DEFAULT 'Anonymous',
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

CREATE INDEX idx_feedback_page ON feedback(page);
CREATE INDEX idx_feedback_status ON feedback(status);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON feedback FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON feedback FOR UPDATE USING (true);
*/
