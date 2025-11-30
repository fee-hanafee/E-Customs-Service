import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function CompanyNameEn() {
    const t = useTranslations("company");
    return (
        <TextFieldHook 
            name="companyNameEn" 
            label={t("companyNameEn")} 
            inputProps={{
                maxLength: 255
            }}
            rules={{
                required: "กรุณากรอกชื่อบริษัท",
            }}
        />
    );
}