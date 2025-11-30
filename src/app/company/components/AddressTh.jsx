import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
export default function AddressTh() {
    const t = useTranslations("company");
    return (
        <TextFieldHook name="customerDetail.addressTh" label={t("addressTh")}
        inputProps={{
            maxLength: 255,
        }}
        rules={{
            required: "กรุณากรอกที่อยู่",
        }}
        />
    )
}