import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

const herbs = [
  {
    id: 1,
    name: "Ashwagandha",
    sanskrit: "अश्वगंधा",
    benefits: "Stress relief, Energy boost",
    image: "🌿",
    color: "#10B981",
  },
  {
    id: 2,
    name: "Turmeric",
    sanskrit: "हल्दी",
    benefits: "Anti-inflammatory, Immunity",
    image: "🌾",
    color: "#F59E0B",
  },
  {
    id: 3,
    name: "Tulsi",
    sanskrit: "तुलसी",
    benefits: "Respiratory health, Detox",
    image: "🍃",
    color: "#059669",
  },
  {
    id: 4,
    name: "Neem",
    sanskrit: "नीम",
    benefits: "Skin health, Blood purifier",
    image: "🌱",
    color: "#16A34A",
  },
  {
    id: 5,
    name: "Brahmi",
    sanskrit: "ब्राह्मी",
    benefits: "Memory, Mental clarity",
    image: "🪴",
    color: "#14B8A6",
  },
  {
    id: 6,
    name: "Triphala",
    sanskrit: "त्रिफला",
    benefits: "Digestion, Detoxification",
    image: "🍂",
    color: "#D97706",
  },
];

export default function HerbsShowcase() {
  return (
    <View className="mb-16" style={{ backgroundColor:'##f9fbe1'}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#000000",
          marginBottom: 8,
          paddingHorizontal: 16,
        }}
      >
        Sacred Herbs
      </Text>
      

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {herbs.map((herb) => (
          <TouchableOpacity
            key={herb.id}
            style={{
              width: 160,
              marginRight: 16,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
            activeOpacity={0.7}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: herb.color + "20",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 32 }}>{herb.image}</Text>
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#000",
                marginBottom: 4,
              }}
            >
              {herb.name}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: herb.color,
                marginBottom: 8,
                fontWeight: "500",
              }}
            >
              {herb.sanskrit}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: "#9CA3AF",
                lineHeight: 16,
              }}
            >
              {herb.benefits}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}