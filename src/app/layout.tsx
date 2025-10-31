import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider, AuthProvider } from "@/components/providers";
import { Background } from "@/components/ui";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agora",
  description:
    "Agora is a modern platform that allows users to create discussion threads, interact through posts, and vote on content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white min-h-screen`}
      >
        <ReduxProvider>
          <AuthProvider>
            <div className="relative min-h-screen overflow-hidden">
              {/* Animated Cyber Grid Background */}
              <Background />

              {/* Content */}
              <div className="relative z-10">{children}</div>
            </div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
