import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyText = (props) => {
  return <Text style={{ ...styles.bold, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: "open-sans",
  },
});

export default BodyText;
