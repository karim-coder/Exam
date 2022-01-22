import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import Colors from "../constants/Colors";

const SignupScreen = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  var data = null;
  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up"
        submitButtonText="Sign Up"
        errorMessage={errorMessage}
        navLinkText="Already have and account? Sign in instead!"
        routName="Signin"
        onSubmit={async ({ email, name, phone, password, confirmPassword }) => {
          try {
            const response = await axios.post(
              "https://e-prathibha.com/apis/register",
              { email, name, phone, data, password, confirmPassword }
            );
            if (response.data.status === 400) {
              setErrorMessage(response.data.data);
              return;
            }
            console.log(response.data.data);
            props.navigation.navigate("ConfirmEmail", {
              emailCode: response.data.data.split(/[, ]+/).pop(),
            });
            console.log(response.data.data.split(/[, ]+/).pop());
            console.log(response.data.data);
          } catch (err) {
            console.log(err.message);
          }
        }}
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerLeft: () => null,
    title: "Sign Up",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignupScreen;
