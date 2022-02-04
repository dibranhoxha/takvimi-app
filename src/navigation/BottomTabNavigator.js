import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import FeedScreen from "../screens/Feed/FeedScreen";
import QiblaScreen from "../screens/Qibla/QiblaScreen";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";

import {
    HomeStackNavigator,
    QiblaStackNavigator,
    FeedStackNavigator,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        if ((iconName = focused)) {
                            return (
                                <View
                                    style={{
                                        top: -10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        ...styles.customButtonshadow,
                                        backgroundColor: "#fff",
                                        borderRadius: 100 / 2,
                                        width: 100,
                                        height: 100,
                                    }}
                                >
                                    <FontAwesome5
                                        name="mosque"
                                        size={32}
                                        color="#009688"
                                    />
                                </View>
                            );
                        } else {
                            return (
                                <View
                                    style={{
                                        top: -10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        ...styles.customButtonshadow,
                                        backgroundColor: "#fff",
                                        borderRadius: 100 / 2,
                                        width: 100,
                                        height: 100,
                                    }}
                                >
                                    <FontAwesome5
                                        name="mosque"
                                        size={32}
                                        color="grey"
                                    />
                                </View>
                            );
                        }
                    } else if (route.name === "Qibla") {
                        if ((iconName = focused)) {
                            return (
                                <Entypo
                                    name="compass"
                                    size={24}
                                    color="#009688"
                                />
                            );
                        } else {
                            return (
                                <Entypo name="compass" size={24} color="grey" />
                            );
                        }
                    } else if (route.name === "Feed") {
                        if ((iconName = focused)) {
                            return (
                                <FontAwesome5
                                    name="quran"
                                    size={24}
                                    color="#009688"
                                />
                            );
                        } else {
                            return (
                                <FontAwesome5
                                    name="quran"
                                    size={24}
                                    color="grey"
                                />
                            );
                        }
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "#009688",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    // backgroundColor: '#009688',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow,
                },
            })}
        >
            <Tab.Screen name="Qibla" component={QiblaScreen} />
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Feed" component={FeedScreen}  />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        // shadowColor: "#7F5Df0",
        shadowColor: "#009688",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    customButtonshadow: {
        // shadowColor: "#7F5Df0",
        shadowColor: "#009688",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.5,
        elevation: 5,
    },
});

export default BottomTabNavigator;
