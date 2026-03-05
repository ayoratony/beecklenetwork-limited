import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { z } from 'zod'

// Admin authentication middleware
async function isAdmin(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.replace('Bearer ', '')
  
  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token)
    
    if (error || !data.user) {
      return false
    }
    
    // Additional admin role check could be implemented here
    return true
  } catch (error) {
    console.error('Admin auth error:', error)
    return false
  }
}

// Update lead status schema
const updateLeadSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Closed']),
  notes: z.string().optional()
})

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    // Check admin authentication
    const admin = await isAdmin(request)
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const validatedData = updateLeadSchema.parse(body)
    
    const { data, error } = await supabaseAdmin
      .from('leads')
      .update({
        status: validatedData.status,
        ...(validatedData.notes && { notes: validatedData.notes })
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ data }, { status: 200 })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Lead update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get lead details
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    // Check admin authentication
    const admin = await isAdmin(request)
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      )
    }
    
    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch lead' },
        { status: 500 }
      )
    }
    
    if (!data) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ data }, { status: 200 })
    
  } catch (error) {
    console.error('Lead fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
