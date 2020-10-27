import { StatusBar } from "expo-status-bar";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingScreen from "./screens/SettingScreen";
import BooksReadingScreen from "./screens/HomeTabNavigator/BooksReadingScreen";
import BooksReadScreen from "./screens/HomeTabNavigator/BooksReadScreen";

import colors from "./assets/colors";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";

import { Provider } from "react-redux";
import store from "./redux/store";
import BooksCountContainer from "./redux/containers/BooksCountContainer";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import { Ionicons } from "@expo/vector-icons";

import CustomDrawerComponent from "./screens/DrawerNavigator.js/CustomDrawerComponent";
import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
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
    return (
      <Provider store={store}>
        <ActionSheetProvider>
          <AppContainer />
        </ActionSheetProvider>
      </Provider>
    );
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

const HomeTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Total Books",
        tabBarIcon: ({ tintColor }) => (
          <BooksCountContainer color={tintColor} type="books" />
        ),
      },
    },
    BooksReadingScreen: {
      screen: BooksReadingScreen,
      navigationOptions: {
        tabBarLabel: "Books Reading",
        tabBarIcon: ({ tintColor }) => (
          <BooksCountContainer color={tintColor} type="booksReading" />
        ),
      },
    },
    BooksReadScreen: {
      screen: BooksReadScreen,
      navigationOptions: {
        tabBarLabel: "Books Read",
        tabBarIcon: ({ tintColor }) => (
          <BooksCountContainer color={tintColor} type="booksRead" />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: colors.bgMain,
      },
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
    },
  }
);

HomeTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  switch (routeName) {
    case "HomeScreen":
      return {
        headerTitle: "Total Books",
      };
    case "BooksReadingScreen":
      return {
        headerTitle: "Reading Books",
      };
    case "BooksReadScreen":
      return {
        headerTitle: "Read Books",
      };
    default:
      return {
        headerTitle: "Book Worm",
      };
  }
};

const HomeStackNavigator = createStackNavigator(
  {
    HomeTabNavigator: {
      screen: HomeTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Ionicons
              style={{ marginLeft: 10 }}
              name="ios-menu"
              size={30}
              color={colors.logoColor}
              onPress={() => navigation.openDrawer()}
            />
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain,
      },
      headerTintColor: colors.txtWhite,
    },
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
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
