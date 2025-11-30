import TextFieldHook from "@/app/components/ui/TextFieldHook";
export default function LoginName() {
    return (
        <TextFieldHook
            name="customerDetail.loginName"
            label="Login Name"
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

