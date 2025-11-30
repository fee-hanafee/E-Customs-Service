const defaultValues = {
  id: "",
  customerId: "", // is not null          // รหัสลูกค้า
  taxId: "", // is not null              // เลขประจำตัวผู้เสียภาษี
  companyPrefix: "", // คำนำหน้าชื่อบริษัท
  companyNameTh: "", // is not null      // ชื่อบริษัท (ไทย)
  companyNameEn: "", // is not null      // ชื่อบริษัท (อังกฤษ)

  // system info
  createDate: "", // วันที่สร้าง
  createBy: "", // ผู้สร้าง
  updateDate: "", // วันที่อัปเดต
  updateBy: "", // ผู้อัปเดต
  isActive: "", // true, false สถานะ
  isDeleted: "", // true, false ลบ

  // ─────────────────────────────────────
  // ข้อมูลลูกค้า (รายละเอียดบริษัท)
  // ─────────────────────────────────────
  customerDetail: {
    // address
    addressTh: "", // is not null      // ที่อยู่เลขที่
    addressEn: "", // Address
    provinceTh: "", // is not null    // จังหวัด
    districtTh: "", // is not null    // อำเภอ/เขต
    provinceId: "", // รหัสจังหวัด
    subdistrictTh: "", // is not null //ตำบล/แขวง
    postalCode: "", // is not null    // รหัสไปรษณีย์

    // contact (บริษัท)

    dEmailCorpId: "", // D-Mail Corp Id
    telephone: "", // is not null //โทรศัพท์
    fax: "", //โทรสาร

    // business role
    partyRole: "", // buyer, seller, agent, etc. // ฐานะของผู้ซื้อ/ผู้ขาย
    sellerTradeLevel: "", // manufacturer, distributor, retailer, importer, exporter, etc. // ระดับการค้าของผู้ขาย
    exporterCode: "", // รหัสผู้ส่งออก 19 ทวิ
    warehouseId: "", // รหัสคลังสินค้า
    nswid: "", // NSWID

    // branch & group
    branchCode: "0000", // 0000 สาขาหลัก ... // is not null ลำดับที่สาขา
    companyGroupType: "customer", // customer, supplier, vender, carrier, freight forwarder, etc.  // is not null รหัสกลุ่มบริษัท
    customerLevel: "", // 1, 2, 3, 4, 5 ระดับลูกค้า
    isCalculateCostWith5Decimal: false, // true, false คำนวณ คชจ. ทศนิยม 5 ตำแหน่ง

    // sign settings
    isCustomerSelfElectronicSigned: false, // true, false ลูกค้าเป็นคนลงลายมือชื่ออิเล็กทรอนิกส์เอง
    isSignInvoice: false, // true, false Sign Invoice
    isSignExport: false, // true, false Sign ใบขนสินค้าขาออก
    isSignImport: false, // true, false Sign ใบขนสินค้าขาเข้า
    isSignDelivery: false, // true, false Sign ใบกำกับการขนย้าย
    isSignShortShip: false, // true, false Sign ใบ Short Ship
    signOptions: [], // array of selected sign options: ["customerSignsOwn", "signInvoice", "signExportManifest", "signImportManifest", "signTransportPermit", "signShortShip"]

    // only signer settings
    isCustomerOnlySigner: false, // true, false ไม่อนุญาตให้ลงลายมือชื่อแทน
    isCustomerOnlySignerExport: false, // true, false ไม่อนุญาตให้ลงลายมือชื่อแทน ในใบขนขาออก
    isCustomerOnlySignerImport: false, // true, false ไม่อนุญาตให้ลงลายมือชื่อแทน ในใบขนขาเข้า
    isCustomerOnlySignerInvoice: false, // true, false ไม่อนุญาตให้ลงลายมือชื่อแทน ใบกำกับ
    isCustomerOnlySignerShortShip: false, // true, false ไม่อนุญาตให้ลงลายมือชื่อแทน ใบShortShip
    signNotAllowedOptions: [], // array of selected sign not allowed options: ["customerOnlySigner", "customerOnlySignerExport", "customerOnlySignerImport", "customerOnlySignerInvoice", "customerOnlySignerShortShip"]

    // privilege / rights
    isGeneralStandard: true, // true, false ใช้สิทธิ์ ทั่วไป
    isGoldCard: false, // true, false ใช้สิทธิ์ Gold Card
    isCustomerBroker: false, // true, false ใช้สิทธิ์ Customer Broker
    goldCardNo: "", // หมายเลข Gold Card
    customerBrokerNo: "", // หมายเลข Customer Broker

    // tax refund / compensation
    agentCustomerSequenceNo: "", // รหัสผู้ขอชดเชยภาษี
    compensationPayeeRegistrationNo: "", // เลขทะเบียนผู้รับเงินชดเชย
    aeosrefno: "", // รหัสอ้างอิง AEOS // AEOs RefNo

    // other customs details
    bondedManufacturingWarehose: "", // คลังสินค้าทัณฑ์บนประเภทโรงผลิต
    freeZoneOperator: "", // ผู้ประกอบกิจการในเขตปลอดอากร
    exportProcessingZoneOperator: "", // ผู้ประกอบกิจการในเขตประกอบการเสรี
    section19bis: "", // 19 ทวิ

    guaranteeReferenceNumber: "", // หลักวางประกันเลขที่
    bondNo: "", // ทัณฑ์บนเลขที่
    depositNo: "", // มัดจำที่
    isPayTherDepartmentFeeOf200BahtPerDocument: "", // true, false ชำระค่าธรรมเนียมกรมฯ ฉบับละ 200 บาท

    rubberTraderRegistrationNo: "", // เลขทะเบียนผู้ค้ายาง
    rubberExporterRegistrationNo: "", // เลขทะเบียนผู้ส่งออกยางพารา
    ltrBlockRubberManufacturerRegistrationNo: "", // เลขทะเบียนผู้ผลิตยางแท่งเอลทีอาร์

    // login
    loginName: "", // ชื่อผู้ใช้งาน
    password: "", // รหัสผ่าน
    confirmPassword: "", // ยืนยันรหัสผ่าน

    // report forms
    importReportForm: "", // ฟอร์มรายงาน ขาเข้า
    exportReportForm: "", // ฟอร์มรายงาน ขาออก
    exportReoirtFormAfterExport: "", // ฟอร์มรายงาน ขาออก หลังใบขน
  },

  // ─────────────────────────────────────
  // ข้อมูลผู้ติดต่อ (Contact Person)
  // ─────────────────────────────────────
  contactPerson: [
    {
      name: "", // ชื่อผู้ติดต่อ
      position: "", // ตำแหน่งผู้ติดต่อ
      telephone: "", // โทรศัพท์ผู้ติดต่อ
      email: "", // อีเมลผู้ติดต่อ
      fax: "", // โทรสารผู้ติดต่อ
      mobile: "", // มือถือผู้ติดต่อ
    },
  ],
};

export default defaultValues;
