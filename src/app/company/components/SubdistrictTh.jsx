"use client";

import AutocompleteHook from "@/app/components/ui/AutocompleteHook";
import { useTranslations } from "next-intl";
import { useThaiAddress } from "@/app/hooks/useThaiAddress";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

export default function SubdistrictTh() {
    const t = useTranslations("company");
    const { getSubdistrictsByDistrict, getDistrictsByProvince } = useThaiAddress();
    const { watch, setValue } = useFormContext();
    const selectedDistrict = watch("customerDetail.districtTh");
    const provinceId = watch("customerDetail.provinceId");

    // ดึงตำบลตามอำเภอที่เลือก
    const subdistricts = useMemo(() => {
        if (!selectedDistrict || !provinceId) return [];
        
        // หา districtId จาก districts
        const districts = getDistrictsByProvince(provinceId);
        const found = districts.find(d => d.label === selectedDistrict);
        
        if (!found) return [];
        return getSubdistrictsByDistrict(found.value);
    }, [selectedDistrict, provinceId, getSubdistrictsByDistrict, getDistrictsByProvince]);

    return (
        <AutocompleteHook 
            name="customerDetail.subdistrictTh" 
            label={t("subdistrictTh")}
            options={subdistricts}
            getOptionLabel={(option) => option?.label || option || ""}
            isOptionEqualToValue={(option, value) => {
                if (typeof option === "string" && typeof value === "string") return option === value;
                return option?.value === value?.value || option === value;
            }}
            rules={{
                required: "กรุณาเลือกตำบล/แขวง",
            }}
            disabled={!selectedDistrict || !provinceId}
            onChange={(event, newValue) => {
                if (newValue) {
                    setValue("customerDetail.subdistrictTh", newValue.label || newValue);
                    // รีเซ็ตรหัสไปรษณีย์เมื่อเปลี่ยนตำบล
                    setValue("customerDetail.postalCode", "");
                }
            }}
        />
    );
}