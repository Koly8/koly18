# Mobile Tire Service - PWA Application

A professional mobile tire service website and Progressive Web App (PWA) with real-time GPS location detection, multilingual support (Russian/English), and integrated map functionality.

## Features

- **Quick Service Request**: Large, easy-to-use CALL button for immediate contact
- **GPS Location Detection**: Automatic coordinate detection via browser geolocation API
- **Integrated Maps**: Google Maps integration for location visualization
- **Service Request Form**: Complete form with validation for booking services
- **Multilingual Support**: Full Russian and English translations
- **PWA Capabilities**: Installable on mobile devices, works offline
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Real-time Database**: Supabase integration for storing service requests

## Services Offered

- Tire Change
- Tire Repair
- Wheel Balance
- Seasonal Tire Change

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Maps**: Google Maps API

## Prerequisites

- Node.js 18+ and npm
- Supabase account (database is pre-configured)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - The `.env` file should already contain your Supabase credentials
   - If not, copy `.env.example` to `.env` and fill in your Supabase details

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Database Schema

The application uses two main tables:

### service_requests
Stores customer service requests with the following fields:
- Customer information (name, phone, address)
- Service type
- GPS coordinates (latitude, longitude, accuracy)
- Status (pending, confirmed, completed, cancelled)
- Additional notes
- Timestamps

### location_points
Stores GPS location data points:
- Coordinates (latitude, longitude)
- Accuracy
- Provider (gps, network)
- Speed and heading
- Timestamp

## PWA Installation

The application can be installed as a Progressive Web App:

1. **On Mobile (Android/iOS)**:
   - Open the website in a browser
   - Tap the "Add to Home Screen" option in the browser menu
   - The app will be installed and can be launched like a native app

2. **On Desktop (Chrome/Edge)**:
   - Look for the install icon in the address bar
   - Click to install the app
   - Access from your applications menu

## GPS Location Features

The application uses the browser's Geolocation API to:
- Detect user's current location with high accuracy
- Display coordinates in a user-friendly format
- Allow sending coordinates via SMS
- Show location on Google Maps
- Save location data to the database

### Location Permissions

Users will be prompted to allow location access. This is required for:
- Automatic coordinate detection
- Map integration
- Accurate service dispatch

## Multilingual Support

Switch between Russian and English using the language selector in the header. The language preference is saved locally and persists across sessions.

## Key Components

- **Header**: Navigation and language switcher
- **Hero**: Main call-to-action with CALL and COORDINATES buttons
- **Services**: Service list with pricing
- **OrderForm**: Service request form with map integration
- **Contact**: Contact information and footer

## Customization

### Update Phone Number
Change the phone number in these files:
- `src/components/Hero.tsx` (handleCall function)
- `src/components/Contact.tsx` (contact section)

### Update Service Prices
Modify prices in `src/i18n/translations.ts` under the `prices` section for both languages.

### Change Color Scheme
The application uses Tailwind CSS. Update colors in:
- Component files (className attributes)
- `tailwind.config.js` (extend theme colors)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All modern browsers with Geolocation API support.

## Security

- Row Level Security (RLS) enabled on all database tables
- Environment variables for sensitive data
- HTTPS required for geolocation features
- Input validation on all forms

## Performance

- Lazy loading of maps
- Optimized images and assets
- Service worker for caching
- Minimal bundle size

## License

All rights reserved.

## Support

For support, email info@tire-service.ru or call +7 (495) 123-45-67
