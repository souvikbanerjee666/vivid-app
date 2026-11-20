import { createContext, useContext, useState, useEffect } from "react";
import { authAPI, setAuthToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAuthToken(token);
    authAPI.getCurrentUser()
      .then((res) => setUser(res.data.data))
      .catch(() => { setUser(null); localStorage.removeItem("accessToken"); })
      .finally(() => setLoading(false));
  }, []);

  const login = async (data) => {
    const res = await authAPI.login(data);
    const { user, accessToken } = res.data.data;
    localStorage.setItem("accessToken", accessToken);
    setAuthToken(accessToken);
    setUser(user);
  };

  const logout = async () => {
    await authAPI.logout();
    localStorage.removeItem("accessToken");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
