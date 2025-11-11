import "../global.js";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";
import { CropProvider } from "../src/contexts/CropContext";
// import Toast from "react-native-toast-message"; // ✅ Add Toast here
import * as NavigationBar from "expo-navigation-bar"; // ✅ import
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";

// ✅ import both navbars
import NormalNavbar from "../src/components/Navbar";
import FarmerNavbar from "../src/components/farmer/Navbar";

function RootNavigator() {
  const { user } = useAuth();

  useEffect(() => {
    async function setupNavBar() {
      try {
        await NavigationBar.setButtonStyleAsync("dark");
        SystemUI.setBackgroundColorAsync("#000");
        // await NavigationBar.setBackgroundColorAsync("#ECF39E");
      } catch (e) {
        console.log("Navigation bar setup error:", e);
      }
    }
    setupNavBar();
  }, []);

  const ActiveNavbar = user ? FarmerNavbar : NormalNavbar;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => <ActiveNavbar />,
          navigationBarHidden: false,
          contentStyle: { backgroundColor: "#ECF39E" },
        }}
      />

      {/* ✅ Toast MUST be inside Provider area */}
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CropProvider>
          <StatusBar style="dark" backgroundColor="#90A955" />
          {/* <StatusBar style="dark" backgroundColor="#ffffff" /> */}
        </CropProvider>
      </AuthProvider>

      <RootNavigator />
    </SafeAreaProvider>
  );
}
