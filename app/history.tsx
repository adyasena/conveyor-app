import React from "react";
import { View, Text, FlatList } from "react-native";

const HistoryPage: React.FC = () => {
  const historyData = [
    { id: "1", volume: "30%", time: "2024-11-01 10:00" },
    { id: "2", volume: "45%", time: "2024-11-02 14:30" },
    { id: "3", volume: "60%", time: "2024-11-03 18:00" },
  ];
  const sortedHistoryData = historyData.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <View className="flex-1 bg-white pt-4 px-8">
      <FlatList
        data={sortedHistoryData}
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
