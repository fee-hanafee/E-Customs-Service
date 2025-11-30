"use client";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "@/app/components/layout/Container";
import SubHeader from "@/app/components/layout/SubHeader";
import Button from "@/app/components/ui/Button";
import defaultValues from "../../create/defaultValues";
import { useTranslations } from "next-intl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CircularProgress, Box } from "@mui/material";
import Create from "../../create/Create";
import { 
  getCompanyDetailById,
  updateCompany, 
  updateCompanyDetail, 
  updateCompanyContactPerson 
} from "@/services/CompanyService";

/**
 * Convert company detail data to form format
 */
const convertToFormData = (companyData) => {
  if (!companyData) return defaultValues;

  const detail = companyData.detail || {};
  const contactPersons = companyData.contactPerson || [];

  return {
    id: companyData.id || "",
    customerId: companyData.customerId || "",
    taxId: companyData.taxId || "",
    companyPrefix: companyData.companyPrefix || "",
    companyNameTh: companyData.companyNameTh || "",
    companyNameEn: companyData.companyNameEn || "",
    createDate: companyData.createDate || "",
    createBy: companyData.createBy || "",
    updateDate: companyData.updateDate || "",
    updateBy: companyData.updateBy || "",
    isActive: companyData.isActive ?? "",
    isDeleted: companyData.isDeleted ?? "",
    customerDetail: {
      addressTh: detail.addressTh || "",
      addressEn: detail.addressEn || "",
      provinceTh: detail.provinceTh || "",
      districtTh: detail.districtTh || "",
      provinceId: detail.provinceId || "",
      subdistrictTh: detail.subdistrictTh || "",
      postalCode: detail.postalCode || "",
      dEmailCorpId: detail.dEmailCorpId || "",
      telephone: detail.telephone || "",
      fax: detail.fax || "",
      partyRole: detail.partyRole || "",
      sellerTradeLevel: detail.sellerTradeLevel || "",
      exporterCode: detail.exporterCode || "",
      warehouseId: detail.warehouseId || "",
      nswid: detail.nswid || "",
      branchCode: detail.branchCode || "0000",
      companyGroupType: detail.companyGroupType || "customer",
      customerLevel: detail.customerLevel || "",
      isCalculateCostWith5Decimal: detail.isCalculateCostWith5Decimal ?? false,
      isCustomerSelfElectronicSigned: detail.isCustomerSelfElectronicSigned ?? false,
      isSignInvoice: detail.isSignInvoice ?? false,
      isSignExport: detail.isSignExport ?? false,
      isSignImport: detail.isSignImport ?? false,
      isSignDelivery: detail.isSignDelivery ?? false,
      isSignShortShip: detail.isSignShortShip ?? false,
      signOptions: detail.signOptions || [],
      isCustomerOnlySigner: detail.isCustomerOnlySigner ?? false,
      isCustomerOnlySignerExport: detail.isCustomerOnlySignerExport ?? false,
      isCustomerOnlySignerImport: detail.isCustomerOnlySignerImport ?? false,
      isCustomerOnlySignerInvoice: detail.isCustomerOnlySignerInvoice ?? false,
      isCustomerOnlySignerShortShip: detail.isCustomerOnlySignerShortShip ?? false,
      signNotAllowedOptions: detail.signNotAllowedOptions || [],
      isGeneralStandard: detail.isGeneralStandard ?? true,
      isGoldCard: detail.isGoldCard ?? false,
      isCustomerBroker: detail.isCustomerBroker ?? false,
      goldCardNo: detail.goldCardNo || "",
      customerBrokerNo: detail.customerBrokerNo || "",
      agentCustomerSequenceNo: detail.agentCustomerSequenceNo || "",
      compensationPayeeRegistrationNo: detail.compensationPayeeRegistrationNo || "",
      aeosrefno: detail.aeosrefno || "",
      bondedManufacturingWarehose: detail.bondedManufacturingWarehose || "",
      freeZoneOperator: detail.freeZoneOperator || "",
      exportProcessingZoneOperator: detail.exportProcessingZoneOperator || "",
      section19bis: detail.section19bis || "",
      guaranteeReferenceNumber: detail.guaranteeReferenceNumber || "",
      bondNo: detail.bondNo || "",
      depositNo: detail.depositNo || "",
      isPayTherDepartmentFeeOf200BahtPerDocument: detail.isPayTherDepartmentFeeOf200BahtPerDocument ?? "",
      rubberTraderRegistrationNo: detail.rubberTraderRegistrationNo || "",
      rubberExporterRegistrationNo: detail.rubberExporterRegistrationNo || "",
      ltrBlockRubberManufacturerRegistrationNo: detail.ltrBlockRubberManufacturerRegistrationNo || "",
      loginName: detail.loginName || "",
      password: detail.password || "",
      confirmPassword: detail.confirmPassword || "",
      importReportForm: detail.importReportForm || "",
      exportReportForm: detail.exportReportForm || "",
      exportReoirtFormAfterExport: detail.exportReoirtFormAfterExport || "",
    },
    contactPerson: contactPersons.length > 0 
      ? contactPersons.map(cp => ({
          name: cp.name || "",
          position: cp.position || "",
          telephone: cp.telephone || "",
          email: cp.email || "",
          fax: cp.fax || "",
          mobile: cp.mobile || "",
        }))
      : [{
          name: "",
          position: "",
          telephone: "",
          email: "",
          fax: "",
          mobile: "",
        }],
  };
};

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations("company");

  const methods = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCompanyDetailById(id);
        const formData = convertToFormData(data);
        methods.reset(formData);
      } catch (err) {
        console.error("Error fetching company detail:", err);
        setError(err?.message || "Failed to load company detail");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyDetail();
    }
  }, [id, methods]);

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
    <Link 
      underline="hover" 
      key="2" 
      color="inherit" 
      href={`/company/detail/${id}`}
      sx={{ 
        fontSize: { xs: "0.75rem", sm: "1rem" },
        lineHeight: 1.5,
        display: "inline-flex",
        alignItems: "center"
      }}
    >
      Detail
    </Link>,
    <Typography 
      key="3" 
      color="text.primary" 
      sx={{ 
        fontSize: { xs: "0.75rem", sm: "1rem" },
        lineHeight: 1.5,
        display: "inline-flex",
        alignItems: "center"
      }}
    >
      Edit
    </Typography>,
  ];

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // 1. อัปเดตข้อมูลบริษัทพื้นฐาน (Company)
      await updateCompany(id, data);
      
      // 2. อัปเดตข้อมูลรายละเอียดบริษัท (CompanyDetail)
      if (data.customerDetail) {
        const detailData = {
          ...data.customerDetail,
        };
        await updateCompanyDetail(id, detailData);
      }
      
      // 3. อัปเดตข้อมูลผู้ติดต่อ (ContactPerson)
      if (data.contactPerson && data.contactPerson.length > 0) {
        await updateCompanyContactPerson(id, data.contactPerson);
      }
      
      // นำทางไปยังหน้าดูรายละเอียดบริษัท
      router.push(`/company/detail/${id}`);
    } catch (error) {
      console.error("Error updating company:", error);
      alert(`เกิดข้อผิดพลาดในการอัปเดตข้อมูลบริษัท: ${error.message || "กรุณาลองใหม่อีกครั้ง"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <SubHeader breadcrumbs={breadcrumbs} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <CircularProgress size={32} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <SubHeader breadcrumbs={breadcrumbs} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <Typography color="error" sx={{ fontSize: "0.85rem" }}>{error}</Typography>
        </Box>
      </Container>
    );
  }

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
                {isSubmitting ? "กำลังบันทึก..." : t("save")}
              </Button>
            }
          />
          <Create />
        </div>
      </Container>
    </FormProvider>
  );
}
