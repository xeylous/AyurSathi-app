import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { ScanQrCode, Search } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useAuth } from "./auth/AuthContext";

const Navbar = () => {
  // const { user, setUser } = useAuth();
  const router = useRouter();

  const handleScanPress = () => {
    // Navigate to scan/cop history page
    router.push("/scan");
  };

  const handleSearchPress = () => {
    // Navigate to batch search page
    router.push("/search-details");
  };

  return (
    <SafeAreaView edges={["top"]} className="bg-[#90A955]">
      <View className="flex-row justify-between sticky items-center px-4 py-3  border-gray-200">
        {/* Left Section: Logo and App Name */}
        <View className="flex-row items-center flex-1">
          <Image
            source={require("../assets/images/logo.png")}
            className="w-10 h-10 rounded-lg mr-2"
          />
          <Text className="text-2xl font-semibold text-white">
            Ayurसाथी
          </Text>
        </View>

        {/* Right Section: Scan and Search Icons */}
        <View className="flex-row items-center gap-4">
          {/* Scan Icon */}
          <TouchableOpacity
            onPress={handleScanPress}
            className="p-2"
            activeOpacity={0.7}
          >
            <ScanQrCode size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Search Icon */}
          <TouchableOpacity
            onPress={handleSearchPress}
            className="p-2"
            activeOpacity={0.7}
          >
            <Search size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;