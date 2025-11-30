"use client";

import AutocompleteHook from "@/app/components/ui/AutocompleteHook";
import { useTranslations } from "next-intl";
import { useThaiAddress } from "@/app/hooks/useThaiAddress";
import { useFormContext } from "react-hook-form";

export default function ProvinceTh() {
    const t = useTranslations("company");
    const { provinces } = useThaiAddress();
    const { watch, setValue } = useFormContext();
    const selectedProvince = watch("customerDetail.provinceTh");

    return (
        <AutocompleteHook 
            name="customerDetail.provinceTh" 
            label={t("provinceTh")}
            options={provinces}
            getOptionLabel={(option) => option?.label || option || ""}
            isOptionEqualToValue={(option, value) => {
                if (typeof option === "string" && typeof value === "string") return option === value;
                return option?.value === value?.value || option === value;
            }}
            rules={{
                required: "กรุณาเลือกจังหวัด",
            }}
            onChange={(event, newValue) => {
                if (newValue) {
                    setValue("customerDetail.provinceTh", newValue.label || newValue);
                    setValue("customerDetail.provinceId", newValue.value || "");
                    // รีเซ็ตอำเภอ ตำบล และรหัสไปรษณีย์เมื่อเปลี่ยนจังหวัด
                    setValue("customerDetail.districtTh", "");
                    setValue("customerDetail.subdistrictTh", "");
                    setValue("customerDetail.postalCode", "");
                }
            }}
        />
    );
}