import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store/index";
import { LocationContextProvider } from "./src/context/LocationContext";
import { FavoriteTimesContextProvider } from "./src/context/FavoriteTimesContext";
import Main from "./src/Main";

export default function App() {
    return (
        <Provider store={store}>
            <LocationContextProvider>
                <FavoriteTimesContextProvider>
                    <Main />
                </FavoriteTimesContextProvider>
            </LocationContextProvider>
        </Provider>
    );
}
