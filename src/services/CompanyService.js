import { mockCompany } from "@/data/mockCompany";
import { mockCompanyDetail } from "@/data/mockCompanyDetail";
import { mockCompanyContactPerson } from "@/data/mockCompanyContactPerson";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/company";
const MOCK_DELAY = 300;
const STORAGE_KEY = "company_deleted_ids";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getDeletedIds = () => {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.error("Error reading deleted IDs from localStorage:", error);
    return new Set();
  }
};

const saveDeletedIds = (deletedIds) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(deletedIds)));
  } catch (error) {
    console.error("Error saving deleted IDs to localStorage:", error);
  }
};

const getFilteredCompanies = () => {
  const deletedIds = getDeletedIds();
  return mockCompany.filter((company) => !deletedIds.has(company.id));
};

export const searchCompanies = async (searchTerm = "") => {
  try {
    await delay(MOCK_DELAY);
    const filteredCompanies = getFilteredCompanies();

    if (!searchTerm?.trim()) {
      return filteredCompanies;
    }

    const searchLower = searchTerm.toLowerCase();
    return filteredCompanies.filter(
      (company) =>
        company.taxId?.toLowerCase().includes(searchLower) ||
        company.customerId?.toLowerCase().includes(searchLower) ||
        company.companyNameTh?.toLowerCase().includes(searchLower) ||
        company.companyNameEn?.toLowerCase().includes(searchLower)
    );
  } catch (error) {
    console.error("Error searching companies:", error);
    throw error;
  }
};

export const getCompanyById = async (companyId) => {
  try {
    await delay(MOCK_DELAY);
    const deletedIds = getDeletedIds();

    if (deletedIds.has(companyId)) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    const company = mockCompany.find((c) => c.id === companyId);
    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    return company;
  } catch (error) {
    console.error("Error getting company by ID:", error);
    throw error;
  }
};

