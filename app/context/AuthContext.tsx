"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/app/lib/axios";
import { AuthorizedUser } from "../types/authorizedUser.type";


interface AuthContextType {
  user: AuthorizedUser | null;
  setUser: (AuthorizedUser: AuthorizedUser | null) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: AuthorizedUser | null; 
}

export function AuthProvider({ children, initialUser = null }: AuthProviderProps) {
  const [user, setUser] = useState<AuthorizedUser | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser); 

  useEffect(() => {
    if (initialUser) return; // already have user

    const loadUser = async () => {
      try {
        const res = await api.get("/user/me", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}