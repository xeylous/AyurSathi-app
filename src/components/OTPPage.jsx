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
import { useRouter } from "expo-router";

export default function OTPPage({ length = 6, uniqueId, onClose }) {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);

  // Timer countdown
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

  // Send OTP when component loads
  useEffect(() => {
    const sendOtp = async () => {
      try {
        const res = await fetch(`https://yourapi.com/api/send-otp/${uniqueId}`, {
          method: "POST",
        });
        const data = await res.json();
        setMessage(data.message || "OTP sent to your email.");
        setResendDisabled(true);
        setTimer(30);
      } catch {
        setMessage("Failed to send OTP.");
      }
    };
    sendOtp();
  }, [uniqueId]);

  // Verify OTP
  const handleVerify = async () => {
    if (disabled) return;
    setDisabled(true);
    try {
      const res = await fetch(`https://yourapi.com/api/verify-otp/${uniqueId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otp.join("") }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ OTP verified successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        const remaining = attemptsLeft - 1;
        setAttemptsLeft(remaining);
        setDisabled(false);
        if (remaining > 0) {
          setMessage(`❌ Incorrect OTP. ${remaining} attempt(s) left.`);
        } else {
          setMessage("⚠️ Registration failed. Redirecting...");
          setTimeout(() => router.push("/register"), 2000);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Please try again.");
      setDisabled(false);
    }
  };

  // Handle OTP input
  const handleChange = (val, index) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      if (val && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace navigation
  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      const res = await fetch(`https://yourapi.com/api/resend-otp/${uniqueId}`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "❌ Failed to resend OTP.");
        return;
      }

      setResendDisabled(true);
      setTimer(30);
      setMessage(data.message || "✅ OTP resent. Please check your email.");
    } catch {
      setMessage("❌ Failed to resend OTP.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center bg-white rounded-2xl p-6"
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          className="absolute right-3 top-3 z-10"
        >
          <Text className="text-gray-500 text-xl">✕</Text>
        </TouchableOpacity>

        {/* Logo + Title */}
        <View className="items-center mb-6 mt-6">
          <Image
            source={require("../assets/images/logo.png")}
            className="h-12 w-12 rounded-lg"
          />
          <Text className="mt-3 text-2xl font-bold text-[#4F772D]">
            Verify Your Account
          </Text>
          <Text className="text-sm text-gray-500 text-center">
            Enter the {length}-digit code sent to your email/phone
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
              className="w-12 h-14 text-center text-lg font-semibold border rounded-lg shadow-sm"
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
              Verify
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
