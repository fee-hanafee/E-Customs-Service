"use client";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/app/components/layout/Container";
import SubHeader from "@/app/components/layout/SubHeader";
import Button from "@/app/components/ui/Button";
import defaultValues from "./defaultValues";
import { useTranslations } from "next-intl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import Create from "./Create";
import { 
  createCompany, 
  createCompanyDetail, 
  createCompanyContactPerson 
} from "@/services/CompanyService";

export default function CreatePage() {
  const methods = useForm({
    defaultValues: defaultValues,

  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      const createdCompany = await createCompany(data);
      
      if (data.customerDetail) {
        const detailData = {
          ...data.customerDetail,
        };
        await createCompanyDetail(createdCompany.id, detailData);
      }
      
      if (data.contactPerson && data.contactPerson.length > 0) {
        await createCompanyContactPerson(createdCompany.id, data.contactPerson);
      }
      
      router.push(`/company/detail/${createdCompany.id}`);
    } catch (error) {
      console.error("Error creating company:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <FormProvider {...methods}>
      <Container>
        <div className="flex flex-col gap-2">
          <SubHeader
            breadcrumbs={breadcrumbs}
            Action={
              <Button 
                onClick={methods.handleSubmit(onSubmit)}
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={16} /> : null}
              >
                {isSubmitting ? "กำลังสร้าง..." : t("create")}
              </Button>
            }
          />
          <Create />
        </div>
      </Container>
    </FormProvider>
  );
}
