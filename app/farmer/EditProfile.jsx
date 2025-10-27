import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

export default function FarmerProfile() {

  const [farmer, setFarmer] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    pinCode: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const tokenRes = await fetch("https://ayur-sathi.vercel.app/api/verify-token");
      const tokenData = await tokenRes.json();

      // ✅ Extract and store user details
      const userType = tokenData.user?.type;
      const email = tokenData.user?.email;
      const idFromToken = tokenData.user?.uniqueId; // 👈 add this line
    //   console.log("uniqueId", idFromToken);
        
      setUniqueId(idFromToken); // 👈 store in state

      const res = await fetch(`https://ayur-sathi.vercel.app/api/profile?type=${userType}`);
      const data = await res.json();

      if (res.ok && data.success && data.profile) {
        const profileData = {
          fullName: data.profile.name || "",
          phone: data.profile.phone || "",
          email: email || "",
          address: data.profile.address || "",
          pinCode: data.profile.pinCode || "",
        };
        setFarmer(profileData);
        setOriginalData(profileData);
      } else {
        Toast.show({
          type: "info",
          text1: "No existing profile found",
          text2: "Please fill your details.",
          visibilityTime: 3000,
        });
        setIsEditing(true);
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to load profile data" });
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, []);

  // ✅ Handle input changes (with pinCode limit)
  const handleChange = (key, value) => {
    if (!isEditing) return;

    if (key === "pinCode") {
      // Only allow up to 6 digits
      if (!/^\d{0,6}$/.test(value)) return;
    }

    setFarmer({ ...farmer, [key]: value });
  };

  // ✅ Save / Update profile
  const handleSave = async () => {
    const { fullName, phone, email, address, pinCode } = farmer;

    if (!fullName || !phone || !email || !address || !pinCode) {
      Toast.show({ type: "error", text1: "Please fill all fields!" });
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      Toast.show({ type: "error", text1: "Phone number must be 10 digits!" });
      return;
    }
    if (!/^\d{6}$/.test(pinCode)) {
      Toast.show({ type: "error", text1: "Pincode must be 6 digits!" });
      return;
    }

    try {
      setLoading(true);
    //   console.log();
      
      const res = await fetch("https://ayur-sathi.vercel.app/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId, type: "farmer", ...farmer }),
      });
      
      const data = await res.json();
    //   console.log("data sent to profile end point",data);

      if (res.ok && data.success) {
        Toast.show({
          type: "success",
          text1: "Profile updated successfully!",
          visibilityTime: 2000,
        });
        setOriginalData(farmer);
        setIsEditing(false);
      } else {
        Toast.show({ type: "error", text1: "Failed to update profile!", visibilityTime: 3000 });
        setFarmer(originalData);
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Error saving profile!" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel Edit
  const handleCancelEdit = () => {
    if (originalData) setFarmer(originalData);
    setIsEditing(false);
  };

  return (
    <ScrollView
      className="flex-1 bg-[#ECF39E]"
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-white rounded-3xl shadow-md p-6">
        <Text className="text-3xl font-bold text-center mb-6 text-[#31572C]">
          Farmer Profile
        </Text>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-[#31572C] font-medium">Full Name</Text>
          <TextInput
            value={farmer.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
            editable={isEditing}
            placeholder="Enter full name"
            className={`border-b-2 ${
              isEditing ? "border-[#90A955]" : "border-gray-300"
            } p-2 text-base ${!isEditing ? "text-gray-500" : ""}`}
            placeholderTextColor="#888"
          />
        </View>

        {/* Phone */}
        <View className="mb-4">
          <Text className="text-[#31572C] font-medium">Phone Number</Text>
          <TextInput
            value={farmer.phone}
            onChangeText={(text) => handleChange("phone", text)}
            editable={isEditing}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            className={`border-b-2 ${
              isEditing ? "border-[#90A955]" : "border-gray-300"
            } p-2 text-base ${!isEditing ? "text-gray-500" : ""}`}
            placeholderTextColor="#888"
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-[#31572C] font-medium">Email</Text>
          <TextInput
            value={farmer.email}
            editable={false}
            className="border-b-2 border-gray-300 p-2 text-base text-gray-500"
          />
        </View>

        {/* Pin Code */}
        <View className="mb-4">
          <Text className="text-[#31572C] font-medium">Pin Code</Text>
          <TextInput
            value={farmer.pinCode}
            onChangeText={(text) => handleChange("pinCode", text)}
            editable={isEditing}
            keyboardType="numeric"
            placeholder="Enter 6-digit pin code"
            maxLength={6} // ✅ restricts typing beyond 6 digits
            className={`border-b-2 ${
              isEditing ? "border-[#90A955]" : "border-gray-300"
            } p-2 text-base ${!isEditing ? "text-gray-500" : ""}`}
            placeholderTextColor="#888"
          />
        </View>

        {/* Address */}
        <View className="mb-6">
          <Text className="text-[#31572C] font-medium">Address</Text>
          <TextInput
            value={farmer.address}
            onChangeText={(text) => handleChange("address", text)}
            editable={isEditing}
            multiline
            numberOfLines={3}
            placeholder="Enter address"
            className={`border-b-2 ${
              isEditing ? "border-[#90A955]" : "border-gray-300"
            } p-2 text-base ${!isEditing ? "text-gray-500" : ""}`}
            placeholderTextColor="#888"
          />
        </View>

        {/* ✅ Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={isEditing ? handleCancelEdit : () => setIsEditing(true)}
            className={`flex-1 py-3 rounded-xl mr-2 ${
              isEditing ? "bg-[#BC4749]" : "bg-[#31572C]"
            }`}
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSave}
            disabled={!isEditing || loading}
            className={`flex-1 py-3 rounded-xl ml-2 ${
              isEditing ? "bg-[#90A955]" : "bg-gray-400"
            }`}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg font-semibold text-center">
                Save Profile
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Toast />
    </ScrollView>
  );
}
