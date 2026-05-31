import apiClient from "./apiClient";

async function getClinicalDataByUserId(userId) {
  return await apiClient.get(`/dados-clinicos/${userId}`);
}

async function postClinicalData(clinicalData) {
  return await apiClient.post("/dados-clinicos", clinicalData);
}

export { getClinicalDataByUserId, postClinicalData };
