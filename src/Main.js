import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LocationContextProvider } from "./context/LocationContext";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

const Main = () => {
    return (
        <LocationContextProvider>
            <NavigationContainer>
                <BottomTabNavigator />
            </NavigationContainer>
        </LocationContextProvider>
    );
};

export default Main;
