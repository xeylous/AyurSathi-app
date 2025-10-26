import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { CheckCircle, XCircle, User } from "lucide-react-native"; // ✅ Added User icon

export default function ProfileHeader() {
  const { user } = useAuth();
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView>
      <View
        style={{
          width,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
        }}
        className="bg-[#90A955] absolute overflow-hidden px-6 py-8"
      >
        {/* Header Row: User info left + Icon right */}
        <View className="flex-row justify-between items-center">
          {/* User Info */}
          <View className="z-10">
            <Text className="text-white text-2xl font-semibold">
              {user?.name || "Guest"}
            </Text>
            <Text className="text-white text-base opacity-90">
              {user?.email || ""}
            </Text>

            <View className="flex-row items-center mt-1">
              {user?.verified ? (
                <>
                  <CheckCircle size={18} color="#ffffff" style={{ marginRight: 4 }} />
                  <Text className="text-white text-base opacity-100">
                    Verified
                  </Text>
                </>
              ) : (
                <>
                  <XCircle size={18} color="#ffffff" style={{ marginRight: 4 }} />
                  <Text className="text-white text-base opacity-90">
                    Not Verified
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* Right Side User Icon */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="p-2 "
          >
            <User size={62} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
