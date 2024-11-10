import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { ref, get } from "firebase/database";
import { database } from "@/firebaseConfig";

type HistoryItem = {
  id: string;
  volume: string;
  time: string;
};

const HistoryPage: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  const fetchHistoryData = async () => {
    try {
      const historyRef = ref(database, `id/1/history`);
      const snapshot = await get(historyRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        const formattedData = Object.entries(data).map(([timestamp, volume]) => ({
          id: timestamp,
          volume: `${volume}%`,
          time: new Date(parseInt(timestamp) * 1000)
            .toISOString()
            .replace("T", " ")
            .slice(0, 16),
        }));

        const sortedData = formattedData.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setHistoryData(sortedData);
      } else {
        console.log("Data riwayat tidak ditemukan");
      }
    } catch (error) {
      console.error("Error mengambil data riwayat dari Firebase:", error);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  return (
    <View className="flex-1 bg-white pt-4 px-8">
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between p-4 border-b border-gray-300">
            <Text className="text-lg">{item.volume}</Text>
            <Text className="text-lg text-gray-500">{item.time}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-gray-500">Data riwayat belum tersedia</Text>
          </View>
        }
      />
    </View>
  );
};

export default HistoryPage;
