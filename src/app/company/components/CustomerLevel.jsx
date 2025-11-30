import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function CustomerLevel() {
  const t = useTranslations("company");
  return (
    <TextFieldHook
      name="customerDetail.customerLevel"
      label={t("customerLevel")}
      inputProps={{ maxLength: 255 }}
    />
  );
}
