import type { Metadata } from "next";
import Head from 'next/head'
import Header from "@components/Header"
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming",
  description: "The best info and news in development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(', ') : metadata.keywords || ''} />
        <meta name="description" content={metadata.description || ''} />
        <title>{String(metadata.title) || 'Default Title'}</title>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className='container mx-auto my-7'>
        <Header />
        {children}
      </body>
    </html>
  );
}
