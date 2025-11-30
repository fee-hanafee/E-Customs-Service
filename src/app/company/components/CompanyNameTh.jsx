import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function CompanyNameTh() {
    const t = useTranslations("company");
    return (
        <TextFieldHook name="companyNameTh" label={t("companyNameTh")}
        
        inputProps={{
            maxLength: 255,
        }}
        rules={{
            required: "กรุณากรอกชื่อบริษัท",
        }}
        />
    )
}