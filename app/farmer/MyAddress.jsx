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

export default function ManageAddress() {
  const [addressData, setAddressData] = useState({
    address: "",
    pinCode: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);

        const tokenRes = await fetch("https://ayur-sathi.vercel.app/api/verify-token");
        const tokenData = await tokenRes.json();

        const idFromToken = tokenData.user?.uniqueId;
        const userType = tokenData.user?.type;

        setUniqueId(idFromToken);
        setUserType(userType);

        const res = await fetch(`https://ayur-sathi.vercel.app/api/profile?type=${userType}`);
        const data = await res.json();

        if (res.ok && data.success && data.profile) {
          const addrData = {
            address: data.profile.address || "",
            pinCode: data.profile.pinCode || "",
          };
          setAddressData(addrData);
          setOriginalData(addrData);
        } else {
          setIsEditing(true);
        }
      } catch (error) {
        Toast.show({ type: "error", text1: "Error loading address!" });
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (key, value) => {
    if (!isEditing) return;
    if (key === "pinCode" && !/^\d{0,6}$/.test(value)) return;
    setAddressData({ ...addressData, [key]: value });
  };

  const handleSave = async () => {
    const { address, pinCode } = addressData;

    if (!address || !pinCode) {
      Toast.show({ type: "error", text1: "All fields are required!" });
      return;
    }
    if (!/^\d{6}$/.test(pinCode)) {
      Toast.show({ type: "error", text1: "Invalid Pin Code!" });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://ayur-sathi.vercel.app/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId, type: userType, ...addressData }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        Toast.show({ type: "success", text1: "Address saved!" });
        setOriginalData(addressData);
        setIsEditing(false);
      } else {
        Toast.show({ type: "error", text1: "Failed to save!" });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Error saving address!" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setAddressData(originalData);
    setIsEditing(false);
  };

  return (
    <ScrollView
      className="flex-1 bg-[#ECF39E]"
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >

      <View className="bg-white rounded-3xl shadow-md p-6">
        <Text className="text-2xl font-bold text-center text-[#31572C] mb-6">
          Manage Address
        </Text>

        {/* Address */}
        <View className="mb-6">
          <Text className="text-[#31572C] font-medium mb-1">Address</Text>
          <TextInput
            value={addressData.address}
            onChangeText={(text) => handleChange("address", text)}
            editable={isEditing}
            multiline
            className={`border-b-2 p-2 text-base ${
              isEditing ? "border-[#90A955]" : "border-gray-300 text-gray-500"
            }`}
            placeholder="Enter address"
            placeholderTextColor="#888"
          />
        </View>

        {/* Pin Code */}
        <View className="mb-6">
          <Text className="text-[#31572C] font-medium mb-1">Pin Code</Text>
          <TextInput
            value={addressData.pinCode}
            onChangeText={(text) => handleChange("pinCode", text)}
            editable={isEditing}
            maxLength={6}
            keyboardType="numeric"
            className={`border-b-2 p-2 text-base ${
              isEditing ? "border-[#90A955]" : "border-gray-300 text-gray-500"
            }`}
            placeholder="Enter 6-digit Pin Code"
            placeholderTextColor="#888"
          />
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={isEditing ? handleCancelEdit : () => setIsEditing(true)}
            className={`flex-1 py-3 rounded-xl mr-2 ${
              isEditing ? "bg-[#BC4749]" : "bg-[#31572C]"
            }`}
          >
            <Text className="text-white text-lg text-center font-semibold">
              {isEditing ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isEditing || loading}
            onPress={handleSave}
            className={`flex-1 py-3 rounded-xl ml-2 ${
              isEditing ? "bg-[#90A955]" : "bg-gray-400"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg text-center font-semibold">
                Save
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Toast />
    </ScrollView>
  );
}
