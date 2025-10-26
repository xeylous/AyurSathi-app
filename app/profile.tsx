import React from "react";
import {Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../src/components/farmer/ProfileHeader";
import ProfileOptions from "../src/components/farmer/ProfileOptions";
// import AdditionalSetting from "../src/components/farmer/AdditionalSetting";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECF39E" }} edges={["top", "bottom"]}>
      <View style={{ flex: 1 }}>
        {/* ✅ Fixed Header at top */}
        <View style={{ position: "absolute", top: -50, left: 0, right: 0, zIndex: 10 }}>
          <ProfileHeader />
        </View>

        {/* ✅ Scrollable options with padding to avoid overlap */}
        <ScrollView
          contentContainerStyle={{
            paddingTop: 55, // height of header
            paddingHorizontal: 6,
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileOptions />
          {/* <AdditionalSetting /> */}
      <Text className="text-center text-gray-500 text-sm mb-2">
        App Version 1.0.0
      </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
