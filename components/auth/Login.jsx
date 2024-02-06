import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useGlobalContext } from "../../context/StateContext";
import axios from "axios";
import { CHECK_USER_ROUTE } from "../../utils/ApiRoutes";
import { reducerCases } from "../../context/constants";

const Login = () => {
  const navigation = useNavigation();
  const {
    dispatch,
    state: { userInfo, isNewUser },
  } = useGlobalContext();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1041538275834-53k3jr9ntetvrsd97jh7hdp90ui8q0uf.apps.googleusercontent.com",
    });
  }, []);

  const handleLogin = async () => {
    console.log("login intitated")
    try {
      await GoogleSignin.hasPlayServices();
      const {
        user: { name, email, photo },
      } = await GoogleSignin.signIn();

      
      if (email) {
        console.log("logged in with google", name, email, photo);
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });

        if (!data.status) {
          await dispatch({ type: reducerCases.SET_NEW_USER, isNewUser: true });
          await dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              email,
              name,
              image: photoURL,
            },
          });
          console.log("new user");
          // router.push("/onboarding");
        } else {
          console.log("user found");
          await dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              email: data.data.email,
              name: data.data.name,
              image: data.data.profilePicture,
              about: data.data.about,
              id: data.data.id,
            },
          });
          await dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
        }
      }
    } catch (err) {

      console.log(JSON.stringify(err, null, 2));
      console.log(CHECK_USER_ROUTE, process.env.EXPO_PUBLIC_HOST_SERVER);
    }
  };

  const handleLogOut = () => {
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View className="flex flex-col h-full w-full bg-blueshade justify-center items-center">
      <Text className="text-7xl mb-8 font-bold text-white">ChatIn</Text>

      <Pressable onPress={handleLogin}>
        <View className="flex flex-row items-center bg-white px-8 py-4 rounded-md">
          <Fontisto name="google" size={24} color="#5D12D2" />
          <Text className="text-chatpurple ml-4 font-semibold">
            Continue with Google
          </Text>
          {/* <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
          /> */}
        </View>
      </Pressable>
    </View>
  );
};

export default Login;
