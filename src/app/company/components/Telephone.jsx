"use client";

import TextFieldHook from "@/app/components/ui/TextFieldHook";
import { useTranslations } from "next-intl";

export default function Telephone() {
    const t = useTranslations("company");

    // ฟังก์ชันกรองเฉพาะตัวเลขและจำกัดความยาว
    const handleChange = (e) => {
        const value = e.target.value;
        // กรองเฉพาะตัวเลข
        const numericValue = value.replace(/\D/g, '');
        // จำกัดความยาวไม่เกิน 10 ตัว (รวม 0 แล้วได้ 9-10 ตัว)
        const limitedValue = numericValue.slice(0, 10);
        // สร้าง event ใหม่ด้วยค่าที่กรองแล้ว
        const syntheticEvent = {
            ...e,
            target: {
                ...e.target,
                value: limitedValue,
            },
        };
        // เรียก onChange เดิมด้วย event ที่แก้ไขแล้ว
        // field.onChange จะถูกเรียกจาก TextFieldHook
        return syntheticEvent;
    };

    return (
        <TextFieldHook 
            name="customerDetail.telephone" 
            label={t("telephone")}
            type="tel"
            inputProps={{
                maxLength: 10,
                inputMode: "numeric",
                minLength: 9,
            }}
            rules={{
                required: {
                    value: true,
                    message: "กรุณากรอกโทรศัพท์",
                },
                validate: (value) => {
                    if (!value || value.trim() === "") {
                        return "กรุณากรอกโทรศัพท์";
                    }
                    if (value.length < 9) {
                        return "เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 ตัว";
                    }
                    if (value.length > 10) {
                        return "เบอร์โทรศัพท์ต้องไม่เกิน 10 ตัว";
                    }
                    if (!/^0[0-9]{8,9}$/.test(value)) {
                        return "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 และรวมแล้วได้ 9-10 ตัว";
                    }
                    return true;
                },
            }}
            onChange={handleChange}
        />
    );
}