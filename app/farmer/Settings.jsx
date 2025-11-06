import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons"; // Expo icons

export default function SettingsScreen({ navigation }) {
  const handleFeatureComing = () => {
    Toast.show({
      type: "info",
      text1: "Feature Coming Soon!",
      text2: "We are working on this setting 🛠️",
      visibilityTime: 3000,
    });
  };

  return (
    <ScrollView
      className="flex-1 bg-[#ECF39E]"
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="bg-white p-6 rounded-3xl shadow-lg">
        <Text className="text-2xl font-bold text-center text-[#31572C] mb-6">
          Settings
        </Text>

        {/* Setting 1 */}
        <TouchableOpacity
          onPress={handleFeatureComing}
          className="flex-row justify-between items-center bg-gray-200 px-4 py-4 rounded-xl mb-4"
        >
          <Text className="text-[#31572C] text-lg font-medium">
            Notifications
          </Text>
          <Ionicons name="chevron-forward" size={22} color="#31572C" />
        </TouchableOpacity>

        {/* Setting 2 */}
        <TouchableOpacity
          onPress={handleFeatureComing}
          className="flex-row justify-between items-center bg-gray-200 px-4 py-4 rounded-xl mb-4"
        >
          <Text className="text-[#31572C] text-lg font-medium">
            Privacy Controls
          </Text>
          <Ionicons name="chevron-forward" size={22} color="#31572C" />
        </TouchableOpacity>

        {/* Setting 3 */}
        <TouchableOpacity
          onPress={handleFeatureComing}
          className="flex-row justify-between items-center bg-gray-200 px-4 py-4 rounded-xl mb-4"
        >
          <Text className="text-[#31572C] text-lg font-medium">
            Language
          </Text>
          <Ionicons name="chevron-forward" size={22} color="#31572C" />
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
}
