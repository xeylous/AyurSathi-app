import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function GetStartedButton() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.text}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8fa854",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    bottom: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
