import Navbar from "@/src/components/Navbar";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../src/contexts/AuthContext";
import { CropProvider } from "../src/contexts/CropContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CropProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: true,
              header: () => <Navbar />,
              navigationBarHidden: true,
              contentStyle: { backgroundColor: "#ECF39E" },
            }}
          />
        </SafeAreaProvider>
      </CropProvider>
    </AuthProvider>
  );
}
