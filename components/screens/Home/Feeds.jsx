import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Clipboard,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Clipboard from "@react-native-clipboard/clipboard";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { ADD_POLL_ROUTE, FETCH_FEED_ROUTE } from "../../../utils/ApiRoutes";
import { useGlobalContext } from "../../../context/StateContext";
import { reducerCases } from "../../../context/constants";
import Icebreaker from "../../../assets/svgs/Icebreaker.jsx";

const Feeds = () => {
  const {
    state: { userInfo, fetchedFeed, attemptedFeed },
    dispatch,
  } = useGlobalContext();

  const navigator = useNavigation();

  const [selectedOption, setSelectedOption] = useState(-1);
  const [submittingPoll, setSubmittingPoll] = useState(false);
  const [currentIcebreaker, setCurrentIcebreaker] = useState(-1);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const { data } = await axios(`${FETCH_FEED_ROUTE}/${userInfo.id}`);
        dispatch({
          type: reducerCases.SET_FETCHED_FEED,
          fetchedFeed: data,
        });
        console.log("feed fetched: ", data);
      } catch (error) {
        console.log("error fetching feed", error);
      }
    };
    if (
      !fetchedFeed ||
      (attemptedFeed.wouldYouRather && attemptedFeed.icebreakers)
    ) {
      console.log("fetching feed.....");
      fetchFeed();
      dispatch({
        type: reducerCases.SET_ATTEMPTED_FEED,
        attemptedFeed: {
          wouldYouRather: false,
          icebreakers: false,
        },
      });
    }else{
      console.log("already feed: ",fetchedFeed)
    }
  }, []);

  const AddPoll = async () => {
    if (selectedOption >= 0) {
      try {
        setSubmittingPoll(true);
        await axios.post(`${ADD_POLL_ROUTE}/${userInfo.id}`, {
          question: fetchedFeed.wouldYouRatherQuestion.question,
          options: fetchedFeed.wouldYouRatherQuestion.options,
          selectedIndex: selectedOption,
        });

        dispatch({
          type: reducerCases.SET_ATTEMPTED_FEED,
          attemptedFeed: {
            ...attemptedFeed,
            wouldYouRather: true,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setSubmittingPoll(false);
      }
    }
  };

  const copyIcebreaker = async () => {
    try {
      console.log("clicked coy");
      Clipboard.setString(fetchedFeed.icebreakerQuestion.options[currentIcebreaker]);
      dispatch({
        type: reducerCases.SET_ATTEMPTED_FEED,
        attemptedFeed: {
          ...attemptedFeed,
          icebreakers: true,
        },
      });
      navigator.navigate("Chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-full h-auto mt-4 ">
      {!attemptedFeed?.icebreakers && (
        <View
          className="pb-3 bg-pinkshade rounded-xl mb-4"
          style={{ height: 250 }}
        >
          {currentIcebreaker === -1 ? (
            <View>
              <View className="bg-white py-3 w-full flex justify-center items-center rounded-t-md">
                <Text className="text-lg text-secondary-chat-purple">
                  Don't know how to start conversations?
                </Text>
              </View>

              <View className="w-full h-auto py-4 px-3 flex flex-row items-center justify-between">
                <View className="">
                  {/* <Icebreaker width={150} height={150} fill="white" /> */}
                  <Image
                    source={require("../../../assets/avatars/9.png")}
                    
                    style={{ width: 150, height: 150,borderRadius:50 }}/>
                </View>
                <View className=" py-4 px-3 flex flex-col justify-center items-center ">
                  <Text className="text-white font-bold text-xl">
                    Try these
                  </Text>
                  <Text className="text-white font-bold text-xl mb-3">
                    Icebreakers...
                  </Text>
                  <Pressable
                    className="bg-blueshade px-6 py-1 rounded-md mx-8 flex justify-center items-center"
                    onPress={() => setCurrentIcebreaker(0)}
                  >
                    <AntDesign
                      name="arrowright"
                      className=""
                      size={36}
                      color="white"
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            <View className="rounded-md" style={{ height: 250 }}>
              <Image
                source={require("../../../assets/svgs/confetti-doodles.png")}
                style={{ borderRadius: 15 }}
                className="h-full w-full absolute"
              />
              <View className="relative h-full w-full px-4 pr-28 flex flex-row items-center justify-between gap-1">
                <Ionicons
                  name="chevron-back"
                  size={26}
                  color={`${currentIcebreaker > 0 ? "white" : "gray"}`}
                  onPress={() =>
                    setCurrentIcebreaker((p) => {
                      return p > 0 ? p - 1 : p;
                    })
                  }
                  style={{
                    padding: 8,
                    backgroundColor: "#FF6AC2",
                    borderRadius: 15,
                  }}
                />
                <View className="flex flex-wrap px-8 h-full w-full items-center justify-between pt-12 pb-4">
                  <Text className="text-2xl text-white font-bold text-justify">
                    {fetchedFeed?.icebreakerQuestion.options[currentIcebreaker]}
                  </Text>
                  <Pressable
                    className="px-8 py-3"
                    onPress={copyIcebreaker}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? "red" : "white",
                      },
                    ]}
                  >
                    <Feather
                      name="copy"
                      size={24}
                      color="white"
                      aria-label="copy icebreaker"
                    />
                  </Pressable>
                </View>
                <MaterialIcons
                  name="navigate-next"
                  size={30}
                  color={`${
                    currentIcebreaker < fetchedFeed?.icebreakerQuestion.options?.length - 1
                      ? "white"
                      : "gray"
                  }`}
                  onPress={() =>
                    setCurrentIcebreaker((p) => {
                      return p < fetchedFeed?.icebreakerQuestion?.options.length - 1
                        ? p + 1
                        : p;
                    })
                  }
                  style={{
                    padding: 8,
                    backgroundColor: "#FF6AC2",
                    borderRadius: 15,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      )}
      {!attemptedFeed?.wouldYouRather && (
        <View className="w-full h-auto mb-4">
          <View className="px-1">
            <View className="flex flex-col bg-white px-8 py-4 rounded-t-2xl">
              <Text className="text-xl text-black font-semibold">
                {fetchedFeed?.wouldYouRatherQuestion.question}
              </Text>
            </View>
            <View className="w-full h-auto bg-white px-4 py-1 flex flex-col">
              {fetchedFeed?.wouldYouRatherQuestion.options.map((option, i) => {
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedOption(i);
                    }}
                    key={`wouldyou-option-${i}`}
                    className={`bl-4 p-0.5 flex justify-center items-center rounded-full bg-chatpurple mb-3`}
                  >
                    <View
                      className={`w-full py-4 px-2 ${
                        i === selectedOption ? "bg-chatpurple" : "bg-[#efeaf7]"
                      } flex items-center rounded-full justify-center`}
                    >
                      <Text
                        className={`${
                          i === selectedOption ? "text-white" : "text-black"
                        }`}
                      >
                        {option}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View className="flex flex-row justify-end bg-white rounded-b-xl mx-1 py-2 px-4">
            <Pressable
              className="px-4 py-4 bg-pinkshade w-32 rounded-md flex flex-col items-center justify-center"
              onPress={AddPoll}
              disabled={submittingPoll}
            >
              <Text className="text-white text-md font-bold">
                {submittingPoll ? "Adding Poll.." : "Add Poll"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Feeds;
