// src/app/layout.js
import './globals.css';


import Header from '@/components/header';
import Footer from '@/components/footer';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Best Online Calculator Tool – Utility Hub",
  description: "Fast, free calculators for BMI, percentage, mortgage & more. Accurate results with zero ads clutter!",
  metadataBase: new URL("https://yourdomain.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourdomain.com" />
      </head>
      <body>
         {/* Google Analytics */}
         <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-B9J1V548WF"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B9J1V548WF');
          `}
        </Script>

        <Header></Header>
        {children}
        <Footer></Footer>
        <Analytics />
      </body>
    </html>
  );
}
