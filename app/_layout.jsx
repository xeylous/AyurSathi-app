import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import { CropProvider } from "../src/contexts/CropContext";
import Toast from "react-native-toast-message"; // ✅ Add Toast here

// ✅ import both navbars
import NormalNavbar from "../src/components/Navbar";
import FarmerNavbar from "../src/components/farmer/Navbar";

function RootNavigator() {
  const { user } = useAuth();

  const ActiveNavbar = user ? FarmerNavbar : NormalNavbar;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => <ActiveNavbar />,
          navigationBarHidden: true,
          contentStyle: { backgroundColor: "#ECF39E" },
        }}
      />

      {/* ✅ Toast MUST be inside Provider area */}
      
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CropProvider>
        <SafeAreaProvider>
          <RootNavigator />
          
        </SafeAreaProvider>
      </CropProvider>
    </AuthProvider>
  );
}
