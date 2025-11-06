import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null); // ✅ clears user authentication data
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use context anywhere
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
