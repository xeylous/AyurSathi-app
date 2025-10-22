
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Clock } from "lucide-react-native"; // ✅ Works in Expo
import Toast from "react-native-toast-message";
import crops from "../../src/data/crops.json";
import { useAuth } from "../../src/contexts/AuthContext";

export default function CropHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  // ✅ Safety check for user context
  const uniqueId = user?.uniqueId || null;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // ✅ Fetch crop history
  useEffect(() => {
    const fetchCrops = async () => {
      if (!uniqueId) return;

      try {
        setLoading(true);
        const res = await fetch(
          `https://ayur-sathi.vercel.app/api/crops/${uniqueId}`
        );

        const text = await res.text();
        let data;

        // ✅ Handle non-JSON responses
        try {
          data = JSON.parse(text);
        } catch {
          console.warn("⚠️ Server did not return JSON:", text);
          throw new Error("Invalid response from server");
        }

        if (res.ok && data.success && Array.isArray(data.data)) {
          setHistory(data.data);
        } else {
          setHistory([]);
          Toast.show({
            type: "error",
            text1: "Failed to fetch crop history",
            text2: data.message || "Unknown server error",
          });
        }
      } catch (err) {
        console.error("❌ Error fetching crops:", err);
        Toast.show({
          type: "error",
          text1: "Network or server error",
          text2: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [uniqueId]);

  // ✅ Handle loading, empty, and list states
  return (
    <ScrollView
      className="flex-1 bg-[#f5f8cc]/30"
      contentContainerStyle={{ padding: 16 }}
    >
      <View className="bg-white rounded-2xl shadow p-6 mb-4">
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <Clock color="#4F772D" size={24} />
          <Text className="text-xl font-bold text-[#4F772D] ml-2">
            Crop Upload History
          </Text>
        </View>

        {/* Loading */}
        {loading ? (
          <ActivityIndicator size="large" color="#4F772D" style={{ marginTop: 20 }} />
        ) : !uniqueId ? (
          <Text className="text-gray-600 text-center mt-3">
            Please log in to view crop history.
          </Text>
        ) : history.length === 0 ? (
          <Text className="text-gray-600 text-center mt-3">
            No history available.
          </Text>
        ) : (
          history.map((item) => {
            const species = crops.find(
              (s) => s.speciesId === item.speciesId
            );
            const cropName = species ? species.name : item.speciesId;

            return (
              <View
                key={item._id}
                className="border border-gray-200 rounded-xl bg-[#ECF39E]/30 p-4 mb-3"
              >
                {/* Header Row */}
                <TouchableOpacity
                  onPress={() => toggleExpand(item._id)}
                  className="flex-row justify-between items-center"
                  activeOpacity={0.7}
                >
                  <View>
                    <Text className="font-semibold text-gray-800">
                      {cropName}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {item.quantity} unit •{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-IN")}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <View
                      className={`px-3 py-1 rounded-full ${
                        item.status === "Approved"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          item.status === "Approved"
                            ? "text-green-700"
                            : "text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </Text>
                    </View>
                    <Text className="text-[#4F772D] ml-2 text-lg">
                      {expandedId === item._id ? "▲" : "▼"}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Expanded Info */}
                {expandedId === item._id && (
                  <View className="mt-3 border-t border-gray-200 pt-3">
                    {item.batchId && (
                      <Text className="text-sm text-gray-700 mb-1">
                        <Text className="font-semibold">Batch ID:</Text> {item.batchId}
                      </Text>
                    )}
                    <Text className="text-sm text-gray-700 mb-1">
                      <Text className="font-semibold">Species ID:</Text>{" "}
                      {item.speciesId}
                    </Text>
                    <Text className="text-sm text-gray-700 mb-2">
                      <Text className="font-semibold">Created At:</Text>{" "}
                      {new Date(item.createdAt).toLocaleString("en-IN")}
                    </Text>

                    {item.batchBarCode?.url ? (
                      <Image
                        source={{ uri: item.batchBarCode.url }}
                        style={{
                          width: "100%",
                          height: 60,
                          resizeMode: "contain",
                          marginTop: 8,
                        }}
                      />
                    ) : null}
                  </View>
                )}
              </View>
            );
          })
        )}
      </View>

      <Toast />
    </ScrollView>
  );
}
