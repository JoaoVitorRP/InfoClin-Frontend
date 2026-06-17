import apiClient from "./apiClient";

async function getClinicalDataByUserId(userId) {
  return await apiClient.get(`/dados-clinicos/${userId}`);
}

async function postClinicalData(clinicalData) {
  return await apiClient.post("/dados-clinicos", clinicalData);
}

async function deleteClinicalData(dataId) {
  return await apiClient.delete(`/dados-clinicos/${dataId}`);
}

async function publicLogin(publicData) {
  return await apiClient.post("/dados-clinicos/login-ficha-publica", publicData);
}

export { getClinicalDataByUserId, postClinicalData, deleteClinicalData, publicLogin };
