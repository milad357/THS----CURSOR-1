# T.H.S. Tactical Home Solutions

A production-quality marketing site for T.H.S. – Tactical Home Solutions, built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components (Navbar, Footer, AgeGate, Disclaimer)
- `/app/globals.css` - Global styles with Tailwind CSS

## Features

- ✅ Age verification gate (21+) with localStorage persistence
- ✅ Responsive navigation with mobile hamburger menu
- ✅ Multi-page site with all required routes
- ✅ Dark, tactical-themed UI
- ✅ Contact form with email notifications to info@ths247.com
- ✅ Waiver form with email notifications and confirmation emails
- ✅ Legal disclaimer component
- ✅ Fully responsive design

## Email Setup

This project uses [Resend](https://resend.com) for email functionality. To enable email submissions:

1. Sign up for a free Resend account at https://resend.com
2. Get your API key from https://resend.com/api-keys
3. Add your API key as an environment variable:
   - **Local development**: Create a `.env.local` file with `RESEND_API_KEY=re_your_api_key_here`
   - **Netlify**: Add `RESEND_API_KEY` in your Netlify site settings under Environment Variables

Both the contact form and waiver form will send emails to **info@ths247.com** when submitted.

## Pages

- `/` - Home page with hero, value props, and featured services
- `/about` - Mission statement and company information
- `/services` - Detailed training services and pricing
- `/surveillance` - Security systems consultation page
- `/products` - Coming soon placeholder
- `/contact` - Contact form and information

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

