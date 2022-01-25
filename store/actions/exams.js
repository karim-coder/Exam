export const EXAMS = "EXAMS";

export const getExams = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      "https://e-prathibha.com/apis/test_free_exam",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
          tokenu: token,
          id: userId,
        },
        body: JSON.stringify({
          examid: 12,
          qno: 1,
        }),
      }
    );
    const resData = await response.json();

    dispatch({ type: EXAMS, exams: resData.data.exams });
  };
};
