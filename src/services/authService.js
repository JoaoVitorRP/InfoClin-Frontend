import apiClient from "./apiClient";

async function registerUser(userData) {
  return await apiClient.post("/usuarios/cadastra", userData);
}

async function requestLogin(userData) {
  return await apiClient.post("/usuarios/login", userData);
}

async function getUserData() {
  return await apiClient.get("/usuarios/auth");
}

async function requestLogout() {
  return await apiClient.post("/usuarios/logout");
}

export { registerUser, requestLogin, getUserData, requestLogout };
