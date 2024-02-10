import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/StateContext";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { calculateTime } from "../../../utils/CalculateTime";
import MessageStatus from "./MessageStatus";
import { reducerCases } from "../../../context/constants";

function ChatList() {
  const {
    state: { allContactsConnected, userInfo, currentChatUser },
    dispatch,
  } = useGlobalContext();
  const navigator = useNavigation();

  const handleInitiateChat = async ({ data: { id, name, profilePicture } }) => {
    console.log("InitiateChat, ", name);
    dispatch({
      type: reducerCases.CHANGE_CURRENT_CHAT_USER,
      user: { id, name, profilePicture },
    });
    dispatch({
      type: reducerCases.SET_FULLSCREEN_MODE,
      fullScreenMode: true,
    });

    navigator.navigate("ChatScreen");
    console.log("now chat user: ", data.name);
  };

  return (
    <View className="sticky px-4 min-w-[360px] right-0 top-0 z-20 flex w-fit flex-col justify-between  overflow-auto border-l border-l-dark-4 py-4  max-xl:hidden bg-secondaryPink ">
      {allContactsConnected?.map((user,i) => {
        return (
          <Pressable
            onPress={() => handleInitiateChat(user)}
            key={user.userId}
            className="w-full rounded-md border-grey h-20 flex flex-row mb-2 items-center px-4 pt-2 pb-6"
            style={{ borderBottomColor: "gray", borderBottomWidth: 2 }}
          >
            <View className="flex justify-center items-center w-12 h-12 rounded-full">
              <Image
                className="w-full h-full rounded-full"
                source={require("../../../assets/avatars/3.png")}
              />
            </View>
            <View className="flex flex-col justify-between  ml-4 flex-grow">
              <View className="flex flex-row justify-between flex-grow">
                <Text className="text-lg text-secondary-chat-purple font-bold">
                  {user.data.name}
                </Text>
                <Text
                  className={` text-sm ${
                    user.data.totalUnreadMessages > 0
                      ? "text-secondary-chat-purple"
                      : "text-gray-500"
                  }`}
                >
                  {calculateTime(user.data.createdAt)}
                </Text>
              </View>
              <View>
                {user.data.type === "text" && (
                  <View className="flex text-secondary-chat-purple flex-row items-center justify-between">
                    <View className="flex flex-row items-center">
                      {user.data.senderId === userInfo.id && (
                        <MessageStatus
                          messageStatus={user.data.messageStatus}
                        />
                      )}
                      <Text
                        className={` ${
                          user.data.senderId !== userInfo.id &&
                          user.data.totalUnreadMessages > 0
                            ? "text-blueshade"
                            : "text-secondary-chat-purple"
                        }`}
                      >
                        {user.data.message.length > 30
                          ? user.data.message.substr(0, 30) + "..."
                          : user.data.message}
                      </Text>
                    </View>
                    <View>
                      {user.data.totalUnreadMessages > 0 && (
                        <View className="px-2 bg-blueshade rounded-full py-0.5 flex items-center justify-center">
                          <Text className="text-white">
                            {user.data.totalUnreadMessages}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default ChatList;
