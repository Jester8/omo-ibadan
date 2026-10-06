import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Omo Ibadan — live your life in Ibadan",
  description: "A real-life simulation of Ibadan with live voice chat. Play free in your browser.",
  applicationName: "Omo Ibadan",
  openGraph: { title: "Omo Ibadan", description: "Live the life. A real-life simulation of Ibadan, the city of rust roofs.", siteName: "Omo Ibadan", type: "website" },
  twitter: { card: "summary_large_image", title: "Omo Ibadan", description: "Live the life. A real-life simulation of Ibadan, the city of rust roofs." },
};

export const viewport: Viewport = { themeColor: "#1E1B3A" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
