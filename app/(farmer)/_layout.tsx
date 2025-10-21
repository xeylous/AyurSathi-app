import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // navigationBarHidden: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4F772D",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 16,
          right: 16,
          height: 70,
          borderRadius: 20,
          backgroundColor: "#90A955",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
          borderTopWidth: 0,
        },
      }}
    >
      {/* Upload Crop */}
      <Tabs.Screen
        name="upload-crop"
        options={{
          title: "Upload Crop",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center mt-4">
              <MaterialCommunityIcons
                name={focused ? "sprout" : "sprout-outline"}
                size={26}
                // color={color}
                color={focused ? "#a5cd83" : "#ffffff"}
              />
              <Text
                className={`text-[10px] mt-1 ${
                  focused ? "text-[#000000]" : "text-gray-400"
                }`}
              >
                Upload
              </Text>
            </View>
          ),
        }}
      />

      {/* Crop History */}
      <Tabs.Screen
        name="crop-history"
        options={{
          title: "Crop History",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={24}
                color={color}
              />
              <Text
                className={`text-[10px] mt-1 ${
                  focused ? "text-[#4F772D]" : "text-gray-400"
                }`}
              >
                History
              </Text>
            </View>
          ),
        }}
      />

      {/* Marketplace */}
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "Marketplace",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name={focused ? "storefront" : "storefront-outline"}
                size={24}
                color={color}
              />
              <Text
                className={`text-[10px] mt-1 ${
                  focused ? "text-[#4F772D]" : "text-gray-400"
                }`}
              >
                Market
              </Text>
            </View>
          ),
        }}
      />

      {/* Cart */}
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={24}
                color={color}
              />
              <Text
                className={`text-[10px] mt-1 ${
                  focused ? "text-[#4F772D]" : "text-gray-400"
                }`}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
