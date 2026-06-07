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

export { getClinicalDataByUserId, postClinicalData, deleteClinicalData };
