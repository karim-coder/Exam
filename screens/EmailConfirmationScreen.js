import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmailConfirmationScreen = (props) => {
  const { state } = props.navigation;
  const emailVerification = state.params.emailCode;

  const [status, setStatus] = useState("");
  const [code, setCode] = useState("");

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
        <Button
          title="Verify"
          onPress={async () => {
            try {
              const response = await axios.post(
                "https://e-prathibha.com/apis/verifyEmail",
                { reg_code: code }
              );
              if (response.data.status === 200) {
                AsyncStorage.setItem("token", response.data.data.token);
                AsyncStorage.setItem("id", response.data.data.id);
                alert("Email verified successfully!");
                props.navigation.navigate("Home");
              } else {
                setStatus(response.data.data);
              }
              console.log(response.data.data);
            } catch (err) {
              console.log(err.message);
            }
          }}
        />
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
