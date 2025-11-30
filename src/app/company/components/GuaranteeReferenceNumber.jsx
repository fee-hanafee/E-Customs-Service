import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function GuaranteeReferenceNumber() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.guaranteeReferenceNumber"
            label={t("guaranteeReferenceNumber")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

