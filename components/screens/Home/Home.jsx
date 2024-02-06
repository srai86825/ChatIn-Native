import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useGlobalContext } from "../../../context/StateContext";

import { reducerCases } from "../../../context/constants";
import { useNavigation } from "@react-navigation/native";
import Stories from "./Stories";
import Feeds from "./Feeds";
import { io } from "socket.io-client";
import { HOST_SERVER } from "../../../utils/ApiRoutes";

const Home = () => {
  const {
    state: { userInfo },
    dispatch,
  } = useGlobalContext();


  useEffect(() => {
    dispatch({
      type: reducerCases.CHANGE_CURRENT_CHAT_USER,
      user: undefined,
    });
    dispatch({
      type: reducerCases.SET_FULLSCREEN_MODE,
      fullScreenMode: false,
    });
    dispatch({
      type: reducerCases.SET_MESSAGES,
      messages: undefined,
    });
  },[]);
  const navigator = useNavigation();

  return (
    <ScrollView className="w-full p-2 h-full" style={{ marginBottom: 70 }}>
      <Stories />
      <Feeds />
    </ScrollView>
  );
};

export default Home;
