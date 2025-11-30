import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function BondedManufacWarehose() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.bondedManufacturingWarehose"
            label={t("bondedManufacturingWarehose")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}