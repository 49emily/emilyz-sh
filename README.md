# Emily Zhang Portfolio

A Next.js portfolio website showcasing code, art, and creative work.

## Getting Started

### Installation

First, install the dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Font Awesome
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## Project Structure

```
├── app/                    # Next.js App Router directory
│   ├── components/        # Reusable React components
│   ├── data/             # Project data and configuration
│   ├── providers/        # Context providers (Theme, etc.)
│   ├── work/             # Dynamic work project pages
│   ├── layout.jsx        # Root layout component
│   ├── template.jsx      # Page template with navigation
│   └── globals.css       # Global styles
├── public/               # Static assets (images, fonts, etc.)
├── next.config.js        # Next.js configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Features

- 🎨 Beautiful UI with glassmorphism effects
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- ⚡ Optimized performance with Next.js
- 🎭 Smooth animations with Framer Motion
- 🖼️ Portfolio showcase with project details
- 📍 Geolocation-based distance calculator

## Development Notes

- The app uses Next.js App Router for routing
- Images are optimized with Next.js Image component
- Fonts are self-hosted for better performance
- Theme is managed with React Context
- Background uses animated GIFs with theme support

## License

© 2025 Emily Zhang. All rights reserved.
