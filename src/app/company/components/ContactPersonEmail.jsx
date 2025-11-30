import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ContactPersonEmail() {
    const t = useTranslations("company.contactPerson");
    return (
        <TextFieldHook
            name="contactPerson.0.email"
            label={t("email")}
            type="email"
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

