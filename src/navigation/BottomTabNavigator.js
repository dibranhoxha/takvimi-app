import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import QiblaScreen from "../screens/QiblaScreen";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        if ((iconName = focused)) {
                            return (
                                <FontAwesome5 name="mosque" size={24} color="black" />
                            );
                        } else {
                            return <FontAwesome5 name="mosque" size={24} color="grey" />
                        }
                    } else if (route.name === "Qibla") {
                        if ((iconName = focused)) {
                            return (
                                <Entypo name="compass" size={24} color="black" />
                            );
                        } else {
                            return <Entypo name="compass" size={24} color="grey" />
                        }
                    } else if (route.name === "Settings") {
                        if ((iconName = focused)) {
                            return (
                                <Ionicons name="settings-sharp" size={24} color="black" />
                            );
                        } else {
                            return <Ionicons name="settings-sharp" size={24} color="grey" />
                        }
                    }

                    // You can return any component that you like here!
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    position: 'absolute',
                    // backgroundColor: '#009688',
                    borderRadius: 30,
                    height: 90,
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Qibla" component={QiblaScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
