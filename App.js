import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ExamNavigator from "./navigation/ExamNavigator";
import { Provider as AuthProvider } from "./context/AuthContext";
// import authReducer from "./store/reducers/auth";

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const store = createStore(rootReducer);

export default () => {
  return (
    <AuthProvider>
      <ExamNavigator />
    </AuthProvider>
  );
};
