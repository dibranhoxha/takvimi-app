import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    TouchableOpacity,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocation } from "../context/LocationContext";

const { width, height } = Dimensions.get("window");

const Header = ({ navigation }) => {
    const [locationState, locationDispatch] = useLocation();
    const [selectedLocation, setSelectedLocation] = useLocation();

    useEffect(() => {
        console.log(locationState);
    }, []);

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
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 5,
                }}
            >
                <View style={{ width: 0.85 * width }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Location")}
                    >
                        {locationState.location.name ? (
                            <Text style={styles.text}>
                                {locationState.location.nativeName} [
                                {locationState.location.capital}]
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
                    <TouchableOpacity>
                        <Image
                            style={{ width: 22, height: 22 }}
                            source={require("../assets/images/my-location.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: containerHeight * 0.7,
                }}
            >
                <View>
                    <Text style={{ fontSize: 18, color: "#fff" }}>
                        E Diel, 26 Nentor 2021
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 18, color: "#fff" }}>
                        8 Shawwal 1441
                    </Text>
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
    text: { fontSize: 24, color: "#fff" }
});

export default Header;
