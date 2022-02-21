import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Magnetometer } from "expo-sensors";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrientation } from "../../redux/actions/orienationAction";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocation } from "../../context/LocationContext";

const QiblaScreen = () => {
    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);
    const [direction, setDirection] = useState(0);
    const [locationState, locationDispatch] = useLocation();

    const { error, loading, orientation } = useSelector(
        (state) => state.orientation
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(locationState);
        if (locationState.location) {
            const {
                latlng: [latitude, longitude],
            } = locationState.location || null;
            dispatch(fetchOrientation(latitude, longitude));
        }
    }, [locationState]);

    useEffect(() => {
        setDirection(orientation.direction);
    }, [orientation]);

    useEffect(() => {
        _toggle();
        return () => {
            _unsubscribe();
        };
    }, []);

    const _toggle = () => {
        if (subscription) {
            _unsubscribe();
        } else {
            _subscribe();
        }
    };

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer(_angle(data));
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const _angle = (magnetometer) => {
        let angle = 0;
        if (magnetometer) {
            let { x, y, z } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(angle);
    };

    const _degree = (magnetometer) => {
        return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#009688" />
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 18 }}>Error fetching data!</Text>
            </View>
        );
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor:
                        _degree(magnetometer) >= parseInt(direction) - 15 &&
                        _degree(magnetometer) <= parseInt(direction) + 15
                            ? "#009688"
                            : "#EDEDED",
                },
            ]}
        >
            <Text style={styles.text}>{_degree(magnetometer)}</Text>
            <View style={styles.kaabaIconContainer}>
                {_degree(magnetometer) >= parseInt(direction) - 15 &&
                    _degree(magnetometer) <= parseInt(direction) + 15 && (
                        <FontAwesome5 name="kaaba" size={36} color="black" />
                    )}
            </View>

            <View style={styles.kaabaImageContainer}>
                <Image
                    source={require("../../assets/images/compass.png")}
                    style={[
                        styles.kaabaImage,
                        {
                            transform: [
                                {
                                    rotate:
                                        _degree(
                                            magnetometer - parseInt(direction)
                                        ) + "deg",
                                },
                            ],
                        },
                    ]}
                />
                <View style={styles.helperView} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    kaabaIconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    kaabaImageContainer: {
        flex: 3,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    kaabaImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "contain",
    },
    helperView: { flex: 1 / 2 },
});

export default QiblaScreen;
