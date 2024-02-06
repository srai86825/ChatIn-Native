import { View, Text, Image, ScrollView } from "react-native";
import { useGlobalContext } from "../../../context/StateContext";
import React, { useEffect, useState } from "react";
import { asyncStoragePrefixes, reducerCases } from "../../../context/constants";
import axios from "axios";
import { GET_MESSAGES_ROUTE } from "../../../utils/ApiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FontAwesome,
  Zocial,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { calculateTime } from "../../../utils/CalculateTime";
import MessageStatus from "./MessageStatus";
import MessageBar from "./MessageBar";

const ChatScreen = () => {
  const {
    state: { currentChatUser, userInfo, messages },
    dispatch,
  } = useGlobalContext();

  // const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    // console.log("currentChatUser", currentChatUser, userInfo);
    const getInitialMessages = async () => {
      console.log("getInitialMessages initiated");
      try {
        const { data } = await axios.get(
          `${GET_MESSAGES_ROUTE}/${currentChatUser.id}/${userInfo.id}`
        );
        // setCurrentChat(data);
        await dispatch({
          type: reducerCases.SET_MESSAGES,
          messages: data.messages.allMessages,
        });
        // console.log("currentChat", messages);
      } catch (error) {
        console.log(
          "Error fetching or storing inital chat",
          JSON.stringify(error)
        );
        console.log(error);
      }
    };

    const existPrevChat = async () => {
      // console.log(
      //   `${asyncStoragePrefixes.CHAT_FROM_TO}_${userInfo.id}_${currentChatUser.id}`
      // );
      const asyncChatHisotry = await AsyncStorage.getItem(
        `${asyncStoragePrefixes.CHAT_FROM_TO}_${userInfo.id}_${currentChatUser.id}`
      );

      if (asyncChatHisotry) {
        console.log("Found chat ");

        dispatch({
          type: reducerCases.SET_MESSAGES,
          messages: await JSON.parse(asyncChatHisotry),
        });
        return true;
      } else {
        console.log("not found", asyncChatHisotry);
        return false;
      }
    };

    !existPrevChat().then((val) => {
      if (!val) {
        console.log("Getting intial messages...", val);
        getInitialMessages();
      } else {
        console.log("has initial messages", val);
      }
    });

    return async () => {
      await dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: undefined,
      });
      await dispatch({
        type: reducerCases.SET_FULLSCREEN_MODE,
        fullScreenMode: false,
      });
    };
  }, [currentChatUser]);

  const handleVoiceCall = () => {
    console.log("socket at video call", socket.current);
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "voice",
        roomId: Date.now(),
      },
    });
  };

  const handleVideoCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "video",
        roomId: Date.now(),
      },
    });
  };

  return (
    <View className="h-full w-full bg-white flex flex-col justify-between pb-4">
      {/*Chat Header*/}
      <View className="h-16 bg-blueshade w-full flex flex-row items-center px-4">
        <View className="w-12 h-12 rounded-full">
          <Image
            className="w-full h-full rounded-full"
            source={require("../../../assets/avatars/8.png")}
          />
        </View>
        <View className=" h-full items-center flex flex-row flex-grow justify-between ml-2">
          <View>
            <Text className="text-white font-bold text-lg">
              {currentChatUser.name}
            </Text>
            <Text className="text-gray-100 text-sm"> online</Text>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <FontAwesome
              name="video-camera"
              size={20}
              color="white"
              onPress={handleVideoCall}
            />
            <Zocial
              name="call"
              size={20}
              color="white"
              onPress={handleVoiceCall}
            />
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              color="white"
              onPress={() => {
                console.log("yet to implement context menu");
              }}
            />
          </View>
        </View>
      </View>

      {/*Chat Container */}
      <ScrollView
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
        className=" flex-grow px-10 "
      >
        {messages?.map((msg) => {
          return (
            <View className="flex flex-row w-full" key={msg.id}>
              <View
                className={`p-1 flex flex-row w-full ${
                  userInfo.id !== msg.senderId
                    ? "justify-start "
                    : "justify-end"
                }`}
              >
                <View
                  className={`max-w-[70%] w-auto px-4 flex items-center py-1 rounded-2xl ${
                    userInfo.id !== msg.senderId
                      ? "items-start bg-secondaryPink rounded-bl-none"
                      : "items-end bg-chatpurple rounded-br-none"
                  }`}
                >
                  {msg.type === "text" && (
                    <View className="w-full">
                      <Text
                        className={` text-lg ${
                          userInfo.id !== msg.senderId
                            ? "text-black text-left"
                            : "text-white text-right"
                        }`}
                      >
                        {msg.message}
                      </Text>
                      <View className="flex flex-row ">
                        {userInfo.id === msg.senderId && (
                          <MessageStatus messageStatus={msg.messageStatus} />
                        )}
                        <Text
                          className={`text-xs ${
                            userInfo.id !== msg.senderId
                              ? "text-gray-500 text-right"
                              : "text-gray-300 text-right"
                          }`}
                        >
                          {calculateTime(msg.createdAt)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
        {/* {console.log("has messages", typeof messages, messages)} */}
      </ScrollView>

      {/* MessageBar  */}
      <MessageBar />
    </View>
  );
};

export default ChatScreen;
