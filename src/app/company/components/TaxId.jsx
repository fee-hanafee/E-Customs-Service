import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
export default function TaxId() {
    const t = useTranslations("company");
    const { setValue } = useFormContext();
    return (
        <TextFieldHook 
            name="taxId" 
            label={t("taxId")}
            inputProps={{
                maxLength: 13,
                pattern: "[0-9]{13}",
                inputMode: "numeric",
            }}
            rules={{
                required: "กรุณากรอกเลขประจำตัวผู้เสียภาษี",
                pattern: {
                    value: /^[0-9]{13}$/,
                    message: "เลขประจำตัวผู้เสียภาษีต้องเป็นตัวเลข 13 หลัก",
                },
            }}
            onChange={(e) => {
                setValue("customerId", e.target.value);
            }}
        />
    );
}