import type { Metadata } from "next";
import Header from "@components/Header"
import Search from "@/components/Search"
import "@/styles/globals.css";

// Metadata
export const metadata: Metadata = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming",
  description: "The best info and news in development",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
        <Search />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
