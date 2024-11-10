import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import MapComponent from "@/components/MapComponent";

const App: React.FC = () => {
  const router = useRouter();

  const goToDetail = (conveyorId: string) => {
    router.push({
      pathname: "/detail",
      params: { id: conveyorId },
    });
  };

  return (
    <View className="flex pt-12 px-8 bg-white min-h-screen w-full">
      <Text className="text-center text-2xl font-bold py-6">Aplikasi D11</Text>
      <MapComponent />
      <View className="gap-4 mt-4">
        <Pressable
          className="flex flex-row p-2 bg-white items-center rounded-xl shadow shadow-black"
          onPress={() => goToDetail("1")}
        >
          <Image
            source={require("@/assets/images/logo.png")}
            className="w-14 h-14 mr-2"
          />
          <View className="flex-1 flex-col">
            <Text className="truncate">Konveyor 1</Text>
            <Text className="truncate">SGLC, Fakultas Teknik, Universitas Gadjah Mada</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default App;
