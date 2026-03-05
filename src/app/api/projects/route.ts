import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '10'
    const featured = searchParams.get('featured')
    
    let query = supabase
      .from('projects')
      .select('*')
      .order('completion_date', { ascending: false })
    
    if (featured === 'true') {
      // For now, we'll just limit the results since we don't have a featured field
      query = query.limit(4)
    } else if (limit) {
      query = query.limit(parseInt(limit))
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ data }, { status: 200 })
    
  } catch (error) {
    console.error('Projects fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}