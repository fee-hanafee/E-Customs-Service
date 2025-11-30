import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function Nswid() {
  const t = useTranslations("company");
  return (
    <TextFieldHook
      name="customerDetail.nswid"
      label={t("nswid")}
      inputProps={{ maxLength: 255 }}
    />
  );
}
