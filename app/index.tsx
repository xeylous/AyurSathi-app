import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeSlider from "../src/components/HomeSlider";
import FeaturesGrid from "../src/components/FeaturesGrid";
import AnalyticsChart from "../src/components/AnalyticsChart";
import GetStartedButton from "../src/components/GetStartedButton";
import HerbsShowcase from "../src/components/HerbsShowcase";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <ScrollView 
        contentContainerStyle={{  }} // space for fixed button
        showsVerticalScrollIndicator={false}
      >
        <HomeSlider />
        <View >
          <AnalyticsChart />
          <FeaturesGrid />
          <HerbsShowcase />
        </View>
      </ScrollView>
      
      {/* Fixed button at bottom */}
      <GetStartedButton />
    </SafeAreaView>
  );
}