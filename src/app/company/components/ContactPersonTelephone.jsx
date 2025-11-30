import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ContactPersonTelephone() {
    const t = useTranslations("company.contactPerson");
    return (
        <TextFieldHook
            name="contactPerson.0.telephone"
            label={t("telephone")}
            type="tel"
            inputProps={{
                maxLength: 10,
                inputMode: "numeric",
            }}
        />
    )
}

