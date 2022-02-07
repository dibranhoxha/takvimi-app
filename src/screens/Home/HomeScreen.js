import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import Header from "../../components/Header";
import InfoCard from "../../components/InfoCard";
import { useDispatch } from "react-redux";
import { fetchTimes } from "../../redux/actions/prayerTimesAction";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTimes());
  }, [dispatch]);
  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <View style={{ flex: 2 }}>
        <Header navigation={navigation} />
      </View>
      <View style={{ flex: 3, justifyContent: 'center' }}>
        <InfoCard />
      </View>
    </View>
  );
};

export default Home;
