import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function ExporterCode() {
  const t = useTranslations("company");
  return (
    <TextFieldHook
      name="customerDetail.exporterCode"
      label={t("exporterCode")}
      inputProps={{ maxLength: 255 }}
    />
  );
}
