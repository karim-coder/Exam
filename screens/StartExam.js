import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";

const StartExam = (props) => {
  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Start Exam"
        onPress={() => props.navigation.navigate("Finish")}
      />
    </View>
  );
};

StartExam.navigationOptions = () => {
  return {
    headerTitle: "Start Exam",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: () => null,
  };
};

export default StartExam;
