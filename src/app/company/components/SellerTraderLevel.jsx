import AutocompleteHook from "@/app/components/ui/AutocompleteHook";
import { useTranslations } from "next-intl";

export default function SellerTraderLevel() {
  const t = useTranslations("company");
  const sellerTradeLevelOptions = [
    { value: "manufacturer", label: "Manufacturer" },
    { value: "distributor", label: "Distributor" },
    { value: "retailer", label: "Retailer" },
    { value: "importer", label: "Importer" },
    { value: "wholesaler", label: "Wholesaler" },
    { value: "other", label: "Other" },
  ];
  return (
    <AutocompleteHook
      name="customerDetail.sellerTradeLevel"
      label={t("sellerTradeLevel")}
      options={sellerTradeLevelOptions}
      getOptionLabel={(option) =>
        option?.label || option?.value || option || ""
      }
      isOptionEqualToValue={(option, value) =>
        option?.value === value?.value || option === value
      }
    />
  );
}
