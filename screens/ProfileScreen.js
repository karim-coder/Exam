import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as profileActions from "../store/actions/profile";

const ProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const profileData = useSelector((state) => state.profile.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      let action = profileActions.profile();

      setIsLoading(true);
      try {
        await dispatch(action);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getUserData();
  }, [dispatch]);

  const logoutHandler = async () => {
    let action = authActions.logout();

    try {
      await dispatch(action);
      props.navigation.navigate("Auth");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      {!isLoading || profileData === null ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
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
              {profileData.name}
            </Text>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU",
              }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>

          <Text style={{ color: "#888" }}>Email: {profileData.email}</Text>
          <Text style={{ color: "#888" }}>Phone: {profileData.phone}</Text>
          {/* <Text>Your email: {profileData.phone}</Text> */}

          <Text
            style={{ marginTop: 50, textAlign: "center", alignSelf: "center" }}
          >
            <Button title="Logout" onPress={logoutHandler} />
          </Text>
        </View>
      )}
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
