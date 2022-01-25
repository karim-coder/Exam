import { EXAMS } from "../actions/exams";

const initialState = {
  exams: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EXAMS:
      return {
        exams: action.exams,
      };

    default:
      return state;
  }
};
