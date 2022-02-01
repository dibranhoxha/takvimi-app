import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";

const Home = () => {
    const [times, setTimes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTimings();
        return () => setTimes(null);
    }, []);

    const getTimings = () => {
        fetch(
            "http://api.aladhan.com/v1/calendarByCity?city=Pristina&country=Kosovo&method=4&month=01&year=2022"
        )
            .then((response) => response.json())
            .then((result) =>
                result.data.map((day) => console.log(day))
            )
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
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
            <Header />
            <InfoCard remainingTime={"1 hour 34 minutes left"} list={list} />
        </View>
    );
};

export default Home;
