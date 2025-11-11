import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";
import { useRouter } from "expo-router";

const AuthContext = createContext({
  user: null,
  saveUser: () => {},
  logout: () => {},
  hydrated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [navigated, setNavigated] = useState(false);
  console.log(user);
  
  const router = useRouter();

  const handleRedirect = (type) => {
    requestAnimationFrame(() => {
      if (type === "farmer") {
        router.replace("/(farmer)/upload-crop");
      } else if (type === "user") {
        router.replace("/(user)/marketplace");
      } else {
        router.replace("/");
      }
      setNavigated(true);
    });
  };

  const saveUser = async (userData) => {
    await SecureStore.setItemAsync("authUser", JSON.stringify(userData));
    setUser(userData);
    handleRedirect(userData?.type);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("authUser");
    setUser(null);
    router.replace("/");
  };

  useEffect(() => {
    (async () => {
      try {
        const stored = await SecureStore.getItemAsync("authUser");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          handleRedirect(parsed?.type);
        } else {
          handleRedirect(null);
        }
      } catch (err) {
        console.log("Auth load error:", err);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // ✅ Show theme color while preparing
  if (!hydrated || !navigated) {
    return <View className="flex-1 bg-[#f5f8cc]" />;
  }

  return (
    <AuthContext.Provider value={{ user, saveUser, logout, hydrated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
