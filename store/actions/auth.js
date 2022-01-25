import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (token, userId) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch("https://e-prathibha.com/apis/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const resData = await response.json();

    if (resData.status != 200) {
      let message = resData.data;
      throw new Error(message);
    }

    dispatch(authenticate(resData.data.Token, resData.data.Id));
    saveDataToStorage(resData.data.Token, resData.data.Id);
  };
};

export const signup = (email, name, phone, password, confirmPassword) => {
  return async (dispatch) => {
    const response = await fetch("https://e-prathibha.com/apis/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        password,
        confirmPassword,
      }),
    });
    const resData = await response.json();

    if (resData.status != 200) {
      let message = resData.data;
      throw new Error(message);
    }

    console.log(resData);

    return resData;
  };
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
    })
  );
};

export const emailConfirm = (code) => {
  return async (dispatch) => {
    const response = await fetch("https://e-prathibha.com/apis/verifyEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reg_code: code,
      }),
    });

    const resData = await response.json();

    console.log({ resData: resData });
    if (resData.status != 200) {
      let message = resData.data;
      throw new Error(message);
    }
    dispatch(authenticate(resData.data.token, resData.data.id));
    saveDataToStorage(resData.data.token, resData.data.id);
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};
