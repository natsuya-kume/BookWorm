import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";

import { DrawerItems } from "react-navigation";

class CustomDrawerComponent extends React.Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={colors.bgMain} />
        <View
          style={{
            height: 150,
            backgroundColor: colors.bgMain,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: (Platform.OS = "android" ? 20 : 0),
          }}
        >
          <Ionicons name="ios-bookmarks" size={100} color={colors.logoColor} />
          <Text style={{ fontSize: 24, color: "white", fontWeight: "100" }}>
            Book Worm
          </Text>
        </View>
        <DrawerItems {...this.props} />
      </ScrollView>
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
export default CustomDrawerComponent;
