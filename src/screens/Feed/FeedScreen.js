import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    ToastAndroid,
} from "react-native";
import {
    Card,
    CardTitle,
    CardContent,
    CardAction,
    CardButton,
} from "react-native-material-cards";
import { Audio } from "expo-av";

const Item = ({ post }) => {
    const { sound: playbackObject } = Audio.Sound.createAsync(
        { uri: post.audioUrl },
        { shouldPlay: true }
    ).then((response) => response);

    return (
        <Card style={styles.card}>
            <CardTitle title={post.text} />
            <CardContent text={post.translations[0].text} />
            <CardContent text={post.translations[1].text} />
            <CardAction separator={true}>
                <CardButton
                    onPress={() => {
                        playbackObject.playAsync();
                    }}
                    title="Play"
                />
                <CardButton
                    onPress={() => {
                        playbackObject.pauseAsync();
                    }}
                    title="Pause"
                />
            </CardAction>
        </Card>
    );
};

const FeedScreen = () => {
    const [verse, setVerse] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
    };

    useEffect(() => {
        const getRandomVerse = async () => {
            const API = "https://api.quran.com/api/v4/";
            const URL =
                API + "verses/random?words=false&translations=203%2C89&audio=6";
            // console.log(URL);

            const data = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json());
            const verse = data.verse;
            // console.log(verse);
            const key = verse.verse_key.split(":");
            const arabicText = await fetch(
                API + "quran/verses/imlaei?verse_key=" + key[0] + "%3A" + key[1]
            ).then((response) => response.json());
            // console.log(arabicText);
            const formattedVerse = {
                id: verse.id,
                key: verse?.verse_key,
                text: arabicText?.verses[0]?.text_imlaei,
                translations: verse?.translations,
                audioUrl: verse?.audio?.url,
            };
            // console.log(formattedVerse);
            setVerse([formattedVerse]);
        };

        getRandomVerse();

        setIsFetching(false);
    }, [isFetching]);

    const renderItem = (verse) => <Item post={verse.item} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={verse}
                onRefresh={onRefresh}
                refreshing={isFetching}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDEDED",
    },
    list: {
        marginBottom: height * 0.2,
    },
    card: {
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
        overflow: "visible",
        marginHorizontal: "5%",
        borderRadius: 5,
    },
});

export default FeedScreen;
