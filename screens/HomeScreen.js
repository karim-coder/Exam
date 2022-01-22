import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Exam from "../components/Exam";
import Colors from "../constants/Colors";
const HomeScreen = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(async () => {
    await axios
      .post(
        "https://e-prathibha.com/apis/test_free_exam",
        {
          examid: 12,
          qno: 1,
        },
        {
          headers: {
            server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
            tokenu: await AsyncStorage.getItem("token"),
            id: await AsyncStorage.getItem("id"),
          },
        }
      )
      .then((response) => {
        setData(response.data.data);
        // setData(Object.values(response.data.data.exams[0]));
        // console.log(Object.keys(response.data.data.exams));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  if (!data) {
    setLoading(true);
  }
  const title = [
    "Old question papers UPSC Civils (Pre)",
    "Limited UPSC other than Civils",
    "Limited NCERT",
  ];

  // console.log(data.exams[0]["Old question papers UPSC Civils (Pre)"]);
  // console.log(data.exams[0]["Old question papers UPSC Civils (Pre)"]);
  // console.log(Object.keys(data.exams[0]));
  // console.log(data.exams);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.exams}>
          <FlatList
            data={data.exams}
            keyExtractor={(item) => item.total}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Text>{title[index]}</Text>
                  <Exam title={title[index]} data={item} />
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
HomeScreen.navigationOptions = () => {
  return {
    headerTitle: "Home",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: () => null,
    tabBarIcon: <Ionicons name="home" size={24} />,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  exams: {},
});

export default HomeScreen;
