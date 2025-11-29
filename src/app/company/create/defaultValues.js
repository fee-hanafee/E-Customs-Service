const defaultValues = {
  id: "",
  customerId: "", // is not null          // รหัสลูกค้า
  taxId: "", // is not null              // เลชประจำตัวผู้เสียภาษี
  companyPrefix: "", // คำนำหน้าชื่อบริษัท
  companyNameTh: "", // is not null      // ชื่อบริษัท (ไทย)
  companyNameEn: "", // is not null      // ชื่อบริษัท (อังกฤษ)
  //
  addressTh: "", // is not null      // ที่อยู่เลขที่
  addressEn: "", // Address
  provinceTh: "", // is not null    // จังหวัด
  districtTh: "", // is not null    // อำเภอ/เขต
  provinceId: "", // รหัสจังหวัด
  subdistrictTh: "", // is not null //ตำบล/แขวง
  postalCode: "", // is not null    // รหัสไปรษณีย์
  //
  telephone: "", // is not null //โทรศัพท์
  fax: "", //โทรสาร
  dEmailCorpId: "", // D-Mail Corp Id
  partyRole: "", // buyer, seller, agent, etc. // ฐานะของผู้ซื้อ/ผู้ขาย
  sellerTradeLevel: "", // manufacturer, distributor, retailer, importer, exporter, etc. // ระดับการค้าของผู้ขาย
  exporterCode: "", // is not null // รหัสผู้ส่งออก 19 ทวิ
  productWarehouseId: "", // รหัสคลังสินค้า
  nswid: "", // NSWID
  //
  branchCode: "", // 0000 สาขาหลัก 0001 สาขารอง 0002 สาขารอง 0003 สาขารอง 0004 สาขารอง 0005 สาขารอง  // is not null
  companyGroupType: "", // customer, supplier, vender, carrier, freight forwarder, etc.  // is not null
  customerLevel: "", // 1, 2, 3, 4, 5
  isCalculateCostWith5Decimal: "", // true, false
  //
  isCustomerSelfElectronicSigned: "", // true, false
  isSignInvoice: "", // true, false
  isSignExport: "", // true, false
  isSignImport: "", // true, false
  isSignDelivery: "", // true, false
  isSignShortShip: "", // true, false
  //
  isCustomerOnlySigner: "", // true, false
  isCustomerOnlySignerExport: "", // true, false
  isCustomerOnlySignerImport: "", // true, false
  isCustomerOnlySignerInvoice: "", // true, false
  isCustomerOnlySignerShortShip: "", // true, false
  //
  isGeneralStandard: "", // true, false
  isGoldCard: "", // true, false
  goldCardNo: "",
  isCustomerBroker: "", // true, false
  customerBrokerNo: "",
  //
  agentCustomerSequenceNo: "",
  compensationPayeeRegistrationNo: "",
  aeosrefno: "",

  // other details
  bondedManufacturingWarehose:"", // คลังสินค้าทัณฑ์บนประเภทโรงผลิต
  freeZoneOperator:"",  // ผู้ประกอบกิจการในเขตปลอดอากร
  exportProcessingZoneOperator:"", // ผู้ประกอบกิจการในเขตประกอบการเสรี
  section19bis:"" , // 19 ทวิ
  //
  guaranteeReferenceNumber:"" , // หลักวางประกันเลขที่
  bondNo:"",//ทัณฑ์บนเลขที่
  depositNo:"", // มัดจำที่
  isPayTherDepartmentFeeOf200BahtPerDocument:"" , // ชำระค่าธรรมเนียมกรมฯ ฉบับละ 200 บาท true, false
  //
  rubberTraderRegistrationNo:"", //เลขทะเบียนผู้ค้ายาง
  rubberExporterRegistrationNo:"", //เลขทะเบียนผู้ส่งออกยางพารา
  ltrBlockRubberManufacturerRegistrationNo:"", //เลขทะเบียนผู้ผลิตยางแท่งเอลทีอาร์
  //
  loginName:"", // ชื่อผู้ใช้งาน
  password:"", // รหัสผ่าน
  confirmPassword:"", // ยืนยันรหัสผ่าน
  //
  importReportForm: "", // ฟอร์มรายงาน ขาเข้า
  exportReportForm: "", // ฟอร์มรายงาน ขาออก
  exportReoirtFormAfterExport:"", //ฟอร์มรายงาน ขาออก หลังใบขน
  
};