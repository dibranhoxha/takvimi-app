import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import Header from "../../components/Header";
import FavoriteTimes from "./FavoriteTimes";
import InfoCard from "../../components/InfoCard";
import { useDispatch } from "react-redux";
import { useLocation } from "../../context/LocationContext";
import { fetchTimes } from "../../redux/actions/prayerTimesAction";
import { _storeData, _retrieveData, _clearData } from "../../storage/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
    const [locationState, locationDispatch] = useLocation();
    const [showFavoriteTimes, setShowFavoriteTimes] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (locationState.location) {
            const {
                latlng: [latitude, longitude],
            } = locationState.location || null;
            dispatch(fetchTimes(latitude, longitude));
        } else {
            dispatch(fetchTimes());
        }
    }, [locationState]);

    return (
        <View style={{ flex: 1, padding: 0, margin: 0 }}>
            {showFavoriteTimes && (
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        zIndex: "1",
                    }}
                >
                    <FavoriteTimes setShowFavoriteTimes={setShowFavoriteTimes} />
                </View>
            )}
            <View style={{ flex: 2 }}>
                <Header navigation={navigation} />
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
                <InfoCard setShowFavoriteTimes={setShowFavoriteTimes} />
            </View>
        </View>
    );
};

export default Home;
