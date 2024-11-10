import React, { useEffect, useState, useRef } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Progress from "react-native-progress";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import MapComponent from "@/components/MapComponent";
import { ref, get } from "firebase/database";
import { database } from "@/firebaseConfig";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DetailPage: React.FC = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notificationSent, setNotificationSent] = useState(false);
  const [volumePercentage, setVolumePercentage] = useState<number>(0);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const location = {
    latitude: -7.7956,
    longitude: 110.3695,
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Peringatan Volume Penuh",
        body: `Volume sampah di Konveyor ${id} sudah penuh. Segera lakukan tindakan!`,
      },
      trigger: null,
    });
  };

  const fetchData = async () => {
    try {
      const dataRef = ref(database, `id/${id}/status/percentFilled`);
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const volume = snapshot.val() / 100;
        setVolumePercentage(volume);

        if (volume >= 0.9 && !notificationSent) {
          await sendNotification();
          setNotificationSent(true);
        }
      } else {
        console.log("Data tidak ditemukan");
      }
    } catch (error) {
      console.error("Error mengambil data dari Firebase:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const getProgressColor = (volume: number) => {
    if (volume < 0.5) return "green";
    if (volume < 0.8) return "yellow";
    return "red";
  };

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
          SGLC, Fakultas Teknik, Universitas Gadjah Mada
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
          <Text className="text-white text-center text-lg">
            Riwayat Volume Sampah
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DetailPage;
