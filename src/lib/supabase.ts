import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Forms will not submit.')
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Types for our tables
export interface DJApplication {
  id?: string
  created_at?: string
  legal_name: string
  artist_alias: string
  primary_genres: string
  location: string
  social_handle?: string
  mix_link: string
  opening_track: string
  the_story: string
  inner_circle?: string
  can_bring_crowd: string
  status?: 'pending' | 'reviewed' | 'approved' | 'rejected'
}

export interface PartnershipInquiry {
  id?: string
  created_at?: string
  company_name: string
  partner_type: string
  website?: string
  contact_name: string
  email: string
  phone?: string
  message: string
  status?: 'pending' | 'contacted' | 'closed'
}

export interface EventRSVP {
  id?: string
  created_at?: string
  email: string
  event_id?: string
}

export interface NewsletterSignup {
  id?: string
  created_at?: string
  email: string
  role?: string
}

export interface ArtistCode {
  id?: string
  code: string
  artist_name: string
  event_id: string
  uses: number
  max_uses?: number
  active: boolean
}

// Submit functions
export async function submitDJApplication(data: DJApplication) {
  const { error } = await supabase
    .from('dj_applications')
    .insert([{
      legal_name: data.legal_name,
      artist_alias: data.artist_alias,
      primary_genres: data.primary_genres,
      location: data.location,
      social_handle: data.social_handle,
      mix_link: data.mix_link,
      opening_track: data.opening_track,
      the_story: data.the_story,
      inner_circle: data.inner_circle,
      can_bring_crowd: data.can_bring_crowd,
      status: 'pending'
    }])

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message || 'Failed to submit application')
  }
  return { success: true }
}

export async function submitPartnershipInquiry(data: PartnershipInquiry) {
  const { error } = await supabase
    .from('partnership_inquiries')
    .insert([{
      company_name: data.company_name,
      partner_type: data.partner_type,
      website: data.website,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      status: 'pending'
    }])

  if (error) throw error
  return { success: true }
}

export async function submitEventRSVP(email: string, eventId?: string) {
  const { error } = await supabase
    .from('event_rsvps')
    .insert([{ email, event_id: eventId }])

  if (error) throw error
  return { success: true }
}

export async function submitNewsletterSignup(email: string, role?: string) {
  const { error } = await supabase
    .from('newsletter_signups')
    .insert([{ email, role }])

  if (error) throw error
  return { success: true }
}

export async function validateArtistCode(code: string, eventId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('artist_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('event_id', eventId)
    .eq('active', true)
    .single()

  if (error || !data) return false

  // Check if max uses reached
  if (data.max_uses && data.uses >= data.max_uses) return false

  // Increment usage count
  await supabase
    .from('artist_codes')
    .update({ uses: data.uses + 1 })
    .eq('id', data.id)

  return true
}
