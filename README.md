# Certificate Generator Platform

A multi-tenant SaaS platform for generating and managing professional certificates.

## 🚀 Quick Start

### You're seeing this error?
```
❌ Server health check failed: Failed to fetch
⚠️  EDGE FUNCTION NOT RESPONDING
```

**Don't worry!** This is normal on first setup. Follow the deployment steps below.

---

## 📋 Deployment Steps

### Step 1: Deploy the Edge Function

The easiest way is using the Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project (get YOUR_PROJECT_ID from Supabase Dashboard)
supabase link --project-ref YOUR_PROJECT_ID

# Deploy the server function
supabase functions deploy server
```

### Step 2: Wait & Refresh

1. Wait **60 seconds** for the Edge Function to fully deploy and warm up
2. Refresh your browser
3. You should see: `✅ SERVER CONNECTION SUCCESSFUL`

---

## ✅ What's Included

### Core Features
- ✅ Multi-tenant SaaS architecture (every signup creates an organization)
- ✅ Role-based authentication (regular users + platform admin)
- ✅ Certificate generation with 10 beautiful default templates
- ✅ Custom template builder (premium feature)
- ✅ Real-time certificate previews
- ✅ Unique certificate URLs with encryption
- ✅ Email & social sharing
- ✅ Comprehensive analytics dashboard
- ✅ Testimonial collection system

### Templates
10 professionally designed default templates:
1. Modern Minimal
2. Classic Elegance
3. Bold Professional
4. Geometric Modern
5. Certificate of Excellence
6. Achievement Award
7. Professional Training
8. Academic Excellence
9. Corporate Achievement
10. Premium Elite

### Admin Features
- Platform admin dashboard (`admin@certplatform.com`)
- Organization management
- Template library management
- Billing overview
- Platform-wide analytics

### Billing (Optional)
- Paystack payment integration
- Freemium model (basic templates free, custom templates premium)
- Subscription management

---

## 🔧 Configuration

### Required Environment Variables
These are automatically set by Supabase:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`

### Optional Environment Variables
Set these in Supabase Dashboard → Edge Functions → Configuration:
- `PAYSTACK_SECRET_KEY` - Only needed for billing features

---

## 🎯 User Types

### Regular Users (Organizations)
- Every signup creates a new organization
- Organization name is required during registration
- Can create programs and generate certificates
- Access to free templates
- Upgrade to premium for custom templates

### Platform Admin
- Special email: `admin@certplatform.com`
- Access to platform admin dashboard
- View all organizations, templates, and billing
- Manage global template library

---

## 📱 Features by Tab

### Dashboard
- Overview statistics
- Program management
- Quick actions

### Results
- View all generated certificates
- Filter by program
- Download and share certificates

### Programs
- Create and manage programs
- Bulk certificate generation
- Program-specific analytics

### Templates
- Browse template library
- Preview templates
- Access template builder (premium)

### Settings
- Organization branding
- Logo upload
- Primary color customization
- Signatory management

### Analytics
- Certificate generation trends
- Program performance
- Engagement metrics
- Monthly data visualization

### Testimonials
- View student feedback
- Public testimonial display
- Rating system

### Billing
- Subscription plans
- Payment processing
- Payment history

---

## 🏗️ Architecture

```
Frontend (React + TypeScript)
    ↓
Edge Function (Hono Server)
    ↓
Supabase Storage (KV Store)
```

### Key Components
- **Authentication**: Supabase Auth
- **Database**: Supabase KV Store
- **File Storage**: Supabase Storage (for logos, signatures)
- **Payments**: Paystack API
- **Hosting**: Figma Make (or any static host)

---

## 🔍 Troubleshooting

### Edge Function Not Responding
1. Make sure you deployed the function: `supabase functions deploy server`
2. Wait 60 seconds for cold start
3. Check Edge Function logs in Supabase Dashboard
4. Verify environment variables are set

### Can't Sign Up
1. Make sure Edge Function is deployed and healthy
2. Check browser console for errors
3. Verify Supabase credentials are correct

### Billing Not Working
1. Billing requires `PAYSTACK_SECRET_KEY` to be set
2. You can use all other features without billing
3. Set the key in Supabase Dashboard → Edge Functions → Configuration

---

## 📚 Documentation

- `/DEPLOY_NOW.md` - Detailed deployment guide
- `/VISUAL_DEPLOY_GUIDE.md` - Visual step-by-step guide
- `/PLATFORM_ADMIN_SETUP.md` - Platform admin features
- `/GLOBAL_TEMPLATE_LIBRARY_IMPLEMENTATION.md` - Template system

---

## 🎨 Design System

- **Primary Color**: Orange (#ea580c)
- **Accent Colors**: Black and White
- **Typography**: Modern, clean, professional
- **Components**: Shadcn/ui with Tailwind CSS
- **Icons**: Lucide React

---

## 🚧 Roadmap

- [x] Multi-tenant architecture
- [x] 10 beautiful default templates
- [x] Platform admin panel
- [x] Billing integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] API for integrations
- [ ] Mobile app

---

## 📄 License

Proprietary - Certificate Generator Platform

---

## 🆘 Need Help?

1. Check the console logs in your browser
2. Visit `/health-check` route for diagnostics
3. Review deployment guides in `/DEPLOY_NOW.md`
4. Check Supabase Edge Function logs

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Supabase**
