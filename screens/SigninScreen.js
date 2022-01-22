import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { Context } from "../context/AuthContext";

const SigninScreen = (props) => {
  // const user = useSelector(state => state.)
  const { state, signin, clearErrorMessage } = useContext(Context);

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={errorMessage}
        submitButtonText="Sign In"
        navLinkText="Don't have an account? Sign up instead"
        routName="Signup"
        onSubmit={async ({ email, password }) => {
          try {
            const response = await axios.post(
              "https://e-prathibha.com/apis/login",
              { email, password }
            );
            if (response.data.status === 200) {
              console.log("Hi");
              AsyncStorage.setItem("token", response.data.data.Token);
              AsyncStorage.setItem("id", response.data.data.Id);
              props.navigation.navigate("Home");
              const id = await AsyncStorage.getItem("id");
              console.log(id);
            }
            if (response.data.status === 400) {
              setErrorMessage(response.data.data);
            }
          } catch (err) {
            console.log(err.message);
          }
        }}
      />
    </View>
  );
};

SigninScreen.navigationOptions = {
  headerLeft: () => null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SigninScreen;
