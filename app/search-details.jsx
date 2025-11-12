import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { QrCode } from "lucide-react-native";

export default function SearchDetails() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#f5f8cc]/40 px-6 pt-10">
      {/* 🟢 Title */}
      <Text className="text-2xl font-bold text-[#4F772D] mb-6 text-center">
        Search or Scan Product
      </Text>

      {/* 🔍 Search Input */}
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Enter product code"
        placeholderTextColor="#6b7280"
        className="h-12 bg-white border border-gray-400 rounded-lg px-4 text-gray-800 mb-5"
      />

      {/* 🔘 Buttons Row */}
      <View className="flex-row justify-center">
        {/* View Details Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!searchText.trim()}
          className={`px-6 py-3 rounded-lg mx-2 ${
            searchText.trim() ? "bg-[#90A955]" : "bg-gray-300"
          }`}
          onPress={() => <View><Text>This feature is coming soon!</Text></View>}
          // onPress={() => router.push(`/product/${searchText.trim()}`)}
        >
          <Text className="text-black font-semibold">View Details</Text>
        </TouchableOpacity>

        {/* Scan QR Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/scan")}
          className="bg-[#90A955] px-5 py-3 rounded-lg flex-row items-center mx-2"
        >
          <QrCode size={18} color="black" />
          <Text className="ml-2 text-black font-semibold">Scan QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
