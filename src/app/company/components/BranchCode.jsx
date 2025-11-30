import AutocompleteHook from "@/app/components/ui/AutocompleteHook";
import { useTranslations } from "next-intl";

export default function BranchCode() {
    const t = useTranslations("company");
    
    // Generate branch code options (0000-0099)
    const branchCodeOptions = Array.from({ length: 100 }, (_, i) => {
        const code = String(i).padStart(4, '0');
        return {
            value: code,
            label: code === '0000' ? `${code} (${t("headOffice")})` : code
        };
    });
    
    return (
        <AutocompleteHook 
            name="customerDetail.branchCode" 
            label={t("branchCode")}
            options={branchCodeOptions}
            getOptionLabel={(option) => option?.label || option?.value || option || ''}
            isOptionEqualToValue={(option, value) => option?.value === value?.value || option === value}
            freeSolo
            inputProps={{
                maxLength: 4,
                pattern: "[0-9]{4}",
                inputMode: "numeric",
            }}
            rules={{
                required: "กรุณาเลือกรหัสสาขา",
                pattern: {
                    value: /^[0-9]{4}$/,
                    message: "รหัสสาขาต้องเป็นตัวเลข 4 หลัก",
                },
            }}
        />
    )
}