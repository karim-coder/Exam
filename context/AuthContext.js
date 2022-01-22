import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axios.post("https://e-prathibha.com/apis/login", {
        email,
        password,
      });
      if (response.data.status === 200) {
        console.log("Hi");
        AsyncStorage.setItem("token", response.data.data.Token);
        AsyncStorage.setItem("id", response.data.data.Id);
        navigation.replace("Home");
        const id = await AsyncStorage.getItem("id");
        dispatch({ type: "signin", payload: response.data.token });

        console.log(id);
      }
      if (response.data.status === 400) {
        setErrorMessage(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axios.post("https://e-prathibha.com/apis/login", {
        email,
        password,
      });
      if (response.data.status === 200) {
        console.log("Hi");
        AsyncStorage.setItem("token", response.data.data.Token);
        AsyncStorage.setItem("id", response.data.data.Id);
        // navigation.replace("Home");
        dispatch({ type: "signin", payload: response.data.token });

        navigator.dispatch("Home");
        const id = await AsyncStorage.getItem("id");
        console.log(id);
      }
      if (response.data.status === 400) {
        setErrorMessage(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
