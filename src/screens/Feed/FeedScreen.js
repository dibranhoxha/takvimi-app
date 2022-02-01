import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Card from "../../components/feed/Card";

const FeedScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={[
                    { id: 1, text: "test" },
                    { id: 1, text: "test" },
                    { id: 1, text: "test" },
                    { id: 1, text: "test" },
                    { id: 1, text: "test" },
                ]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card>
                        <Text>{item.text}</Text>
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDEDED",
    },
});

export default FeedScreen;
