import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const cardWidth = 0.95 * width;
const cardHeight = 0.45 * height;
const InfoCard = () => {
  const [newList, setNewList] = useState([]);

  const { prayerTimes, loading, error } = useSelector(
    (state) => state.prayerTimes
  );

  useEffect(() => {
    setNewList(prayerTimes);
    return () => setNewList([]);
  }, [prayerTimes]);

  const changeAlarmActive = (id) => {
    const _list = newList.map((item) =>
      item.id === id ? { ...item, active: !item.active } : { ...item }
    );
    setNewList(_list);
  };

  const calculateRemainingTime = () => {};

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

  return (
    <View style={[styles.card, styles.shadowProp]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 5,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            width: cardWidth * 0.85,
            alignItems: "center",
            paddingLeft: 50,
            // backgroundColor: "#fa5",
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {"remainingTime"}
          </Text>
        </View>
        <View
          style={{
            width: cardWidth * 0.15,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#f45",
            padding: 5,
          }}
        >
          <TouchableOpacity>
            <Ionicons name="settings-sharp" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        {newList?.length > 0 &&
          newList.map((listItem) => (
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                // backgroundColor: "#f45",
              }}
              key={listItem.id}
            >
              <View
                style={{
                  width: cardWidth / 3,
                  alignItems: "left",
                  // backgroundColor: "#fa5",
                  padding: 2,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {listItem.timeName}
                </Text>
              </View>
              <View
                style={{
                  width: cardWidth / 3,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2,
                }}
              >
                <Text style={{ fontSize: 16 }}>{listItem.time}</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: cardWidth / 3,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2,
                }}
                onPress={() => changeAlarmActive(listItem.id)}
              >
                {/* <Text style={{ fontSize: 18 }}>active</Text> */}
                {listItem.active ? (
                  <Image
                    style={{ width: 22, height: 22 }}
                    source={require("../assets/images/alarm-icon.png")}
                  />
                ) : (
                  <Image
                    style={{ width: 22, height: 22 }}
                    source={require("../assets/images/alarm-icon-disabled.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    width: cardWidth,
    // height: cardHeight,
    alignSelf: "center",
    paddingTop: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: -0.2 * height,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
