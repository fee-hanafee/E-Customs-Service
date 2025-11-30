import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function RubberTraderRegistrationNo() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.rubberTraderRegistrationNo"
            label={t("rubberTraderRegistrationNo")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

