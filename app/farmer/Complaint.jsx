import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ComplaintScreen() {
  const [complaintType, setComplaintType] = useState("");
  const [subject, setSubject] = useState("");
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!complaintType || !subject || !issue) {
      Toast.show({
        type: "error",
        text1: "All fields are required!",
        visibilityTime: 3000,
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Complaint submitted successfully!",
        visibilityTime: 3000,
      });

      setComplaintType("");
      setSubject("");
      setIssue("");
    }, 1500);
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-[#ECF39E]"
      contentContainerStyle={{ padding: 20 }}
      extraScrollHeight={140}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-white rounded-3xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-center text-[#31572C] mb-6">
          Register Complaint
        </Text>

        {/* Complaint Type */}
        <Text className="text-lg text-[#31572C] font-medium mb-2">
          Complaint Type
        </Text>
        <TextInput
          placeholder="Ex: Payment Issue, App Issue, Order Issue..."
          placeholderTextColor="#666"
          value={complaintType}
          onChangeText={setComplaintType}
          className="border-2 border-gray-300 rounded-xl p-3 text-base mb-4"
        />

        {/* Subject */}
        <Text className="text-lg text-[#31572C] font-medium mb-2">
          Subject
        </Text>
        <TextInput
          placeholder="Enter issue subject"
          placeholderTextColor="#666"
          value={subject}
          onChangeText={setSubject}
          className="border-2 border-gray-300 rounded-xl p-3 text-base mb-4"
        />

        {/* Issue Details */}
        <Text className="text-lg text-[#31572C] font-medium mb-2">
          Issue Description
        </Text>
        <TextInput
          placeholder="Describe the issue clearly..."
          placeholderTextColor="#666"
          value={issue}
          onChangeText={setIssue}
          multiline
          numberOfLines={5}
          className="border-2 border-gray-300 rounded-xl p-3 text-base"
          style={{ textAlignVertical: "top" }}
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
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Toast />
    </KeyboardAwareScrollView>
  );
}
