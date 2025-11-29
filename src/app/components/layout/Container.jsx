"use client";

import { Box, useTheme } from "@mui/material";
import { useTheme as useCustomTheme } from "../theme/ThemeProvider";

export default function Container({ children }) {
  const { mode } = useCustomTheme();

  return (
    <Box
      component="main"
      sx={{
        p: { xs: 0, sm: 1 },
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: mode === "dark" ? "#1f2937" : "#f3f4f6",
          borderRadius: 1,
          height: "calc(100vh - 16px)",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
