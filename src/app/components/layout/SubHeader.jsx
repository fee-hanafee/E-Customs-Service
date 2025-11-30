import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { Paper } from "@mui/material";

export default function SubHeader({ breadcrumbs = [], Action = undefined }) {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      {Action && Action}
    </Paper>
  );
}
