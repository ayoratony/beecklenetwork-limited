# Vercel Deployment Configuration

## Environment Variables Required

Add these environment variables in your Vercel dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=https://beecklenetwork.com
REVALIDATION_SECRET=your_revalidation_secret_key
```

## Deployment Steps

1. **Connect to GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `beeckle-website` folder

2. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Root Directory: `beeckle-website`
   - Output Directory: leave empty (default)
   - Install Command: `npm install --legacy-peer-deps`

3. **Add Environment Variables**
   - Add all required environment variables
   - Ensure `NEXT_PUBLIC_` prefix for client-side variables

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Access your live website

## Custom Domain Setup

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add `beecklenetwork.com`
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - Enable "Enforce HTTPS" in domain settings

## Performance Optimization

### Build Optimization
- Enable "Framework Presets" for Next.js
- Use "Automatic" for Node.js version
- Enable "Include Files" for static assets

### Caching Strategy
- Static assets: 1 year cache
- API responses: 5 minutes cache
- HTML pages: 1 hour cache

### CDN Configuration
- Vercel Edge Network automatically distributes content
- Enable "Edge Functions" for API routes
- Use "ISR" for static pages

## Monitoring

### Analytics
- Enable Vercel Analytics
- Set up custom events for conversions
- Monitor Core Web Vitals

### Error Tracking
- Integrate with Sentry or similar service
- Set up error alerts
- Monitor API response times

## Backup Strategy

### Database Backups
- Enable Supabase automated backups
- Set up daily backups
- Test restore procedures

### Code Backups
- Maintain Git repository on GitHub
- Use multiple branches for development
- Tag stable releases

## Security Checklist

- [ ] Environment variables properly configured
- [ ] Row Level Security enabled on Supabase
- [ ] API routes protected with authentication
- [ ] Content Security Policy configured
- [ ] Rate limiting implemented
- [ ] Input validation with Zod schemas
- [ ] Secure headers configured in next.config.ts

## Post-Deployment Testing

### Functionality Tests
- [ ] 3D hero section loads correctly
- [ ] Contact form submissions work
- [ ] Admin dashboard is accessible
- [ ] All pages load without errors
- [ ] Mobile responsiveness verified

### Performance Tests
- [ ] Lighthouse score > 90
- [ ] 3D animations run at 60fps
- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms

### Security Tests
- [ ] XSS protection working
- [ ] SQL injection prevention
- [ ] CSRF protection enabled
- [ ] Authentication working properly
