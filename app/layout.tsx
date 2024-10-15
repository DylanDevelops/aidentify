import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
        url: "/Logo.svg",
        href: "/Logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/Logo.svg",
        href: "/Logo.svg",
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
