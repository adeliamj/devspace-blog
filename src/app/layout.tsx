import type { Metadata } from "next"; // Mengimpor tipe Metadata
import Head from 'next/head' // Mengimpor komponen Head dari Next.js untuk mengatur elemen <head> di halaman
import Header from "@components/Header" 
import Search from "@/components/Search"
import "@/styles/globals.css";


// Metadata untuk halaman
export const metadata: Metadata = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming",
  description: "The best info and news in development",
};

// Komponen layout utama yang membungkus seluruh halaman
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <Head>
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(', ') : metadata.keywords || ''} />
        <meta name="description" content={metadata.description || ''} />
        <title>{String(metadata.title) || 'Default Title'}</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <body className='container mx-auto my-7'>
        <Header />
        <Search />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
