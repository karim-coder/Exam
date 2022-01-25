import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Button,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import axios from "axios";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHtml from "react-native-render-html";
import RadioButtonRN from "radio-buttons-react-native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import * as questionAction from "../store/actions/questions";

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
  const { width } = useWindowDimensions();
  const [mark, setMark] = useState(0);
  const [marks, setMarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions.questions);

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
    console.log({ Total_Mark: sum });
    // console.log(marks);
    setMark(sum);
    // console.log(arrayUniqueByKey);
  };

  useEffect(() => {
    if (!questions) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [questions]);

  useEffect(() => {
    addData;
  }, []);

  const examFinishHandler = async () => {
    const action = questionAction.finishExam();
    setIsLoading(true);
    try {
      console.log("Hi");
      await dispatch(action);
      props.navigation.navigate("FinishExam", {
        mark: mark,
      });
      console.log(mark);
    } catch (err) {
      setIsLoading(false);
    }
  };

  // console.log(data.exam);
  return (
    <View>
      <FlatList
        data={questions}
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
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button title="Finish Exam" onPress={examFinishHandler} />
            )}
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
