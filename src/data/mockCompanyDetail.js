/**
 * Mock Data for Company Detail (Customer Detail)
 * ข้อมูลรายละเอียดบริษัท 10 บริษัท
 */

export const mockCompanyDetail = [
  {
    companyId: "1",
    // Address
    addressTh: "123 ถนนสุขุมวิท แขวงคลองตัน",
    addressEn: "123 Sukhumvit Road, Khlong Toei",
    provinceTh: "กรุงเทพมหานคร",
    districtTh: "คลองตัน",
    provinceId: "10",
    subdistrictTh: "คลองตัน",
    postalCode: "10110",

    // Contact
    dEmailCorpId: "DMAIL001",
    telephone: "022345678",
    fax: "022345679",

    // Business role
    partyRole: "seller",
    sellerTradeLevel: "manufacturer",
    exporterCode: "EXP001",
    warehouseId: "WH001",
    nswid: "NSW001",

    // Branch & group
    branchCode: "0000",
    companyGroupType: "customer",
    customerLevel: "1",
    isCalculateCostWith5Decimal: false,

    // Sign settings
    isCustomerSelfElectronicSigned: true,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: [],

    // Only signer settings
    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: false,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: [],

    // Privilege / rights
    isGeneralStandard: true,
    isGoldCard: false,
    isCustomerBroker: false,
    goldCardNo: "",
    customerBrokerNo: "",

    // Tax refund / compensation
    agentCustomerSequenceNo: "AGENT001",
    compensationPayeeRegistrationNo: "COMP001",
    aeosrefno: "AEOS001",

    // Other customs details
    bondedManufacturingWarehose: "BMW001",
    freeZoneOperator: "",
    exportProcessingZoneOperator: "",
    section19bis: "19BIS001",

    guaranteeReferenceNumber: "GRN001",
    bondNo: "BOND001",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    // Login
    loginName: "tech_innovation",
    password: "Tech@2024",
    confirmPassword: "Tech@2024",

    // Report forms
    importReportForm: "FORM001",
    exportReportForm: "FORM002",
    exportReoirtFormAfterExport: "FORM003",
  },
  {
    companyId: "2",
    addressTh: "456 ถนนรัชดาภิเษก แขวงห้วยขวาง",
    addressEn: "456 Ratchadaphisek Road, Huai Khwang",
    provinceTh: "กรุงเทพมหานคร",
    districtTh: "ห้วยขวาง",
    provinceId: "10",
    subdistrictTh: "ห้วยขวาง",
    postalCode: "10310",

    dEmailCorpId: "DMAIL002",
    telephone: "023456789",
    fax: "023456790",

    partyRole: "agent",
    sellerTradeLevel: "distributor",
    exporterCode: "EXP002",
    warehouseId: "WH002",
    nswid: "NSW002",

    branchCode: "0000",
    companyGroupType: "supplier",
    customerLevel: "2",
    isCalculateCostWith5Decimal: true,

    isCustomerSelfElectronicSigned: true,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: [],

    isCustomerOnlySigner: true,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: false,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: ["customerOnlySigner"],

    isGeneralStandard: false,
    isGoldCard: true,
    isCustomerBroker: false,
    goldCardNo: "GC002",
    customerBrokerNo: "",

    agentCustomerSequenceNo: "AGENT002",
    compensationPayeeRegistrationNo: "COMP002",
    aeosrefno: "AEOS002",

    bondedManufacturingWarehose: "",
    freeZoneOperator: "FZO002",
    exportProcessingZoneOperator: "",
    section19bis: "",

    guaranteeReferenceNumber: "",
    bondNo: "",
    depositNo: "DEP002",
    isPayTherDepartmentFeeOf200BahtPerDocument: true,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    loginName: "global_logistics",
    password: "Global@2024",
    confirmPassword: "Global@2024",

    importReportForm: "FORM004",
    exportReportForm: "FORM005",
    exportReoirtFormAfterExport: "FORM006",
  },
  {
    companyId: "3",
    addressTh: "789 ถนนมิตรภาพ ตำบลในเมือง",
    addressEn: "789 Mittraphap Road, Nai Mueang",
    provinceTh: "นครราชสีมา",
    districtTh: "เมืองนครราชสีมา",
    provinceId: "30",
    subdistrictTh: "ในเมือง",
    postalCode: "30000",

    dEmailCorpId: "DMAIL003",
    telephone: "044123456",
    fax: "044123457",

    partyRole: "seller",
    sellerTradeLevel: "manufacturer",
    exporterCode: "EXP003",
    warehouseId: "WH003",
    nswid: "NSW003",

    branchCode: "0000",
    companyGroupType: "supplier",
    customerLevel: "1",
    isCalculateCostWith5Decimal: false,

    isCustomerSelfElectronicSigned: true,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: [],

    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: false,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: [],

    isGeneralStandard: true,
    isGoldCard: false,
    isCustomerBroker: true,
    goldCardNo: "",
    customerBrokerNo: "CB003",

    agentCustomerSequenceNo: "",
    compensationPayeeRegistrationNo: "",
    aeosrefno: "AEOS003",

    bondedManufacturingWarehose: "",
    freeZoneOperator: "",
    exportProcessingZoneOperator: "",
    section19bis: "",

    guaranteeReferenceNumber: "",
    bondNo: "",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "RTR003",
    rubberExporterRegistrationNo: "RER003",
    ltrBlockRubberManufacturerRegistrationNo: "LTR003",

    loginName: "thai_rubber",
    password: "Rubber@2024",
    confirmPassword: "Rubber@2024",

    importReportForm: "FORM007",
    exportReportForm: "FORM008",
    exportReoirtFormAfterExport: "FORM009",
  },
  {
    companyId: "4",
    addressTh: "321 ถนนพหลโยธิน ตำบลในเมือง",
    addressEn: "321 Phahonyothin Road, Nai Mueang",
    provinceTh: "เชียงใหม่",
    districtTh: "เมืองเชียงใหม่",
    provinceId: "50",
    subdistrictTh: "ศรีภูมิ",
    postalCode: "50200",

    dEmailCorpId: "DMAIL004",
    telephone: "053234567",
    fax: "053234568",

    partyRole: "seller",
    sellerTradeLevel: "exporter",
    exporterCode: "EXP004",
    warehouseId: "WH004",
    nswid: "NSW004",

    branchCode: "0000",
    companyGroupType: "customer",
    customerLevel: "2",
    isCalculateCostWith5Decimal: false,

    isCustomerSelfElectronicSigned: false,
    isSignInvoice: true,
    isSignExport: true,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: ["signInvoice", "signExportManifest"],

    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: false,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: [],

    isGeneralStandard: true,
    isGoldCard: false,
    isCustomerBroker: false,
    goldCardNo: "",
    customerBrokerNo: "",

    agentCustomerSequenceNo: "AGENT004",
    compensationPayeeRegistrationNo: "",
    aeosrefno: "",

    bondedManufacturingWarehose: "",
    freeZoneOperator: "",
    exportProcessingZoneOperator: "",
    section19bis: "19BIS004",

    guaranteeReferenceNumber: "",
    bondNo: "",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    loginName: "agri_export",
    password: "Agri@2024",
    confirmPassword: "Agri@2024",

    importReportForm: "FORM010",
    exportReportForm: "FORM011",
    exportReoirtFormAfterExport: "FORM012",
  },
  {
    companyId: "5",
    addressTh: "654 ถนนสีลม แขวงสีลม",
    addressEn: "654 Silom Road, Silom",
    provinceTh: "กรุงเทพมหานคร",
    districtTh: "บางรัก",
    provinceId: "10",
    subdistrictTh: "สีลม",
    postalCode: "10500",

    dEmailCorpId: "DMAIL005",
    telephone: "022345678",
    fax: "022345679",

    partyRole: "buyer",
    sellerTradeLevel: "importer",
    exporterCode: "",
    warehouseId: "",
    nswid: "NSW005",

    branchCode: "0000",
    companyGroupType: "customer",
    customerLevel: "3",
    isCalculateCostWith5Decimal: true,

    isCustomerSelfElectronicSigned: true,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: [],

    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: true,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: ["customerOnlySignerImport"],

    isGeneralStandard: true,
    isGoldCard: false,
    isCustomerBroker: false,
    goldCardNo: "",
    customerBrokerNo: "",

    agentCustomerSequenceNo: "",
    compensationPayeeRegistrationNo: "",
    aeosrefno: "",

    bondedManufacturingWarehose: "",
    freeZoneOperator: "",
    exportProcessingZoneOperator: "",
    section19bis: "",

    guaranteeReferenceNumber: "GRN005",
    bondNo: "BOND005",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    loginName: "electronic_import",
    password: "Elect@2024",
    confirmPassword: "Elect@2024",

    importReportForm: "FORM013",
    exportReportForm: "",
    exportReoirtFormAfterExport: "",
  },
  {
    companyId: "6",
    addressTh: "987 ถนนบางนา-ตราด ตำบลบางพลี",
    addressEn: "987 Bang Na-Trat Road, Bang Phli",
    provinceTh: "สมุทรปราการ",
    districtTh: "บางพลี",
    provinceId: "74",
    subdistrictTh: "บางพลี",
    postalCode: "10540",

    dEmailCorpId: "DMAIL006",
    telephone: "023456789",
    fax: "023456790",

    partyRole: "seller",
    sellerTradeLevel: "manufacturer",
    exporterCode: "EXP006",
    warehouseId: "WH006",
    nswid: "NSW006",

    branchCode: "0000",
    companyGroupType: "supplier",
    customerLevel: "1",
    isCalculateCostWith5Decimal: false,

    isCustomerSelfElectronicSigned: true,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: [],

    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: false,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: [],

    isGeneralStandard: false,
    isGoldCard: true,
    isCustomerBroker: false,
    goldCardNo: "GC006",
    customerBrokerNo: "",

    agentCustomerSequenceNo: "",
    compensationPayeeRegistrationNo: "",
    aeosrefno: "AEOS006",

    bondedManufacturingWarehose: "BMW006",
    freeZoneOperator: "",
    exportProcessingZoneOperator: "",
    section19bis: "",

    guaranteeReferenceNumber: "",
    bondNo: "BOND006",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    loginName: "bonded_warehouse",
    password: "Bonded@2024",
    confirmPassword: "Bonded@2024",

    importReportForm: "FORM014",
    exportReportForm: "FORM015",
    exportReoirtFormAfterExport: "FORM016",
  },
  {
    companyId: "7",
    addressTh: "147 ถนนรัชดาภิเษก แขวงห้วยขวาง",
    addressEn: "147 Ratchadaphisek Road, Huai Khwang",
    provinceTh: "กรุงเทพมหานคร",
    districtTh: "ห้วยขวาง",
    provinceId: "10",
    subdistrictTh: "ห้วยขวาง",
    postalCode: "10310",

    dEmailCorpId: "DMAIL007",
    telephone: "023456789",
    fax: "023456790",

    partyRole: "agent",
    sellerTradeLevel: "freight forwarder",
    exporterCode: "",
    warehouseId: "",
    nswid: "NSW007",

    branchCode: "0000",
    companyGroupType: "freight forwarder",
    customerLevel: "2",
    isCalculateCostWith5Decimal: true,

    isCustomerSelfElectronicSigned: true,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: [],

    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: false,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: [],

    isGeneralStandard: true,
    isGoldCard: false,
    isCustomerBroker: false,
    goldCardNo: "",
    customerBrokerNo: "",

    agentCustomerSequenceNo: "",
    compensationPayeeRegistrationNo: "",
    aeosrefno: "",

    bondedManufacturingWarehose: "",
    freeZoneOperator: "",
    exportProcessingZoneOperator: "",
    section19bis: "",

    guaranteeReferenceNumber: "",
    bondNo: "",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    loginName: "freight_forwarder",
    password: "Freight@2024",
    confirmPassword: "Freight@2024",

    importReportForm: "FORM017",
    exportReportForm: "FORM018",
    exportReoirtFormAfterExport: "FORM019",
  },
  {
    companyId: "8",
    addressTh: "258 ถนนท่าแซะ ตำบลท่าแซะ",
    addressEn: "258 Tha Sae Road, Tha Sae",
    provinceTh: "ชุมพร",
    districtTh: "ท่าแซะ",
    provinceId: "86",
    subdistrictTh: "ท่าแซะ",
    postalCode: "86140",

    dEmailCorpId: "DMAIL008",
    telephone: "077345678",
    fax: "077345679",

    partyRole: "seller",
    sellerTradeLevel: "exporter",
    exporterCode: "EXP008",
    warehouseId: "WH008",
    nswid: "NSW008",

    branchCode: "0000",
    companyGroupType: "supplier",
    customerLevel: "2",
    isCalculateCostWith5Decimal: false,

    isCustomerSelfElectronicSigned: true,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: [],

    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: false,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: [],

    isGeneralStandard: true,
    isGoldCard: false,
    isCustomerBroker: false,
    goldCardNo: "",
    customerBrokerNo: "",

    agentCustomerSequenceNo: "AGENT008",
    compensationPayeeRegistrationNo: "",
    aeosrefno: "",

    bondedManufacturingWarehose: "",
    freeZoneOperator: "",
    exportProcessingZoneOperator: "",
    section19bis: "",

    guaranteeReferenceNumber: "",
    bondNo: "",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    loginName: "seafood_products",
    password: "Seafood@2024",
    confirmPassword: "Seafood@2024",

    importReportForm: "FORM020",
    exportReportForm: "FORM021",
    exportReoirtFormAfterExport: "FORM022",
  },
  {
    companyId: "9",
    addressTh: "369 ถนนสุขุมวิท ตำบลนาเกลือ",
    addressEn: "369 Sukhumvit Road, Na Kluea",
    provinceTh: "ชลบุรี",
    districtTh: "บางละมุง",
    provinceId: "20",
    subdistrictTh: "นาเกลือ",
    postalCode: "20150",

    dEmailCorpId: "DMAIL009",
    telephone: "038123456",
    fax: "038123457",

    partyRole: "seller",
    sellerTradeLevel: "manufacturer",
    exporterCode: "EXP009",
    warehouseId: "WH009",
    nswid: "NSW009",

    branchCode: "0000",
    companyGroupType: "supplier",
    customerLevel: "1",
    isCalculateCostWith5Decimal: false,

    isCustomerSelfElectronicSigned: true,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: false,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: [],

    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: true,
    isCustomerOnlySignerImport: true,
    isCustomerOnlySignerInvoice: true,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: ["customerOnlySignerExport", "customerOnlySignerImport", "customerOnlySignerInvoice"],

    isGeneralStandard: false,
    isGoldCard: true,
    isCustomerBroker: false,
    goldCardNo: "GC009",
    customerBrokerNo: "",

    agentCustomerSequenceNo: "",
    compensationPayeeRegistrationNo: "",
    aeosrefno: "AEOS009",

    bondedManufacturingWarehose: "",
    freeZoneOperator: "FZO009",
    exportProcessingZoneOperator: "EPZO009",
    section19bis: "",

    guaranteeReferenceNumber: "",
    bondNo: "",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    loginName: "freezone_operator",
    password: "Freezone@2024",
    confirmPassword: "Freezone@2024",

    importReportForm: "FORM023",
    exportReportForm: "FORM024",
    exportReoirtFormAfterExport: "FORM025",
  },
  {
    companyId: "10",
    addressTh: "741 ถนนพหลโยธิน แขวงลาดยาว",
    addressEn: "741 Phahonyothin Road, Lat Yao",
    provinceTh: "กรุงเทพมหานคร",
    districtTh: "จตุจักร",
    provinceId: "10",
    subdistrictTh: "ลาดยาว",
    postalCode: "10900",

    dEmailCorpId: "DMAIL010",
    telephone: "025678901",
    fax: "025678902",

    partyRole: "buyer",
    sellerTradeLevel: "retailer",
    exporterCode: "",
    warehouseId: "",
    nswid: "NSW010",

    branchCode: "0000",
    companyGroupType: "customer",
    customerLevel: "4",
    isCalculateCostWith5Decimal: true,

    isCustomerSelfElectronicSigned: false,
    isSignInvoice: false,
    isSignExport: false,
    isSignImport: true,
    isSignDelivery: false,
    isSignShortShip: false,
    signOptions: ["signImportManifest"],

    isCustomerOnlySigner: false,
    isCustomerOnlySignerExport: false,
    isCustomerOnlySignerImport: false,
    isCustomerOnlySignerInvoice: false,
    isCustomerOnlySignerShortShip: false,
    signNotAllowedOptions: [],

    isGeneralStandard: true,
    isGoldCard: false,
    isCustomerBroker: false,
    goldCardNo: "",
    customerBrokerNo: "",

    agentCustomerSequenceNo: "",
    compensationPayeeRegistrationNo: "",
    aeosrefno: "",

    bondedManufacturingWarehose: "",
    freeZoneOperator: "",
    exportProcessingZoneOperator: "",
    section19bis: "",

    guaranteeReferenceNumber: "",
    bondNo: "",
    depositNo: "",
    isPayTherDepartmentFeeOf200BahtPerDocument: false,

    rubberTraderRegistrationNo: "",
    rubberExporterRegistrationNo: "",
    ltrBlockRubberManufacturerRegistrationNo: "",

    loginName: "machinery_dist",
    password: "Machine@2024",
    confirmPassword: "Machine@2024",

    importReportForm: "FORM026",
    exportReportForm: "",
    exportReoirtFormAfterExport: "",
  },
];

export default mockCompanyDetail;

