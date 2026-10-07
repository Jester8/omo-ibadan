import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PwaRegister from "@/components/PwaRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omo'badan: live your life in Ibadan",
  description: "A real-life simulation of Ibadan with live voice chat. Play free in your browser.",
  applicationName: "Omo'badan",
  appleWebApp: { capable: true, title: "Omo'badan", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  openGraph: { title: "Omo'badan", description: "Live the life. A real-life simulation of Ibadan, the city of brown roofs.", siteName: "Omo'badan", type: "website" },
  twitter: { card: "summary_large_image", title: "Omo'badan", description: "Live the life. A real-life simulation of Ibadan, the city of brown roofs." },
};

export const viewport: Viewport = { themeColor: "#1E1B3A", viewportFit: "cover", width: "device-width", initialScale: 1, maximumScale: 1, userScalable: false };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
