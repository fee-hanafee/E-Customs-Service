"use client";

import AutocompleteHook from "@/app/components/ui/AutocompleteHook";
import { useTranslations } from "next-intl";
import { useThaiAddress } from "@/app/hooks/useThaiAddress";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

export default function DistrictTh() {
    const t = useTranslations("company");
    const { getDistrictsByProvince, provinces } = useThaiAddress();
    const { watch, setValue } = useFormContext();
    const selectedProvince = watch("customerDetail.provinceTh");
    const provinceId = watch("customerDetail.provinceId");

    // ดึงอำเภอตามจังหวัดที่เลือก
    const districts = useMemo(() => {
        let currentProvinceId = provinceId;
        
        if (!currentProvinceId && selectedProvince) {
            // ถ้าไม่มี provinceId แต่มี provinceTh ให้หา provinceId จาก provinces
            const found = provinces.find(p => p.label === selectedProvince);
            if (found) {
                currentProvinceId = found.value;
                setValue("customerDetail.provinceId", found.value);
            }
        }
        
        if (!currentProvinceId) return [];
        return getDistrictsByProvince(currentProvinceId);
    }, [provinceId, selectedProvince, getDistrictsByProvince, provinces, setValue]);

    return (
        <AutocompleteHook 
            name="customerDetail.districtTh" 
            label={t("districtTh")}
            options={districts}
            getOptionLabel={(option) => option?.label || option || ""}
            isOptionEqualToValue={(option, value) => {
                if (typeof option === "string" && typeof value === "string") return option === value;
                return option?.value === value?.value || option === value;
            }}
            rules={{
                required: "กรุณาเลือกอำเภอ/เขต",
            }}
            disabled={!provinceId && !selectedProvince}
            onChange={(event, newValue) => {
                if (newValue) {
                    setValue("customerDetail.districtTh", newValue.label || newValue);
                    // รีเซ็ตตำบลและรหัสไปรษณีย์เมื่อเปลี่ยนอำเภอ
                    setValue("customerDetail.subdistrictTh", "");
                    setValue("customerDetail.postalCode", "");
                }
            }}
        />
    );
}