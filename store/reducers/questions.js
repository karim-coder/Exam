import { QUESTIONS } from "../actions/questions";

const initialState = {
  questions: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QUESTIONS:
      return {
        questions: action.questions,
      };

    default:
      return state;
  }
};
