import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AdditionalSetting from "./AdditionalSetting";

const options = [
  { id: 1, title: "Edit Profile", route: "/farmer/EditProfile" },
  { id: 2, title: "My Address", route: "/farmer/MyAddress" },
  { id: 3, title: "Appearance", route: "/farmer/Appearance" },
  { id: 4, title: "Feedback", route: "/farmer/Feedback" },
  { id: 5, title: "Raise a Complaint", route: "/farmer/Complaint" },
];

const ProfileOptions = () => {
  const router = useRouter();

  const handlePress = (route) => {
    router.push(route);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ECF39E]">
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30,
        }}
      >
        {/* Settings Box */}
        <View className="bg-white rounded-3xl shadow-md overflow-hidden">
          {options.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                onPress={() => handlePress(item.route)}
                activeOpacity={0.8}
                className={`flex-row justify-between items-center px-5 py-4 ${
                  item.title === "Logout" ? "" : ""
                }`}
              >
                <Text
                  className={`text-base font-medium ${
                    item.title === "Logout" ? "text-red-600" : "text-[#132A13]"
                  }`}
                >
                  {item.title}
                </Text>
                <ChevronRight
                  size={22}
                  color={item.title === "Logout" ? "#DC2626" : "#31572C"}
                />
              </TouchableOpacity>

              {/* Divider line (except last item) */}
              {index !== options.length - 1 && (
                <View className="h-[1px] bg-gray-200 mx-5" />
              )}
            </React.Fragment>
          ))}
        </View>
        <AdditionalSetting />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileOptions;
