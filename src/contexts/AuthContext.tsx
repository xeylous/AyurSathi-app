
import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";

// Define the user type based on your backend response structure
export interface User {
  id: string;
  name: string;
  email: string;
  role?: "farmer" | "user" | "admin";
  // add more fields if needed
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  adminToken: string | null;
  adminLogin: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("https://ayur-sathi.vercel.app/api/verify-token", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const adminLogin = (token: string) => {
    setAdminToken(token);
  };

  const value = useMemo(
    () => ({ user, setUser, loading, adminToken, adminLogin }),
    [user, loading, adminToken]
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
