import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Pressable,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios, { all } from "axios";
import { GET_ALL_USERS } from "../../../utils/ApiRoutes";
import { useGlobalContext } from "../../../context/StateContext";
import { reducerCases } from "../../../context/constants";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const {
    state: { currentChatUser,allContactsConnected },
    dispatch,
  } = useGlobalContext();

  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersWithFilter, setallUsersWithFilter] = useState(allUsers);
  const navigator = useNavigation();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get(GET_ALL_USERS);
        var users = [];
        // console.log(data);
        Object.keys(data.users)?.map((initial) => {
          users = [
            ...users,
            ...data.users[initial]?.map((user) => {
              return user;
            }),
          ];
        });
        // console.log("users in effect::::::::", users);
        setAllUsers(users);
        setallUsersWithFilter(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    setallUsersWithFilter(
      allUsers.filter((usr) =>
        usr.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      )
    );
  }, [searchText]);

  const inititiateChat = async (user) => {
    console.log("trying to initiate chat", user);

    dispatch({
      type: reducerCases.SET_FULLSCREEN_MODE,
      fullScreenMode: true
    });

    navigator.navigate("ChatScreen");

    dispatch({
      type: reducerCases.CHANGE_CURRENT_CHAT_USER,
      user,
    });

    console.log("after dispatch", currentChatUser);
  };

  return (
    <View className="flex flex-col w-full h-full bg-500 p-2">
      {/* Search Bar*/}
      <View className="flex flex-row w-full bg-secondaryPurple h-12 p-2 rounded-2xl items-center justify-center">
        <View className="border-2 border-chatpurple w-full flex flex-row rounded-xl">
          <TextInput
            className="h-8 text-lg text-black  rounded-md px-4 flex-grow"
            value={searchText}
            placeholder="Search user..."
            onChangeText={(text) => setSearchText(text)}
          />

          <Pressable className="w-12 h-8 flex flex-row items-center bg-chatpurple justify-center rounded-r-lg">
            <FontAwesome name="search" size={24} color="white" />
          </Pressable>
        </View>
      </View>
      {/* Users*/}
      <ScrollView className="flex flex-col flex-grow px-2 py-4 mb-16 pb-12">
        <View className="flex flex-col" key={`intial`}>
          {allUsersWithFilter.map((user) => {
            return (
              <View className="w-full flex flex-row mb-2 items-center justify-between px-4 py-3 rounded-lg bg-secondaryPink">
                <View className="flex flex-row items-center justify-center ">
                  <View className="w-12 h-12 mr-4">
                    <Image
                      className="w-full h-full rounded-full"
                      source={require("../../../assets/avatars/3.png")}
                    />
                  </View>
                  <View>
                    <Text>{user.name}</Text>
                  </View>
                </View>
                <Pressable
                  className="px-4 py-2"
                  onPress={() => {
                    inititiateChat(user);
                  }}
                >
                  <FontAwesome
                    name="send"
                    size={24}
                    color="rgba(93, 18, 210, 0.3)"
                  />
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
