import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import crops from "../../src/data/crops.json";
import  { useAuth } from "../../src/contexts/AuthContext"

export default function UploadCrop() {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showCropList, setShowCropList] = useState(false); 

  const { user } = useAuth();

  // Get current location
  const fetchLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission denied",
          text2: "Please enable location access.",
          visibilityTime: 4000,
        });
        setLoadingLocation(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      Toast.show({
        type: "success",
        text1: "Location fetched successfully!",
        visibilityTime: 4000,
      });
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Error getting location",
        visibilityTime: 4000,
      });
    } finally {
      setLoadingLocation(false);
    }
  };

  // Submit handler
const handleSubmit = async () => {
  if (!selectedCrop || !quantity || !location) {
    Toast.show({
      type: "error",
      text1: "Please fill all fields and fetch location.",
      visibilityTime: 4000,
    });
    return;
  }

  // ✅ Find crop details safely from crops.json
  const cropDetails = crops.find(
    (c) => c.name.toLowerCase() === selectedCrop.name.toLowerCase()
  );

  if (!cropDetails) {
    Toast.show({
      type: "error",
      text1: "Invalid crop selected.",
      visibilityTime: 4000,
    });
    return;
  }
const cropName = cropDetails.name;
  // Construct clean payload
  const payload = {
    uniqueId: user?.uniqueId || null, // make sure uniqueId is defined or passed as prop
    speciesId: cropDetails.speciesId,
    quantity: parseFloat(quantity),
    gpsCoordinates: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    timestamp: new Date().toISOString(),
  };
console.log(payload);

  try {
    const response = await fetch(
      "https://ayur-sathi.vercel.app/api/cropUploaded", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    // ✅ Handle non-JSON or HTML responses safely
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.warn("Server did not return JSON. Raw response:", text);
      throw new Error("Server returned invalid response format (not JSON).");
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong on the server.");
    }

    Toast.show({
      type: "success",
      text1: `${cropName} uploaded successfully!`,
      visibilityTime: 4000,
    });

    console.log("✅ Sent payload:", payload);
    // console.log("✅ Server response:", data);

    // ✅ Reset form
    setSelectedCrop(null);
    setQuantity("");
    setLocation(null);
  } catch (err) {
    console.error("❌ Error uploading crop:", err);
    Toast.show({
      type: "error",
      text1: "Upload failed",
      text2: err.message || "Could not connect to server.",
    });
  }
};


  return (
    <ScrollView
      className="flex-1 bg-[#f5f8cc]/30"
      contentContainerStyle={{ padding: 16 }}
    >
      <View className="bg-white rounded-2xl shadow p-6">
        <Text className="text-xl font-bold text-[#4F772D] mb-4">
          Upload Crop
        </Text>

        {/* ✅ Crop Dropdown Toggle Box */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Select Crop
          </Text>
          <TouchableOpacity
            onPress={() => setShowCropList(!showCropList)}
            className="border border-gray-300 rounded-md px-3 py-3 bg-white flex-row justify-between items-center"
          >
            <Text className="text-gray-800">
              {selectedCrop ? selectedCrop.name : "Tap to select crop"}
            </Text>
            <Text className="text-gray-500">{showCropList ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {/* ✅ Show dropdown only when tapped */}
          {showCropList && crops && Array.isArray(crops) && (
            <View className="border border-gray-300 rounded-md mt-1 max-h-64 bg-white">
              <ScrollView>
                {crops.map((crop) => (
                  <TouchableOpacity
                    key={crop.speciesId}
                    onPress={() => {
                      setSelectedCrop(crop);
                      setShowCropList(false); // close list after selection
                    }}
                    className={`px-3 py-2 ${
                      selectedCrop?.speciesId === crop.speciesId
                        ? "bg-[#90a955]"
                        : "bg-white"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        selectedCrop?.speciesId === crop.speciesId
                          ? "text-white font-semibold"
                          : "text-gray-800"
                      }`}
                    >
                      {crop.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Quantity Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Quantity (in kg)
          </Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder="Enter quantity"
            className="border border-gray-300 rounded-md px-3 py-2 bg-white"
          />
        </View>

        {/* Location Fetch */}
        <View className="mb-4">
          <TouchableOpacity
            onPress={fetchLocation}
            disabled={loadingLocation}
            className="bg-[#90a955] py-3 rounded-md items-center"
          >
            {loadingLocation ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold">Get Location</Text>
            )}
          </TouchableOpacity>

          {location && (
            <Text className="text-sm text-gray-600 mt-2">
              📍 Lat: {location.latitude.toFixed(4)}, Lon:{" "}
              {location.longitude.toFixed(4)}
            </Text>
          )}
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#4F772D] py-3 rounded-md items-center mt-4"
        >
          <Text className="text-white font-semibold text-lg">Submit Crop</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
}
