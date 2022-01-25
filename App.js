import ExamNavigator from "./navigation/ExamNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import questionsReducer from "./store/reducers/questions";
import examsReducer from "./store/reducers/exams";
import profileReducer from "./store/reducers/profile";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const rootReducer = combineReducers({
  auth: authReducer,
  questions: questionsReducer,
  exams: examsReducer,
  profile: profileReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default () => {
  return (
    <Provider store={store}>
      <ExamNavigator />
    </Provider>
  );
};
