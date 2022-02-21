import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFavoriteTimes } from "../../context/FavoriteTimesContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const FavoriteTimes = ({ setShowFavoriteTimes }) => {
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [favoriteTimesState, favoriteTimesDispatch] = useFavoriteTimes();
    const { prayerTimes, loading, error } = useSelector(
        (state) => state.prayerTimes
    );

    useEffect(() => {
        if (favoriteTimesState.favoriteTimes.length) {
            setData(favoriteTimesState.favoriteTimes);
        } else {
            if (prayerTimes) {
                setData(prayerTimes.timings);
                () => dispatchFavoriteTimes(prayerTimes.timings);
            }
        }
        return () => setData([]);
    }, [favoriteTimesState]);

    const dispatchFavoriteTimes = (favoriteTimes) => {
        console.log(favoriteTimes)
        favoriteTimesDispatch({
            type: "SET_FAVORITE_TIMES",
            payload: {
                favoriteTimes,
            },
        });
    };

    const toggleFavoriteTimes = (item) => {
        const newData = data.map((e) =>
            e.id === item.id ? { ...e, favorite: !e.favorite } : e
        );
        // console.log(newData);

        setData(newData)
    };

    const Item = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => toggleFavoriteTimes(item)}>
                <View style={styles.listItem}>
                    <Text style={styles.text} key={item.numericCode}>
                        {item.timeName}
                    </Text>

                    {item.favorite && (
                        <Image
                            source={require("../../assets/images/red-tick-image.png")}
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const HeaderComponent = () => {
        return (
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => setShowFavoriteTimes(false)}
                    >
                        <Ionicons
                            name="close-circle-outline"
                            size={32}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.closeButton}>
                    <TouchableOpacity
                        onPress={() => dispatchFavoriteTimes(data)}
                    >
                        {Platform.OS === "ios" && (
                            <Ionicons
                                name="ios-save-outline"
                                size={32}
                                color="black"
                            />
                        )}
                        {Platform.OS === "android" && (
                            <MaterialIcons
                                name="save-alt"
                                size={32}
                                color="black"
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.card, styles.shadowProp]}>
            <HeaderComponent/>
            <FlatList
                // ListHeaderComponent={ListHeaderComponent}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Item item={item} />}
                ItemSeparatorComponent={
                    Platform.OS !== "android" &&
                    (({ highlighted }) => (
                        <View style={[styles.itemSeparator]} />
                    ))
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        marginTop: "-30%",
        padding: 10,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "center",
        width: "90%",
        height: "60%",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 5,
        borderBottomWidth: 1,
    },
    closeButton: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 10,
    },
    boldText: { fontSize: 16, fontWeight: "bold" },
    iconContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 10,
    },
    shadowProp: {
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    text: {
        fontSize: 18,
        color: "#101010",
        fontWeight: "600",
    },
    listItem: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemSeparator: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
});

export default FavoriteTimes;
