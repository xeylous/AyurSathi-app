// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use context anywhere
export const useAuth = () => useContext(AuthContext);
