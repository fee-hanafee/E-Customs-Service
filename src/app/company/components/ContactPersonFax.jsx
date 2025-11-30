import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ContactPersonFax() {
    const t = useTranslations("company.contactPerson");
    return (
        <TextFieldHook
            name="contactPerson.0.fax"
            label={t("fax")}
            type="tel"
            inputProps={{
                maxLength: 10,
                inputMode: "numeric",
            }}
        />
    )
}

