# navigatepinawa - Landing Page

A beautiful landing page replica of navigatepinawa.pk built with Next.js, React, and Tailwind CSS.

## Features

- 🏔️ Stunning mountain landscape hero section
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 📋 Interactive booking form
- 🎯 Promotional banners and floating action buttons

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
navigatepinawa/
├── app/
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main landing page
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── BookingForm.tsx   # Search/booking form
│   ├── PromotionalBanner.tsx  # Promo banner
│   ├── FloatingIcons.tsx # Side floating icons
│   └── SliderIndicator.tsx    # Bottom slider indicator
└── public/               # Static assets
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## Customization

You can customize the colors in `tailwind.config.js`:
- `navigatepinawa-blue`: Main brand blue color
- `navigatepinawa-orange`: Promotional orange color

## License

MIT

