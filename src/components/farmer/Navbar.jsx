import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Search, User, ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

const isProfileActive = ["/profile", "/farmer/EditProfile", "/farmer/MyAddress"].includes(pathname);
  const isSearchActive = pathname === "/search";

  const handleSearchPress = () => {
    if (!isSearchActive) router.push("/search");
  };

  const handleProfilePress = () => {
    if (!isProfileActive) router.push("/profile");
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView edges={["top"]} className="bg-[#90A955]">
      <View className="flex-row justify-between items-center px-4 py-3">
        {/* Left Section */}
        {isProfileActive ? (
          // 👈 When on profile page, show back button instead of logo
          <TouchableOpacity
            onPress={handleBackPress}
            className="p-2 rounded-full bg-[#A5CD83]/30"
            activeOpacity={0.8}
          >
            <ArrowLeft size={26} color="#fff" />
          </TouchableOpacity>
        ) : (
          // 👈 Otherwise show logo + title
          <View className="flex-row items-center flex-1">
            <Image
              source={require("../../assets/images/logo.png")}
              className="w-10 h-10 rounded-lg mr-2"
            />
            <Text className="text-2xl font-semibold text-white">
              Ayurसाथी
            </Text>
          </View>
        )}

        {/* Right Section: Search and Profile Icons */}
        <View className="flex-row items-center gap-4">
          {/* Search Icon */}
          <TouchableOpacity
            onPress={handleSearchPress}
            className={`p-2 rounded-full ${
              isSearchActive ? "bg-[#A5CD83]" : "bg-transparent"
            }`}
            activeOpacity={0.9}
          >
            <Search size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Profile Icon */}
          <TouchableOpacity
            onPress={handleProfilePress}
            className={`p-2 rounded-full ${
              isProfileActive ? "bg-[#A5CD83]" : "bg-transparent"
            }`}
            activeOpacity={0.9}
          >
            <User size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
