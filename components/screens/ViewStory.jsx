import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {calculateTime} from "../../utils/CalculateTime";

const ViewStory = ({
  route: {
    params: { user },
  },
}) => {
  const [currentStory, setCurrentStory] = useState(0);

  const styles = StyleSheet.create({
    contentContainer: {
      height: 300,
      width: 270,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View className="flex flex-col pt-32 items-center h-full ">
      <View className="flex flex-col justify-center items-center mb-4">
        <View className="border-2 rounded-full border-chatpurple">
          <Image
            source={require("../../assets/avatars/6.png")}
            className="w-24 h-24 rounded-full "
          />
        </View>
        <View className="flex flex-row gap-1 items-center justify-center">
          <Text className="font-semibold first-letter:capitalize text-md">
            {user.name}
          </Text>
          <View className="w-1 h-1 bg-black rounded-full"/>
          <Text className="text-sm font-red">{calculateTime(user.stories[currentStory].createdAt)}</Text>
        </View>
      </View>
      <View
        className="flex flex-row justify-center items-center gap-3"
        style={{ height: 300, width: 400 }}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={`${currentStory > 0 ? "#B931FC" : "gray"}`}
          onPress={() =>
            setCurrentStory((p) => {
              return p > 0 ? p - 1 : p;
            })
          }
          style={{
            paddingVertical: 100,
          }}
        />
        <View className="bg-secondaryPurple p-4 rounded-md">
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text className="text-xl text-[#2b2359]">
              {user.stories[currentStory].message}
            </Text>
          </ScrollView>
        </View>
        <MaterialIcons
          name="navigate-next"
          size={24}
          color={`${
            currentStory < user.stories.length - 1 ? "#B931FC" : "gray"
          }`}
          onPress={() =>
            setCurrentStory((p) => {
              return p < user.stories.length - 1 ? p + 1 : p;
            })
          }
          style={{
            paddingVertical: 100,
            paddingHorizontal: 5,
          }}
        />
      </View>
    </View>
  );
};

export default ViewStory;
