import { Geist, Geist_Mono, Prompt } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ThemeProvider from "./components/theme/ThemeProvider";
import Sidebar from "./components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "E-Customs Service",
  description: "ระบบบริการศุลกากรอิเล็กทรอนิกส์",
};

export default async function RootLayout({ children }) {
  // โหลด messages สำหรับ locale ปัจจุบัน
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${prompt.variable} antialiased flex `}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Sidebar />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
