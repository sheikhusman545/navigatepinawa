# Navigate Pinawa - Glamping Booking Platform

A comprehensive glamping accommodation booking and management platform built with Next.js, Prisma, and Supabase PostgreSQL. This full-stack application allows users to browse, explore, and book unique glamping experiences while providing administrators with a powerful dashboard to manage accommodations, amenities, categories, and bookings.

## 📖 About Navigate Pinawa

Navigate Pinawa is a premier glamping destination located across 65 acres right across from the Old Pinawa Provincial Park. We believe in the power of nature to bring people together, offering a place where families and friends can disconnect from their busy lives and reconnect with each other and the natural world.

### What We Offer

Navigate Pinawa provides unique, experimental accommodations that go beyond the limits of the ordinary while ensuring sustainability for a one-of-a-kind tourism experience in Manitoba. Our campground shares trails with Trans Canada Trails and Sno-man trail, offering guests direct access to some of the most beautiful natural landscapes in the region.

#### Accommodation Types

- **🏕️ Glamping Pods**: Fully equipped luxury pods with modern amenities including air conditioning, kitchenettes, private washrooms, and coffee machines. Each pod shares access to private hot tubs and wood-burning saunas.

- **⛺ Luxury Tents**: Spacious, fully furnished A-Frame tents featuring electricity, lights, fans, and access to shared hot tubs and wood-burning saunas. Perfect for families or couples seeking a nature-immersed yet comfortable experience.

- **🏡 Bunkies**: Cozy cabin-style accommodations with air conditioning, small fridges, microwaves, and hot plates. Like our luxury tents, bunkies share access to the main hot tub and sauna facilities.

#### Facilities & Amenities

- **🧖 Spa Experience**: Complete spa facilities including wood-burning hot tubs, saunas, and plunge pools
- **🚿 Modern Facilities**: Clean restrooms, kitchenettes, and showers
- **📶 High-Speed WiFi**: Free WiFi throughout the campground
- **🔥 Campfire Areas**: Designated campfire pits for evening gatherings
- **🥾 Hiking Trails**: Direct access to Trans Canada Trails and Sno-man trail
- **🐾 Pet-Friendly**: Welcome your furry companions (pet fee applies)
- **🍳 Cooking Facilities**: BBQ grills and kitchen facilities available

#### Activities & Experiences

There's never a dull moment at Navigate Pinawa! We offer a variety of activities including:
- Hiking and nature walks
- Fishing
- Swimming
- Campfire gatherings
- Movie nights
- Seasonal events and activities

### Our Mission

Navigate Pinawa is headed by the great adventurer and outdoor enthusiast Pranav Sahi, who has been providing unique experimental accommodations to guests for years. In collaboration with Cabin Life Rentals, we've conceived a vision to bring the concept of glamping accommodation that goes beyond limits of the ordinary while ensuring sustainability for one-of-a-kind tourism experiences in Manitoba.

### What This Software Provides

This booking platform enables Navigate Pinawa to:

- **📱 Online Booking System**: Allow customers to browse and book accommodations 24/7
- **💼 Business Management**: Comprehensive admin dashboard to manage all aspects of the business
- **📊 Inventory Management**: Track and manage multiple accommodation types, pricing, and availability
- **💰 Pricing Flexibility**: Set different rates for weekdays, weekends, and seasonal periods
- **📸 Visual Showcase**: Beautiful galleries and image management for each accommodation
- **✨ Amenities Tracking**: Manage and display all available amenities and facilities
- **📈 Business Insights**: Track bookings, revenue, and customer data
- **🎯 Marketing Tools**: Promotional pricing, discounts, and special offers management

## 🌟 Features

### Customer-Facing Features

- **🏕️ Beautiful Landing Page**: Stunning hero slider with multiple accommodation showcases
- **🔍 Accommodation Discovery**: Browse glamping pods, luxury tents, and bunkies with detailed information
- **📸 Image Galleries**: High-quality image galleries for each accommodation
- **💬 AI-Powered FAQ**: Interactive chatbot-style FAQ system with typing animations
- **📱 Fully Responsive**: Mobile-first design that works seamlessly on all devices
- **🎨 Modern UI/UX**: Smooth animations, transitions, and intuitive navigation
- **📋 Booking System**: Comprehensive booking interface with date selection and guest management

### Admin Dashboard Features

- **👥 User Management**: Complete user management system with roles and status tracking
- **📦 Product Management**: Full CRUD operations for glamping accommodations
  - Image upload (main image + gallery)
  - Pricing management (weekday/weekend rates)
  - Sale pricing with date exclusions
  - Maximum guest capacity
  - Dynamic amenities assignment
- **🏷️ Category Management**: Organize accommodations into categories
- **✨ Amenities Management**: Create and manage amenities with icons
- **📊 Orders Management**: Track and manage customer bookings
- **💰 Discounts System**: Create and manage promotional codes
- **📈 Insights Dashboard**: Analytics and overview of business metrics

### Technical Features

