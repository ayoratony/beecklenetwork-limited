import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side client (for use in components)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          icon_url: string | null
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          icon_url?: string | null
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          icon_url?: string | null
          category?: string
          created_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          client: string
          completion_date: string
          website_url: string | null
          images: string[]
          tags: string[]
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          client: string
          completion_date: string
          website_url?: string | null
          images: string[]
          tags: string[]
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          client?: string
          completion_date?: string
          website_url?: string | null
          images?: string[]
          tags?: string[]
          featured?: boolean
          created_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          author_id: string
          published: boolean
          published_at: string | null
          cover_image: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          author_id: string
          published?: boolean
          published_at?: string | null
          cover_image?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          author_id?: string
          published?: boolean
          published_at?: string | null
          cover_image?: string | null
          created_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          company: string
          content: string
          rating: number
          approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          company: string
          content: string
          rating: number
          approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          company?: string
          content?: string
          rating?: number
          approved?: boolean
          created_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          service_interest: string
          message: string
          status: 'New' | 'Contacted' | 'Closed'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          service_interest: string
          message: string
          status?: 'New' | 'Contacted' | 'Closed'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          service_interest?: string
          message?: string
          status?: 'New' | 'Contacted' | 'Closed'
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      company_info: {
        Row: {
          id: string
          company_name: string
          tagline: string | null
          about_title: string
          about_content: string
          mission_title: string | null
          mission_content: string | null
          vision_title: string | null
          vision_content: string | null
          values: string[] | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          social_links: Record<string, string> | null
          office_hours: {
            monday_friday: string
            saturday: string
            sunday: string
          } | null
          updated_at: string
        }
        Insert: {
          id?: string
          company_name?: string
          tagline?: string | null
          about_title?: string
          about_content: string
          mission_title?: string | null
          mission_content?: string | null
          vision_title?: string | null
          vision_content?: string | null
          values?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          social_links?: Record<string, string> | null
          office_hours?: {
            monday_friday: string
            saturday: string
            sunday: string
          } | null
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          tagline?: string | null
          about_title?: string
          about_content?: string
          mission_title?: string | null
          mission_content?: string | null
          vision_title?: string | null
          vision_content?: string | null
          values?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          social_links?: Record<string, string> | null
          office_hours?: {
            monday_friday: string
            saturday: string
            sunday: string
          } | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables = Database['public']['Tables']
export type Service = Tables['services']['Row']
export type Project = Tables['projects']['Row']
export type BlogPost = Tables['blog_posts']['Row']
export type Testimonial = Tables['testimonials']['Row']
export type Lead = Tables['leads']['Row']
export type CompanyInfo = Tables['company_info']['Row']
