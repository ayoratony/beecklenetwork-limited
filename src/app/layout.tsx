import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beeckle Network - Technology Solutions & Digital Transformation",
  description: "Transform your business with Beeckle Network's cutting-edge technology solutions including web development, mobile apps, security systems, network design, and cloud integration.",
  keywords: "web development, mobile apps, security systems, network design, cloud integration, technology solutions, digital transformation",
  authors: [{ name: "Beeckle Network" }],
  openGraph: {
    title: "Beeckle Network - Technology Solutions",
    description: "Transform your business with cutting-edge technology solutions",
    url: "https://beecklenetwork.com",
    siteName: "Beeckle Network",
    images: [
      {
        url: "https://beecklenetwork.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beeckle Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beeckle Network - Technology Solutions",
    description: "Transform your business with cutting-edge technology solutions",
    images: ["https://beecklenetwork.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-tech-deep-space text-white`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}