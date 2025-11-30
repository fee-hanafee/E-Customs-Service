import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ExportReportForm() {
    const t = useTranslations("company");
    return (
        <TextFieldHook
            name="customerDetail.exportReportForm"
            label={t("exportReportForm")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

