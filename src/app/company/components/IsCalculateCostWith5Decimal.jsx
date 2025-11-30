import CheckboxHook from "@/app/components/ui/CheckboxHook";
import { useTranslations } from "next-intl";
export default function IsCalculateCostWith5Decimal() {
  const t = useTranslations("company");
  return (
    <div className=" w-full h-full flex justify-center items-end">
      <CheckboxHook
        name="customerDetail.isCalculateCostWith5Decimal"
        label={t("isCalculateCostWith5Decimal")}
      />
    </div>
  );
}
