
-- Update Company Info Table with additional fields
ALTER TABLE company_info 
ADD COLUMN IF NOT EXISTS office_hours JSONB DEFAULT '{"monday_friday": "9:00 AM - 6:00 PM", "saturday": "10:00 AM - 4:00 PM", "sunday": "Closed"}';

-- Update existing data with new contact info
UPDATE company_info 
SET 
  contact_email = 'info@beecklenetwork.com',
  contact_phone = '+1 (555) 123-4567',
  address = '123 Tech Street, Digital City, DC 12345',
  office_hours = '{"monday_friday": "9:00 AM - 6:00 PM", "saturday": "10:00 AM - 4:00 PM", "sunday": "Closed"}'
WHERE company_name = 'Beeckle Network';
