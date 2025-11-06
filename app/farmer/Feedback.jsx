import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons"; // If you use Expo, already included

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingPress = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (!rating || !message.trim()) {
      Toast.show({
        type: "error",
        text1: "Please complete all fields!",
      });
      return;
    }

    setLoading(true);
    Toast.show({
      type: "success",
      text1: "Thank you for your feedback!",
      text2: "Your response has been recorded ✅",
      visibilityTime: 3000,
    });

    // ✅ API Placeholder: Replace with your real endpoint later
    setTimeout(() => {
      setLoading(false);
      setMessage("");
      setRating(0);
    }, 1500);
  };

  return (
    <ScrollView
      className="flex-1 bg-[#ECF39E]"
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="bg-white p-6 rounded-3xl shadow-lg">
        <Text className="text-2xl text-center mb-6 font-bold text-[#31572C]">
          Feedback
        </Text>

        {/* Rating Stars */}
        <Text className="text-base text-[#31572C] font-medium mb-2">
          Rate your experience
        </Text>
        <View className="flex-row mb-5">
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => handleRatingPress(value)}
              className="mr-2"
            >
              <Ionicons
                name={value <= rating ? "star" : "star-outline"}
                size={32}
                color={value <= rating ? "#FFD700" : "#ccc"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Input */}
        <Text className="text-base text-[#31572C] font-medium mb-2">
          Write Feedback
        </Text>
        <TextInput
          placeholder="Tell us what you think..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={5}
          className="border-2 border-gray-300 rounded-xl p-3 text-base"
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className="bg-[#90A955] rounded-xl mt-6 py-3"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg text-center font-semibold">
              Submit Feedback
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
}
