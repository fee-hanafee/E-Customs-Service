import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function LtrBlockRubberManufacturerRegistrationNo() {
    const t = useTranslations("company.others");
    return (
        <TextFieldHook
            name="customerDetail.ltrBlockRubberManufacturerRegistrationNo"
            label={t("ltrBlockRubberManufacturerRegistrationNo")}
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

