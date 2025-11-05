import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Modal } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../src/contexts/AuthContext";
import { useCrops } from "../../src/contexts/CropContext";
import { router } from "expo-router";

export default function Logout() {
  const { logout } = useAuth();
  const { clearCropData } = useCrops();
  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleLogoutAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://ayur-sathi.vercel.app/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout Failed");

      logout();
      clearCropData();

      setConfirmVisible(false);

      Toast.show({
        type: "success",
        text1: "Logged out successfully!",
      });

      setTimeout(() => {
        router.replace("/");
      }, 800);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout failed!",
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
          Tap the button below to logout
        </Text>

        <TouchableOpacity
          onPress={() => setConfirmVisible(true)}
          className="bg-[#BC4749] py-3 rounded-xl"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔶 Modal for confirmation */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <Text className="text-xl font-bold text-center text-[#31572C] mb-4">
              Confirm Logout
            </Text>
            <Text className="text-base text-center text-gray-600 mb-6">
              Are you sure you want to logout?
            </Text>

            <View className="flex-row justify-between">
              {/* Cancel Button */}
              <TouchableOpacity
                onPress={() => setConfirmVisible(false)}
                className="flex-1 py-3 bg-gray-300 rounded-xl mr-2"
                disabled={loading}
              >
                <Text className="text-center text-gray-800 font-semibold">Cancel</Text>
              </TouchableOpacity>

              {/* Yes Logout */}
              <TouchableOpacity
                onPress={handleLogoutAPI}
                className="flex-1 py-3 bg-[#BC4749] rounded-xl ml-2"
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-center text-white font-semibold">Yes, Logout</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </ScrollView>
  );
}
