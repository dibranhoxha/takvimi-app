import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useLocation } from "../../context/LocationContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocations } from "../../redux/actions/locationsAction";
import { fetchOrientation } from "../../redux/actions/orienationAction";
import { fetchTimes } from "../../redux/actions/prayerTimesAction";
import { _storeData, _retrieveData, _clearData } from "../../storage/Storage";

const API = "https://restcountries.com/v2/all";

const LocationsScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [locationState, locationDispatch] = useLocation();

    const { locations, loading, error } = useSelector(
        (state) => state.locations
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLocations());
    }, [dispatch]);

    useEffect(() => {
        setData(locations);
        setFilteredData(locations);
    }, [locations]);

    const searchFilter = (text) => {
        if (text) {
            const newData = data.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : "";
                return itemData.indexOf(text.toUpperCase()) > -1;
            });
            setFilteredData(newData);
        } else {
            setFilteredData(data);
        }
        setSearch(text);
    };

    const selectLocation = async (location) => {
        await _storeData("location", location);
        
        const {
            latlng: [latitude, longitude],
        } = location || null;
        dispatch(fetchOrientation(latitude, longitude));
        dispatch(fetchTimes(latitude, longitude));

        locationDispatch({
            type: "SET_LOCATION",
            payload: {
                location,
            },
        });
        navigation.goBack();
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#009688" />
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 18 }}>Error fetching data!</Text>
            </View>
        );
    }
    const Item = ({ item }) => {
        const { location } = locationState;
        return (
            <TouchableOpacity onPress={() => selectLocation(item)}>
                <View style={styles.listItem}>
                    <Text style={styles.text} key={item.numericCode}>
                        {item.name}
                    </Text>

                    {location && location?.numericCode === item.numericCode && (
                        <Image
                            source={require("../../assets/images/red-tick-image.png")}
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const ItemSeparator = () => {
        return <View style={styles.itemSeparator} />;
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                    placeholder="Search location"
                    style={styles.textInput}
                />
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Item item={item} />}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDEDED",
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
    searchBar: {
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    textInput: {
        height: 40,
        backgroundColor: "#EDEDED",
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});

export default LocationsScreen;
