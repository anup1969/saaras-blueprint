import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

// POST /api/feedback/review — reviewer updates review_status + optional comment
export async function POST(req: NextRequest) {
  const { id, review_status, reviewer_comment } = await req.json();

  if (!id || !review_status) {
    return NextResponse.json({ error: 'id and review_status required' }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ error: 'No DB connection' }, { status: 500 });

  const updates: Record<string, unknown> = { review_status };
  if (reviewer_comment !== undefined) {
    updates.reviewer_comment = reviewer_comment;
  }

  const { error } = await supabase.from('feedback').update(updates).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
