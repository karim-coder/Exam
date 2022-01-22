import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Colors from "../constants/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHtml from "react-native-render-html";

const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: "gray",
  },
  a: {
    color: "green",
  },
};

const ExamScreen = () => {
  const [data, setData] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(async () => {
    await axios
      .post(
        "https://e-prathibha.com/apis/start_exam_new?examId=12",
        {
          id: 12,
        },
        {
          headers: {
            server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
            Tokenu: await AsyncStorage.getItem("token"),
            id: await AsyncStorage.getItem("id"),
          },
        }
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  }, []);

  console.log(data.exam);
  return (
    <View>
      <FlatList
        data={data.exam}
        keyExtractor={(item) => item.ExamStat.id}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem}>
            <Text>Q){index + 1}</Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: item.Question.question.above }}
              tagsStyles={tagsStyles}
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginTop: 10 }}>A)</Text>
              <Text>
                {item.Question.option1 != null &&
                  item.Question.option1 != "" && (
                    <RenderHtml
                      contentWidth={width}
                      source={{ html: item.Question.option1 }}
                    />
                  )}
              </Text>
            </View>

            {item.Question.option2 != null && item.Question.option2 != "" && (
              <RenderHtml
                contentWidth={width}
                source={{ html: item.Question.option2 }}
              />
            )}
            {item.Question.option3 != null && item.Question.option3 != "" && (
              <RenderHtml
                contentWidth={width}
                source={{ html: item.Question.option3 }}
              />
            )}
            {item.Question.option4 != null && item.Question.option4 != "" && (
              <RenderHtml
                contentWidth={width}
                source={{ html: item.Question.option4 }}
              />
            )}
            {item.Question.option5 != null && item.Question.option5 != "" && (
              <RenderHtml
                contentWidth={width}
                source={{ html: item.Question.option5 }}
              />
            )}
            {item.Question.option6 != null && item.Question.option6 != "" && (
              <RenderHtml
                contentWidth={width}
                source={{ html: item.Question.option6 }}
              />
            )}

            <Text style={{ fontWeight: "bold" }}>Correct answer</Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: item.Question.answer }}
            />
            <RenderHtml
              contentWidth={width}
              source={{ html: item.Question.explanation }}
            />
          </View>
        )}
      />
    </View>
  );
};

ExamScreen.navigationOptions = () => {
  return {
    headerTitle: "Exam",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: () => null,
  };
};

const styles = StyleSheet.create({
  cartItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: "auto",
    padding: 10,
    margin: 20,
  },
});

export default ExamScreen;
