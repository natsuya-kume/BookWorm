import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../assets/colors";

import CustomActionButton from "../components/CustomActionButton";

class SettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 0.5,
            borderColor: colors.bgError,
          }}
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("WelcomeScreen")}
        >
          <Text style={{ fontWeight: "100", color: "white" }}>Log Out</Text>
        </CustomActionButton>
      </View>
    );
  }
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgMain,
  },
});
