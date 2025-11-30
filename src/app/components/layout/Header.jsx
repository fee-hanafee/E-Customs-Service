"use client";

import { Paper, useTheme } from "@mui/material";
import Button from "../ui/Button";

export default function Header({
  title = "Header",
  buttonText,
  onClick = undefined,
}) {

  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderRadius: '6px',
        backgroundColor: '#1976d2', 
        color: '#ffffff',
      }}
    >
      <h1 
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          margin: 0,
        }}
      >
        {title}
      </h1>
      {buttonText && (
        <Button
          onClick={onClick}
          variant="outlined"
          sx={{
            color: '#ffffff',
            borderColor: '#ffffff',
            '&:hover': {
              borderColor: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {buttonText}
        </Button>
      )}
    </Paper>
  );
}
