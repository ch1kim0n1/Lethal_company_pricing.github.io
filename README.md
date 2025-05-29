# 🎮 Lethal Copy Calculator

**Transform real-world prices into Lethal Company game copies!**

Ever wondered how many copies of Lethal Company you could buy instead of that expensive gadget? This web application scrapes product prices from major retailers and converts them into the equivalent number of Lethal Company game copies ($10 each).

![Lethal Copy Calculator](https://img.shields.io/badge/Status-Active-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)

## 🚀 Live Demo

Visit the live application: [Lethal Copy Calculator](https://lethal-company-pricing.github.io)

## 📸 Screenshots

### Main Converter Interface

![Main Interface](https://via.placeholder.com/800x400/0B0B0B/39FF14?text=Lethal+Copy+Calculator+Interface)

### Price Conversion Results

![Results Display](https://via.placeholder.com/800x400/0B0B0B/DC2626?text=Product+Price+Conversion+Results)

## ✨ Features

- **Multi-Retailer Support**: Scrapes prices from Amazon, eBay, Walmart, Target, and Best Buy
- **Real-Time Price Extraction**: Uses advanced web scraping with multiple fallback selectors
- **Instant Conversion**: Automatically calculates equivalent Lethal Company copies
- **Interactive Mini-Game**: Fun money-running game included
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Fast Performance**: Built with Next.js 15 and optimized for speed
- **Retro Gaming UI**: Styled with a terminal/console aesthetic
- **Secure**: URL validation and sanitization for safe browsing

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
- **Web Scraping**: [Cheerio](https://cheerio.js.org/) with [Axios](https://axios-http.com/)
- **Deployment**: GitHub Pages / Vercel

## How It Works

1. **Input**: Paste any product URL from supported retailers
2. **Scraping**: The app extracts product name, price, and image using advanced selectors
3. **Conversion**: Price is divided by $10 (Lethal Company's price) and rounded up
4. **Display**: Results show original price, product info, and equivalent game copies

### Supported Retailers

- **Amazon** - Complete product data extraction
- **eBay** - Auction and Buy-It-Now listings
- **Target** - Full product catalog support
- **Walmart** - Online store items
- **Best Buy** - Electronics and tech products

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/lethal_company_pricing.github.io.git
   cd lethal_company_pricing.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main converter page + mini-game
│   ├── layout.tsx         # Root layout with metadata
│   ├── globals.css        # Global styles and animations
│   ├── about/             # About page
│   ├── how-it-works/      # Technical documentation
│   ├── examples/          # Usage examples
│   └── api/
│       └── scrape-price/  # Price scraping API endpoint
└── components/
    ├── Header.tsx         # Navigation and branding
    ├── PriceConverter.tsx # Main conversion interface
    └── ResultDisplay.tsx  # Results presentation
```

## API Endpoints

### POST `/api/scrape-price`

Extracts product data from retailer URLs.

**Request Body:**

```json
{
  "url": "https://www.amazon.com/product-url"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "name": "Product Name",
    "price": 29.99,
    "image": "https://image-url.jpg",
    "source": "Amazon"
  }
}
```

## Styling & Animations

- **Terminal Theme**: Retro green-on-black console styling
- **Smooth Transitions**: Framer Motion for page transitions
- **Interactive Elements**: Hover effects and micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Custom Animations**: GSAP for complex animations
