import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme/themeProvider";
import AuthProvider from "@/components/auth/authProvider"
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
  title: "X-System",
  description: "X-System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider defaultTheme="system">
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
