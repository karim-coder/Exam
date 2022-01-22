import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import axios from "axios";

const ProfileScreen = (props) => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    await axios
      .post(
        "https://e-prathibha.com/apis/profile",
        {
          id: await AsyncStorage.getItem("id"),
        },
        {
          headers: {
            server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
            tokenu: await AsyncStorage.getItem("token"),
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
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "black",
            borderBottomWidth: 1,
            alignItems: "center",
            paddingBottom: 5,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            {data.name}
          </Text>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU",
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>

        <Text style={{ color: "#888" }}>Email: {data.email}</Text>
        <Text style={{ color: "#888" }}>Phone: {data.phone}</Text>
        {/* <Text>Your email: {data.phone}</Text> */}

        <Text
          style={{ marginTop: 50, textAlign: "center", alignSelf: "center" }}
        >
          <Button
            title="Logout"
            onPress={async () => {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("id");
              props.navigation.navigate("Signin");
            }}
          />
        </Text>
      </View>
    </SafeAreaView>
  );
};

ProfileScreen.navigationOptions = () => {
  return {
    headerTitle: "Profile",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
    headerLeft: () => null,
  };
};

export default ProfileScreen;
