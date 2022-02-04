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
    <View style={{ padding: 0, margin: 0 }}>
      <Header navigation={navigation} />
      <InfoCard />
    </View>
  );
};

export default Home;
