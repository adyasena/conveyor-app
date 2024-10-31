import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
// import * as Progress from "react-native-progress";
import MapComponent from "@/components/MapComponent";

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Data statis untuk prototipe
  const location = {
    latitude: -7.7956,
    longitude: 110.3695,
  };
  const volumePercentage = 0.75; // 75% sebagai contoh persentase volume sampah

  return (
    <View className="flex pt-12 px-8 bg-gray-100 min-h-screen w-full">
      <Text className="text-center text-2xl font-bold">Aplikasi D11</Text>
      <MapComponent />

      <View className="flex-col justify-between gap-4 mt-4">
        <Text className="text-2xl font-bold">Detail Konveyor {id}</Text>
        
        <Text className="text-lg">Lokasi: {location.latitude}, {location.longitude}</Text>
        <Text>Informasi lengkap tentang Konveyor {id}</Text>

        <Text className="text-lg font-bold mt-4">Persentase Volume Sampah</Text>
        
        {/* <Progress.Bar progress={0.3} width={200} /> */}
        <Text className="text-center text-lg">{volumePercentage * 100}% Terisi</Text>

        <Button title="Kembali" onPress={() => router.back()} />
      </View>
    </View>
  );
};

export default DetailPage;
