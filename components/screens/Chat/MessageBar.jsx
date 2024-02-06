import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useGlobalContext, useGlobalSocket } from "../../../context/StateContext";
import { ADD_MESSAGE_ROUTE } from "../../../utils/ApiRoutes";
import axios from "axios";
import { asyncStoragePrefixes, reducerCases } from "../../../context/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessageBar = () => {
  const [messageText, setMessageText] = useState("");

  const {
    state: { userInfo, currentChatUser, messages },
    dispatch,
  } = useGlobalContext();

  const {state:{socket}}=useGlobalSocket();

  

  const sendMessage = async () => {
    if (messageText && userInfo && currentChatUser) {
      try {
        const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
          message: messageText,
          to: currentChatUser.id,
          from: userInfo.id,
        });
        // console.log("msg added, ", data);
        socket.current.emit("send-msg", {
          to: currentChatUser.id,
          from: userInfo.id,
          message: data.message,
        });
        await dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
            fromSelf: true,
          },
        });

        setMessageText("");
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    const updateLocal = async () => {
      await AsyncStorage.setItem(
        `${asyncStoragePrefixes.CHAT_FROM_TO}_${userInfo.id}_${currentChatUser.id}`,
        JSON.stringify(messages)
      );
    };

    if (
      messages &&
      messages.length > 0 &&
      (messages[0].senderId === currentChatUser.id ||
        messages[0].receiverId === currentChatUser.id)
    )
      updateLocal();
  }, [messages]);

  const handleButtonPress = async () => {
    // console.log(messageText);
    if (messageText.length) {
      await sendMessage();
    } else {
      try {
      } catch (error) {
        console.log("unable to initiate recording", error);
      }
    }
  };

  return (
    <View
      className="bg-secondaryBlueShade h-14 mx-2 p-1 px-4 mt-2 flex flex-row items-center"
      style={{ borderRadius: 29 }}
    >
      <View className="w-full flex flex-row justify-between items-center">
        {/* <Text className="text-red-500">Message Bar here</Text> */}
        <View className="flex flex-row items-center">
          <View className="mr-2 flex flex-row gap-2">
            <Entypo name="emoji-happy" size={20} color="#615e96" />
            <Entypo name="attachment" size={20} color="#615e96" />
          </View>
          <View>
            <TextInput
              className="flex-grow "
              placeholder="type a message..."
              onChangeText={(t) => setMessageText(t)}
              value={messageText}
            />
          </View>
        </View>
        <Pressable
          className="w-12 h-12 bg-blueshade  rounded-full flex flex-row items-center justify-center"
          onPress={handleButtonPress}
        >
          {messageText.length > 0 ? (
            <Ionicons name="send" size={20} color="white" />
          ) : (
            <FontAwesome name="microphone" size={20} color="white" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default MessageBar;
