import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ImportReportForm() {
    const t = useTranslations("company");
    return (
        <TextFieldHook
            name="customerDetail.importReportForm"
            label={t("importReportForm")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

