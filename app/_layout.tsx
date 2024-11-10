import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import "../global.css";

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="detail" options={{ title: 'Detail Konveyor' }} />
        <Stack.Screen name="history" options={{ title: 'Riwayat Volume Sampah' }} />
      </Stack>
    </View>
  );
};

export default RootLayout;
