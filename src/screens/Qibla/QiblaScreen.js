import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    ImageBackground
} from "react-native";
import { Magnetometer } from "expo-sensors";
import { Grid, Col, Row } from "react-native-easy-grid";

const { height, width } = Dimensions.get("window");

const QiblaScreen = () => {
    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);

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

    const _direction = (degree) => {
        if (degree >= 22.5 && degree < 67.5) {
            return "NE";
        } else if (degree >= 67.5 && degree < 112.5) {
            return "E";
        } else if (degree >= 112.5 && degree < 157.5) {
            return "SE";
        } else if (degree >= 157.5 && degree < 202.5) {
            return "S";
        } else if (degree >= 202.5 && degree < 247.5) {
            return "SW";
        } else if (degree >= 247.5 && degree < 292.5) {
            return "W";
        } else if (degree >= 292.5 && degree < 337.5) {
            return "NW";
        } else {
            return "N";
        }
    };

    const _degree = (magnetometer) => {
        return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    return (
        <Grid
            style={{
                backgroundColor:
                    _degree(magnetometer) >= 137 && _degree(magnetometer) <= 150
                        ? "green"
                        : "#EDEDED",
            }}
        >
            <Row style={{ alignItems: "center" }} size={0.1}>
                <Text
                    style={{
                        color: "#000",
                        fontSize: height / 27,
                        width: width,
                        position: "absolute",
                        textAlign: "left",
                    }}
                >
                    {_degree(magnetometer)}°
                </Text>
                <Text style={{
                        color: "#000",
                        fontSize: height / 27,
                        width: width,
                        position: "absolute",
                        textAlign: "center",
                    }}>
                {360 - magnetometer - 125}

                </Text>
            </Row>

            <Row style={{ alignItems: "center" }} size={2}>
                <Col style={{ alignItems: "center" }}>
                    <Image
                        source={require("../../assets/images/compass.png")}
                        style={{
                            height: width - 80,
                            justifyContent: "center",
                            alignItems: "center",
                            resizeMode: "contain",
                            transform: [
                                { rotate: 360 - magnetometer - 125 + "deg" },
                            ],
                        }}
                    />
                </Col>
            </Row>
        </Grid>
    );
};

export default QiblaScreen;
