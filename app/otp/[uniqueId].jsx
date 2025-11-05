import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { OtpInput } from "react-native-otp-entry";

export default function OTPPage() {
  const { uniqueId } = useLocalSearchParams();
  const router = useRouter();
  const length = 6;

  const [otp, setOtp] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  // TIMER
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

  // SEND OTP ON LOAD ✅
  useEffect(() => {
    const sendOtp = async () => {
      try {
        const res = await fetch(
          `https://ayur-sathi.vercel.app/api/mobile/send-otp/${uniqueId}`,
          { method: "POST" }
        );
        const data = await res.json();
        setMessage(data.message || "📩 OTP sent to your email.");
        setResendDisabled(true);
      } catch {
        setMessage("❌ Failed to send OTP.");
      }
    };
    if (uniqueId) sendOtp();
  }, [uniqueId]);

  // VERIFY ✅
  const handleVerify = async () => {
    if (disabled || otp.length !== length) return;
    setDisabled(true);

    try {
      const res = await fetch(
        `https://ayur-sathi.vercel.app/api/mobile/verify-otp/${uniqueId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp }),
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setMessage("✅ OTP Verified! Logging in...");
        setTimeout(() => {
          const userType = data.account?.type;
          if (userType === "farmer") {
            router.replace("/(farmer)/home");
          } else {
            router.replace("/(user)/marketplace");
          }
        }, 1400);
      } else {
        const remain = attemptsLeft - 1;
        setAttemptsLeft(remain);
        setDisabled(false);
        setOtp("");

        if (remain > 0) {
          setMessage(`❌ Wrong OTP! ${remain} attempts left.`);
        } else {
          setMessage("❌ Too many attempts! Redirecting...");
          setTimeout(() => router.replace("/register"), 2000);
        }
      }
    } catch (err) {
      console.log(err);
      setMessage("⚠️ Server error! Try again later.");
      setDisabled(false);
      setOtp("");
    }
  };

  // RESEND ✅
  const handleResend = async () => {
    try {
      const res = await fetch(
        `https://ayur-sathi.vercel.app/api/mobile/resend-otp/${uniqueId}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) return setMessage("❌ Failed to resend!");
      setOtp("");
      setMessage("📩 OTP resent!");
      setTimer(30);
      setResendDisabled(true);
    } catch {
      setMessage("❌ Couldn't resend OTP.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#f5f8cc] justify-center px-4"
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ✅ Header */}
        <Image
          source={require("../../src/assets/images/logo.png")}
          className="h-14 w-14 rounded-xl mt-2"
        />
        <Text className="text-2xl font-bold text-[#4F772D] mt-2">
          Verify Your Account
        </Text>
        <Text className="text-gray-500 text-sm mb-5">
          Enter the {length}-digit OTP sent to your email
        </Text>

        {/* ✅ Server Message */}
        {message !== "" && (
          <Text className="mb-3 text-center text-sm font-medium text-[#374151]">
            {message}
          </Text>
        )}

        {/* ✅ OTP INPUT */}
        <OtpInput
          numberOfDigits={6}
          onTextChange={setOtp}
          autoFocus
          disabled={disabled}
          focusColor="#4F772D"
          theme={{
            pinCodeContainerStyle: {
              width: 50,
              height: 60,
              borderRadius: 10,
              backgroundColor: "white",
              borderWidth: 2,
              borderColor: "#D1D5DB",
            },
            focusedPinCodeContainerStyle: {
              borderColor: "#4F772D",
              shadowColor: "#4F772D",
            },
            filledPinCodeContainerStyle: {
              borderColor: "#4F772D",
              backgroundColor: "#E9F5D6",
            },
            pinCodeTextStyle: {
              fontSize: 20,
              fontWeight: "600",
              color: "#1B4332",
            },
          }}
        />

        {/* ✅ Verify Button */}
        <TouchableOpacity
          onPress={handleVerify}
          disabled={otp.length !== length || disabled}
          className={`w-full py-3 mt-6 rounded-lg ${
            otp.length !== length || disabled
              ? "bg-gray-300"
              : "bg-[#4F772D]"
          }`}
        >
          {disabled ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-white font-medium text-lg">
              Verify OTP
            </Text>
          )}
        </TouchableOpacity>

        {/* ✅ Resend */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={resendDisabled}
          className="mt-4 py-3 w-full border border-[#4F772D] rounded-lg"
        >
          <Text className="text-center text-[#365314] font-medium">
            {resendDisabled
              ? `Resend OTP in ${timer}s`
              : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
