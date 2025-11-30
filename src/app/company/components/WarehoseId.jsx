import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function WarehoseId() {
  const t = useTranslations("company");
  return (
    <TextFieldHook
      name="customerDetail.warehouseId"
      label={t("warehouseId")}
      inputProps={{ maxLength: 255 }}
    />
  );
}
