import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function CustomerId() {
    const t = useTranslations("company");
    return (
        <TextFieldHook name="customerId" label={t("customerId")} disabled={true}/>
    )
}