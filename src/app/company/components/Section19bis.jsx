import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function Section19bis() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.section19bis"
            label={t("section19bis")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

