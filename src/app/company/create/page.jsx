"use client";
import { useForm, FormProvider } from "react-hook-form";
import Container from "@/app/components/layout/Container";
import SubHeader from "@/app/components/layout/SubHeader";
import Button from "@/app/components/ui/Button";
import defaultValues from "./defaultValues";
import { useTranslations } from "next-intl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Create from "./Create";

export default function CreatePage() {
  const methods = useForm({
    defaultValues: defaultValues,

  });
  const t = useTranslations("company");
  const breadcrumbs = [
    <Link 
      underline="hover" 
      key="1" 
      color="inherit" 
      href="/company" 
      sx={{ 
        fontSize: { xs: "0.75rem", sm: "1rem" },
        lineHeight: 1.5,
        display: "inline-flex",
        alignItems: "center"
      }}
    >
      Company
    </Link>,
    <Typography 
      key="2" 
      color="text.primary" 
      sx={{ 
        fontSize: { xs: "0.75rem", sm: "1rem" },
        lineHeight: 1.5,
        display: "inline-flex",
        alignItems: "center"
      }}
    >
      Create
    </Typography>,
  ];
  console.debug("methods", methods.watch());

  const onSubmit = (data) => {
    console.debug(data);
  };
  return (
    <FormProvider {...methods}>
      <Container>
        <div className="flex flex-col gap-2">
          <SubHeader
            breadcrumbs={breadcrumbs}
            Action={
              <Button onClick={methods.handleSubmit(onSubmit)}>{t("create")}</Button>
            }
          />
          <Create />
        </div>
      </Container>
    </FormProvider>
  );
}
