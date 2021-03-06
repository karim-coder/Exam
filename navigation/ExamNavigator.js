import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import ResolveAuthScreen from "../screens/ResolveAuthScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import EmailConfirmationScreen from "../screens/EmailConfirmationScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExamScreen from "../screens/ExamScreen";
import FinishExamScreen from "../screens/FinishExamScreen";
import StartExam from "../screens/StartExam";
import AuthScreen from "../screens/AuthScreen";

const Auth = createStackNavigator({
  Auth: AuthScreen,
});

const loginFlow = createStackNavigator(
  {
    Auth: AuthScreen,
    ConfirmEmail: EmailConfirmationScreen,
  },
  {
    navigationOptions: {
      headerShown: false,
    },
  }
);

const Finish = createStackNavigator(
  {
    Exam: ExamScreen,
    FinishExam: FinishExamScreen,
  },
  {
    navigationOptions: {
      headerShown: false,
      headerLeft: () => null,
    },
  }
);

const Home = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons
          name="home"
          size={tabInfo.focused ? 26 : 20}
          color={tabInfo.focused ? "white" : "#ccc"}
        />
      ),
    },
  }
);

const Start = createStackNavigator(
  {
    Start: StartExam,
    Finish,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <FontAwesome
          name="pencil-square-o"
          size={tabInfo.focused ? 26 : 20}
          color={tabInfo.focused ? "white" : "#ccc"}
        />
      ),
      // headerShown: false,
    },
  }
);

const Profile = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <AntDesign
          name="profile"
          size={tabInfo.focused ? 26 : 20}
          color={tabInfo.focused ? "white" : "#ccc"}
        />
      ),
    },
  }
);

const main = createMaterialBottomTabNavigator(
  {
    Home,
    Start,
    Profile,
  },
  {
    navigationOptions: {
      headerShown: false,
      headerLeft: () => null,
    },
  }
);

const examNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow,
  main,
});
export default createAppContainer(examNavigator);
