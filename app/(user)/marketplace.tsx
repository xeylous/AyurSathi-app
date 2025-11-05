import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ShoppingBag, Clock } from "lucide-react-native"; // ✅ lucide for RN

export default function Marketplace() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative py-20 items-center justify-center overflow-hidden">
        {/* Background blobs */}
        <View className="absolute -top-20 -left-20 w-72 h-72 bg-[#f8fae3]/30 rounded-full blur-3xl opacity-50" />
        <View className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#f8fae3]/30 rounded-full blur-3xl opacity-40" />

        {/* Main container */}
        <View className="w-11/12 max-w-xl items-center">
          {/* Tag */}
          <View className="flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#90A955]">
            <ShoppingBag color="#fff" size={20} />
            <Text className="text-white font-semibold text-base">
              Marketplace
            </Text>
          </View>

          {/* Title */}
          <Text className="mt-6 text-3xl font-extrabold text-[#1A1A1A] text-center">
            Ayurसाथी Marketplace
          </Text>

          {/* Description */}
          <Text className="mt-4 text-lg text-gray-600 text-center">
            Soon you&#39;ll be able to explore ethically sourced Ayurvedic herbs
            with full blockchain traceability — from farm to pharmacy.
          </Text>

          {/* Coming Soon Box */}
          <View className="mt-8 p-6 rounded-xl border border-gray-200 bg-white shadow items-center w-full">
            <Clock size={40} color="#90A955" />
            <Text className="mt-3 text-xl font-semibold text-[#1A1A1A]">
              Coming Soon
            </Text>
            <Text className="mt-2 text-sm text-gray-500 text-center">
              We&#39;re building a trusted marketplace to connect farmers,
              processors, and consumers directly.
            </Text>
          </View>

          {/* Notify Me button */}
          <TouchableOpacity className="mt-8 bg-[#90A955] rounded-lg px-6 py-3 active:bg-[#4F772D]">
            <Text className="text-white font-medium text-base">Notify Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
