"use client";

import AutocompleteHook from "@/app/components/ui/AutocompleteHook";
import { useTranslations } from "next-intl";
import { useThaiAddress } from "@/app/hooks/useThaiAddress";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

export default function PostalCode() {
    const t = useTranslations("company");
    const { postalCodes, getPostalCodesBySubdistrict, getProvinceByZipCode, getDistrictsByZipCode, getSubdistrictsByZipCode, getDistrictsByProvince, getSubdistrictsByDistrict } = useThaiAddress();
    const { watch, setValue } = useFormContext();
    const selectedSubdistrict = watch("customerDetail.subdistrictTh");
    const selectedDistrict = watch("customerDetail.districtTh");
    const provinceId = watch("customerDetail.provinceId");

    // ดึงรหัสไปรษณีย์ตามตำบลที่เลือก หรือแสดงทั้งหมด
    const postalCodeOptions = useMemo(() => {
        if (selectedSubdistrict && selectedDistrict && provinceId) {
            // หา districtId จาก districts
            const districts = getDistrictsByProvince(provinceId);
            const district = districts.find(d => d.label === selectedDistrict);
            if (district) {
                const subdistricts = getSubdistrictsByDistrict(district.value);
                const subdistrict = subdistricts.find(s => s.label === selectedSubdistrict);
                if (subdistrict) {
                    return getPostalCodesBySubdistrict(subdistrict.value);
                }
            }
        }
        return postalCodes;
    }, [selectedSubdistrict, selectedDistrict, provinceId, getPostalCodesBySubdistrict, getDistrictsByProvince, getSubdistrictsByDistrict, postalCodes]);

    return (
        <AutocompleteHook 
            name="customerDetail.postalCode" 
            label={t("postalCode")}
            options={postalCodeOptions}
            getOptionLabel={(option) => option?.label || option || ""}
            isOptionEqualToValue={(option, value) => {
                if (typeof option === "string" && typeof value === "string") return option === value;
                return option?.value === value?.value || option === value;
            }}
            rules={{
                required: "กรุณาเลือกรหัสไปรษณีย์",
                pattern: {
                    value: /^[0-9]{5}$/,
                    message: "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก",
                },
            }}
            onChange={(event, newValue) => {
                if (newValue) {
                    const zipCode = newValue.value || newValue.label || newValue;
                    setValue("customerDetail.postalCode", zipCode);
                    
                    // อัปเดตจังหวัด อำเภอ ตำบลตามรหัสไปรษณีย์
                    const province = getProvinceByZipCode(zipCode);
                    if (province) {
                        setValue("customerDetail.provinceTh", province.label);
                        setValue("customerDetail.provinceId", province.value);
                    }
                    
                    const districts = getDistrictsByZipCode(zipCode);
                    if (districts.length === 1) {
                        setValue("customerDetail.districtTh", districts[0].label);
                    }
                    
                    const subdistricts = getSubdistrictsByZipCode(zipCode);
                    if (subdistricts.length === 1) {
                        setValue("customerDetail.subdistrictTh", subdistricts[0].label);
                    }
                }
            }}
        />
    );
}