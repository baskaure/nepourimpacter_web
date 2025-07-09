# Summit Entrepreneur 2025 - Event Website

A complete event management website with Stripe payment integration, built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### 🎫 Event Management
- 4 different ticket tiers (Standard, Premium, VIP, Enterprise)
- Real-time seat availability tracking
- Dynamic pricing with original price display
- Live dashboard with sales metrics

### 💳 Payment Integration
- Stripe checkout integration
- Subscription management (€5.00/month for "tyest" product)
- Secure payment processing via Supabase Edge Functions
- Success/cancel page handling

### 🔐 Authentication
- Supabase email/password authentication
- User session management
- Protected routes for premium features

### 📺 Live Streaming
- Private live stream access for Premium/VIP ticket holders
- Real-time viewer count
- Interactive chat functionality
- Exclusive content for paid members

### 📞 Contact System
- Contact form with email integration
- Multiple inquiry categories
- Professional contact information display

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file with:
```
VITE_SUPABASE_URL=https://olyswpmpvtyqwthxyfhq.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51LZHiEBAcftivNNI2F5luyAO0qF66srqAjXpKNwFfayyCMMb3Cgx1SysveBfj7KPpCQpov7G7i516Vn2sWh16H8O00TVu13anK
```

### 2. Supabase Setup
The database schema is already configured with:
- User authentication tables
- Stripe customer/subscription/order tables
- Row Level Security (RLS) policies
- Database views for user data

### 3. Stripe Configuration
- Test publishable key is already configured
- Edge functions handle secure server-side operations
- Webhook endpoint processes payment events
- Product configuration in `src/stripe-config.ts`

### 4. Edge Functions
Two Supabase Edge Functions are included:
- `stripe-checkout`: Creates secure checkout sessions
- `stripe-webhook`: Processes Stripe webhook events

## Usage

### For Users
1. **Browse Event**: View event details and ticket options
2. **Register**: Create account or login
3. **Purchase Tickets**: Select ticket tier and complete payment
4. **Access Live Stream**: Premium/VIP holders get exclusive access
5. **Manage Subscription**: View and manage recurring subscriptions

### For Administrators
- Real-time dashboard showing:
  - Total seats sold
  - Remaining availability
  - Revenue generated
  - Seat occupancy percentage

## Technical Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Payment**: Stripe Checkout + Webhooks
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Build Tool**: Vite

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Security Features

- Row Level Security (RLS) on all database tables
- JWT token authentication for API calls
- Webhook signature verification
- Secure environment variable handling
- Protected routes and components

## Payment Flow

1. User selects subscription/product
2. Secure checkout session created via Edge Function
3. User redirected to Stripe Checkout
4. Payment processed by Stripe
5. Webhook updates database with payment status
6. User redirected to success/cancel page
7. Subscription status updated in real-time

## Support

For technical support or questions about the event, use the contact form or reach out to the development team.