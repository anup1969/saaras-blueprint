import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

// GET /api/users — list all users
export async function GET() {
  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json([]);
  const { data, error } = await supabase
    .from('blueprint_users')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return NextResponse.json([]);
  return NextResponse.json(data || []);
}

// POST /api/users — create user
export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ error: 'No DB connection' }, { status: 500 });
  const { data, error } = await supabase
    .from('blueprint_users')
    .insert(body)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// PUT /api/users — update user
export async function PUT(req: NextRequest) {
  const { user_id, ...updates } = await req.json();
  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ error: 'No DB connection' }, { status: 500 });
  const { error } = await supabase
    .from('blueprint_users')
    .update(updates)
    .eq('user_id', user_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

// DELETE /api/users — delete user
export async function DELETE(req: NextRequest) {
  const { user_id } = await req.json();
  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ error: 'No DB connection' }, { status: 500 });
  const { error } = await supabase
    .from('blueprint_users')
    .delete()
    .eq('user_id', user_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
