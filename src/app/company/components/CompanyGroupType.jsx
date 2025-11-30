import AutocompleteHook from "@/app/components/ui/AutocompleteHook";
import { useTranslations } from "next-intl";

export default function CompanyGroupType() {
    const t = useTranslations("company");
    const companyGroupTypeOptions = [
        { value: "customer", label: "Customer" },
        { value: "supplier", label: "Supplier" },
        { value: "vender", label: "Vender" },
        { value: "carrier", label: "Carrier" },
        { value: "freightForwarder", label: "Freight Forwarder" },
    ];
    return (
        <AutocompleteHook 
            name="customerDetail.companyGroupType" 
            label={t("companyGroupType")}
            options={companyGroupTypeOptions}
            getOptionLabel={(option) => option?.label || option?.value || option || ''}
            isOptionEqualToValue={(option, value) => option?.value === value?.value || option === value}
            freeSolo
        />
    )
}