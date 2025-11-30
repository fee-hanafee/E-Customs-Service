import AutocompleteHook from "@/app/components/ui/AutocompleteHook";
import { useTranslations } from "next-intl";

export default function PartyRole() {
  const t = useTranslations("company");
  const partyRoleOptions = [
    { value: "buyer", label: "Buyer" },
    { value: "seller", label: "Seller" },
    { value: "agent", label: "Agent" },
    { value: "other", label: "Other" },
  ];
  return (
    <AutocompleteHook
      name="customerDetail.partyRole"
      label={t("partyRole")}
      options={partyRoleOptions}
      getOptionLabel={(option) =>
        option?.label || option?.value || option || ""
      }
      isOptionEqualToValue={(option, value) =>
        option?.value === value?.value || option === value
      }
    />
  );
}
