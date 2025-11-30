import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ContactPersonMobile() {
    const t = useTranslations("company.contactPerson");
    return (
        <TextFieldHook
            name="contactPerson.0.mobile"
            label={t("mobile")}
            type="tel"
            inputProps={{
                maxLength: 10,
                inputMode: "numeric",
            }}
        />
    )
}

