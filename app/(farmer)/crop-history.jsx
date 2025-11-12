import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Clock } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import crops from "../../src/data/crops.json";
import { useAuth } from "../../src/contexts/AuthContext";
import { useCrops } from "../../src/contexts/CropContext";

export default function CropHistory() {
  const { user, hydrated } = useAuth();
  const cropsContext = useCrops();
  const [expandedId, setExpandedId] = useState(null);

// console.log("✅ Debug => hydrated:", hydrated, "cropsContext:", cropsContext);

  // ✅ Wait for context to be ready
  if (!hydrated || !cropsContext) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f5f8cc]">
        <ActivityIndicator size="large" color="#4F772D" />
        <Text className="mt-3 text-[#4F772D] text-lg font-semibold">
          Loading crop history...
        </Text>
      </View>
    );
  }

  const { cropHistory = [], fetchCropHistory, isFetching } = cropsContext;
  const uniqueId = user?.uniqueId || null;

  // ✅ Safe refetch
  useFocusEffect(
    useCallback(() => {
      if (hydrated && uniqueId) {
        fetchCropHistory(uniqueId);
      }
    }, [hydrated, uniqueId])
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView
      className="flex-1 bg-[#f5f8cc]/30 mb-20"
      contentContainerStyle={{ padding: 16 }}
    >
      <View className="bg-white rounded-2xl shadow p-6 mb-4">
        <View className="flex-row items-center mb-4">
          <Clock color="#4F772D" size={24} />
          <Text className="text-xl font-bold text-[#4F772D] ml-2">
            Crop Upload History
          </Text>
        </View>

        {isFetching ? (
          <ActivityIndicator size="large" color="#4F772D" style={{ marginTop: 20 }} />
        ) : !uniqueId ? (
          <Text className="text-gray-600 text-center mt-3">
            Please log in to view crop history.
          </Text>
        ) : cropHistory.length === 0 ? (
          <Text className="text-gray-600 text-center mt-3">
            No history available.
          </Text>
        ) : (
          cropHistory
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => {
              const species = crops.find((s) => s.speciesId === item.speciesId);
              const cropName = species ? species.name : item.speciesId;

              return (
                <View
                  key={item._id}
                  className="border border-gray-200 rounded-xl bg-[#ECF39E]/30 p-4 mb-3"
                >
                  <TouchableOpacity
                    onPress={() => toggleExpand(item._id)}
                    className="flex-row justify-between items-center"
                    activeOpacity={0.7}
                  >
                    <View>
                      <Text className="font-semibold text-gray-800">{cropName}</Text>
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

                  {expandedId === item._id && (
                    <View className="mt-3 border-t border-gray-200 pt-3">
                      {item.batchId && (
                        <Text className="text-sm text-gray-700 mb-1">
                          <Text className="font-semibold">Batch ID:</Text> {item.batchId}
                        </Text>
                      )}
                      <Text className="text-sm text-gray-700 mb-1">
                        <Text className="font-semibold">Species ID:</Text> {item.speciesId}
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
