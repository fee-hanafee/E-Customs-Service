import TextFieldHook from "@/app/components/ui/TextFieldHook";
export default function ConfirmPassword() {
    return (
        <TextFieldHook
            name="customerDetail.confirmPassword"
            label="Confirm Password"
            type="password"
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

