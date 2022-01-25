import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      confirmPassword: "",
    },
    inputValidities: {
      email: false,
      password: false,
      name: false,
      phone: false,
      confirmPassword: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      console.log({ Error: error });
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const signUpHandler = async () => {
    let action = authActions.signup(
      formState.inputValues.email,
      formState.inputValues.name,
      formState.inputValues.phone,
      formState.inputValues.password,
      formState.inputValues.confirmPassword
    );

    setError(null);
    setIsLoading(true);
    try {
      const response = await dispatch(action);
      props.navigation.navigate("ConfirmEmail", {
        emailCode: response.data.split(/[, ]+/).pop(),
      });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const signInHandler = async () => {
    let action = authActions.login(
      formState.inputValues.email,
      formState.inputValues.password
    );

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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            iconName="envelope"
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          {isSignup && (
            <>
              <Input
                id="name"
                label="Name"
                keyboardType="default"
                required
                iconName="user"
                errorText="Please enter a name."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="phone"
                label="Phone"
                keyboardType="decimal-pad"
                minLength={10}
                required
                iconName="phone"
                autoCapitalize="none"
                errorText="Please enter a valid phone no"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </>
          )}
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            iconName="lock"
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          {isSignup && (
            <Input
              id="confirmPassword"
              label="Confirm Password"
              secureTextEntry
              keyboardType="default"
              minLength={5}
              required
              iconName="lock"
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          )}
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={isSignup ? signUpHandler : signInHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup((preState) => !preState);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = () => {
  return {
    title: "Authenticate",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },

  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 800,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
