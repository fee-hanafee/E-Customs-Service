import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function AeosRefNo() {
  const t = useTranslations("company");
  return (
    <TextFieldHook
      name="customerDetail.aeosrefno"
      label={t("aeosRefNo")}
      inputProps={{
        maxLength: 255,
      }}
    />
  );
}
