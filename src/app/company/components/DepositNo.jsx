import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function DepositNo() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.depositNo"
            label={t("depositNo")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

