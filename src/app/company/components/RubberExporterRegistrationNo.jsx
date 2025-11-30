import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function RubberExporterRegistrationNo() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.rubberExporterRegistrationNo"
            label={t("rubberExporterRegistrationNo")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

