import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import colors from "../assets/colors";

class BooksReadScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BooksRead</Text>
      </View>
    );
  }
}

export default BooksReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
