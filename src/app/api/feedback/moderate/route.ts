import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

// POST /api/feedback/moderate — approve/reject/modify a remark
export async function POST(req: NextRequest) {
  const { id, action, moderatedBy, adminNotes, editedRemark } = await req.json();

  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ error: 'No DB connection' }, { status: 500 });

  const updates: Record<string, unknown> = {
    moderation_status: action,
    moderated_by: moderatedBy,
    moderated_at: new Date().toISOString(),
    admin_notes: adminNotes || '',
  };

  if (action === 'modified' && editedRemark !== undefined) {
    const { data: existing } = await supabase.from('feedback').select('remark').eq('id', id).single();
    if (existing) {
      updates.original_remark = existing.remark;
      updates.remark = editedRemark;
    }
  }

  const { error } = await supabase.from('feedback').update(updates).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

// PUT /api/feedback/moderate — update feedback status (open/in_progress/resolved)
export async function PUT(req: NextRequest) {
  const { id, status } = await req.json();
  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ error: 'No DB connection' }, { status: 500 });
  const { error } = await supabase
    .from('feedback')
    .update({ status, resolved_at: status === 'resolved' ? new Date().toISOString() : null })
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
