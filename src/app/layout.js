// src/app/layout.js
import './globals.css';


import Header from '@/components/header';
import Footer from '@/components/footer';

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
        
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
