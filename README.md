# Beeckle Network - Technology Solutions Website

A comprehensive corporate website for Beeckle Network showcasing technology services with a futuristic dark blue theme, 3D animations, and full CRM backend.

## Features

### Frontend
- **3D Interactive Homepage**: Three.js powered hero section with rotating tech sphere and network nodes
- **Dark Blue Tech Theme**: Custom color palette with neon cyan accents and glassmorphism effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Performance**: Lazy loading, 60fps animations, and optimized assets

### Services Showcase
- Website Development
- Mobile App Development (iOS/Android)
- CCTV & Security Systems
- Biometrics & Access Control
- Alarm Systems
- Network Design (BGP, OSPF, VRF, MPLS)
- System Automation (n8n, Zoho, AI)
- Cloud Integration

### Backend CRM System
- **Lead Management**: Contact form submissions with status tracking
- **Portfolio Management**: Project showcase with categories and filtering
- **Blog System**: Content management with markdown support
- **Testimonials**: Client reviews with approval workflow
- **Admin Dashboard**: Complete content management interface

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **3D Graphics**: Three.js, React Three Fiber
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beeckle-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Run the SQL schema from `supabase_schema.sql`
   - Enable Row Level Security (RLS) on all tables

5. **Development Server**
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
beeckle-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── portfolio/         # Portfolio pages
│   │   ├── blog/              # Blog pages
│   │   ├── contact/           # Contact page
│   │   ├── testimonials/      # Testimonials page
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Hero3D.tsx        # 3D hero section
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── Footer.tsx        # Footer component
│   ├── lib/                  # Utilities and configurations
│   │   ├── supabase.ts       # Supabase client
│   │   └── utils.ts          # Utility functions
│   └── app/
│       └── globals.css        # Global styles and theme
├── public/                    # Static assets
├── supabase_schema.sql       # Database schema
└── implementation.md         # Implementation guide
```

## Color Palette

- **Deep Space**: `#02040F` (Main background)
- **Midnight Blue**: `#0F172A` (Card backgrounds)
- **Neon Cyan**: `#00F3FF` (Primary accents)
- **Electric Blue**: `#2563EB` (Secondary elements)
- **Holographic Purple**: `#7C3AED` (Gradients)

## API Endpoints

### Public APIs
- `GET /api/services` - Fetch services
- `GET /api/projects` - Fetch portfolio projects
- `GET /api/blog` - Fetch blog posts
- `GET /api/testimonials` - Fetch testimonials
- `POST /api/contact` - Submit contact form

### Admin APIs (Protected)
- `PUT /api/admin/leads/:id` - Update lead status
- `POST /api/admin/services` - Create service
- `POST /api/admin/projects` - Create project
- `POST /api/admin/blog` - Create blog post

## Deployment

1. **Vercel Setup**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push to main branch

2. **Custom Domain**
   - Configure DNS settings
   - Set up SSL certificates
   - Configure redirects if needed

## Performance Optimization

- **3D Graphics**: Lazy loading, geometry instancing, texture compression
- **Images**: Next.js Image optimization, WebP format
- **Fonts**: Google Fonts with display swap
- **Bundle**: Code splitting, tree shaking
- **Caching**: ISR (Incremental Static Regeneration)

## Security Features

- **Row Level Security**: Supabase RLS on all tables
- **Input Validation**: Zod schemas for all API inputs
- **Rate Limiting**: API route protection
- **Content Security Policy**: Secure headers configuration
- **Authentication**: Supabase Auth for admin access

## Admin Dashboard

Access the admin dashboard at `/admin` (authentication required):
- Lead management with status tracking
- Content management for services, projects, blog
- Analytics and reporting
- User management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email info@beecklenetwork.com or visit our website.