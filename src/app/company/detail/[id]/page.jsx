"use client";

import { useState, useEffect } from "react";
import Container from "@/app/components/layout/Container";
import SubHeader from "@/app/components/layout/SubHeader";
import Button from "@/app/components/ui/Button";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {
  CircularProgress,
  Box,
  Paper,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { getCompanyDetailById } from "@/services/CompanyService";
import FormGroup from "../../components/FormGroup";

export default function Detail() {
  const t = useTranslations("company");
  const { id } = useParams();
  const router = useRouter();

  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCompanyDetailById(id);
        setCompanyData(data);
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
  }, [id]);

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
        alignItems: "center",
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
        alignItems: "center",
      }}
    >
      {companyData?.companyNameTh || "Detail"}
    </Typography>,
  ];

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

  if (!companyData) {
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
          <Typography sx={{ fontSize: "0.85rem" }}>Company not found</Typography>
        </Box>
      </Container>
    );
  }

  const detail = companyData.detail || {};
  const contactPersons = companyData.contactPerson || [];

  // ---------- Helper Components ----------
  const DisplayField = ({
    label,
    value,
    emptyText = "-",
  }) => (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: "0.75rem" }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.25, minHeight: "20px", fontSize: "0.875rem" }}>
        {value && value !== "" ? value : emptyText}
      </Typography>
    </Box>
  );

  const DisplayBoolean = ({
    label,
    value,
  }) => (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: "0.75rem" }}
      >
        {label}
      </Typography>
      <Chip
        label={value ? t("active") : t("inactive")}
        color={value ? "success" : "default"}
        size="small"
        sx={{ mt: 0.25, height: 20, fontSize: "0.7rem" }}
      />
    </Box>
  );

  const formatDateTime = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container>
      <SubHeader
        breadcrumbs={breadcrumbs}
        Action={
          <Button onClick={() => router.push(`/company/edit/${id}`)}>
            {t("edit")}
          </Button>
        }
      />

      {/* SUMMARY CARD */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 0.75, sm: 1 },
          mt: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              {companyData.companyPrefix} {companyData.companyNameTh}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 0.25, fontSize: "0.875rem" }}
            >
              {companyData.companyNameEn}
            </Typography>

            <Stack direction="row" spacing={0.75} sx={{ mt: 0.5, flexWrap: "wrap" }}>
              <Chip
                size="small"
                color={companyData.isActive ? "success" : "default"}
                label={
                  companyData.isActive ? t("active") : t("inactive")
                }
              />
              {companyData.isDeleted && (
                <Chip
                  size="small"
                  color="error"
                  variant="outlined"
                  label={t("isDeleted")}
                />
              )}
            </Stack>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
              gap: 1.5,
              minWidth: { sm: "240px", md: "320px" },
            }}
          >
            <DisplayField label={t("taxId")} value={companyData.taxId} />
            <DisplayField
              label={t("customerId")}
              value={companyData.customerId}
            />
            <DisplayField
              label={t("createDate")}
              value={formatDateTime(companyData.createDate)}
            />
            <DisplayField
              label={t("updateDate")}
              value={formatDateTime(companyData.updateDate)}
            />
          </Box>
        </Box>
      </Paper>

      {/* MAIN DETAIL */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 0.75, sm: 1 },
          mt: 1,
        }}
      >
        <div className="grid grid-cols-12 gap-3">
          {/* LEFT COLUMN: BASIC / ADDRESS / BUSINESS / CONTACT */}
          <section className="col-span-12 lg:col-span-7 space-y-3">
            {/* Basic Info */}
            <FormGroup title={t("section.basicInfo")} layout="grid">
              <DisplayField
                label={t("companyPrefix")}
                value={companyData.companyPrefix}
              />
              <DisplayField
                label={t("branchCode")}
                value={detail.branchCode}
              />
              <DisplayField
                label={t("companyGroupType")}
                value={detail.companyGroupType}
              />
              <DisplayField
                label={t("customerLevel")}
                value={detail.customerLevel}
              />
            </FormGroup>

            {/* Address TH / EN */}
            <FormGroup title={t("section.address")} layout="grid">
              <Box sx={{ gridColumn: "1 / -1" }}>
                <DisplayField label={t("addressTh")} value={detail.addressTh} />
              </Box>
              <DisplayField
                label={t("provinceTh")}
                value={detail.provinceTh}
              />
              <DisplayField
                label={t("districtTh")}
                value={detail.districtTh}
              />
              <DisplayField
                label={t("subdistrictTh")}
                value={detail.subdistrictTh}
              />
              <DisplayField
                label={t("postalCode")}
                value={detail.postalCode}
              />
              <Box sx={{ gridColumn: "1 / -1" }}>
                <DisplayField label={t("addressEn")} value={detail.addressEn} />
              </Box>
            </FormGroup>

            {/* Business / Role */}
            <FormGroup title={t("section.businessRole")} layout="grid">
              <DisplayField label={t("partyRole")} value={detail.partyRole} />
              <DisplayField
                label={t("sellerTradeLevel")}
                value={detail.sellerTradeLevel}
              />
              <DisplayField
                label={t("exporterCode")}
                value={detail.exporterCode}
              />
              <DisplayField
                label={t("warehouseId")}
                value={detail.warehouseId}
              />
              <DisplayField label={t("nswid")} value={detail.nswid} />
            </FormGroup>

            {/* Contact */}
            <FormGroup title={t("section.contact")} layout="grid">
              <DisplayField
                label={t("dEmailCorpId")}
                value={detail.dEmailCorpId}
              />
              <DisplayField
                label={t("telephone")}
                value={detail.telephone}
              />
              <DisplayField label={t("fax")} value={detail.fax} />
            </FormGroup>
          </section>

          {/* RIGHT COLUMN: SIGN / PRIVILEGE / OTHER CUSTOMS */}
          <section className="col-span-12 lg:col-span-5 space-y-3">
            {/* Sign Settings */}
            <FormGroup title={t("sign.title")}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <DisplayBoolean
                  label={t("sign.options.customerSignsOwn")}
                  value={detail.isCustomerSelfElectronicSigned}
                />

                {detail.signOptions && detail.signOptions.length > 0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      {t("sign.selectedItems")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.75,
                        mt: 0.25,
                      }}
                    >
                      {detail.signOptions.map((option) => (
                        <Chip
                          key={option}
                          label={t(`sign.options.${option}`) || option}
                          size="small"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </FormGroup>

            {/* Sign Not Allowed / Only Signer */}
            <FormGroup title={t("signNotAllowed.title")}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <DisplayBoolean
                  label={t("signNotAllowed.options.customerOnlySigner")}
                  value={detail.isCustomerOnlySigner}
                />

                {detail.signNotAllowedOptions && detail.signNotAllowedOptions.length > 0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      {t("signNotAllowed.selectedItems")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.75,
                        mt: 0.25,
                      }}
                    >
                      {detail.signNotAllowedOptions.map((option) => (
                        <Chip
                          key={option}
                          label={t(`signNotAllowed.options.${option}`) || option}
                          size="small"
                          color="warning"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </FormGroup>

            {/* Privilege / Rights */}
            <FormGroup title={t("section.privilege")} layout="grid">
              <DisplayBoolean
                label={t("isGeneralStandard")}
                value={detail.isGeneralStandard}
              />
              <DisplayBoolean
                label={t("isGoldCard")}
                value={detail.isGoldCard}
              />
              {detail.isGoldCard && (
                <DisplayField label={t("goldCardNo")} value={detail.goldCardNo} />
              )}
              <DisplayBoolean
                label={t("isCustomerBroker")}
                value={detail.isCustomerBroker}
              />
              {detail.isCustomerBroker && (
                <DisplayField
                  label={t("customerBrokerNo")}
                  value={detail.customerBrokerNo}
                />
              )}
              <DisplayBoolean
                label={t("isCalculateCostWith5Decimal")}
                value={detail.isCalculateCostWith5Decimal}
              />
            </FormGroup>

            {/* Other Customs Info */}
            <FormGroup title={t("section.customsOther")} layout="grid">
              <DisplayField
                label={t("agentCustomerSequenceNo")}
                value={detail.agentCustomerSequenceNo}
              />
              <DisplayField
                label={t("compensationPayeeRegistrationNo")}
                value={detail.compensationPayeeRegistrationNo}
              />
              <DisplayField
                label={t("aeosRefNo")}
                value={detail.aeosrefno}
              />
            </FormGroup>
          </section>

          {/* TAX INCENTIVES / GUARANTEE / RUBBER REGISTRATION */}
          <section className="col-span-12 mt-1 space-y-3">
            <Divider>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                {t("other")}
              </Typography>
            </Divider>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" },
                gap: 2,
              }}
            >
              {/* Tax Incentives ID */}
              <FormGroup title={t("section.taxIncentives")}>
                <DisplayField
                  label={t("others.bondedManufacturingWarehose")}
                  value={detail.bondedManufacturingWarehose}
                />
                <DisplayField
                  label={t("others.freeZoneOperator")}
                  value={detail.freeZoneOperator}
                />
                <DisplayField
                  label={t("others.exportProcessingZoneOperator")}
                  value={detail.exportProcessingZoneOperator}
                />
                <DisplayField
                  label={t("others.section19bis")}
                  value={detail.section19bis}
                />
              </FormGroup>

              {/* Guarantee / Bond / Deposit */}
              <FormGroup title={t("section.guarantee")} layout="grid">
                <Box sx={{ gridColumn: "1 / -1" }}>
                  <DisplayField
                    label={t("others.guaranteeReferenceNumber")}
                    value={detail.guaranteeReferenceNumber}
                  />
                </Box>
                <DisplayField
                  label={t("others.bondNo")}
                  value={detail.bondNo}
                />
                <DisplayField
                  label={t("others.depositNo")}
                  value={detail.depositNo}
                />
                <Box sx={{ gridColumn: "1 / -1" }}>
                  <DisplayBoolean
                    label={t(
                      "others.isPayTherDepartmentFeeOf200BahtPerDocument"
                    )}
                    value={detail.isPayTherDepartmentFeeOf200BahtPerDocument}
                  />
                </Box>
              </FormGroup>

              {/* Rubber Registration */}
              <FormGroup title={t("section.rubberRegistration")}>
                <DisplayField
                  label={t("others.rubberTraderRegistrationNo")}
                  value={detail.rubberTraderRegistrationNo}
                />
                <DisplayField
                  label={t("others.rubberExporterRegistrationNo")}
                  value={detail.rubberExporterRegistrationNo}
                />
                <DisplayField
                  label={t("others.ltrBlockRubberManufacturerRegistrationNo")}
                  value={detail.ltrBlockRubberManufacturerRegistrationNo}
                />
              </FormGroup>
            </Box>
          </section>

          {/* LOGIN & REPORT FORMS */}
          <section className="col-span-12 mt-1">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              {/* Login */}
              <FormGroup title={t("login")}>
                <DisplayField label={t("loginName")} value={detail.loginName} />
                {/* password ไม่โชว์จริง ใช้ mask */}
                <DisplayField label={t("password")} value="••••••••" />
              </FormGroup>

              {/* Report Forms */}
              <FormGroup title={t("reportForms")}>
                <DisplayField
                  label={t("importReportForm")}
                  value={detail.importReportForm}
                />
                <DisplayField
                  label={t("exportReportForm")}
                  value={detail.exportReportForm}
                />
                <DisplayField
                  label={t("exportReportFormAfterExport")}
                  value={detail.exportReoirtFormAfterExport}
                />
              </FormGroup>
            </Box>
          </section>

          {/* CONTACT PERSONS */}
          <section className="col-span-12 mt-1">
            <Divider sx={{ mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                {t("contactPersonTitle")}
              </Typography>
            </Divider>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                bgcolor: "background.paper",
              }}
            >
              {contactPersons.length > 0 ? (
                contactPersons.map((person, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      bgcolor: "background.paper",
                    }}
                  >
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-12 sm:col-span-6">
                        <DisplayField
                          label={t("contactPerson.name")}
                          value={person.name}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <DisplayField
                          label={t("contactPerson.position")}
                          value={person.position}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <DisplayField
                          label={t("contactPerson.telephone")}
                          value={person.telephone}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <DisplayField
                          label={t("contactPerson.mobile")}
                          value={person.mobile}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <DisplayField
                          label={t("contactPerson.email")}
                          value={person.email}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <DisplayField
                          label={t("contactPerson.fax")}
                          value={person.fax}
                        />
                      </div>
                    </div>
                  </Box>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ p: 1, fontSize: "0.875rem" }}
                >
                  {t("noData")}
                </Typography>
              )}
            </Box>
          </section>
        </div>
      </Paper>
    </Container>
  );
}
