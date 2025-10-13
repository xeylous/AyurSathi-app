import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Leaf, Shield, Users, QrCode, TrendingUp, Award } from "lucide-react-native";
import { useRouter } from "expo-router";

const features = [
  {
    id: 1,
    icon: Shield,
    title: "Verify Products",
    description: "Scan QR codes to check authenticity",
    color: "#166534",
    route: "/scan-history",
  },
  {
    id: 2,
    icon: Leaf,
    title: "Track Journey",
    description: "See herb's farm-to-consumer path",
    color: "#15803d",
    route: "/track",
  },
  {
    id: 3,
    icon: Users,
    title: "Fair Marketplace",
    description: "Support farmers with fair prices",
    color: "#166534",
    route: "/marketplace",
  },
  {
    id: 4,
    icon: QrCode,
    title: "Batch Search",
    description: "Search products by batch number",
    color: "#14532d",
    route: "/batch-search",
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Supply Insights",
    description: "View supply chain analytics",
    color: "#15803d",
    route: "/insights",
  },
  {
    id: 6,
    icon: Award,
    title: "Certifications",
    description: "Check quality certifications",
    color: "#166534",
    route: "/certifications",
  },
];

const FeaturesGrid = () => {
  const router = useRouter();

  const handleFeaturePress = (route) => {
    router.push(route);
  };

  return (
    <View className="px-4 py-4 bg-[#ECF39E]/30">
      {/* Section Header */}
      <View className="mb-2">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Explore Features
        </Text>
        <Text className="text-base text-gray-600 mb-2">
          What we do? How we do?
        </Text>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingRight: 16,
        }}
      >
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <TouchableOpacity
              key={feature.id}
              onPress={() => handleFeaturePress(feature.route)}
              activeOpacity={0.8}
              style={{
                width: 180,
                backgroundColor: "transparent",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#000",
                padding: 16,
                marginBottom: 12,
              }}
            >
              {/* Icon */}
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "#ffffff",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 1 },
                  shadowRadius: 2,
                }}
              >
                <IconComponent size={24} color={feature.color} />
              </View>

              {/* Title */}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: feature.color,
                  marginBottom: 4,
                }}
              >
                {feature.title}
              </Text>

              {/* Description */}
              <Text
                style={{
                  fontSize: 13,
                  color: "#4b5563",
                  lineHeight: 18,
                }}
              >
                {feature.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturesGrid;
