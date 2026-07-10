import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("criclive_user");
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (userData, accessToken) => {
    localStorage.setItem("criclive_user", JSON.stringify(userData));
    if (accessToken) localStorage.setItem("criclive_token", accessToken);
    setUser(userData);
  };

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { emailOrUsername: email, password });
    persist(data.user, data.accessToken);
    return data.user;
  };

  const register = async (form) => {
    const { data } = await api.post("/auth/register", {
      fullName: form.fullName,
      username: form.username || form.email.split("@")[0],
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      country: form.country,
      favoriteTeam: form.favoriteTeam,
    });
    persist(data.user, data.accessToken);
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore -- clear local state regardless */
    }
    localStorage.removeItem("criclive_user");
    localStorage.removeItem("criclive_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
