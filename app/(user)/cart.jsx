import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react-native";

export default function Cart() {
  // 🛒 Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Ashwagandha Root Powder",
      price: 299,
      quantity: 1,
      image:
        "https://cdn.pixabay.com/photo/2017/08/07/22/34/ashwagandha-2605277_1280.jpg",
    },
    {
      id: "2",
      name: "Tulsi Leaf Extract",
      price: 199,
      quantity: 2,
      image:
        "https://cdn.pixabay.com/photo/2018/06/18/16/05/holy-basil-3487407_1280.jpg",
    },
  ]);

  // ➕➖ Handle Quantity
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🗑 Remove Item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 💰 Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🔹 Cart Item Component
  const renderItem = ({ item }) => (
    <View className="flex-row items-center bg-white p-4 mb-3 rounded-2xl shadow-sm border border-gray-100">
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-xl mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">
          {item.name}
        </Text>
        <Text className="text-[#4F772D] font-medium mt-1">
          ₹{item.price.toFixed(2)}
        </Text>

        {/* Quantity Controls */}
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            className="p-2 rounded-full bg-gray-200"
            onPress={() => updateQuantity(item.id, -1)}
          >
            <Minus size={16} color="#333" />
          </TouchableOpacity>

          <Text className="mx-3 font-medium text-base">{item.quantity}</Text>

          <TouchableOpacity
            className="p-2 rounded-full bg-[#90A955]"
            onPress={() => updateQuantity(item.id, 1)}
          >
            <Plus size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Remove Button */}
      <TouchableOpacity onPress={() => removeItem(item.id)} className="ml-3">
        <Trash2 size={20} color="#D11A2A" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-center mb-6">
        <ShoppingCart size={24} color="#90A955" />
        <Text className="ml-2 text-2xl font-bold text-gray-900">My Cart</Text>
      </View>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />

          {/* Subtotal */}
          <View className="mt-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-600 text-base">Subtotal</Text>
              <Text className="text-gray-900 font-semibold text-base">
                ₹{subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-600 text-base">Delivery</Text>
              <Text className="text-gray-900 font-semibold text-base">₹49</Text>
            </View>
            <View className="border-t border-gray-200 my-2"></View>
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold text-gray-900">Total</Text>
              <Text className="text-lg font-bold text-[#4F772D]">
                ₹{(subtotal + 49).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity className="mt-8 mb-10 bg-[#90A955] rounded-xl py-4 items-center active:bg-[#4F772D]">
            <Text className="text-white text-lg font-semibold">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View className="items-center justify-center py-20">
          <Text className="text-gray-500 text-base">Your cart is empty.</Text>
        </View>
      )}
    </ScrollView>
  );
}