- **🗄️ Database Integration**: PostgreSQL database via Supabase with Prisma ORM
- **🖼️ Image Upload**: Multi-image upload system with preview
- **📅 Date Picker**: Calendar-based date selection for bookings and pricing
- **🔐 Secure API Routes**: Protected API endpoints with proper error handling
- **⚡ Server-Side Rendering**: Optimized performance with Next.js SSR
- **🎯 Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Image Upload**: Custom implementation with `react-dropzone`
- **Date Picker**: [react-datepicker](https://reactdatepicker.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- A Supabase account (free tier works)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd roomy
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database Connection (Supabase)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT].supabase.co:6543/postgres?pgbouncer=true"

# Direct Connection (for migrations)
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT].supabase.co:5432/postgres"
```

**Important**: 
- Replace `[YOUR-PASSWORD]` with your Supabase database password (URL-encoded: `@` → `%40`)
- Replace `[YOUR-PROJECT]` with your Supabase project reference
- Get these values from: Supabase Dashboard → Settings → Database → Connection Pooling

### 4. Set Up Database

Generate Prisma Client and push schema to database:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates all tables)
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
navigatepinawa/
├── app/
│   ├── api/                    # API routes
│   │   ├── amenities/          # Amenities CRUD
│   │   ├── categories/          # Categories CRUD
│   │   ├── products/            # Products CRUD
│   │   └── upload/              # Image upload endpoint
│   ├── accommodation/           # Accommodation detail pages
│   │   └── [slug]/              # Dynamic accommodation pages
│   ├── about/                   # About page
│   ├── book-now/                # Booking page
│   ├── dashboard/               # Admin dashboard
│   │   ├── amenities/           # Amenities management
│   │   ├── categories/          # Categories management
│   │   ├── products/            # Products management
│   │   ├── orders/              # Orders management
│   │   ├── users/               # Users management
│   │   └── discounts/           # Discounts management
│   ├── faq/                     # FAQ page with chatbot
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Site footer
│   ├── HeroSlider.tsx           # Hero section slider
│   ├── BookingForm.tsx          # Booking search form
│   ├── GallerySection.tsx       # Image gallery
│   ├── ExploreSection.tsx       # Accommodation cards
│   ├── ImageUpload.tsx          # Image upload component
│   └── ...                      # Other components
├── lib/
│   └── prisma.ts                # Prisma client instance
├── prisma/
│   └── schema.prisma            # Database schema
├── public/
│   ├── gallery/                 # Accommodation images
│   ├── uploads/                 # User uploaded images
│   └── logo.webp                # Site logo
└── scripts/
    └── test-db-connection.js   # Database connection test
```

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Customer and admin accounts
- **Category**: Accommodation categories (Glamping Pods, Luxury Tents, etc.)
- **Product**: Glamping accommodations with pricing, images, and details
- **Amenity**: Features available at accommodations (WiFi, Hot Tub, etc.)
- **ProductAmenity**: Many-to-many relationship between products and amenities
- **Order**: Customer bookings
- **OrderItem**: Individual items in an order
- **Discount**: Promotional codes and discounts
- **ProductImage**: Gallery images for accommodations

## 🔧 Configuration

### Tailwind Colors

Customize brand colors in `tailwind.config.js`:

```js
colors: {
  'navigatepinawa-blue': '#1e3a8a',
  'navigatepinawa-orange': '#f97316',
}
```

### Font Stack

The project uses system fonts defined in `app/globals.css`:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, "Noto Sans", sans-serif;
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply migrations

## 🚢 Deployment

### Vercel Deployment

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Import to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` and `DIRECT_URL` (same values as `.env`)
   - Enable for Production, Preview, and Development

4. **Deploy**:
   - Vercel will automatically deploy
   - After deployment, run `npx prisma db push` to create tables

### Database Setup on Vercel

After deployment, you can set up the database by:

**Option 1: Using Vercel CLI**
```bash
vercel env pull .env.local
npx prisma db push
```

**Option 2: Using Supabase Dashboard**
- Run migrations directly from your local machine (if accessible)
- Or use Supabase SQL Editor to create tables manually

## 🔐 Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Implement proper authentication for admin routes (recommended)
- Validate and sanitize all user inputs
- Use HTTPS in production

## 📚 Key Features Explained

### Image Upload System

The platform includes a robust image upload system:
- Main image for each accommodation
- Multiple gallery images
- Automatic file validation
- Preview before upload
- Stored in `public/uploads/`

### Pricing System

Flexible pricing management:
- Base weekday/weekend pricing
- Seasonal sale pricing
- Date exclusions for sales
- Weekday exclusions
- Month-based sale periods

### Amenities System

Dynamic amenities management:
- Icon-based display (emoji support)
- Assign multiple amenities to accommodations
- Search and filter capabilities
- Status management (Active/Inactive)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🆘 Support

For issues and questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the documentation
3. Check Supabase and Prisma documentation

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and UI inspiration from various sources

---

**Navigate Pinawa** - Check In To The Time Of Your Life 🏕️✨
