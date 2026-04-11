import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ToastContainer } from 'react-toastify';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});


export const metadata: Metadata = {
  title: "Foodhub",
  description: "foodhub website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
    suppressHydrationWarning
    data-scroll-behavior="smooth"
    lang="en"
    className={`font-${inter} font-${mono} font-sans h-full antialiased `}>
      <body
        className={`w-full overflow-x-hidden min-h-screen font-sans antialiased bg-background`}
      >
            {children}
        <Toaster />
        <ToastContainer autoClose={1000} theme="dark" />
      </body>
    </html>
  );
}
