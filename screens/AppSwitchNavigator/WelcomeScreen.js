import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
        <View
          style={{
            flex: 1,
            borderColor: "black",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="ios-bookmarks" size={150} color={colors.logoColor} />
          <Text style={{ fontSize: 50, fontWeight: "100", color: "white" }}>
            Book Worm
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderColor: "orange",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <CustomActionButton
            style={{
              width: 200,
              backgroundColor: "transparent",
              borderWidth: 0.5,
              borderColor: colors.bgPrimary,
              marginBottom: 10,
            }}
            title="Login"
            onPress={() => this.props.navigation.navigate("HomeScreen")}
          >
            <Text style={{ fontWeight: "100", color: "white" }}>Log in</Text>
          </CustomActionButton>
          <CustomActionButton
            style={{
              width: 200,
              backgroundColor: "transparent",
              borderWidth: 0.5,
              borderColor: colors.bgError,
            }}
            title="Sign Up"
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
          >
            <Text style={{ fontWeight: "100", color: "white" }}>Sign Up</Text>
          </CustomActionButton>
        </View>
      </View>
    );
  }
}
