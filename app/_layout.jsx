import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import { CropProvider } from "../src/contexts/CropContext";

// ✅ import both navbars
import NormalNavbar from "../src/components/Navbar";
import FarmerNavbar from "../src/components/farmer/Navbar";

// ✅ A subcomponent so we can access Auth context
function RootNavigator() {
  const { user } = useAuth();

  // if user is logged in → use Farmer Navbar
  const ActiveNavbar = user ? FarmerNavbar : NormalNavbar;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <ActiveNavbar />,
        navigationBarHidden: true,
        contentStyle: { backgroundColor: "#ECF39E" },
      }}
    />
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
