// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admin';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createCompany = async (companyData: any) => {
  try {
        const payload={
          name : companyData.companyName,
          domain: companyData.domain,
          industry: companyData.industry,
          adminEmail: companyData.adminEmail,
          pricingTier: companyData.pricingTier,
          modules: companyData.moduleIds
        }; 
       const response = await api.post('/companies', payload);
       return response.data;
        
    } catch (error) {
        console.error("Error creating company:", error);
        throw error;
    }
};

export const getCompanyConfig = async (companyId: any) => {
    
    const response = await api.get(`/companies/${companyId}`); 
    return response.data;
};

export const fetchCompanies = async () => {
    try {
        const response = await api.get('/companies');
        return response.data;
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
};