import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";
import OTPPage from "../src/components/OTPPage"; // create a RN version of your OTP input
import { toast } from "react-native-toast-message";

export default function RegisterScreen() {
  const [mode, setMode] = useState("user");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setShowConfirm(false);
    setError("");
  }, [mode]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    const { confirmPassword, ...safeData } = formData;
    const payload = { ...safeData, type: mode };

    try {
      const res = await fetch("https://yourapi.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || data?.message || "Registration failed");
        setLoading(false);
        return;
      }

      const id = data.userData.uniqueId;
      setUniqueId(id);
      setOtpModalOpen(true);
    } catch (err) {
      console.error("Register error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-[#f5f8cc]/50 px-4 py-6"
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
        {/* Logo + Title */}
        <View className="items-center mb-6">
          <Image
            source={require("../src/assets/images/logo.png")}
            className="h-12 w-12 rounded-lg"
          />
          <Text className="mt-3 text-2xl font-bold text-[#4F772D]">
            Create Account
          </Text>
          <Text className="text-sm text-gray-500">
            {mode === "user" ? "Register as a User" : "Register as a Farmer"}
          </Text>
        </View>

        {/* Toggle Buttons */}
        <View className="flex-row gap-2 mb-6">
          {[
            { label: "User Register", value: "user" },
            { label: "Farmer Register", value: "farmer" },
          ].map((item) => {
            const isActive = mode === item.value;
            return (
              <TouchableOpacity
                key={item.value}
                onPress={() => setMode(item.value)}
                activeOpacity={0.8}
                className={`flex-1 py-2 rounded-md ${
                  isActive ? "bg-[#90a955]" : "bg-gray-300"
                }`}
              >
                <Text
                  className={`text-center text-sm font-medium ${
                    isActive ? "text-white" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Name */}
        <View>
          <Text className="text-sm font-medium text-gray-700">Full Name</Text>
          <TextInput
            value={formData.name}
            onChangeText={(val) => handleChange("name", val)}
            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="John Doe"
          />
        </View>

        {/* Email */}
        <View className="mt-4">
          <Text className="text-sm font-medium text-gray-700">
            Email Address
          </Text>
          <TextInput
            value={formData.email}
            onChangeText={(val) => handleChange("email", val)}
            keyboardType="email-address"
            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="you@example.com"
          />
        </View>

        {/* Password */}
        <View className="mt-4 relative">
          <Text className="text-sm font-medium text-gray-700">Password</Text>
          <View className="flex-row items-center">
            <TextInput
              value={formData.password}
              onChangeText={(val) => handleChange("password", val)}
              secureTextEntry={!showPassword}
              className="flex-1 mt-1 px-3 py-2 rounded-md border border-gray-300"
              placeholder="••••••••"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4"
            >
              {showPassword ? (
                <EyeOff size={20} color="gray" />
              ) : (
                <Eye size={20} color="gray" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View className="mt-4 relative">
          <Text className="text-sm font-medium text-gray-700">
            Confirm Password
          </Text>
          <View className="flex-row items-center">
            <TextInput
              value={formData.confirmPassword}
              onChangeText={(val) => handleChange("confirmPassword", val)}
              secureTextEntry={!showConfirm}
              className="flex-1 mt-1 px-3 py-2 rounded-md border border-gray-300"
              placeholder="••••••••"
            />
            <TouchableOpacity
              onPress={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-4"
            >
              {showConfirm ? (
                <EyeOff size={20} color="gray" />
              ) : (
                <Eye size={20} color="gray" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {error ? (
          <Text className="text-red-600 text-sm font-medium text-center mt-3">
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          disabled={loading}
          onPress={handleSubmit}
          className="w-full mt-6 py-3 rounded-md bg-[#90a955] disabled:opacity-60"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center text-lg font-semibold">
              {mode === "user" ? "Register as User" : "Register as Farmer"}
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 border-t border-gray-300" />
          <Text className="mx-2 text-gray-500 text-sm">OR</Text>
          <View className="flex-1 border-t border-gray-300" />
        </View>

        {/* Google Button (optional, RN Google login uses expo-auth-session) */}
        <TouchableOpacity className="w-full py-3 flex-row items-center justify-center border rounded-md bg-white">
          <Image
            source={{ uri: "https://www.svgrepo.com/show/355037/google.svg" }}
            className="w-5 h-5 mr-2"
          />
          <Text className="text-gray-700 font-medium">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Text
            className="text-green-600 font-medium"
            onPress={() => router.push("/login")}
          >
            Login
          </Text>
        </Text>
      </View>

      {/* OTP Modal */}
      <Modal visible={otpModalOpen} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="w-11/12 max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <OTPPage
              uniqueId={uniqueId}
              onClose={() => setOtpModalOpen(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
