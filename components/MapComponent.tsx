import React, { useEffect, useState } from "react";
import { Text, View, Alert, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapComponent: React.FC = () => {
  const [mLat, setMLat] = useState<number | null>(null);
  const [mLong, setMLong] = useState<number | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [loading, setLoading] = useState(true);

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
        await getLocation();
      } else {
        setLoading(false);
      }
    };

    initializeLocation();
  }, [locationPermissionGranted]);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Location permission status:", status);
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      setLoading(false);
    } else {
      setLocationPermissionGranted(true);
      console.log("You can use the location");
    }
  };

  const getLocation = async () => {
    if (!locationPermissionGranted) {
      Alert.alert("Location permission is not granted.");
      setLoading(false);
      return;
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
      setLoading(false);
    }
  };

  const mapRegion = {
    latitude: mLat !== null ? mLat : DEFAULT_LOCATION.latitude,
    longitude: mLong !== null ? mLong : DEFAULT_LOCATION.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={{ alignItems: "center"}} className="mt-5">
      {loading ? (
        <Text>Loading map...</Text>
      ) : (
        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 12, overflow: 'hidden' }}>
        <MapView
        style={{
          width: screenWidth * 0.86,
          height: screenWidth * 0.86,
        }}
          initialRegion={mapRegion}
          showsUserLocation={true}
          region={mapRegion}
        >
          <Marker
            coordinate={{
              latitude: mLat !== null ? mLat : DEFAULT_LOCATION.latitude,
              longitude: mLong !== null ? mLong : DEFAULT_LOCATION.longitude,
            }}
          />
        </MapView>

        </View>
      )}
    </View>
  );
};

export default MapComponent;
