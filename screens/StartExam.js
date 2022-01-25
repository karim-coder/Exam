import React, { useState } from "react";
import { View, StyleSheet, Button, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as questionAction from "../store/actions/questions";

const StartExam = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const startExamHandler = async () => {
    let action = questionAction.getQuestions();
    setIsLoading(true);

    try {
      await dispatch(action);
      props.navigation.navigate("Finish");
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <Button
          title="Start Exam"
          color={Colors.primary}
          onPress={startExamHandler}
        />
      )}
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
