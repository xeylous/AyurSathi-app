import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch("https://ayur-sathi.vercel.app/api/orders"); // Replace with your actual API
        const data = await response.json();

        if (response.ok && data.orders) {
          setOrders(data.orders);
        } else {
          Toast.show({
            type: "info",
            text1: "No orders found",
            text2: "You have no order history.",
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        Toast.show({ type: "error", text1: "Failed to load order history!" ,swipeable:true, visibilityTime:2000});
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#ECF39E]">
        <ActivityIndicator size="large" color="#31572C" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#ECF39E]"
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-white rounded-3xl shadow-md p-6">
        <Text className="text-3xl font-bold text-center mb-6 text-[#31572C]">
          Order History
        </Text>

        {/* If there are no orders */}
        {orders.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-center text-[#31572C]">
              You have no order history.
            </Text>
          </View>
        ) : (
          // If there are orders, show them
          <View>
            {orders.map((order, index) => (
              <View key={index} className="mb-4 p-4 border-b-2 border-gray-300 rounded-xl">
                <Text className="text-lg font-semibold text-[#31572C]">Order #{order.id}</Text>
                <Text className="text-base text-gray-600">Date: {order.date}</Text>
                <Text className="text-base text-gray-600">Total: ${order.totalAmount}</Text>
                <TouchableOpacity
                  className="mt-2 py-2 px-4 bg-[#90A955] rounded-lg"
                  onPress={() => { /* Handle order details navigation */ }}
                >
                  <Text className="text-white text-center">View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <Toast />
    </ScrollView>
  );
}
