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
import { fetchOrientation } from "../redux/actions/orienationAction";
import { fetchTimes } from "../redux/actions/prayerTimesAction";
import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { _storeData, _retrieveData, _clearData } from "../storage/Storage";

const Header = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [locationState, locationDispatch] = useLocation();
    const dispatch = useDispatch();
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

    const getYourLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission denied!",
                "Permission to access location was denied"
            );
            return;
        }
        setLoading(true);

        let location = await Location.getCurrentPositionAsync({});
        selectLocation(location);
    };

    const selectLocation = async (selectedLocation) => {
        // console.log({ selectedLocation })
        const latlng = [
            selectedLocation.coords.latitude,
            selectedLocation.coords.longitude,
        ];
        const location = {
            latlng,
            timestamp: selectedLocation.timestamp,
            name: "Your location",
        };

        dispatch(fetchOrientation(latlng.latitude, latlng.longitude));
        dispatch(fetchTimes(latlng.latitude, latlng.longitude));
        await _storeData("location", location);

        locationDispatch({
            type: "SET_LOCATION",
            payload: {
                location,
            },
        });
    };

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
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Location")}
                        >
                            {location?.name ? (
                                <Text style={styles.text}>
                                    {location?.name} [
                                    {location?.capital
                                        ? location?.capital
                                        : `${location?.latlng[0]?.toFixed(
                                              3
                                          )}, ${location?.latlng[1]?.toFixed(
                                              3
                                          )}`}
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
            {timesLoading?<View style={{ padding: 7 }}>
                    <ActivityIndicator size="small" color="#fff" />
                </View>:<View
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
                        <Text style={{ fontSize: 18, color: "#fff" }}>
                            {prayerTimes?.date.gregorian.day}{" "}
                            {prayerTimes?.date.gregorian.month.sq}{" "}
                            {prayerTimes?.date.gregorian.year}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, color: "#fff" }}>
                            {prayerTimes?.date.hijri.day}{" "}
                            {prayerTimes?.date.hijri.month.en}{" "}
                            {prayerTimes?.date.hijri.year}
                        </Text>
                    </View>
                </View>
            </View>}
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
