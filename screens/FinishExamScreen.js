import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const FinishExamScreen = (props) => {
  const mark = props.navigation.getParam("mark");
  return (
    <View>
      <Text>Exam Finished.</Text>
      <Text>
        Your mark is{" "}
        <Text
          style={{
            color: Colors.primary,
          }}
        >
          {" "}
          {mark}/224
        </Text>
      </Text>
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
