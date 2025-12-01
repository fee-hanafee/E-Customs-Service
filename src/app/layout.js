import { Geist, Geist_Mono, Prompt } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ThemeProvider from "./components/theme/ThemeProvider";
import Sidebar from "./components/layout/Sidebar";
import ThemeRegistry from "./components/theme/ThemeRegistry";

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
        className={`${geistSans.variable} ${geistMono.variable} ${prompt.variable} antialiased`}
      >
        <ThemeRegistry options={{ key: 'mui' }}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              <div className="flex">
                <Sidebar />
                <main className="grow md:ml-[280px]">{children}</main>
              </div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
