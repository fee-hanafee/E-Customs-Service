import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ContactPersonPosition() {
    const t = useTranslations("company.contactPerson");
    return (
        <TextFieldHook
            name="contactPerson.0.position"
            label={t("position")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

