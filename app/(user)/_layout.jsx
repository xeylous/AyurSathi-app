import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import Navbar from "../../src/components/farmer/Navbar";

export default function TabLayout() {
  return (
    <>
    {/* <Navbar /> */}
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
      {/* <Tabs.Screen
        name="upload-crop"
        options={{
          title: "Upload Crop",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center mt-3">
              <MaterialCommunityIcons
                name={focused ? "sprout" : "sprout-outline"}
                size={26}
                // color={color}
                color={focused ? "#a5cd83" : "#ffffff"}
                // style={{ border: focused ? "2px solid #4F772D" : "none" }}
              />
              <Text
                className={`text-[10px] font-bold mt-1 ${
                  focused ? "text-[#000000]" : "text-black"
                }`}
              >
                Upload
              </Text>
            </View>
          ),
        }}
      /> */}

      {/* Marketplace */}
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "Marketplace",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center mt-3">
              <Ionicons
                name={focused ? "storefront" : "storefront-outline"}
                size={24}
                color={focused ? "#a5cd83" : "#ffffff"}
              />
              <Text
                className={`text-[10px] mt-1 ${
                  focused ? "text-[#000000]" : "text-black"
                }`}
              >
                Market
              </Text>
            </View>
          ),
        }}
      />

      {/* Order History */}
      {/* <Tabs.Screen
        name="order-history"
        options={{
          title: "Order History",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center mt-3">
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={24}
                color={focused ? "#a5cd83" : "#ffffff"}
                // style={{ border: focused ? "2px solid #4F772D" : "none" }}
              />
              <Text
                className={`text-[10px] font-bold mt-1 ${
                  focused ? "text-[#000000]" : "text-black"
                }`}
              >
                History
              </Text>
            </View>
          ),
        }}
      /> */}

      {/* Cart */}
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center mt-3">
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={24}
                color={focused ? "#a5cd83" : "#ffffff"}
              />
              <Text
                className={`text-[10px] mt-1 ${
                  focused ? "text-[#000000]" : "text-black"
                }`}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
    </>
  );
}
