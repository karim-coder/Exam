import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Exam from "../components/Exam";
import Colors from "../constants/Colors";
import * as examsActions from "../store/actions/exams";

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const data = useSelector((state) => state.exams.exams);

  const dispatch = useDispatch();

  useEffect(() => {
    const getExams = async () => {
      let action = examsActions.getExams();

      setIsLoading(true);
      try {
        await dispatch(action);
      } catch (err) {
        setIsLoading(false);
      }
    };

    getExams();
  }, []);

  // console.log({ Data: data });

  const title = [
    "Old question papers UPSC Civils (Pre)",
    "Limited UPSC other than Civils",
    "Limited NCERT",
  ];

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <View style={styles.exams}>
          <FlatList
            data={data}
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
