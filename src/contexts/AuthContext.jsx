import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save user securely after login
  const saveUser = async (userData) => {
    await SecureStore.setItemAsync("authUser", JSON.stringify(userData));
    setUser(userData);
  };

  // Load user on app startup
  const loadUser = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync("authUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("Error loading user:", error);
    }
    setLoading(false);
  };

  // Logout function
  const logout = async () => {
    await SecureStore.deleteItemAsync("authUser");
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, saveUser, logout, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
