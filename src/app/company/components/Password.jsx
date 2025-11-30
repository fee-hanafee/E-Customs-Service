import TextFieldHook from "@/app/components/ui/TextFieldHook";
export default function Password() {
    return (
        <TextFieldHook
            name="customerDetail.password"
            label="Password"
            type="password"
            inputProps={{
                maxLength: 255,
            }}
        />
    )
}

