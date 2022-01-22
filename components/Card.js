import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Card = (props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "purple",
    margin: 10,
    alignItems: "center",
    color: "white",
  },
  name: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
  },
});

export default Card;
