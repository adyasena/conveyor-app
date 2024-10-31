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
      <View className="flex-row justify-between gap-4 mt-4">
        <Pressable
          className="flex-1 flex-row p-2 bg-white items-center rounded-xl shadow"
          onPress={() => goToDetail("1")}
        >
          <Image
            source={require("@/assets/images/react-logo.png")}
            className="w-10 h-10 mr-2"
          />
          <View className="flex-1 flex-col white">
            <Text className="truncate">Konveyor 1</Text>
            <Text className="truncate">Lokasi Konveyor 1</Text>
          </View>
        </Pressable>
        <Pressable
          className="flex-1 flex-row p-2 bg-white items-center rounded-xl shadow"
          onPress={() => goToDetail("2")}
        >
          <Image
            source={require("@/assets/images/react-logo.png")}
            className="w-10 h-10 mr-2"
          />
          <View className="flex-1 flex-col">
            <Text className="truncate ">Konveyor 2</Text>
            <Text className="truncate">Lokasi Konveyor 2</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default App;
