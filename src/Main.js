import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LocationContextProvider } from "./context/LocationContext";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { Provider } from "react-redux";
import store from "./redux/store/index";

const Main = () => {
    return (
        <Provider store={store}>
            <LocationContextProvider>
                <NavigationContainer>
                    <BottomTabNavigator />
                </NavigationContainer>
            </LocationContextProvider>
        </Provider>
    );
};

export default Main;
