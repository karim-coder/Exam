import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const FinishExamScreen = (props) => {
  const mark = props.navigation.getParam("mark");
  return (
    <View>
      <Text>Exam Finish Screen</Text>
      <Text>You scored {mark}</Text>
    </View>
  );
};

FinishExamScreen.navigationOptions = () => {
  return {
    headerTitle: "Exam Result",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: () => null,
  };
};

export default FinishExamScreen;