export const createCompany = async (companyData) => {
  try {
    await delay(MOCK_DELAY);

    const basicFields = {
      customerId: companyData.customerId,
      taxId: companyData.taxId,
      companyPrefix: companyData.companyPrefix,
      companyNameTh: companyData.companyNameTh,
      companyNameEn: companyData.companyNameEn,
    };

    const newCompany = {
      ...basicFields,
      id: String(mockCompany.length + 1),
      createDate: new Date().toISOString(),
      createBy: "admin",
      updateDate: new Date().toISOString(),
      updateBy: "admin",
      isActive: companyData.isActive ?? true,
      isDeleted: false,
    };

    mockCompany.push(newCompany);
    return newCompany;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

export const createCompanyDetail = async (companyId, detailData) => {
  try {
    await delay(MOCK_DELAY);

    const newDetail = {
      companyId: companyId,
      ...detailData,
    };

    mockCompanyDetail.push(newDetail);
    return newDetail;
  } catch (error) {
    console.error("Error creating company detail:", error);
    throw error;
  }
};

export const createCompanyContactPerson = async (companyId, contactPersons) => {
  try {
    await delay(MOCK_DELAY);

    const validContactPersons = contactPersons.filter(
      (cp) => cp.name && cp.name.trim() !== ""
    );

    if (validContactPersons.length === 0) {
      return null;
    }

    const newContactPerson = {
      companyId: companyId,
      contactPerson: validContactPersons,
    };

    mockCompanyContactPerson.push(newContactPerson);
    return newContactPerson;
  } catch (error) {
    console.error("Error creating company contact person:", error);
    throw error;
  }
};

export const updateCompany = async (companyId, companyData) => {
  try {
    await delay(MOCK_DELAY);
    const companyIndex = mockCompany.findIndex((c) => c.id === companyId);

    if (companyIndex === -1) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    const basicFields = {
      customerId: companyData.customerId,
      taxId: companyData.taxId,
      companyPrefix: companyData.companyPrefix,
      companyNameTh: companyData.companyNameTh,
      companyNameEn: companyData.companyNameEn,
    };

    const updatedCompany = {
      ...mockCompany[companyIndex],
      ...basicFields,
      id: companyId,
      updateDate: new Date().toISOString(),
      updateBy: "admin",
    };

    mockCompany[companyIndex] = updatedCompany;
    return updatedCompany;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

export const updateCompanyDetail = async (companyId, detailData) => {
  try {
    await delay(MOCK_DELAY);
    const detailIndex = mockCompanyDetail.findIndex(
      (d) => d.companyId === companyId
    );

    if (detailIndex === -1) {
      const newDetail = {
        companyId: companyId,
        ...detailData,
      };
      mockCompanyDetail.push(newDetail);
      return newDetail;
    }

    const updatedDetail = {
      ...mockCompanyDetail[detailIndex],
      ...detailData,
      companyId: companyId,
    };

    mockCompanyDetail[detailIndex] = updatedDetail;
    return updatedDetail;
  } catch (error) {
    console.error("Error updating company detail:", error);
    throw error;
  }
};

export const updateCompanyContactPerson = async (companyId, contactPersons) => {
  try {
    await delay(MOCK_DELAY);
    const contactIndex = mockCompanyContactPerson.findIndex(
      (cp) => cp.companyId === companyId
    );

    const validContactPersons = contactPersons.filter(
      (cp) => cp.name && cp.name.trim() !== ""
    );

    if (contactIndex === -1) {
      if (validContactPersons.length === 0) {
        return null;
      }
      const newContactPerson = {
        companyId: companyId,
        contactPerson: validContactPersons,
      };
      mockCompanyContactPerson.push(newContactPerson);
      return newContactPerson;
    }

    if (validContactPersons.length === 0) {
      mockCompanyContactPerson.splice(contactIndex, 1);
      return null;
    }

    const updatedContactPerson = {
      companyId: companyId,
      contactPerson: validContactPersons,
    };

    mockCompanyContactPerson[contactIndex] = updatedContactPerson;
    return updatedContactPerson;
  } catch (error) {
    console.error("Error updating company contact person:", error);
    throw error;
  }
};

export const deleteCompany = async (companyId) => {
  try {
    await delay(MOCK_DELAY);
    const companyIndex = mockCompany.findIndex((c) => c.id === companyId);

    if (companyIndex === -1) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    mockCompany[companyIndex] = {
      ...mockCompany[companyIndex],
      isDeleted: true,
      updateDate: new Date().toISOString(),
      updateBy: "admin",
    };

    const deletedIds = getDeletedIds();
    deletedIds.add(companyId);
    saveDeletedIds(deletedIds);

    return { success: true, message: "Company deleted successfully" };
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};

export const getCompanyDetailById = async (companyId) => {
  try {
    await delay(MOCK_DELAY);
    const deletedIds = getDeletedIds();

    if (deletedIds.has(companyId)) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    const company = mockCompany.find((c) => c.id === companyId);
    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    const companyDetail = mockCompanyDetail.find(
      (d) => d.companyId === companyId
    );

    const contactPersonData = mockCompanyContactPerson.find(
      (cp) => cp.companyId === companyId
    );

    return {
      ...company,
      detail: companyDetail || null,
      contactPerson: contactPersonData?.contactPerson || [],
    };
  } catch (error) {
    console.error("Error getting company detail by ID:", error);
    throw error;
  }
};

export const getCompanies = async (options = {}) => {
  try {
    await delay(MOCK_DELAY);

    const { page = 1, pageSize = 10 } = options;
    const filteredCompanies = getFilteredCompanies();
    const total = filteredCompanies.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const companies = filteredCompanies.slice(startIndex, endIndex);

    return {
      companies,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error) {
    console.error("Error getting companies:", error);
    throw error;
  }
};

export default {
  searchCompanies,
  getCompanyById,
  getCompanyDetailById,
  createCompany,
  createCompanyDetail,
  createCompanyContactPerson,
  updateCompany,
  updateCompanyDetail,
  updateCompanyContactPerson,
  deleteCompany,
  getCompanies,
};

