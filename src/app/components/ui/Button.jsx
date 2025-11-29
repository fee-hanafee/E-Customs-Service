'use client';

import { Button as MuiButton, useTheme } from '@mui/material';

export default function Button({ 
    children, 
    onClick, 
    variant = 'contained', 
    sx,
    ...props 
}) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <MuiButton 
            variant={variant} 
            onClick={onClick}
            sx={{
                fontSize: {
                    xs: '0.625rem',   // mobile
                    sm: '0.6875rem',  // tablet
                    md: '0.75rem',    // desktop
                    lg: '0.8125rem',  // large desktop
                },
                padding: {
                    xs: '4px 8px',    // mobile
                    sm: '5px 10px',   // tablet
                    md: '6px 12px',   // desktop
                    lg: '7px 14px',   // large desktop
                },
                minWidth: {
                    xs: '48px',
                    sm: '56px',
                    md: '64px',
                },
                // Dark theme adjustments
                ...(isDark && variant === 'contained' && {
                    '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                    },
                }),
                ...(isDark && variant === 'outlined' && {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                        borderColor: theme.palette.primary.light,
                        backgroundColor: theme.palette.action.hover,
                    },
                }),
                ...(isDark && variant === 'text' && {
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }),
                ...sx,
            }}
            {...props}
        >
            {children}
        </MuiButton>
    )
}