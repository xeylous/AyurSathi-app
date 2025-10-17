import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function OTPPage() {
  const { uniqueId } = useLocalSearchParams();
  const router = useRouter();

  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);

  // ⏱ Timer countdown
  useEffect(() => {
    let interval;
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, timer]);

  // 📩 Send OTP when component loads
  useEffect(() => {
    const sendOtp = async () => {
      try {
        const res = await fetch(`https://ayur-sathi.vercel.app/api/mobile/send-otp/${uniqueId}`, {
          method: "POST",
        });
        const data = await res.json();
        setMessage(data.message || "OTP sent to your email.");
        setResendDisabled(true);
        setTimer(30);
      } catch {
        setMessage("❌ Failed to send OTP.");
      }
    };
    if (uniqueId) sendOtp();
  }, [uniqueId]);

  // ✅ Verify OTP
  const handleVerify = async () => {
    if (disabled) return;
    setDisabled(true);
    try {
      const res = await fetch(
        `https://ayur-sathi.vercel.app/api/mobile/verify-otp/${uniqueId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: otp.join("") }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ OTP verified successfully! Logging you in...");
        // Automatically redirect to dashboard/home after successful verification
        setTimeout(() => router.replace("/(tabs)/home"), 1500);
      } else {
        const remaining = attemptsLeft - 1;
        setAttemptsLeft(remaining);
        setDisabled(false);
        if (remaining > 0) {
          setMessage(`❌ Incorrect OTP. ${remaining} attempt(s) left.`);
        } else {
          setMessage("❌ Registration failed. Redirecting...");
          setTimeout(() => router.replace("/register"), 2000);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Please try again.");
      setDisabled(false);
    }
  };

  // 🔢 Handle OTP input
  const handleChange = (val, index) => {
  // Allow only digits or empty
  if (/^\d?$/.test(val)) {
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto move to next input (smooth focus)
    if (val && index < length - 1) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 50);
    }

    // Auto submit if all digits filled
    if (newOtp.every((d) => d !== "")) {
      setTimeout(() => handleVerify(), 300);
    }
  }
};


  // ⌫ Handle backspace navigation
  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // 🔁 Resend OTP
  const handleResend = async () => {
    try {
      const res = await fetch(`https://ayur-sathi.vercel.app/api/mobile/resend-otp/${uniqueId}`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "❌ Failed to resend OTP.");
        return;
      }

      setResendDisabled(true);
      setTimer(30);
      setMessage(data.message || "📩 OTP resent. Please check your email.");
    } catch {
      setMessage("❌ Failed to resend OTP.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center bg-[#f5f8cc]/50 px-4"
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo + Title */}
        <View className="items-center mb-6 mt-6">
          <Image
            source={require("../../src/assets/images/logo.png")}
            className="h-12 w-12 rounded-lg"
          />
          <Text className="mt-3 text-2xl font-bold text-[#4F772D]">
            Verify Your Account
          </Text>
          <Text className="text-sm text-gray-500 text-center">
            Enter the {length}-digit code sent to your email
          </Text>
        </View>

        {/* Message */}
        {message ? (
          <Text className="text-center text-sm font-medium text-gray-700 mb-4">
            {message}
          </Text>
        ) : null}

        {/* OTP Inputs */}
        <View className="flex-row justify-center mb-6 space-x-2">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(val) => handleChange(val, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              keyboardType="numeric"
              maxLength={1}
              editable={!disabled}
              className="w-12 h-14 text-center text-lg font-semibold border border-gray-300 rounded-lg shadow-sm bg-white"
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleVerify}
          disabled={otp.some((d) => d === "") || disabled}
          className={`w-full py-3 rounded-md shadow-lg ${
            otp.some((d) => d === "") || disabled
              ? "bg-gray-300"
              : "bg-[#90a955]"
          }`}
        >
          {disabled ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-medium text-center">
              Verify OTP
            </Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={resendDisabled}
          className="mt-4 w-full py-3 rounded-md border border-[#90a955] disabled:opacity-50"
        >
          <Text className="text-[#4F772D] text-center font-medium">
            {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
