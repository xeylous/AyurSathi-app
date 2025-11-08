import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import Navbar from "../../src/components/farmer/Navbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function TabLayout() {
    const insets = useSafeAreaInsets();
  
  return (
    <>
    {/* <Navbar /> */}
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

      {/* Marketplace */}
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "Marketplace",
          tabBarIcon: ({ color, focused }) => (
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
    </>
  );
}
