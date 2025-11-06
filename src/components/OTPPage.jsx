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

const lightGrey = "#D3D3D3"; // Define lightGrey color if it's not declared globally.

export default function OTPPage({ length = 6, uniqueId, onClose }) {
  const router = useRouter();
  const [otp, setOtp] = useState(['-', '-', '-', '-', '-', '-']);
  const [otpVal, setOtpVal] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  // Refs for each OTP input box
  const inputRefs = useRef([]);

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
      const res = await fetch(`https://ayur-sathi.vercel.app/api/mobile/verify-otp/${uniqueId}`, {
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
          setMessage(` Incorrect OTP. ${remaining} attempt(s) left.`);
        } else {
          setMessage(" Registration failed. Redirecting...");
          setTimeout(() => router.push("/register"), 2000);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage(" Server error. Please try again.");
      setDisabled(false);
    }
  };

  // Handle OTP input change
  const handleChange = (val) => {
    if (isNaN(val)) {
      return;
    }
    if (val.length > 6) {
      return;
    }
    let newVal = val + '------'.substr(0, 6 - val.length);
    let updatedOtp = [...newVal];
    setOtpVal(newVal);
    setOtp(updatedOtp);
  };

  // Handle key press for backspace and focus management
  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Backspace' && otpVal.length === 0) {
      inputRefs.current[otpVal.length - 1]?.focus();
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
      setMessage(data.message || "OTP resent. Please check your email.");
    } catch {
      setMessage("❌ Failed to resend OTP.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 16, padding: 24 }}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          style={{ position: "absolute", right: 12, top: 12, zIndex: 10 }}
        >
          <Text style={{ fontSize: 24, color: "gray" }}>✕</Text>
        </TouchableOpacity>

        {/* Logo + Title */}
        <View style={{ alignItems: "center", marginBottom: 24, marginTop: 24 }}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ height: 48, width: 48, borderRadius: 12 }}
          />
          <Text style={{ marginTop: 12, fontSize: 24, fontWeight: "bold", color: "#4F772D" }}>
            Verify Your Account
          </Text>
          <Text style={{ fontSize: 14, color: "gray", textAlign: "center" }}>
            Enter the {length}-digit code sent to your email/phone
          </Text>
        </View>

        {/* Message */}
        {message ? (
          <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "gray", marginBottom: 16 }}>
            {message}
          </Text>
        ) : null}

        {/* OTP Input */}
        <TextInput
          onChangeText={handleChange}
          value={otpVal}
          style={{ height: 0 }}
          autoFocus={true}
        />
        <View style={{ flexDirection: 'row' }}>
          {otp.map((digit, index) => (
            <Text style={styles.otpBox} key={index}>
              {digit}
            </Text>
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleVerify}
          disabled={otp.some((d) => d === '-') || disabled}
          style={{
            width: "100%",
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: otp.some((d) => d === '-') || disabled ? "gray" : "#90a955",
            marginTop: 16,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          {disabled ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ textAlign: "center", fontSize: 18, color: "#fff" }}>Verify</Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={resendDisabled}
          style={{
            marginTop: 16,
            width: "100%",
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#90a955",
            opacity: resendDisabled ? 0.5 : 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "#4F772D" }}>
            {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  otpBoxesContainer: {
    flexDirection: 'row',
  },
  otpBox: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: lightGrey,
    height: 45,
    width: 45,
    textAlign: 'center',
    fontSize: 18,
  }
};
