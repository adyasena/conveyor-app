import React from 'react';
import { View, Text } from 'react-native';
import MapComponent from "@/components/MapComponent";

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapComponent />
    </View>
  );
};

export default App;