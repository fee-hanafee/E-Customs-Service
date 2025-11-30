import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ContactPersonName() {
    const t = useTranslations("company.contactPerson");
    return (
        <TextFieldHook
            name="contactPerson.0.name"
            label={t("name")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

