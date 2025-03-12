import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (userData: UserData, authToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user") || null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  const login = (userData: UserData, authToken: string): void => {
    const userString = JSON.stringify(userData);
    setUser(userString);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", userString);
    localStorage.setItem("showIntro", "true");

    if (userData.role === "employer") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("showIntro");
    navigate("/auth");
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  return (
      <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};