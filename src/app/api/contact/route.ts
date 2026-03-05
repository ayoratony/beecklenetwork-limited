import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  service_interest: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the input data
    const validatedData = contactSchema.parse(body)
    
    // Insert the lead into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          service_interest: validatedData.service_interest,
          message: validatedData.message,
          status: 'New'
        }
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      )
    }
    
    // Here you could add email notifications, CRM integrations, etc.
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        data: {
          id: data.id,
          name: data.name,
          email: data.email
        }
      },
      { status: 201 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Only allow authenticated users to view leads
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      )
    }
    
    // Here you would validate the auth token
    // For now, we'll return a simple response
    
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '10'
    const offset = searchParams.get('offset') || '0'
    
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1)
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ data }, { status: 200 })
    
  } catch (error) {
    console.error('Leads fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}