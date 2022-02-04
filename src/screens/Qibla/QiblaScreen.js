import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Magnetometer } from "expo-sensors";
import { Grid, Col, Row } from "react-native-easy-grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrientation } from "../../redux/actions/orienationAction";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocation } from "../../context/LocationContext";

const { height, width } = Dimensions.get("window");

const API = "http://api.aladhan.com/v1/qibla";

const QiblaScreen = () => {
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [direction, setDirection] = useState(0);
  const [locationState, locationDispatch] = useLocation();

  const { orientation, loading, error } = useSelector(
    (state) => state.orientation
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const {latitude, longitude} = locationState;
    dispatch(fetchOrientation(latitude, longitude));
  }, [dispatch]);

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

  return (
    <Grid
      style={{
        backgroundColor:
          _degree(magnetometer) >= 135 && _degree(magnetometer) <= 145
            ? "green"
            : "#EDEDED",
      }}
    >
      <Row style={{ alignItems: "center" }} size={0.1}>
        <Col style={{ alignItems: "center" }}>
          {_degree(magnetometer) >= 135 && _degree(magnetometer) <= 145 && (
            <FontAwesome5 name="kaaba" size={24} color="black" />
          )}
        </Col>
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
              transform: [{ rotate: - magnetometer - direction + "deg" }],
            }}
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default QiblaScreen;
