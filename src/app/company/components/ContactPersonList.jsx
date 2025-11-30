"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, IconButton, Typography } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";

export default function ContactPersonList() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactPerson",
  });
  const t = useTranslations("company.contactPerson");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, paddingBottom: 4 }}>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            p: 1,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "background.paper",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              {t("person")} {index + 1}
            </Typography>
            {fields.length > 1 && (
              <IconButton
                size="small"
                onClick={() => remove(index)}
                sx={{ p: 0.5 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 0.75,
            }}
          >
            <TextFieldHook
              name={`contactPerson.${index}.name`}
              label={t("name")}
              inputProps={{ maxLength: 255 }}
            />
            <TextFieldHook
              name={`contactPerson.${index}.position`}
              label={t("position")}
              inputProps={{ maxLength: 255 }}
            />
            <TextFieldHook
              name={`contactPerson.${index}.telephone`}
              label={t("telephone")}
              type="tel"
              inputProps={{ maxLength: 10, inputMode: "numeric" }}
            />
            <TextFieldHook
              name={`contactPerson.${index}.mobile`}
              label={t("mobile")}
              type="tel"
              inputProps={{ maxLength: 10, inputMode: "numeric" }}
            />
            <TextFieldHook
              name={`contactPerson.${index}.email`}
              label={t("email")}
              type="email"
              inputProps={{ maxLength: 255 }}
            />
            <TextFieldHook
              name={`contactPerson.${index}.fax`}
              label={t("fax")}
              type="tel"
              inputProps={{ maxLength: 10, inputMode: "numeric" }}
            />
          </Box>
        </Box>
      ))}
      <Box
        component="button"
        onClick={() =>
          append({
            name: "",
            position: "",
            telephone: "",
            email: "",
            fax: "",
            mobile: "",
          })
        }
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          p: 0.75,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "action.hover",
          },
          alignSelf: "flex-start",
        }}
      >
        <AddIcon fontSize="small" />
        <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
          {t("addPerson")}
        </Typography>
      </Box>
    </Box>
  );
}

