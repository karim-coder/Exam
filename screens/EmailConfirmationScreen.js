import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";

const EmailConfirmationScreen = (props) => {
  const { state } = props.navigation;
  const emailVerification = state.params.emailCode;

  const [status, setStatus] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const emailConfirmHandler = async () => {
    let action = authActions.emailConfirm(code);

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <View>
      <>
        <Text>Email confirmation screen</Text>
        <Text>Your email verification code is {emailVerification}</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="please enter your verification code"
        />
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button title="Verify" onPress={emailConfirmHandler} />
        )}
        <Text>{status}</Text>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 35,
    margin: 8,
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 16,
    borderRadius: 10,
  },
});

export default EmailConfirmationScreen;
