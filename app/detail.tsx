import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Progress from "react-native-progress";
import MapComponent from "@/components/MapComponent";
import { ref, get } from "firebase/database";
import { database } from "@/firebaseConfig"; // Pastikan impor konfigurasi Firebase Anda

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // State untuk menyimpan data volume
  const [volumePercentage, setVolumePercentage] = useState<number>(0);

  // Lokasi hardcoded
  const location = {
    latitude: -7.7956,
    longitude: 110.3695,
  };

  // Fungsi untuk mengambil data dari Firebase
  const fetchData = async () => {
    try {
      const dataRef = ref(database, `id/${id}/status/percentFilled`); // Path dinamis berdasarkan ID
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setVolumePercentage(snapshot.val() / 100);
      } else {
        console.log("Data tidak ditemukan");
      }
    } catch (error) {
      console.error("Error mengambil data dari Firebase:", error);
    }
  };

  // Gunakan efek untuk mengambil data saat halaman dimuat
  useEffect(() => {
    fetchData();
  }, [id]);

  // Menentukan warna progress berdasarkan volume
  const getProgressColor = (volume: number) => {
    if (volume < 0.5) return "green";
    if (volume < 0.8) return "yellow";
    return "red";
  };

  // Aksi tombol untuk menuju halaman Riwayat
  const goToHistory = () => {
    router.push("/history");
  };

  return (
    <View className="flex pt-4 px-8 bg-white min-h-screen w-full">
      <MapComponent />

      <View className="flex-col justify-between mt-4">
        <Text className="text-2xl font-bold">Detail Konveyor {id}</Text>
        <Text className="text-lg font-bold mt-4">Lokasi</Text>
        <Text className="text-lg">
          {location.latitude}, {location.longitude}
        </Text>

        <Text className="text-lg font-bold mt-4">Persentase Volume Sampah</Text>
        <Progress.Bar
          progress={volumePercentage}
          width={null}
          color={getProgressColor(volumePercentage)}
          height={20}
          borderRadius={8}
          borderWidth={1}
          borderColor="#333333"
          unfilledColor="#e0e0e0"
          style={{ marginVertical: 10 }}
        />

        <Text className="text-center text-lg">
          {volumePercentage * 100}% Terisi
        </Text>

        <Pressable
          className="mt-4 bg-blue-500 rounded-xl p-2"
          onPress={goToHistory}
        >
          <Text className="text-white text-center text-lg">Riwayat Volume Sampah</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DetailPage;
