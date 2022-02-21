import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { useDispatch } from "react-redux";
import { useLocation } from "./context/LocationContext";
import { fetchTimes } from "./redux/actions/prayerTimesAction";
import { _storeData, _retrieveData, _clearData } from "./storage/Storage";

const Main = () => {
    const [locationState, locationDispatch] = useLocation();

    useEffect(() => {
        // retrieveLocation();
    }, []);

    const retrieveLocation = async () => {
        const location = await _retrieveData("location");
        locationDispatch({
            type: "SET_LOCATION",
            payload: { location },
        });
    };
    
    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
};

export default Main;
