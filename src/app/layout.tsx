import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { authClient } from "@/lib/auth-client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { Providers } from "./AuthProvider";
import { InvoiceProvider } from "@/context/invoice-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budget Accounting System – Shiv Furniture",
  description: "Shive Furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <InvoiceProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased suppressHydrationWarning`}
          >
            <Providers>{children}</Providers>
          </body>
        </html>
    </InvoiceProvider >
    </ViewTransitions>
  );
}
