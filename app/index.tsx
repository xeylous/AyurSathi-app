import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import HomeSlider from "../src/components/HomeSlider";
import FeaturesGrid from "../src/components/FeaturesGrid";
import AnalyticsChart from "../src/components/AnalyticsChart";
import GetStartedButton from "../src/components/GetStartedButton";
import HerbsShowcase from "../src/components/HerbsShowcase";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f8cc30" }} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120, // enough scroll space above the fixed button
        }}
        showsVerticalScrollIndicator={false}
      >
        <HomeSlider />
        <View>
          <AnalyticsChart />
          <FeaturesGrid />
          {/* <HerbsShowcase /> */}
        </View>
      </ScrollView>

      {/* ✅ Fixed button positioned dynamically above safe area */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: insets.bottom, // 👈 key line: adjusts automatically
          paddingHorizontal: 16,
           backgroundColor: "#f5f8cc30",
        }}
      >
        <GetStartedButton />
      </View>
    </SafeAreaView>
  );
}
