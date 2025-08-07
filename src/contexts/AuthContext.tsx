"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { login: string; name: string } | null;
  refresh: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ login: string; name: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    const res = await fetch("/api/auth/me", {
      credentials: 'include', // 确保发送cookie
    });
    const data = await res.json();
    console.log('AuthContext fetchUser response:', data);
    setUser(data.user);
    setIsLoggedIn(data.isLoggedIn);
    if (!data.isLoggedIn) {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refresh = fetchUser;

  const logout = async () => {
    // 清除 cookie 的接口（可选实现）
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};