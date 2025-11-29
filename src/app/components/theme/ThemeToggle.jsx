'use client';

import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const t = useTranslations('theme');

  return (
    <Tooltip title={mode === 'light' ? t('switchToDark') : t('switchToLight')}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}

