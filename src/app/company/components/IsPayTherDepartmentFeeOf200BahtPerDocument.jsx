import CheckboxHook from "@/app/components/ui/CheckboxHook";
import { useTranslations } from "next-intl";
export default function IsPayTherDepartmentFeeOf200BahtPerDocument() {
    const t = useTranslations("company.others");
    return (
        <CheckboxHook
            name="customerDetail.isPayTherDepartmentFeeOf200BahtPerDocument"
            label={t("isPayTherDepartmentFeeOf200BahtPerDocument")}
        />
    )
}

