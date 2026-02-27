import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

// GET /api/feedback?page=xxx&isAdmin=true
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || undefined;
  const isAdmin = req.nextUrl.searchParams.get('isAdmin') === 'true';
  const pendingOnly = req.nextUrl.searchParams.get('pending') === 'true';
  const submittedBy = req.nextUrl.searchParams.get('submittedBy');

  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json([]);

  // Exclude screenshot_base64 from list queries to save bandwidth (~25-40KB per row)
  const columns = 'id,page,element_label,element_selector,feedback_type,remark,submitted_by,priority,status,created_at,resolved_at,moderation_status,admin_notes,moderated_by,moderated_at,original_remark,click_x,click_y,viewport_width,viewport_height';
  let query = supabase.from('feedback').select(columns).order('created_at', { ascending: false });
  if (pendingOnly) {
    query = query.eq('moderation_status', 'pending');
  } else if (submittedBy) {
    query = query.eq('submitted_by', submittedBy);
  } else {
    if (page) query = query.eq('page', page);
    if (!isAdmin) query = query.in('moderation_status', ['approved', 'modified']);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json([]);
  return NextResponse.json(data || []);
}

// POST /api/feedback — submit feedback
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { isAdmin, ...feedback } = body;

  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ error: 'No DB connection' }, { status: 500 });

  const { data, error } = await supabase
    .from('feedback')
    .insert({ ...feedback, status: 'open', moderation_status: isAdmin ? 'approved' : 'pending' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
