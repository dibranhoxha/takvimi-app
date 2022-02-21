import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, Feather } from "@expo/vector-icons";
import { getRemainingTime } from "../redux/actions/remaningTimeAction";

const InfoCardHeader = ({ time, setShowFavoriteTimes }) => {
    const dispatch = useDispatch();
    const { remainingTime, loading, error } = useSelector(
        (state) => state.remainingTime
    );
    useEffect(() => {
        dispatch(getRemainingTime(time));
        const timer = setInterval(() => {
            dispatch(getRemainingTime(time));
        }, 60000);
        () => clearInterval(timer)
    }, [time]);
    return (
        <View style={styles.cardHeader}>
            <View style={styles.remainingTime}>
                <Text style={styles.boldText}>{remainingTime}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => setShowFavoriteTimes(true)}>
                    <Ionicons name="settings-sharp" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InfoCardHeader;

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 5,
        borderBottomWidth: 1,
    },
    remainingTime: {
        flex: 9,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 50,
    },
    boldText: { fontSize: 16, fontWeight: "bold" },
    iconContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 5,
    },
});
