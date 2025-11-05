import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";

export default function AppearanceSettings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleAnim = new Animated.Value(0); // always start OFF

  const handleToggle = () => {
    Toast.show({
      type: "info",
      text1: "Feature Coming Soon!",
      text2: "We are working on dark mode 🛠️",
      visibilityTime: 3000,
    });

    // Small animation to show the toggle moved but resets back
    Animated.sequence([
      Animated.timing(toggleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(toggleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();

    // ✅ Always remain OFF
    setIsEnabled(false);
  };

  const thumbTranslate = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 28],
  });

  return (
    <ScrollView
      className="flex-1 bg-[#ECF39E]"
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="bg-white rounded-3xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-center text-[#31572C] mb-6">
          Appearance
        </Text>

        {/* Single Toggle Row */}
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-lg text-[#31572C] font-semibold">Dark Mode</Text>

          {/* Toggle Switch */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggle}
            className="w-16 h-8 rounded-full p-1 bg-gray-300"
          >
            <Animated.View
              style={{
                transform: [{ translateX: thumbTranslate }],
              }}
              className="w-6 h-6 rounded-full bg-white shadow-md"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Toast />
    </ScrollView>
  );
}
