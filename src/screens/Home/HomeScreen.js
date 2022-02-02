import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import Header from "../../components/Header";
import InfoCard from "../../components/InfoCard";
import { useLocation } from "../../context/LocationContext";
import uuid from "react-native-uuid";

const API = "http://api.aladhan.com";

const Home = ({ navigation }) => {
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [loading, setLoading] = useState(true);

    const [locationState, locationDispatch] = useLocation();

    useEffect(() => {
        getPrayerTimes();
        return () => setPrayerTimes(null);
    }, []);

    const getPrayerTimes = () => {
        const { location } = locationState;
        const country = location.name;
        const city = location.capital;
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const data = {
            city,
            country,
            method: 4,
            month,
            year,
        };
        fetch(
            `${API}/v1/timingsByCity?city=${city}&country=${country}&method=4`
        )
            .then((response) => response.json())
            .then(({ data }) => {
                const { timings } = data;
                // console.log(timings);
                addID(timings);
                setPrayerTimes(timings);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const addID = (timesObj) => {
        console.log(timesObj);
        const timings = Object.keys(timesObj).map((prop) => {
            const id = uuid.v4();
            return { [prop]: timesObj[prop], id };
        });
        // console.log(timings);
    };

    const list = [
        { id: 1, title: "Sabahu", time: "06:00 AM", active: false },
        { id: 2, title: "Lindja e Diellit", time: "06:45 AM", active: false },
        { id: 3, title: "Dreka", time: "11:30 AM", active: false },
        { id: 4, title: "Ikindia", time: "13:54 AM", active: false },
        { id: 5, title: "Akshami", time: "16:12 AM", active: false },
        { id: 6, title: "Jacia", time: "17:49 AM", active: false },
    ];

    return (
        <View style={{ padding: 0, margin: 0 }}>
            <Header navigation={navigation} />
            <InfoCard remainingTime={"1 hour 34 minutes left"} list={list} />
        </View>
    );
};

export default Home;
