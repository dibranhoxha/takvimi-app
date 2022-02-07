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
import { Ionicons, Feather } from "@expo/vector-icons";

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

  const alarmImagePath = (active) => {
    return active
      ? require("../assets/images/alarm-icon-disabled.png")
      : require("../assets/images/alarm-icon.png");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <View style={[styles.card, styles.shadowProp]}>
          <View style={styles.cardHeader}>
            <View style={styles.remainingTime}>
              <Text style={styles.boldText}>{"remainingTime"}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Ionicons name="settings-sharp" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.timesContainer}>
            {newList?.length > 0 &&
              newList.map((listItem) => (
                <View
                  style={[
                    styles.listItem,
                    {
                      borderWidth: newList.indexOf(listItem) === 3 ? 2 : "",
                      borderRadius: newList.indexOf(listItem) === 3 ? 20 : "",
                    },
                  ]}
                  key={listItem.id}
                >
                  <View style={styles.timeName}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {listItem.timeName}
                    </Text>
                  </View>
                  <View style={styles.time}>
                    <Text style={{ fontSize: 16 }}>{listItem.time}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.alarm}
                    onPress={() => changeAlarmActive(listItem.id)}
                  >
                    <Feather
                      name={`bell${listItem.active ? "" : "-off"}`}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginTop: "-30%",
    padding: 10,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
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
  text: { fontSize: 16 },
  boldText: { fontSize: 16, fontWeight: "bold" },
  iconContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 5,
  },
  timesContainer: { paddingTop: 10 },
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#009688",
  },
  timeName: {
    flex: 1,
    alignItems: "flex-start",
  },
  time: {
    flex: 1,
    alignItems: "center",
  },
  alarm: {
    flex: 1,
    alignItems: "flex-end",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
