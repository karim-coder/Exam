import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import ResolveAuthScreen from "../screens/ResolveAuthScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import EmailConfirmationScreen from "../screens/EmailConfirmationScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExamScreen from "../screens/ExamScreen";
import Colors from "../constants/Colors";
const loginFlow = createStackNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    ConfirmEmail: EmailConfirmationScreen,
  },
  {
    navigationOptions: {
      headerShown: false,
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
          color={tabInfo.focused ? "white" : Colors.accent}
        />
      ),
    },
  }
);

const Exam = createStackNavigator(
  {
    Exam: ExamScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <FontAwesome
          name="pencil-square-o"
          size={tabInfo.focused ? 26 : 20}
          color={tabInfo.focused ? "white" : Colors.accent}
        />
      ),
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
          color={tabInfo.focused ? "white" : Colors.accent}
        />
      ),
    },
  }
);
const main = createMaterialBottomTabNavigator(
  {
    Home,
    Exam,
    Profile,
  },
  {
    navigationOptions: {
      headerShown: false,
      headerLeft: () => null,
    },
  }
);

const examNavigator = createStackNavigator({
  loginFlow,
  main,
});
export default createAppContainer(examNavigator);
