import { StatusBar } from "expo-status-bar";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingScreen from "./screens/SettingScreen";
import colors from "./assets/colors";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from "react-navigation";

import { Ionicons } from "@expo/vector-icons";

import CustomDrawerComponent from "./screens/DrawerNavigator.js/CustomDrawerComponent";
import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";
// AppSwitchNavigator
//  -WelcomeScreen
//   -SignUpScreen
// SignUpScreen
class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }
  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };
  render() {
    return <AppContainer />;
  }
}

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {},
    },
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain,
      },
    },
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={24} />,
      },
    },
    SettingScreen: {
      screen: SettingScreen,
      navigationOptions: {
        title: "Setting",
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />,
      },
    },
  },
  {
    contentComponent: CustomDrawerComponent,
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
