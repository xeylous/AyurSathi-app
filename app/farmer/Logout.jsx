import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth  } from "../../src/contexts/AuthContext";
import { useCrops } from "../../src/contexts/CropContext";
import { router } from "expo-router";

export default function Logout({ navigation }) {
  const { logout } = useAuth();
  const { clearCropData } = useCrops();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://ayur-sathi.vercel.app/api/logout", {
        method: "POST",
        credentials: "include",
      });
    //   console.log("hello");
    //   console.log(response);
      
      if (!response.ok) {
        throw new Error("Logout Failed");
      }

      // ✅ clear context data
      logout();
      clearCropData();

      Toast.show({
        type: "success",
        text1: "Logged out successfully!",
        visibilityTime: 2000,
      });

      setTimeout(() => {
        router.replace("/"); 
      }, 500);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout failed!",
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-[#ECF39E]"
      contentContainerStyle={{ padding: 20, justifyContent: "center", flex: 1 }}
    >
      <View className="bg-white rounded-3xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-center text-[#31572C] mb-6">
          Logout
        </Text>

        <Text className="text-lg text-center text-[#31572C] mb-8">
          Are you sure you want to logout?
        </Text>

        <TouchableOpacity
          onPress={handleLogout}
          disabled={loading}
          className="bg-[#BC4749] py-3 rounded-xl"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-semibold text-center">
              Logout
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
}
