import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  submitDJApplication,
  submitPartnershipInquiry,
  submitNewsletterSignup,
  submitEventRSVP,
  validateArtistCode,
  supabase
} from './supabase'

// Mock the Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: vi.fn(() => ({
      insert: vi.fn(),
      select: vi.fn(),
      update: vi.fn(),
      eq: vi.fn(),
      single: vi.fn(),
    })),
  }),
}))

describe('Supabase Submissions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('submitDJApplication', () => {
    it('should submit a DJ application successfully', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null })
      vi.spyOn(supabase, 'from').mockReturnValue({
        insert: mockInsert,
      } as any)

      const applicationData = {
        legal_name: 'John Doe',
        artist_alias: 'DJ Test',
        primary_genres: 'House, Techno',
        location: 'Washington DC',
        social_handle: '@djtest',
        mix_link: 'https://soundcloud.com/djtest',
        opening_track: 'Test Track - Test Artist',
        the_story: 'My DJ journey started...',
        inner_circle: 'Friend referred me',
        can_bring_crowd: 'Yes, 20+ people',
      }

      const result = await submitDJApplication(applicationData)

      expect(supabase.from).toHaveBeenCalledWith('dj_applications')
      expect(mockInsert).toHaveBeenCalledWith([
        expect.objectContaining({
          legal_name: 'John Doe',
          artist_alias: 'DJ Test',
          status: 'pending',
        }),
      ])
      expect(result).toEqual({ success: true })
    })

    it('should throw error on submission failure', async () => {
      const mockError = new Error('Database error')
      vi.spyOn(supabase, 'from').mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: mockError }),
      } as any)

      const applicationData = {
        legal_name: 'John Doe',
        artist_alias: 'DJ Test',
        primary_genres: 'House',
        location: 'DC',
        mix_link: 'https://example.com',
        opening_track: 'Track',
        the_story: 'Story',
        can_bring_crowd: 'Yes',
      }

      await expect(submitDJApplication(applicationData)).rejects.toThrow()
    })
  })

  describe('submitPartnershipInquiry', () => {
    it('should submit a partnership inquiry successfully', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null })
      vi.spyOn(supabase, 'from').mockReturnValue({
        insert: mockInsert,
      } as any)

      const inquiryData = {
        company_name: 'Test Venue',
        partner_type: 'venue',
        website: 'https://testvenue.com',
        contact_name: 'Jane Smith',
        email: 'jane@testvenue.com',
        phone: '+1234567890',
        message: 'Interested in hosting events',
      }

      const result = await submitPartnershipInquiry(inquiryData)

      expect(supabase.from).toHaveBeenCalledWith('partnership_inquiries')
      expect(mockInsert).toHaveBeenCalledWith([
        expect.objectContaining({
          company_name: 'Test Venue',
          partner_type: 'venue',
          status: 'pending',
        }),
      ])
      expect(result).toEqual({ success: true })
    })

    it('should throw error on submission failure', async () => {
      const mockError = new Error('Database error')
      vi.spyOn(supabase, 'from').mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: mockError }),
      } as any)

      const inquiryData = {
        company_name: 'Test',
        partner_type: 'venue',
        contact_name: 'Test',
        email: 'test@test.com',
        message: 'Test message',
      }

      await expect(submitPartnershipInquiry(inquiryData)).rejects.toThrow()
    })
  })

  describe('submitNewsletterSignup', () => {
    it('should submit a newsletter signup successfully', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null })
      vi.spyOn(supabase, 'from').mockReturnValue({
        insert: mockInsert,
      } as any)

      const result = await submitNewsletterSignup('test@example.com', 'dj')

      expect(supabase.from).toHaveBeenCalledWith('newsletter_signups')
      expect(mockInsert).toHaveBeenCalledWith([
        { email: 'test@example.com', role: 'dj' },
      ])
      expect(result).toEqual({ success: true })
    })

    it('should work without role parameter', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null })
      vi.spyOn(supabase, 'from').mockReturnValue({
        insert: mockInsert,
      } as any)

      const result = await submitNewsletterSignup('test@example.com')

      expect(mockInsert).toHaveBeenCalledWith([
        { email: 'test@example.com', role: undefined },
      ])
      expect(result).toEqual({ success: true })
    })
  })

  describe('submitEventRSVP', () => {
    it('should submit an event RSVP successfully', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null })
      vi.spyOn(supabase, 'from').mockReturnValue({
        insert: mockInsert,
      } as any)

      const result = await submitEventRSVP('test@example.com', 'event-123')

      expect(supabase.from).toHaveBeenCalledWith('event_rsvps')
      expect(mockInsert).toHaveBeenCalledWith([
        { email: 'test@example.com', event_id: 'event-123' },
      ])
      expect(result).toEqual({ success: true })
    })
  })

  describe('validateArtistCode', () => {
    it('should return true for valid artist code', async () => {
      const mockData = {
        id: '1',
        code: 'TESTCODE',
        artist_name: 'Test Artist',
        event_id: 'event-123',
        uses: 5,
        max_uses: 10,
        active: true,
      }

      const mockUpdate = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      })

      vi.spyOn(supabase, 'from').mockImplementation((table: string) => {
        if (table === 'artist_codes') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                  eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValue({ data: mockData, error: null }),
                  }),
                }),
              }),
            }),
            update: mockUpdate,
          } as any
        }
        return {} as any
      })

      const result = await validateArtistCode('TESTCODE', 'event-123')

      expect(result).toBe(true)
    })

    it('should return false for invalid artist code', async () => {
      vi.spyOn(supabase, 'from').mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: null, error: new Error('Not found') }),
              }),
            }),
          }),
        }),
      } as any)

      const result = await validateArtistCode('INVALIDCODE', 'event-123')

      expect(result).toBe(false)
    })

    it('should return false when max uses reached', async () => {
      const mockData = {
        id: '1',
        code: 'TESTCODE',
        uses: 10,
        max_uses: 10,
        active: true,
      }

      vi.spyOn(supabase, 'from').mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({ data: mockData, error: null }),
              }),
            }),
          }),
        }),
      } as any)

      const result = await validateArtistCode('TESTCODE', 'event-123')

      expect(result).toBe(false)
    })
  })
})
