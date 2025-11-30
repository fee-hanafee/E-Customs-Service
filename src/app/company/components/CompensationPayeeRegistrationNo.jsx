import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function CompensationPayeeRegistrationNo() {
  const t = useTranslations("company");
  return (
    <TextFieldHook
      name="customerDetail.compensationPayeeRegistrationNo"
      label={t("compensationPayeeRegistrationNo")}
      inputProps={{
        maxLength: 255,
      }}
    />
  );
}
