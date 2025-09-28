import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout/Layout";
import { CartProvider } from "@/contexts/CartContext";
import SlideOutCart from "@/components/cart/SlideOutCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CORNMAN Gourmet Corn - Malaysian Premium Corn Delivery",
  description: "Premium gourmet corn delivered fresh to your door. Handcrafted flavors across Malaysia with same-day delivery service.",
  keywords: ["CORNMAN", "gourmet corn", "Malaysian corn", "corn delivery", "premium corn", "fresh corn", "Kuala Lumpur", "Selangor", "Penang"],
  authors: [{ name: "CORNMAN Team" }],
  openGraph: {
    title: "CORNMAN Gourmet Corn - Malaysian Premium Corn Delivery",
    description: "Premium gourmet corn delivered fresh to your door. Handcrafted flavors across Malaysia.",
    url: "https://crnmn.wtf",
    siteName: "CORNMAN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CORNMAN Gourmet Corn",
    description: "Premium gourmet corn delivered fresh to your door.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <CartProvider>
          <Layout>
            {children}
          </Layout>
          <SlideOutCart />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
