import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

// รองรับภาษาไทยและอังกฤษ
export const locales = ['th', 'en'];
export const defaultLocale = 'th';

export default getRequestConfig(async () => {
  // อ่าน locale จาก cookie หรือใช้ default
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || defaultLocale;
  
  // ตรวจสอบว่า locale ที่ได้เป็นภาษาที่รองรับหรือไม่
  const validLocale = locales.includes(locale) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});

