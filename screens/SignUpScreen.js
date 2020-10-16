import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class SignUpScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SignUpScreen</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SignUpScreen;
