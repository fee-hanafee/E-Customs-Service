'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Tooltip, Box, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

const languages = [
  { code: 'th', label: 'ไทย' },
  { code: 'en', label: 'English' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const theme = useTheme();
  const t = useTranslations("language");
  const handleLanguageToggle = async () => {
    // หาภาษาถัดไป (สลับระหว่าง th และ en)
    const currentIndex = languages.findIndex((l) => l.code === locale);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLocale = languages[nextIndex].code;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    router.refresh();
  };

  return (
    <Tooltip title={locale === 'th' ? t("switchToTh") : t("switchToEn")}>
      <Box
        component="button"
        onClick={handleLanguageToggle}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 999,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.25,
          px: 0.75,
          py: 0.25,
          cursor: 'pointer',
          background: theme.palette.mode === 'dark'
            ? theme.palette.background.paper
            : theme.palette.background.default,
          boxShadow: theme.shadows[1],
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: theme.shadows[3],
            borderColor: theme.palette.primary.main,
            transform: 'scale(1.02)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        {/* EN - อยู่ซ้ายเสมอ */}
        <Box
          sx={{
            fontSize: 10,
            fontWeight: locale === 'en' ? 700 : 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            px: 0.75,
            py: 0.25,
            borderRadius: 999,
            backgroundColor: locale === 'en' ? theme.palette.primary.main : 'transparent',
            color: locale === 'en' ? '#ffffff' : theme.palette.text.secondary,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: locale === 'en' ? 'scale(1.05)' : 'scale(1)',
            '&:hover': {
              transform: locale === 'en' ? 'scale(1.05)' : 'scale(1.08)',
            },
          }}
        >
          EN
        </Box>
        {/* TH - อยู่ขวาเสมอ */}
        <Box
          sx={{
            fontSize: 10,
            fontWeight: locale === 'th' ? 700 : 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            px: 0.75,
            py: 0.25,
            borderRadius: 999,
            backgroundColor: locale === 'th' ? theme.palette.primary.main : 'transparent',
            color: locale === 'th' ? '#ffffff' : theme.palette.text.secondary,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: locale === 'th' ? 'scale(1.05)' : 'scale(1)',
            '&:hover': {
              transform: locale === 'th' ? 'scale(1.05)' : 'scale(1.08)',
            },
          }}
        >
          TH
        </Box>
      </Box>
    </Tooltip>
  );
}
