// app/(user)/search-details.jsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { QrCode } from "lucide-react-native";

export default function SearchDetails() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#f5f8cc]/40 p-6 justify-center">
      <Text className="text-2xl font-bold text-[#4F772D] mb-8 text-center">
        Search or Scan Product
      </Text>

      {/* Input + Buttons */}
      <View className="flex-row items-center justify-between bg-transparent">
        {/* Search Field */}
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Enter product code"
          placeholderTextColor="#6b7280"
          className="flex-1 h-12 bg-white border border-gray-400 rounded-lg px-3 text-gray-800"
        />

        {/* View Details Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-[#90A955] ml-3 px-4 py-3 rounded-lg"
          onPress={() => {}}
        >
          <Text className="text-black font-semibold">View Details</Text>
        </TouchableOpacity>

        {/* Scan QR Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/scan-qr")}
          className="bg-[#90A955] ml-3 px-3 py-3 rounded-lg flex-row items-center"
        >
          <QrCode size={18} color="black" />
          <Text className="ml-2 text-black font-semibold">Scan QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
