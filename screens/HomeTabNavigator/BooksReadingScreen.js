import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import colors from "../assets/colors";

class BooksReadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BooksReading</Text>
      </View>
    );
  }
}

export default BooksReadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
