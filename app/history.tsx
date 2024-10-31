import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

const HistoryPage: React.FC = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white pt-4 px-8">
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">Data riwayat belum tersedia</Text>
      </View>
    </View>
  );
};

export default HistoryPage;
