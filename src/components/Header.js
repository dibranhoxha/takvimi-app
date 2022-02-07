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

const Header = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [locationState, locationDispatch] = useLocation();
  const [selectedLocation, setSelectedLocation] = useLocation();
  const [date, setDate] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const {
    prayerTimes,
    loading: timesLoading,
    error,
  } = useSelector((state) => state.prayerTimes);

  useEffect(() => {
    setLocation(locationState.location);
    setLoading(false);
  }, [locationState]);

  const getDate = () => {
    const newDate = new Date();
    const date = newDate.getDate();
    const formatedDate = date < 10 ? `0${date}` : date;
    const month = newDate.getMonth() + 1;
    const formatedMonth = month < 10 ? `0${month}` : month;
    const year = newDate.getFullYear();
    setDate(`${formatedDate}.${formatedMonth}.${year}`);
  };

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#339989",
      }}
    >
      {loading ? (
        <View style={{ padding: 7 }}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 7,
          }}
        >
          <View style={{ flex: 9 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Location")}>
              {location?.name ? (
                <Text style={styles.text}>
                  {location.name} [
                  {location.capital
                    ? location.capital
                    : `${location.latitude.toFixed(
                        3
                      )}, ${location.longitude.toFixed(3)}`}
                  ]
                </Text>
              ) : (
                <Text style={styles.text}>Choose location</Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={getYourLocation}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/images/my-location.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#f45",
          }}
        >
          <View>
            <Text style={{ fontSize: 18, color: "#fff" }}>{"date"}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, color: "#fff" }}>8 Shawwal 1441</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }} />
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
