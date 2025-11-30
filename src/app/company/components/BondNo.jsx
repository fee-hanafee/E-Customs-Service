import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function BondNo() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.bondNo"
            label={t("bondNo")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

