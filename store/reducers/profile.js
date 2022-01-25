import { PROFILE } from "../actions/profile";

const initialState = {
  userData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        userData: action.userData,
      };

    default:
      return state;
  }
};
