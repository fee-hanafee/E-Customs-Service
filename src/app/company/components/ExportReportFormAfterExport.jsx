import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ExportReportFormAfterExport() {
    const t = useTranslations("company");
    return (
        <TextFieldHook
            name="customerDetail.exportReoirtFormAfterExport"
            label={t("exportReportFormAfterExport")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

