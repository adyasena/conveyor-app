// components/MapComponent.tsx
import React, { useEffect, useState } from "react";
import { Text, View, Alert, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapComponent: React.FC = () => {
  const [mLat, setMLat] = useState<number | null>(null); // Latitude position
  const [mLong, setMLong] = useState<number | null>(null); // Longitude position
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [loading, setLoading] = useState(true); // State untuk menandakan loading

  // Koordinat default Yogyakarta
  const DEFAULT_LOCATION = {
    latitude: -7.7956,
    longitude: 110.3695,
  };

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const initializeLocation = async () => {
      await requestLocationPermission();
      if (locationPermissionGranted) {
        await getLocation(); // Get the current location when the app starts
      } else {
        setLoading(false); // Set loading false jika izin tidak diberikan
      }
    };

    initializeLocation();
  }, [locationPermissionGranted]);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Location permission status:", status); // Log status izin
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      setLoading(false); // Set loading false jika izin tidak diberikan
    } else {
      setLocationPermissionGranted(true);
      console.log("You can use the location");
    }
  };

  const getLocation = async () => {
    if (!locationPermissionGranted) {
      Alert.alert("Location permission is not granted.");
      setLoading(false); // Set loading false jika izin tidak diberikan
      return; // Exit if permission is not granted
    }

    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setMLat(coords.latitude);
      setMLong(coords.longitude);
      console.log("Current location:", coords);
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to get location");
    } finally {
      setLoading(false); // Set loading false setelah mencoba mendapatkan lokasi
    }
  };

  const mapRegion = {
    latitude: mLat !== null ? mLat : DEFAULT_LOCATION.latitude,
    longitude: mLong !== null ? mLong : DEFAULT_LOCATION.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {loading ? ( // Menampilkan teks loading jika masih memuat
        <Text>Loading map...</Text>
      ) : (
        <MapView
        style={{
          width: screenWidth * 0.85, // Set lebar peta menjadi 80% dari lebar layar
          height: screenWidth * 0.85, // Set tinggi peta agar tetap persegi
        }}
          initialRegion={mapRegion} // Menggunakan region yang ditentukan
          showsUserLocation={true} // Menampilkan lokasi pengguna di peta
          region={mapRegion} // Set region peta agar dapat diperbarui
        >
          <Marker
            coordinate={{
              latitude: mLat !== null ? mLat : DEFAULT_LOCATION.latitude,
              longitude: mLong !== null ? mLong : DEFAULT_LOCATION.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
};

export default MapComponent;
