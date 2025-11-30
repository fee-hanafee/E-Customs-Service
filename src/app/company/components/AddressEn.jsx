

import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function AddressEn() {
    const t = useTranslations("company");
    return (
        <TextFieldHook name="customerDetail.addressEn" label={t("addressEn")}
        inputProps={{
            maxLength: 255,
        }}
        // rules={{
        //     required: "กรุณากรอกที่อยู่",
        // }}
        />
    )
}