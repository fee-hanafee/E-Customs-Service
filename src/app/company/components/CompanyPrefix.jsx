import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function CompanyPrefix() {
    const t = useTranslations("company");
    return (
        <TextFieldHook name="companyPrefix" label={t("companyPrefix")} />
    )
}