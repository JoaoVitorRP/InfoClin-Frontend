import { createContext, useContext, useEffect, useState } from "react";
import TailSpinLoading from "../components/Loading/TailSpinLoading";
import { getUserData, requestLogin, requestLogout } from "../services/authService";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getUserData();
        setUserData(response.data);
      } catch (err) {
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    await requestLogin(credentials);

    const response = await getUserData();
    setUserData(response.data);
  };

  const logout = async () => {
    await requestLogout();

    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, isAuthenticated: !!userData, login, logout }}>
      {isLoading ? <TailSpinLoading /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
