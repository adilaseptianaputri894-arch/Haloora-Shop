import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simulasi logika autentikasi. Ganti dengan panggilan API sungguhan nantinya.
    if (email === "admin@possyariah.com" && password === "admin123") {
      setUser({ email, name: "Admin Utama", store: "Pusat" });
      return { success: true };
    }
    return { success: false, message: "Email atau password salah." };
  };

  const register = (data) => {
    // Simulasi penyimpanan user baru
    console.log("Simpan ke database...", data);
    setUser({ email: data.email, name: data.name, store: data.store });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
