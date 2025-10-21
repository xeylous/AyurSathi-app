import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { Eye, EyeOff, ChevronDown } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from ".././src/contexts/AuthContext";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState("user");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Reset fields when switching mode
  useEffect(() => {
    setEmail("");
    setUserId("");
    setPassword("");
    setShowPassword(false);
    setIsSubmitting(false);
  }, [mode]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Admin Login (local validation)
    if (mode === "admin") {
      if (email === "risuraj162@gmail.com" && password === "1234") {
        Toast.show({
          type: "success",
          text1: "Admin login successful",
          visibilityTime: 1500,
        });
        setTimeout(() => router.push("/admin"), 800);
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid admin credentials",
          visibilityTime: 1500,
        });
        setTimeout(() => setIsSubmitting(false), 1500);
      }
      return;
    }

    // Other login types (API call)
    const payload = { email, password, type: mode };

    try {
      const res = await fetch("https://ayur-sathi.vercel.app/api/mobile/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        Toast.show({
          type: "error",
          text1: data.error || "Wrong credentials",
          visibilityTime: 1500,
        });
        setTimeout(() => setIsSubmitting(false), 1500);
        return;
      }

      // ✅ Store user in context
      setUser({
        name: data.account.name,
        labId: data.account.labId || null,
        email: data.account.email || null,
        userId: data.account.userId || null,
        uniqueId: data.account.uniqueId || null,
        type: data.account.type,
      });

      Toast.show({
        type: "success",
        text1: "Login successful",
        visibilityTime: 1500,
      });

      // ✅ Redirect based on user type
      setTimeout(() => {
        if (mode === "farmer") {
          router.push("/(farmer)/upload-crop");
        } else if (mode === "user") {
          router.push("/(user)/home");
        } else {
          router.push("/"); // fallback
        }
      }, 600);
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong. Please try again",
        visibilityTime: 1500,
      });
      setTimeout(() => setIsSubmitting(false), 1500);
    }
  };

  const modes = [
    { value: "user", label: "User Login" },
    { value: "farmer", label: "Farmer Login" },
  ];

  const getModeLabel = () => {
    const modeObj = modes.find((m) => m.value === mode);
    return modeObj ? modeObj.label : "User Login";
  };

  const getModeDescription = () => {
    switch (mode) {
      case "user":
        return "Login to your User account";
      case "farmer":
        return "Login to your Farmer account";
      default:
        return "Login to your account";
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 bg-[#f5f8cc]/30"
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 min-h-[650px]">
          {/* Logo + Title */}
          <View className="flex items-center mb-6">
            <Image
              source={require("../src/assets/images/logo.png")}
              className="h-12 w-12 rounded-lg"
              resizeMode="cover"
            />
            <Text className="mt-3 text-2xl font-bold text-[#4F772D]">
              Welcome Back
            </Text>
            <Text className="text-sm text-gray-500 text-center">
              {getModeDescription()}
            </Text>
          </View>

          {/* Custom Dropdown */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Select Login Type
            </Text>
            <TouchableOpacity
              onPress={() => setShowDropdown(true)}
              className="w-full px-3 py-3 rounded-md border border-gray-300 bg-white flex-row justify-between items-center"
            >
              <Text className="text-gray-900">{getModeLabel()}</Text>
              <ChevronDown size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Dropdown Modal */}
          <Modal
            visible={showDropdown}
            transparent
            animationType="fade"
            onRequestClose={() => setShowDropdown(false)}
          >
            <Pressable
              className="flex-1 bg-black/50 justify-center items-center"
              onPress={() => setShowDropdown(false)}
            >
              <View className="bg-white rounded-lg w-4/5 max-w-sm overflow-hidden">
                {modes.map((m) => (
                  <TouchableOpacity
                    key={m.value}
                    onPress={() => {
                      setMode(m.value);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-3 border-b border-gray-200 active:bg-[#90a955]"
                  >
                    <Text className="text-gray-900">{m.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>

          {/* Login Form */}
          <View className="space-y-5">
            {/* Email / Username */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                {mode === "admin" ? "Admin Username" : "Email Address"}
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={
                  mode === "admin" ? "Enter admin username" : "you@example.com"
                }
                className="w-full px-3 py-3 rounded-md border border-gray-300 bg-white"
              />
            </View>

            {/* Password */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="••••••••"
                  className="w-full px-3 py-3 rounded-md border border-gray-300 bg-white pr-12"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#6b7280" />
                  ) : (
                    <Eye size={18} color="#6b7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md shadow-lg ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-[#90a955] active:bg-[#4F772D]"
              }`}
            >
              <Text className="text-white text-lg font-medium text-center">
                {isSubmitting
                  ? "Logging in..."
                  : `Login as ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
              </Text>
            </TouchableOpacity>
          </View>

          {/* OR Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="mx-2 text-gray-500 text-sm">OR</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          {/* Google Auth */}
          <TouchableOpacity
            onPress={() =>
              Toast.show({
                type: "info",
                text1: "Google Auth coming soon!!",
                visibilityTime: 1500,
              })
            }
            className="w-full py-3 rounded-md border border-gray-300 flex-row items-center justify-center bg-white active:bg-gray-50 shadow-sm"
          >
            <Image
              source={{
                uri: "https://www.svgrepo.com/show/355037/google.svg",
              }}
              className="w-5 h-5 mr-2"
            />
            <Text className="text-gray-700">Continue with Google</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-6">
            <Text className="text-center text-sm text-gray-600">
              Don&#39;t have an account?{" "}
              <Text
                onPress={() => router.push("/register")}
                className="text-green-600 font-medium"
              >
                Register Here
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}
