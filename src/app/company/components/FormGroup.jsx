import { Box, Typography } from "@mui/material";

export default function FormGroup({ title, children, layout = "column" }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 500,
          color: "text.secondary",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={
          layout === "grid"
            ? {
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 1,
              }
            : {
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }
        }
      >
        {children}
      </Box>
    </Box>
  );
}

