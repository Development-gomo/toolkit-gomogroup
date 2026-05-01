import type { Metadata } from "next";
import "./globals.css";

/* eslint-disable @next/next/no-page-custom-font */

export const metadata: Metadata = {
  title: "Tools | GO MO Group",
  description: "The internal toolkit from GO MO Group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
