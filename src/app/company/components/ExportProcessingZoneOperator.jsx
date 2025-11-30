import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ExportProcessingZoneOperator() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.exportProcessingZoneOperator"
            label={t("exportProcessingZoneOperator")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

