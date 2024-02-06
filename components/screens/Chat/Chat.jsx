import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useGlobalContext } from "../../../context/StateContext";
import axios from "axios";
import {
  GET_ALL_USERS,
  GET_INTIAL_USERS_ROUTE,
} from "../../../utils/ApiRoutes";
import { reducerCases } from "../../../context/constants";
import ChatList from "./ChatList";
import ChatScreen from "./ChatScreen";

const Chat = () => {
  const {
    state: { userInfo, allContactsConnected, currentChatUser },
    dispatch,
  } = useGlobalContext();

  useEffect(() => {
    const fetchInitialUsers = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios.get(`${GET_INTIAL_USERS_ROUTE}${userInfo.id}`);
        console.log("fetched::: ", users);
        await dispatch({
          type: reducerCases.SET_ALL_CONTACTS_CONNECTED,
          allContactsConnected: users,
        });
        await dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
      } catch (error) {
        console.log(error);
      }
    };

    if (!allContactsConnected) fetchInitialUsers();
    else console.log("already there list of contacts");
  }, []);
  return (
    <View className="bg-secondaryPink h-full">
      <ChatList />
    </View>
  );
};

export default Chat;
