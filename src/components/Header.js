import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocation } from "../context/LocationContext";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const Header = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [locationState, locationDispatch] = useLocation();
  const [selectedLocation, setSelectedLocation] = useLocation();
  const [date, setDate] = useState(null)

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { prayerTimes, loading: timesLoading, error } = useSelector(
    (state) => state.prayerTimes
  );

  useEffect(() => {
    setLocation(locationState.location);
    setLoading(false);
  }, [locationState]);

  const getDate = () => {
      const newDate = new Date();
      const date = newDate.getDate();
      const formatedDate = date < 10 ? `0${date}`:date;
      const month = newDate.getMonth() + 1;
      const formatedMonth = month < 10 ? `0${month}`:month;
      const year = newDate.getFullYear()
      setDate(`${formatedDate}.${formatedMonth}.${year}`)
  }

  const getYourLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    setLoading(true);

    let location = await Location.getCurrentPositionAsync({});
    selectLocation(location);
  };

  const selectLocation = (location) => {
    console.log({ location });
    const locationObj = {
      ...location.coords,
      timestamp: location.timestamp,
      name: "Your location",
    };
    locationDispatch({
      type: "SET_LOCATION",
      payload: {
        location: locationObj,
      },
    });
  };

  if (errorMsg) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18 }}>{errorMsg}</Text>
      </View>
    );
  }

  const containerHeight = 0.4 * height;
  return (
    <View
      style={{
        backgroundColor: "#339989",
        width: width,
        height: containerHeight,
        flexDirection: "column",
        padding: 5,
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
          }}
        >
          <View style={{ width: 0.85 * width }}>
            <TouchableOpacity onPress={() => navigation.navigate("Location")}>
              {location?.name ? (
                <Text style={styles.text}>
                  {location.name} [
                  {location.capital
                    ? location.capital
                    : `${location.latitude.toFixed(3)}, ${location.longitude.toFixed(3)}`}
                  ]
                </Text>
              ) : (
                <Text style={styles.text}>Choose location</Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 0.1 * width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={getYourLocation}>
              <Image
                style={{ width: 22, height: 22 }}
                source={require("../assets/images/my-location.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: containerHeight * 0.4,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, color: "#fff" }}>
            {"date"}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, color: "#fff" }}>8 Shawwal 1441</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // headerContainer: {
  //   elevation: 8,
  //   backgroundColor: "#009688",
  //   borderRadius: 10,
  //   paddingVertical: 10,
  //   paddingHorizontal: 12
  // },
  // appButtonText: {
  //   fontSize: 18,
  //   color: "#fff",
  //   fontWeight: "bold",
  //   alignSelf: "center",
  //   textTransform: "uppercase"
  // }
  text: { fontSize: 20, color: "#fff" },
});

export default Header;
