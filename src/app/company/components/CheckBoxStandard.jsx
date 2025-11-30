"use client";

import { Box } from "@mui/material";
import CheckboxHook from "@/app/components/ui/CheckboxHook";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import TextFieldHook from "@/app/components/ui/TextFieldHook";

export default function CheckBoxStandard() {
  const t = useTranslations("company");
  const { setValue, watch } = useFormContext();

  const handleChange = (selectedKey, checked) => {
    if (checked) {
      // ถ้าเลือกอันนี้ ให้ uncheck อันอื่นทั้งหมด
      if (selectedKey !== "isGeneralStandard") {
        setValue("customerDetail.isGeneralStandard", false);
      }
      if (selectedKey !== "isGoldCard") {
        setValue("customerDetail.isGoldCard", false);
      }
      if (selectedKey !== "isCustomerBroker") {
        setValue("customerDetail.isCustomerBroker", false);
      }
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
        <CheckboxHook
          name="customerDetail.isGeneralStandard"
          label={t("isGeneralStandard")}
          onChange={(e) => {
            handleChange("isGeneralStandard", e.target.checked);
          }}
        />
        <CheckboxHook
          name="customerDetail.isGoldCard"
          label={t("isGoldCard")}
          onChange={(e) => {
            handleChange("isGoldCard", e.target.checked);
          }}
        />
        <CheckboxHook
          name="customerDetail.isCustomerBroker"
          label={t("isCustomerBroker")}
          onChange={(e) => {
            handleChange("isCustomerBroker", e.target.checked);
          }}
        />
      </Box>
      <div className="w-1/2">
        {watch("customerDetail.isGoldCard") && (
          <TextFieldHook
            name="customerDetail.goldCardNo"
            label={t("goldCardNo")}
            disabled={!watch("customerDetail.isGoldCard")}
          />
        )}
        {watch("customerDetail.isCustomerBroker") && (
          <TextFieldHook
            name="customerDetail.customerBrokerNo"
            label={t("customerBrokerNo")}
            disabled={!watch("customerDetail.isCustomerBroker")}
          />
        )}
      </div>
    </div>
  );
}
