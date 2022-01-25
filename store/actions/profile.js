export const PROFILE = "PROFILE";

export const profile = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch("https://e-prathibha.com/apis/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
        tokenu: token,
        id: userId,
      },
      body: JSON.stringify({
        id: userId,
      }),
    });

    const resData = await response.json();
    dispatch({ type: PROFILE, userData: resData.data });
  };
};
