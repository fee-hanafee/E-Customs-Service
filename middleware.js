import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // รองรับภาษา
  locales,
  
  // ภาษาเริ่มต้น
  defaultLocale,
  
  // ไม่ใช้ locale prefix ใน URL
  localePrefix: 'never',
  
  // ใช้ cookie เพื่อเก็บ locale
  localeDetection: true
});

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // ถ้า pathname เริ่มต้นด้วย locale prefix (เช่น /th, /en) ให้ redirect ไปที่ path ที่ไม่มี prefix
  for (const locale of locales) {
    // ตรวจสอบว่า pathname เริ่มต้นด้วย /{locale} และตามด้วย / หรือตัวอักษรอื่น
    const localePattern = new RegExp(`^/${locale}(/|$|[^a-z])`);
    if (localePattern.test(pathname)) {
      // ลบ locale prefix ออก
      const newPath = pathname.replace(`/${locale}`, '') || '/';
      const url = request.nextUrl.clone();
      url.pathname = newPath;
      // ตั้งค่า cookie สำหรับ locale
      const response = NextResponse.redirect(url);
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax'
      });
      return response;
    }
  }
  
  const response = intlMiddleware(request);
  
  // ตั้งค่า cookie สำหรับ locale
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 
                 request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 
                 defaultLocale;
  
  if (locale && locales.includes(locale)) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax'
    });
  }
  
  return response;
}

export const config = {
  // Match all pathnames except for
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

