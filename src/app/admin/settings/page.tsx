'use client'

import { useState, useEffect, useCallback } from 'react'
import { getSupabaseClient, CompanyInfo, type Database } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Save, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function SettingsPage() {
  const [info, setInfo] = useState<Partial<CompanyInfo>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [tableMissing, setTableMissing] = useState(false)

  // Separate state for office hours to handle JSONB structure
  const [officeHours, setOfficeHours] = useState<NonNullable<CompanyInfo['office_hours']>>({
    monday_friday: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed'
  })

  const fetchInfo = useCallback(async () => {
    const supabase = getSupabaseClient()
    setIsLoading(true)
    const { data, error } = await supabase
      .from('company_info')
      .select('*')
      .limit(1)
      .single()

    const companyInfo = data as CompanyInfo | null

    if (error) {
      if (error.code === '42P01') {
        setTableMissing(true)
      } else if (error.code !== 'PGRST116') {
        console.error('Error fetching settings:', error)
      }
    } else if (companyInfo) {
      setInfo(companyInfo)
      if (companyInfo.office_hours) {
        setOfficeHours(companyInfo.office_hours)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  const handleSave = async () => {
    const supabase = getSupabaseClient()
    setIsSaving(true)
    
    const updates: Database['public']['Tables']['company_info']['Update'] = {
      ...info,
      office_hours: officeHours,
      updated_at: new Date().toISOString()
    }

    let result
    if (info.id) {
       result = await supabase
        .from('company_info')
        .update(updates)
        .eq('id', info.id)
    } else {
       const insertData: Database['public']['Tables']['company_info']['Insert'] = {
        ...updates,
        about_content: updates.about_content ?? ''
       }
       result = await supabase
        .from('company_info')
        .insert(insertData)
    }

    const { error } = result
    setIsSaving(false)

    if (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings: ' + error.message)
    } else {
      alert('Settings updated successfully')
      fetchInfo()
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-tech-neon-cyan" />
      </div>
    )
  }

  if (tableMissing) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-2">Database Update Required</h2>
        <p className="mb-4">Please run the latest migration script to add office_hours column to company_info table.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-300">Manage global site settings and contact details.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-tech-neon-cyan text-tech-deep-space hover:bg-tech-electric-blue">
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card className="bg-tech-midnight border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-tech-neon-cyan" />
              Contact Information
            </CardTitle>
            <CardDescription className="text-gray-400">Update your public contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-email" className="text-gray-300 flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Label>
                <Input 
                  id="contact-email" 
                  value={info.contact_email || ''}
                  onChange={(e) => setInfo({ ...info, contact_email: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="info@beecklenetwork.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-phone" className="text-gray-300 flex items-center">
                  <Phone className="mr-2 h-4 w-4" /> Phone
                </Label>
                <Input 
                  id="contact-phone" 
                  value={info.contact_phone || ''}
                  onChange={(e) => setInfo({ ...info, contact_phone: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address" className="text-gray-300">Address</Label>
              <Input 
                id="address" 
                value={info.address || ''}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                className="bg-white/5 border-white/20 text-white"
                placeholder="123 Tech Street, Digital City, DC 12345"
              />
            </div>
          </CardContent>
        </Card>

        {/* Office Hours */}
        <Card className="bg-tech-midnight border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-tech-holographic-purple" />
              Office Hours
            </CardTitle>
            <CardDescription className="text-gray-400">Set your business operating hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hours-weekday" className="text-gray-300">Monday - Friday</Label>
                <Input 
                  id="hours-weekday" 
                  value={officeHours.monday_friday}
                  onChange={(e) => setOfficeHours({ ...officeHours, monday_friday: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="9:00 AM - 6:00 PM"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hours-saturday" className="text-gray-300">Saturday</Label>
                <Input 
                  id="hours-saturday" 
                  value={officeHours.saturday}
                  onChange={(e) => setOfficeHours({ ...officeHours, saturday: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="10:00 AM - 4:00 PM"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hours-sunday" className="text-gray-300">Sunday</Label>
                <Input 
                  id="hours-sunday" 
                  value={officeHours.sunday}
                  onChange={(e) => setOfficeHours({ ...officeHours, sunday: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Closed"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* General Info (Read-only reference) */}
        <Card className="bg-tech-midnight border-white/10 opacity-75">
          <CardHeader>
            <CardTitle className="text-white">General Information</CardTitle>
            <CardDescription className="text-gray-400">Company name and tagline are managed in the About section.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label className="text-gray-300">Company Name</Label>
              <div className="p-2 rounded bg-white/5 text-gray-400 border border-white/10">
                {info.company_name || 'Beeckle Network'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
