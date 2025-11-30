import { Divider, Paper, Box, Typography } from "@mui/material";
import CustomerId from "../components/CustomerId";
import TaxId from "../components/TaxId";
import CompanyPrefix from "../components/CompanyPrefix";
import BranchCode from "../components/BranchCode";
import CompanyGroupType from "../components/CompanyGroupType";
import CompanyNameTh from "../components/CompanyNameTh";
import CompanyNameEn from "../components/CompanyNameEn";
import AddressTh from "../components/AddressTh";
import DistrictTh from "../components/DistrictTh";
import SubdistrictTh from "../components/SubdistrictTh";
import PostalCode from "../components/PostalCode";
import ProvinceTh from "../components/ProvinceTh";
import AddressEn from "../components/AddressEn";
import Telephone from "../components/Telephone";
import Fax from "../components/Fax";
import DEmailCorpId from "../components/DEmailCorpId";
import PartyRole from "../components/PartyRole";
import SellerTraderLevel from "../components/SellerTraderLevel";
import ExporterCode from "../components/ExporterCode";
import WarehoseId from "../components/WarehoseId";
import CustomerLevel from "../components/CustomerLevel";
import IsCalculateCostWith5Decimal from "../components/IsCalculateCostWith5Decimal";
import Nswid from "../components/Nswid";
import Sign from "../components/Sign";
import SignIsNotAllowed from "../components/SignIsNotAllowed";
import CheckBoxStandard from "../components/CheckBoxStandard";
import AgentCustomerSequenceNo from "../components/AgentCustomerSequenceNo";
import CompensationPayeeRegistrationNo from "../components/CompensationPayeeRegistrationNo";
import AeosRefNo from "../components/AeosRefNo";
import { useTranslations } from "next-intl";
import BondedManufacWarehose from "../components/BondedManufacWarehose";
import FreeZoneOperator from "../components/FreeZoneOperator";
import ExportProcessingZoneOperator from "../components/ExportProcessingZoneOperator";
import Section19bis from "../components/Section19bis";
import GuaranteeReferenceNumber from "../components/GuaranteeReferenceNumber";
import BondNo from "../components/BondNo";
import DepositNo from "../components/DepositNo";
import IsPayTherDepartmentFeeOf200BahtPerDocument from "../components/IsPayTherDepartmentFeeOf200BahtPerDocument";
import RubberTraderRegistrationNo from "../components/RubberTraderRegistrationNo";
import RubberExporterRegistrationNo from "../components/RubberExporterRegistrationNo";
import LtrBlockRubberManufacturerRegistrationNo from "../components/LtrBlockRubberManufacturerRegistrationNo";
import FormGroup from "../components/FormGroup";
import LoginName from "../components/LoginName";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import ImportReportForm from "../components/ImportReportForm";
import ExportReportForm from "../components/ExportReportForm";
import ExportReportFormAfterExport from "../components/ExportReportFormAfterExport";
import ContactPersonList from "../components/ContactPersonList";
export default function Create() {
  const t = useTranslations("company");
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 1, sm: 2 },
      }}
    >
      <div className="grid grid-cols-12 gap-1">
        <section className="col-span-12 sm:col-span-7">
          <div className="grid grid-cols-12 gap-1">
            <div className="col-span-12 sm:col-span-6">
              <TaxId />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <CustomerId />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <CompanyPrefix />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <BranchCode />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <CompanyGroupType />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <CompanyNameTh />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <CompanyNameEn />
            </div>
            <div className="col-span-12 ">
              <AddressTh />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <ProvinceTh />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <DistrictTh />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <SubdistrictTh />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <PostalCode />
            </div>
            <div className="col-span-12">
              <AddressEn />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <Telephone />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <Fax />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DEmailCorpId />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <PartyRole />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <SellerTraderLevel />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <ExporterCode />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <WarehoseId />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <CustomerLevel />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <IsCalculateCostWith5Decimal />
            </div>
            <div className="col-span-12 ">
              <Nswid />
            </div>
          </div>
        </section>
        {/*  */}
        <section className="col-span-12 sm:col-span-5">
          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              flexDirection: { sm: "row" },
              gap: "4px",
              alignItems: "stretch",
              minHeight: { sm: "100%" },
            }}
          >
            <div className="w-full h-full">
              <Sign />
              <SignIsNotAllowed />
              <CheckBoxStandard />
              <div className="grid grid-cols-12 gap-1">
                <div className="col-span-12 sm:col-span-4">
                  <AgentCustomerSequenceNo />
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <CompensationPayeeRegistrationNo />
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <AeosRefNo />
                </div>
              </div>
            </div>
          </Box>
        </section>

        <Divider className="col-span-12 pt-2 text-center">
          <p className="text-sm">{t("other")}</p>
        </Divider>

        <section className="col-span-12">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {/* Tax Incentives ID */}
            <FormGroup title="Tax Incentives ID">
              <BondedManufacWarehose />
              <FreeZoneOperator />
              <ExportProcessingZoneOperator />
              <Section19bis />
            </FormGroup>

            {/* Guarantee / Bond / Deposit */}
            <FormGroup title="Other Information" layout="grid">
              <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
                <GuaranteeReferenceNumber />
              </Box>
              <BondNo />
              <DepositNo />
              <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
                <IsPayTherDepartmentFeeOf200BahtPerDocument />
              </Box>
            </FormGroup>

            {/* Rubber Registration */}
            <FormGroup title="Rubber Registration">
              <RubberTraderRegistrationNo />
              <RubberExporterRegistrationNo />
              <LtrBlockRubberManufacturerRegistrationNo />
            </FormGroup>
          </Box>
        </section>

        <section className="col-span-12">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
              gap: 2,
            }}
          >
            {/* Login */}
            <FormGroup title={t("login")}>
              <LoginName />
              <Password />
              <ConfirmPassword />
            </FormGroup>

            {/* Report Forms */}
            <FormGroup title={t("reportForms")}>
              <ImportReportForm />
              <ExportReportForm />
              <ExportReportFormAfterExport />
            </FormGroup>
          </Box>
        </section>

        <Divider className="col-span-12 pt-2 text-center">
          <p className="text-sm">{t("contactPersonTitle")}</p>
        </Divider>

        <section className="col-span-12">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 500,
                color: "text.secondary",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
              }}
            >
              {t("contactPersonTitle")}
            </Typography>
            <ContactPersonList />
          </Box>
        </section>
      </div>
    </Paper>
  );
}
