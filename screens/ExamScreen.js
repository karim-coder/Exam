import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHtml from "react-native-render-html";
import RadioButtonRN from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";

const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: "gray",
  },
  p: {
    flexDirection: "row",
    padding: 0,
    margin: 0,
  },
};
let s;

const ExamScreen = (props) => {
  var arrayUniqueByKey = [];
  const [data, setData] = useState([]);
  const { width } = useWindowDimensions();
  const [mark, setMark] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [marks, setMarks] = useState([]);

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

  const addData = (e, item) => {
    let a = [...marks];

    if (e.index === parseFloat(item.Question.answer)) {
      a.push({ id: item.ExamStat.id, mark: parseFloat(item.Question.marks) });
      setMarks(a);
    } else {
      a.push({
        id: item.ExamStat.id,
        mark: -parseFloat(item.Question.negative_marks),
      });
      setMarks(a);
    }
    const key = "id";
    arrayUniqueByKey = [
      ...new Map(a.map((item) => [item[key], item])).values(),
    ];
    setMarks(arrayUniqueByKey);
    var sum = 0;
    arrayUniqueByKey.forEach((x) => {
      if (x) {
        sum += x.mark;
      }
    });
    // console.log({ Total_Mark: sum });
    // console.log(marks);
    setMark(sum);
    // console.log(arrayUniqueByKey);
  };

  useEffect(() => {
    addData;
  }, []);

  console.log(data.exam);
  return (
    <View>
      <FlatList
        data={data.exam}
        keyExtractor={(item) => item.ExamStat.id}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Q){index + 1} </Text>
              {item.Question.question.above.replace(/<[^>]+>/g, "").trim()}
            </Text>
            <RadioButtonRN
              data={[
                {
                  label: item.Question.option1.replace(/<[^>]+>/g, "").trim(),
                  index: 1,
                },
                {
                  label: item.Question.option2.replace(/<[^>]+>/g, "").trim(),
                  index: 2,
                },
                {
                  label: item.Question.option3.replace(/<[^>]+>/g, "").trim(),
                  index: 3,
                },
                {
                  label: item.Question.option4.replace(/<[^>]+>/g, "").trim(),
                  index: 4,
                },
                ...(item.Question.option5 != null && item.Question.option5 != ""
                  ? {
                      label: item.Question.option5
                        .replace(/<[^>]+>/g, "")
                        .trim(),
                      index: 4,
                    }
                  : []),
                ...(item.Question.option6 != null && item.Question.option6 != ""
                  ? {
                      label: item.Question.option6
                        .replace(/<[^>]+>/g, "")
                        .trim(),
                      index: 4,
                    }
                  : []),
                ...(item.Question.option6 != null && item.Question.option6 != ""
                  ? {
                      label: item.Question.option6
                        .replace(/<[^>]+>/g, "")
                        .trim(),
                      index: 4,
                    }
                  : []),
              ]}
              selectedBtn={(e) => addData(e, item)}
              icon={<FontAwesome name="circle-o" size={25} color="#2c9dd1" />}
            />

            <Text style={{ fontWeight: "bold" }}>Correct answer</Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: item.Question.answer }}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <Text style={{ margin: 20, textAlign: "center" }}>
            <Button
              title="Finish Exam"
              onPress={() => {
                props.navigation.navigate("FinishExam", {
                  mark: mark,
                });
              }}
            />
          </Text>
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
