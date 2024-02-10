import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Entypo,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useGlobalContext } from "../context/StateContext";

const Nav = () => {
  const navigation = useNavigation();
  const {
    state: { userInfo, currentChatUser },
  } = useGlobalContext();


  return (
    <View className="absolute bottom-0 px-4 w-full bg-blueshade">
      <View className="flex flex-row justify-between items-center">
        <Pressable className="p-4" onPress={() => navigation.navigate("Home")}>
          <Entypo name="home" size={24} color="white" />
        </Pressable>

        <Pressable className="p-4" onPress={() => navigation.navigate("Search")}>
          <AntDesign name="search1" size={24} color="white" />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Chat")}>
          <View className="relative bottom-8 rounded-full bg-chatpurple">
            <View className="p-4">
              <MaterialIcons name="chat" size={32} color="white" />
            </View>
          </View>
        </Pressable>

        <Pressable className="p-4" onPress={() => navigation.navigate("Home")}>
          <Feather name="check-square" size={24} color="white" />
        </Pressable>

        <Pressable className="p-4" onPress={() => navigation.navigate("Home")}>
          <AntDesign name="setting" size={24} color="white" />
        </Pressable>

      </View>
    </View>
  );
};

export default Nav;
