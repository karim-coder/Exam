export const QUESTIONS = "QUESTIONS";

export const getQuestions = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      "https://e-prathibha.com/apis/start_exam_new?examId=12",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
          tokenu: token,
          id: userId,
        },
        body: JSON.stringify({
          id: 12,
        }),
      }
    );
    const resData = await response.json();
    dispatch({ type: QUESTIONS, questions: resData.data.exam });
  };
};

export const finishExam = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch("https://e-prathibha.com/apis/finishExam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
        tokenu: token,
        id: userId,
      },
      body: JSON.stringify({
        examId: 12,
        qno: 1,
      }),
    });

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: QUESTIONS, questions: null });
  };
};
