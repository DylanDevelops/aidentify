import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AIdentify",
  description: "AIdentify teaches you about LLM misinformation while you are having fun!",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logos/Logo.svg",
        href: "/logos/Logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logos/Logo-darkmode.svg",
        href: "/logos/Logo-darkmode.svg",
      }
    ]
  },
  openGraph: {
    images: '/social-images/opengraph-image.png',
  },
  twitter: {
    images: '/social-images/opengraph-image.png',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#E2E2E2] dark:bg-[rgba(28,_15,_19,_0.75)]`}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            storageKey="aidentify-appearance_theme"
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
