"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter()

  const checkAuth = () => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});

    const token = cookies.token;

    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };

  const handleLoggout = async () => {
    await axios.post("/api/logout");
    setIsLogged(false);
    router.push("/");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, checkAuth, handleLoggout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
