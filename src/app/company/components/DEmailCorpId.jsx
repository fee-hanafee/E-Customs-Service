import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";

export default function DEmailCorpId() {
    const t = useTranslations("company");
    return (
        <TextFieldHook name="customerDetail.dEmailCorpId" label={t("dEmailCorpId")}
        inputProps={{
            maxLength: 255,
        }}
       
        />
    )
}