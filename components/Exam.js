import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "./Card";

const Exam = (props) => {
  // console.log(props.data[props.title]);

  return (
    <View style={{ width: "100%", alignContent: "center" }}>
      {props.data[props.title].map((exam, i) => (
        <View key={i}>
          {i === 0 ? <Text style={styles.name}>{exam.cate.name}</Text> : null}
          <Card name={exam.Exam.name} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
  },
});
export default Exam;
