import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens//Home/HomeScreen";
import FeedScreen from "../screens/Feed/FeedScreen";
import QiblaScreen from "../screens/Qibla/QiblaScreen";

import LocationScreen from "../screens/Home/LocationsScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Home"}
            screenOptions={{ ...screenOptionsStyle, headerShown: true }}
        >
            <>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Location"
                    component={LocationScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            </>
        </Stack.Navigator>
    );
};

const QiblaStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Qibla"}
            screenOptions={{ ...screenOptionsStyle, headerShown: true }}
        >
            <>
                <Stack.Screen
                    name="Qibla"
                    component={QiblaScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </>
        </Stack.Navigator>
    );
};

const FeedStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Feed"}
            screenOptions={{ ...screenOptionsStyle, headerShown: true }}
        >
            <>
                <Stack.Screen
                    name="Feed"
                    component={FeedScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </>
        </Stack.Navigator>
    );
};

export { HomeStackNavigator, QiblaStackNavigator, FeedStackNavigator };

const screenOptionsStyle = {
    headerShown: false,
    headerStyle: {
        backgroundColor: "white",
    },
    headerTintColor: "black",
    headerBackTitle: "Back",
};
