import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import ProgressBar from "@/app/_components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- 1. Update your Metadata here ---
export const metadata: Metadata = {
  title: "NextCourse - AI Course Generator",
  description: "Generate personalized learning paths with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider 
      appearance={{
        layout: {
          logoImageUrl: '/logo.svg', 
        },
        variables: {
          colorPrimary: '#4f46e5', 
        } 
      }}
    >

        <GoogleOneTap/>
        <ProgressBar />
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}