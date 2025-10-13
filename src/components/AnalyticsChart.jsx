import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Users, Award, Building2, LeafyGreen } from "lucide-react-native";

const analyticsData = [
  {
    id: 1,
    icon: Users,
    label: "Registered Users",
    value: "12,456",
  },
  {
    id: 2,
    icon: Award,
    label: "Issued Certificates",
    value: "3,842",
  },
  {
    id: 3,
    icon: Building2,
    label: "Lab Partnerships",
    value: "156",
  },
  {
    id: 4,
    icon: LeafyGreen,
    label: "Verified Herbs",
    value: "8,921",
  },
];

const AnalyticsChart = () => {
  return (
    <View className="p-3 bg-[#ECF39E]/30">
      {/* Section Header */}
      <View className="m-0">
        <Text className="text-xl font-bold text-gray-800">
          Blockchain-Powered Transparency
        </Text>
       <Text></Text>
      </View>

      {/* Analytics Card with Gradient */}
      <LinearGradient
        colors={["#90A955", "#4F772D", "#31572C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 24,
          padding: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <View className="gap-6">
          {/* First Row */}
          <View className="flex-row gap-4">
            {analyticsData.slice(0, 2).map((item) => {
              const IconComponent = item.icon;
              return (
                <View key={item.id} className="flex-1">
                  <View className="flex-row items-center">
                    {/* Icon Circle */}
                    <View className="w-14 h-14 rounded-full items-center justify-center mr-3 border-2" 
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        borderColor: 'rgba(255,255,255,0.3)'
                      }}>
                      <IconComponent size={26} color="#ffffff" />
                    </View>

                    {/* Content */}
                    <View className="flex-1">
                      <Text className="text-2xl font-bold text-white mb-0.5">
                        {item.value}
                      </Text>
                      <Text className="text-xs text-white/95 font-medium leading-4">
                        {item.label}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Second Row */}
          <View className="flex-row gap-4">
            {analyticsData.slice(2, 4).map((item) => {
              const IconComponent = item.icon;
              return (
                <View key={item.id} className="flex-1">
                  <View className="flex-row items-center">
                    {/* Icon Circle */}
                    <View className="w-14 h-14 rounded-full items-center justify-center mr-3 border-2" 
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        borderColor: 'rgba(255,255,255,0.3)'
                      }}>
                      <IconComponent size={26} color="#ffffff" />
                    </View>

                    {/* Content */}
                    <View className="flex-1">
                      <Text className="text-2xl font-bold text-white mb-0.5">
                        {item.value}
                      </Text>
                      <Text className="text-xs text-white/95 font-medium leading-4">
                        {item.label}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AnalyticsChart;