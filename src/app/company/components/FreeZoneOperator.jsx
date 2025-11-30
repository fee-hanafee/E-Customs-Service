import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function FreeZoneOperator() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.freeZoneOperator"
            label={t("freeZoneOperator")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}