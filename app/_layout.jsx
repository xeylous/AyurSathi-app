import "../global.js";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import { CropProvider } from "../src/contexts/CropContext";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";

// ✅ import both navbars
import NormalNavbar from "../src/components/Navbar";
import FarmerNavbar from "../src/components/farmer/Navbar";

// ✅ Setup navigation bar style


// ✅ Correct RootNavigator using Expo Router’s Stack
function RootNavigator() {
  const { user } = useAuth();
  const ActiveNavbar = user ? FarmerNavbar : NormalNavbar;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <ActiveNavbar />,
        navigationBarHidden: false,
        contentStyle: { backgroundColor: "#ECF39E" },
      }}
    />
  );
}

// ✅ FINAL RootLayout
export default function RootLayout() {
  useEffect(() => {
  async function setupNavBar() {
    try {
      NavigationBar.setBackgroundColorAsync("#000000");
      await NavigationBar.setButtonStyleAsync("dark");
      await SystemUI.setBackgroundColorAsync("#000000");
    } catch (e) {
      console.log("Navigation bar setup error:", e);
    }
  }
  setupNavBar();
}, []);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CropProvider>
          <StatusBar style="dark" backgroundColor="#90A955" />
          <RootNavigator />
        </CropProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
