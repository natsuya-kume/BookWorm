import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../assets/colors";

const ListEmptyComponent = ({ text }) => {
  return (
    <View style={styles.listEmptyComponent}>
      <Text style={styles.listEmptyComponentText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center",
  },
  listEmptyComponentText: {
    fontWeight: "bold",
    color: colors.txtWhite,
  },
});

export default ListEmptyComponent;
