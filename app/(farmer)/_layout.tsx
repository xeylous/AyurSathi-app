import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4F772D",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: insets.bottom,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom + 6,
          paddingTop: 6,
          backgroundColor: "#90A955",
          borderTopWidth: 0,
          borderRadius: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        },
      }}
    >
      {/* Upload Crop */}
      <Tabs.Screen
        name="upload-crop"
        options={{
          title: "Upload Crop",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center mt-4">
              <MaterialCommunityIcons
                name={focused ? "sprout" : "sprout-outline"}
                size={22}
                color={focused ? "#a5cd83" : "#ffffff"}
              />
              <Text
                className={`text-[9px] mt-1 ${
                  focused
                    ? "text-[#000000] font-bold"
                    : "text-black font-normal"
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
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center mt-4 ">
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={22}
                color={focused ? "#a5cd83" : "#ffffff"}
              />
              <Text
                className={`text-[9px] mt-1 ${
                  focused
                    ? "text-[#000000] font-bold"
                    : "text-black font-normal"
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
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center mt-4">
              <Ionicons
                name={focused ? "storefront" : "storefront-outline"}
                size={22}
                color={focused ? "#a5cd83" : "#ffffff"}
              />
              <Text
                className={`text-[9px] mt-1 ${
                  focused
                    ? "text-[#000000] font-bold"
                    : "text-black font-normal"
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
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center mt-4">
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={22}
                color={focused ? "#a5cd83" : "#ffffff"}
              />
              <Text
                className={`text-[9px] mt-1 ${
                  focused
                    ? "text-[#000000] font-bold"
                    : "text-black font-normal"
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
