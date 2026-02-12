# Deployment Guide

This guide provides instructions for deploying the Mobile Tire Service PWA application.

## Quick Start

The application is built and ready to deploy. All code is production-ready with:
- ✅ Database schema created and secured with RLS
- ✅ Responsive design for all devices
- ✅ PWA configuration for mobile installation
- ✅ Multilingual support (Russian/English)
- ✅ GPS location detection
- ✅ Map integration

## Environment Setup

Your Supabase database is already configured. The environment variables are set in the `.env` file:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Database

The database has been initialized with:

### Tables
1. **service_requests**: Stores customer service requests
2. **location_points**: Stores GPS location data

### Security
- Row Level Security (RLS) enabled on all tables
- Public policies for service requests (customer-facing application)
- Secure access through Supabase authentication

## Build Output

The production build is located in the `dist/` directory with:
- Optimized and minified JavaScript
- CSS extracted and optimized
- Service worker for PWA functionality
- Manifest file for app installation

## Deployment Options

### Option 1: Netlify (Recommended)

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

3. Configure environment variables in Netlify dashboard:
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Set environment variables:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

### Option 3: Static Hosting

The `dist/` folder can be deployed to any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps

Simply upload the contents of the `dist/` folder to your hosting provider.

## Post-Deployment Configuration

### 1. Update Contact Information

Update the phone number and email in:
- `src/components/Hero.tsx` (line ~21: `tel:+74951234567`)
- `src/components/Contact.tsx` (lines ~29, ~40)

Then rebuild and redeploy.

### 2. Configure Domain

For PWA functionality to work properly:
- Use HTTPS (required for geolocation API)
- Configure custom domain if desired
- Update manifest.json with your domain

### 3. Test PWA Installation

After deployment:
1. Open the site on a mobile device
2. Look for "Add to Home Screen" prompt
3. Install and test the app
4. Verify geolocation permissions work

### 4. Configure Google Maps (Optional)

Currently using Google Maps embed without an API key (basic functionality).

For enhanced features:
1. Get a Google Maps API key
2. Add to environment variables
3. Update map implementation in `src/components/OrderForm.tsx`

## Monitoring

Monitor your application through:
- **Supabase Dashboard**: View service requests and location data
- **Browser Analytics**: Track PWA installs and usage
- **Server Logs**: Monitor API calls and errors

## Database Queries

View service requests:
```sql
SELECT * FROM service_requests ORDER BY created_at DESC;
```

View location points:
```sql
SELECT * FROM location_points ORDER BY created_at DESC;
```

## Troubleshooting

### Geolocation not working
- Ensure the site is served over HTTPS
- Check browser permissions
- Test on different devices

### PWA not installing
- Verify manifest.json is accessible
- Check service worker registration
- Ensure HTTPS is enabled

### Database connection issues
- Verify environment variables are set
- Check Supabase project status
- Confirm RLS policies are correct

## Performance Optimization

The application is already optimized with:
- Code splitting
- Tree shaking
- Minification
- Compression
- Service worker caching

For additional optimization:
1. Configure CDN caching headers
2. Enable Brotli compression
3. Add image optimization
4. Monitor with Lighthouse

## Security Checklist

- ✅ HTTPS enabled
- ✅ Environment variables secured
- ✅ RLS policies implemented
- ✅ Input validation on forms
- ✅ No sensitive data in client code

## Support

For technical support:
- Review the README.md file
- Check the Supabase documentation
- Contact: info@tire-service.ru

## Updates

To update the application:
1. Make changes to source code
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Deploy the new `dist/` folder

## Backup

Regular database backups are handled by Supabase automatically. For additional safety:
- Export data regularly from Supabase dashboard
- Keep backups of environment variables
- Version control all code changes
