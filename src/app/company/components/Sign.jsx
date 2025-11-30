"use client";

import { Box, Typography, Chip, Paper } from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

const SIGN_OPTION_KEYS = [
  "customerSignsOwn",
  "signInvoice",
  "signExportManifest",
  "signImportManifest",
  "signTransportPermit",
  "signShortShip",
];

// Mapping ระหว่าง signOptions keys กับ boolean fields ใน defaultValues
const SIGN_OPTION_TO_FIELD_MAP = {
  customerSignsOwn: "isCustomerSelfElectronicSigned",
  signInvoice: "isSignInvoice",
  signExportManifest: "isSignExport",
  signImportManifest: "isSignImport",
  signTransportPermit: "isSignDelivery",
  signShortShip: "isSignShortShip",
};

export default function Sign() {
  const t = useTranslations("company.sign");
  const { watch, setValue } = useFormContext();
  const selected = watch("customerDetail.signOptions") || [];

  // กดเลือกจากด้านล่าง
  const handleSelect = (item) => {
    if (!selected.includes(item)) {
      let newSelected = [];
      
      // ถ้าเลือก customerSignsOwn ให้ลบตัวเลือกอื่นทั้งหมด
      if (item === "customerSignsOwn") {
        newSelected = ["customerSignsOwn"];
        
        // Set boolean fields ของตัวอื่นเป็น false
        Object.entries(SIGN_OPTION_TO_FIELD_MAP).forEach(([key, fieldName]) => {
          if (key !== "customerSignsOwn") {
            setValue(`customerDetail.${fieldName}`, false);
          }
        });
      } else {
        // ถ้าเลือกตัวอื่น ให้ลบ customerSignsOwn ออก
        newSelected = selected.filter((i) => i !== "customerSignsOwn");
        newSelected.push(item);
        
        // Set boolean field ของ customerSignsOwn เป็น false
        setValue("customerDetail.isCustomerSelfElectronicSigned", false);
      }
      
      setValue("customerDetail.signOptions", newSelected);
      
      // อัปเดตค่า boolean field ที่เกี่ยวข้อง
      const fieldName = SIGN_OPTION_TO_FIELD_MAP[item];
      if (fieldName) {
        setValue(`customerDetail.${fieldName}`, true);
      }
    }
  };

  // กดลบจากด้านบน
  const handleRemove = (item) => {
    const newSelected = selected.filter((i) => i !== item);
    setValue("customerDetail.signOptions", newSelected);
    
    // อัปเดตค่า boolean field ที่เกี่ยวข้อง
    const fieldName = SIGN_OPTION_TO_FIELD_MAP[item];
    if (fieldName) {
      setValue(`customerDetail.${fieldName}`, false);
    }
  };

  // เอาไว้แสดงรายการที่ยังไม่ถูกเลือกด้านล่าง
  const availableOptions = SIGN_OPTION_KEYS.filter(
    (item) => !selected.includes(item)
  );

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: "0.8125rem",
          fontWeight: 600,
          marginBottom: 0,
        }}
      >
        {t("title")}
      </Typography>

      {/* ส่วนบน: รายการที่เลือกแล้ว */}
      <Paper
        elevation={0}
        sx={{
          padding: 1,
          marginBottom: 1,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          minHeight: 50,
          backgroundColor: selected.length > 0 ? "action.hover" : "background.paper",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            marginBottom: 0.75,
            color: "text.secondary",
          }}
        >
          {t("selectedItems")}
        </Typography>

        {selected.length === 0 ? (
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "text.disabled",
              fontStyle: "italic",
            }}
          >
            {t("noSelection")}
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {selected.map((item) => (
              <Chip
                key={item}
                label={t(`options.${item}`)}
                onDelete={() => handleRemove(item)}
                color="primary"
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  height: "24px",
                  "& .MuiChip-label": {
                    padding: "0 6px",
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* ส่วนล่าง: รายการให้เลือก */}
      <Paper
        elevation={0}
        sx={{
          padding: 1,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            marginBottom: 0.75,
            color: "text.secondary",
          }}
        >
          {t("selectItems")}
        </Typography>

        {availableOptions.length === 0 ? (
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "text.disabled",
              fontStyle: "italic",
            }}
          >
            {t("allSelected")}
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.75,
            }}
          >
            {availableOptions.map((item) => (
              <Chip
                key={item}
                label={t(`options.${item}`)}
                onClick={() => handleSelect(item)}
                variant="outlined"
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  height: "24px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    borderColor: "primary.main",
                  },
                  "& .MuiChip-label": {
                    padding: "0 6px",
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
