import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import { useGlobalContext } from "../../../context/StateContext";
import axios from "axios";
import { ADD_STORY_ROUTE, FETCH_STORIES_ROUTE } from "../../../utils/ApiRoutes";
import { reducerCases } from "../../../context/constants";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const Stories = () => {
  const {
    state: { allUserStories, userInfo },
    dispatch,
  } = useGlobalContext();
  const navigator = useNavigation();
  const [newStory, setNewStory] = useState("");
  const [showNewStory, setShowNewStory] = useState(false);
  const [isSubmittingStory, setIsSubmittingStory] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        console.log("Fetching posts");
        const response = await axios.get(FETCH_STORIES_ROUTE);
        dispatch({
          type: reducerCases.SET_ALL_USERS_STORIES,
          allUserStories: response.data,
        });
        // console.log("fetched: ", response.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    if (!allUserStories) {
      fetchStories();
    }
    //curretly refreshing for new add stories by the current user
  }, [allUserStories]);

  const styles = StyleSheet.create({
    contentContainer: {
      paddingRight: 30,
    },
  });

  const submitStory = async () => {
    try {
      setIsSubmittingStory(true);
      const story = await axios.post(ADD_STORY_ROUTE, {
        story: {
          type: "text",
          message: newStory,
          senderId: userInfo.id,
        },
      });

      //for now making the stories undefined so the useEffect fetches the fresh stories
      dispatch({
        type: reducerCases.SET_ALL_USERS_STORIES,
        allUserStories: undefined,
      });
      setShowNewStory(false);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setIsSubmittingStory(false);
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        className="flex flex-row gap-3 max-h-28"
        contentContainerStyle={styles.contentContainer}
      >
        <Pressable
          onPress={() => {
            setShowNewStory((p) => !p);
          }}
        >
          <View className="flex flex-col items-center justify-center p-0.5">
            <View className="p-2 w-14 h-14 bg-chatpurple rounded-full flex items-center justify-center">
              <AntDesign name="plus" size={24} color="white" />
            </View>
          </View>
          <Text>Add Story</Text>
        </Pressable>

        {allUserStories?.map((user) => {
          return (
            <Pressable
              className="flex flex-col items-center"
              key={`${user.id}'s stories`}
              onPress={() => navigator.navigate("ViewStory", { user })}
            >
              <View className="border-2 border-chatpurple rounded-full">
                <Image
                  className="w-14 h-14 rounded-full"
                  source={require("../../../assets/avatars/2.png")}
                />
              </View>
              <Text className="text-black first-letter:capitalize">
                {user.name.length > 7
                  ? user.name?.substr(0, 7) + ".."
                  : user.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNewStory}
        onRequestClose={() => {
          console.log("closing model");
          setNewStory("");
          setShowNewStory(false);
        }}
      >
        <View
          className="h-full w-full"
          style={{ backgroundColor: "rgba(52, 52, 52, 0.9)" }}
        >
          <View className="flex items-center justify-center mx-4 my-64">
            <View className="h-full w-full bg-blueshade rounded-md flex flex-col items-center justify-center px-3 py-2">
              <View className="w-full bg-white rounded-md">
                <TextInput
                  className="w-full h-48 rounded-md bg-white px-4 flex-wrap text-lg text-[#2b2a2a]"
                  placeholder="Write your story..."
                  maxLength={300}
                  multiline
                  onChangeText={(t) => setNewStory(t)}
                />
                <View className="flex w-full justify-end flex-row p-2 opacity-40">
                  <Text>{newStory.length}/300</Text>
                </View>
              </View>
              <View className="flex flex-row w-full items-center justify-center mt-4">
                <Pressable
                  onPress={() => setShowNewStory(false)}
                  className="flex-[0.5] h-12 mr-4 rounded-md bg-gray-400 flex items-center justify-center"
                >
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable
                  disabled={isSubmittingStory}
                  onPress={submitStory}
                  className="flex-1 h-12 rounded-md bg-chatpurple flex items-center justify-center"
                >
                  <Text className="text-white">
                    Submit{isSubmittingStory ? "ting.." : ""}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Stories