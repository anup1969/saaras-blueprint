import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const { userId, password } = await req.json();
  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ user: null });

  const { data, error } = await supabase
    .from('blueprint_users')
    .select('*')
    .eq('user_id', userId)
    .eq('password', password)
    .single();

  if (error || !data) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      id: data.user_id,
      name: data.name,
      role: data.role,
      allowed_dashboards: data.allowed_dashboards || [],
      is_admin: data.is_admin || false,
    }
  });
}
