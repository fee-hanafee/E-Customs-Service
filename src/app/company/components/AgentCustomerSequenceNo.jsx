import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function AgentCustomerSequenceNo() {
  const t = useTranslations("company");
  return (
    <TextFieldHook
      name="customerDetail.agentCustomerSequenceNo"
      label={t("agentCustomerSequenceNo")}
      inputProps={{
        maxLength: 255,
      }}
    />
  );
}
