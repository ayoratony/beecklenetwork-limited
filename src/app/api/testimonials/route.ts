import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '10'
    const approved = searchParams.get('approved')
    
    let query = supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (approved === 'true') {
      query = query.eq('approved', true)
    }
    
    if (limit) {
      query = query.limit(parseInt(limit))
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch testimonials' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ data }, { status: 200 })
    
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
