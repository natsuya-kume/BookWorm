import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  onSignIn = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (response) {
          this.setState({ isLoading: false });
          this.props.navigation.navigate("LoadingScreen");
        }
      } catch (error) {
        this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/user-not-found":
            alert("A user with that email does not exist.Try signng Up");
            break;
          case "auth/invalid-email":
            alert("Please enter an email address");
        }
      }
    } else {
      alert("Please enter email and password");
    }
  };
  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
        if (response) {
          this.setState({ isLoading: false });

          const user = await firebase
            .database()
            .ref("users/")
            .child(response.user.uid)
            .set({ email: response.user.email, uid: response.user.uid });
          this.props.navigation.navigate("LoadingScreen");
          // this.onSignIn(this.state.email, this.state.password);
        }
      } catch (error) {
        this.setState({ isLoading: false });

        if (error.code == "auth/email-already-in-use") {
          alert("User already Exists.Try Loggin in");
        }
      }
    } else {
      alert("Please enter email and password");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000,
              },
            ]}
          >
            <ActivityIndicator size="large" color={colors.logoColor} />
          </View>
        ) : null}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            placeholder="abc@example.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="enter password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
          />
          <View style={{ alignItems: "center" }}>
            <CustomActionButton
              onPress={this.onSignIn}
              style={[styles.loginButton, { borderColor: colors.bgPrimary }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
              onPress={this.onSignUp}
              style={[styles.loginButton, { borderColor: colors.bgError }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Signup</Text>
            </CustomActionButton>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10,
  },
  loginButton: {
    borderWidth: 0.5,
    backgroundColor: "transparent",
    marginTop: 10,
    width: 200,
  },
});
export default LoginScreen;
