import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResolveAuthScreen = (props) => {
  const tryLocalSignin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      props.navigation.navigate("Home");
    } else {
      props.navigation.navigate("Signin");
    }
  };
  useEffect(() => {
    tryLocalSignin();
  }, []);
  return null;
};
ResolveAuthScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default ResolveAuthScreen;
