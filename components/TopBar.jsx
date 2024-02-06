import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useGlobalContext } from "../context/StateContext";
import LocalImage from "./common/LocalImage";

const TopBar = () => {
  const {
    state: { userInfo },
  } = useGlobalContext();
  const [showContextMenu, setShowContextMenu] = useState(false)
  const isLocalImage = userInfo && !userInfo?.image.includes("http");
  // const
  return (
    <View className="w-full bg-blueshade pb-2 px-6 flex flex-row justify-between items-center">
      <Text className="text-2xl text-white font-bold">ChatIn</Text>
      <Pressable onPress={()=>setShowContextMenu(p=>!p)}>
        {!isLocalImage && (
          <Image
            source={{ uri: userInfo.image }}
            className="w-12 h-12 rounded-full"
          />
        )}
        <View className="flex flex-col items-center justify-center bg-white p-1 rounded-full">
          {isLocalImage && <LocalImage type="sm" image={userInfo.image} />}
        </View>
      </Pressable>
    </View>
  );
};

export default TopBar;
