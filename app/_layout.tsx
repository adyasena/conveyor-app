import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="detail" options={{ title: "Detail Konveyor" }}/>
      <Stack.Screen name="history" options={{ title: "Riwayat Volume Sampah" }}/>
    </Stack>
  );
}
