export const SIGN_IN = "SIGN_IN";
export const LOGIN = "LOGIN";

// export const signIn = (email, password) => {
//   return {
//     type: SIGN_IN,
//     userData: {
//       email,
//       password,
//     },
//   };
// };

// export const signUp = (
//   email,
//   name,
//   phone,
//   photo,
//   password,
//   confirmPassword
// ) => {
//   return {
//     type: SIGN_UP,
//     userData: {
//       email,
//       name,
//       phone,
//       photo,
//       password,
//       confirmPassword,
//     },
//   };
// };

export const signup = (email, name, phone, password, confirmPassword) => {
  return async (dispatch) => {
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
    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("https://e-prathibha.com/apis/login", {
        email,
        password,
      });
      if (response.data.status === 200) {
        console.log("Hi");
        AsyncStorage.setItem("token", response.data.data.Token);
        AsyncStorage.setItem("id", response.data.data.Id);
        props.navigation.replace("Home");
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
};
