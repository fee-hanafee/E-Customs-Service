"use client";

import { useMemo } from "react";
import thaiData from "thai-data";

/**
 * Hook สำหรับจัดการข้อมูลที่อยู่ไทย
 */
export function useThaiAddress() {
  // ดึงข้อมูลทั้งหมด
  const allData = useMemo(() => {
    try {
      return thaiData.getAllData() || [];
    } catch (error) {
      console.error("Error loading Thai address data:", error);
      return [];
    }
  }, []);

  // ดึงรายชื่อจังหวัดทั้งหมด (unique)
  const provinces = useMemo(() => {
    const provinceMap = new Map();
    const provinceNameMap = new Map();
    
    // สร้าง mapping ของ provinceId กับ zipCode
    const provinceZipMap = new Map();
    allData.forEach((item) => {
      if (item.subDistrictList && item.zipCode) {
        item.subDistrictList.forEach((sub) => {
          if (sub.provinceId && !provinceZipMap.has(sub.provinceId)) {
            provinceZipMap.set(sub.provinceId, item.zipCode);
          }
        });
      }
    });
    
    // ดึงชื่อจังหวัดจาก getAutoSuggestion
    provinceZipMap.forEach((zipCode, provinceId) => {
      try {
        const suggestion = thaiData.getAutoSuggestion(zipCode);
        if (suggestion && suggestion.provinceName) {
          provinceNameMap.set(provinceId, suggestion.provinceName);
        }
      } catch (error) {
        console.warn(`Error getting province name for ${provinceId}:`, error);
      }
    });
    
    // สร้างรายชื่อจังหวัด (ใช้ provinceId เป็น unique key)
    const provinceLabelCount = new Map();
    allData.forEach((item) => {
      if (item.subDistrictList) {
        item.subDistrictList.forEach((sub) => {
          if (sub.provinceId && !provinceMap.has(sub.provinceId)) {
            const provinceName = provinceNameMap.get(sub.provinceId) || 
                                 thaiData.getProvinceName(sub.provinceId) || 
                                 `จังหวัด ${sub.provinceId}`;
            
            // นับจำนวนจังหวัดที่มีชื่อซ้ำกัน
            const count = provinceLabelCount.get(provinceName) || 0;
            provinceLabelCount.set(provinceName, count + 1);
            
            provinceMap.set(sub.provinceId, {
              value: sub.provinceId,
              label: provinceName,
            });
          }
        });
      }
    });
    
    // ถ้ามีชื่อจังหวัดซ้ำ ให้เพิ่ม provinceId ใน label เพื่อให้ unique
    const provincesArray = Array.from(provinceMap.values());
    const duplicateNames = Array.from(provinceLabelCount.entries())
      .filter(([name, count]) => count > 1)
      .map(([name]) => name);
    
    provincesArray.forEach((province) => {
      if (duplicateNames.includes(province.label)) {
        province.label = `${province.label} (${province.value})`;
      }
    });
    
    return provincesArray.sort((a, b) => {
      // เรียงตามชื่อจังหวัด แต่ถ้าชื่อซ้ำให้เรียงตาม provinceId
      const nameCompare = a.label.localeCompare(b.label, "th");
      if (nameCompare === 0) {
        return a.value.localeCompare(b.value, "th");
      }
      return nameCompare;
    });
  }, [allData]);

  // ดึงรายชื่ออำเภอตามจังหวัด
  const getDistrictsByProvince = (provinceId) => {
    if (!provinceId) return [];
    const districtMap = new Map();
    // เก็บข้อมูลอำเภอจากข้อมูลทั้งหมด พร้อม zipCode และ subDistrictName สำหรับดึงชื่ออำเภอ
    const districtDataMap = new Map();
    
    allData.forEach((item) => {
      if (item.subDistrictList && item.zipCode) {
        item.subDistrictList.forEach((sub) => {
          if (sub.provinceId === provinceId && sub.districtId) {
            const key = `${sub.provinceId}-${sub.districtId}`;
            if (!districtDataMap.has(key)) {
              districtDataMap.set(key, {
                districtId: sub.districtId,
                provinceId: sub.provinceId,
                zipCode: item.zipCode,
                subDistrictName: sub.subDistrictName, // เก็บชื่อตำบลแรกเพื่อใช้ดึงชื่ออำเภอ
              });
            }
          }
        });
      }
    });
    
    // ดึงชื่ออำเภอจาก getAutoSuggestion
    const districtNameMap = new Map();
    districtDataMap.forEach((data) => {
      if (!districtNameMap.has(data.districtId)) {
        try {
          const suggestion = thaiData.getAutoSuggestion(data.zipCode, data.subDistrictName);
          if (suggestion && suggestion.districtName) {
            districtNameMap.set(data.districtId, suggestion.districtName);
          }
        } catch (error) {
          console.warn(`Error getting district name for ${data.districtId}:`, error);
        }
      }
    });
    
    // สร้างรายชื่ออำเภอ
    districtDataMap.forEach((data) => {
      if (!districtMap.has(data.districtId)) {
        const districtName = districtNameMap.get(data.districtId) || 
                            (() => {
                              // Fallback: ลองใช้ getDistrictNames
                              const districtNames = thaiData.getDistrictNames(data.districtId);
                              if (districtNames && Array.isArray(districtNames) && districtNames.length > 0) {
                                return districtNames[0];
                              } else if (districtNames && typeof districtNames === 'string') {
                                return districtNames;
                              }
                              return `อำเภอ ${data.districtId}`;
                            })();
        
        districtMap.set(data.districtId, {
          value: data.districtId,
          label: districtName,
          provinceId: data.provinceId,
        });
      }
    });
    
    return Array.from(districtMap.values()).sort((a, b) => a.label.localeCompare(b.label, "th"));
  };

  // ดึงรายชื่อตำบลตามอำเภอ
  const getSubdistrictsByDistrict = (districtId) => {
    if (!districtId) return [];
    const subdistrictMap = new Map();
    allData.forEach((item) => {
      if (item.subDistrictList) {
        item.subDistrictList.forEach((sub) => {
          if (sub.districtId === districtId && sub.subDistrictId && !subdistrictMap.has(sub.subDistrictId)) {
            subdistrictMap.set(sub.subDistrictId, {
              value: sub.subDistrictId,
              label: sub.subDistrictName || `ตำบล ${sub.subDistrictId}`,
              districtId: sub.districtId,
              provinceId: sub.provinceId,
            });
          }
        });
      }
    });
    return Array.from(subdistrictMap.values()).sort((a, b) => a.label.localeCompare(b.label, "th"));
  };

  // ดึงรหัสไปรษณีย์ตามตำบล
  const getPostalCodesBySubdistrict = (subdistrictId) => {
    if (!subdistrictId) return [];
    const postalCodeSet = new Set();
    allData.forEach((item) => {
      if (item.subDistrictList) {
        item.subDistrictList.forEach((sub) => {
          if (sub.subDistrictId === subdistrictId && item.zipCode) {
            postalCodeSet.add(item.zipCode);
          }
        });
      }
    });
    return Array.from(postalCodeSet)
      .sort()
      .map((zip) => ({
        value: zip,
        label: zip,
      }));
  };

  // ดึงรหัสไปรษณีย์ทั้งหมด (unique)
  const postalCodes = useMemo(() => {
    const postalCodeSet = new Set();
    allData.forEach((item) => {
      if (item.zipCode) {
        postalCodeSet.add(item.zipCode);
      }
    });
    return Array.from(postalCodeSet)
      .sort()
      .map((zip) => ({
        value: zip,
        label: zip,
      }));
  }, [allData]);

  // ดึงข้อมูลที่อยู่ตามรหัสไปรษณีย์
  const getAddressByZipCode = (zipCode) => {
    if (!zipCode) return null;
    try {
      return thaiData.getDataForZipCode(zipCode);
    } catch (error) {
      console.error("Error getting address by zip code:", error);
      return null;
    }
  };

  // ดึงตำบลตามรหัสไปรษณีย์
  const getSubdistrictsByZipCode = (zipCode) => {
    const data = getAddressByZipCode(zipCode);
    if (!data || !data.subDistrictList) return [];
    const subdistrictMap = new Map();
    data.subDistrictList.forEach((sub) => {
      if (sub.subDistrictId && !subdistrictMap.has(sub.subDistrictId)) {
        subdistrictMap.set(sub.subDistrictId, {
          value: sub.subDistrictId,
          label: sub.subDistrictName || `ตำบล ${sub.subDistrictId}`,
          districtId: sub.districtId,
          provinceId: sub.provinceId,
        });
      }
    });
    return Array.from(subdistrictMap.values()).sort((a, b) => a.label.localeCompare(b.label, "th"));
  };

  // ดึงอำเภอตามรหัสไปรษณีย์
  const getDistrictsByZipCode = (zipCode) => {
    const data = getAddressByZipCode(zipCode);
    if (!data || !data.subDistrictList) return [];
    const districtMap = new Map();
    
    data.subDistrictList.forEach((sub) => {
      if (sub.districtId && !districtMap.has(sub.districtId)) {
        // ใช้ getAutoSuggestion เพื่อดึงชื่ออำเภอ
        let districtName = `อำเภอ ${sub.districtId}`;
        try {
          const suggestion = thaiData.getAutoSuggestion(zipCode, sub.subDistrictName);
          if (suggestion && suggestion.districtName) {
            districtName = suggestion.districtName;
          } else {
            // Fallback: ลองใช้ getDistrictNames
            const districtNames = thaiData.getDistrictNames(sub.districtId);
            if (districtNames && Array.isArray(districtNames) && districtNames.length > 0) {
              districtName = districtNames[0];
            } else if (districtNames && typeof districtNames === 'string') {
              districtName = districtNames;
            }
          }
        } catch (error) {
          console.warn(`Error getting district name for ${sub.districtId}:`, error);
        }
        
        districtMap.set(sub.districtId, {
          value: sub.districtId,
          label: districtName,
          provinceId: sub.provinceId,
        });
      }
    });
    
    return Array.from(districtMap.values()).sort((a, b) => a.label.localeCompare(b.label, "th"));
  };

  // ดึงจังหวัดตามรหัสไปรษณีย์
  const getProvinceByZipCode = (zipCode) => {
    const data = getAddressByZipCode(zipCode);
    if (!data || !data.subDistrictList || data.subDistrictList.length === 0) return null;
    const firstSub = data.subDistrictList[0];
    if (!firstSub.provinceId) return null;
    
    // ใช้ getAutoSuggestion เพื่อดึงชื่อจังหวัด
    let provinceName = null;
    try {
      const suggestion = thaiData.getAutoSuggestion(zipCode);
      if (suggestion && suggestion.provinceName) {
        provinceName = suggestion.provinceName;
      }
    } catch (error) {
      console.warn(`Error getting province name for zip ${zipCode}:`, error);
    }
    
    return {
      value: firstSub.provinceId,
      label: provinceName || thaiData.getProvinceName(firstSub.provinceId) || `จังหวัด ${firstSub.provinceId}`,
    };
  };

  // ดึงคำแนะนำที่อยู่
  const getAddressSuggestions = (zipCode, subDistrict) => {
    if (zipCode) {
      return getAddressByZipCode(zipCode);
    }
    // ถ้ามี subDistrict สามารถค้นหาเพิ่มเติมได้
    return null;
  };

  return {
    provinces,
    postalCodes,
    getDistrictsByProvince,
    getSubdistrictsByDistrict,
    getPostalCodesBySubdistrict,
    getAddressByZipCode,
    getSubdistrictsByZipCode,
    getDistrictsByZipCode,
    getProvinceByZipCode,
    getAddressSuggestions,
    getAllAddressData: () => allData,
  };
}

