import { Stack } from "expo-router";
import '../globals.css'
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown : false,
          }}
        />
    </Stack>
  )
}