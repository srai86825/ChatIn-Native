import { Image, Text, View } from "react-native";
import React, { Component } from "react";

export default function LocalImage({ image, type }) {
  return (
    <View>
      {type === "sm" && (
        <Image
          source={require(`../../assets${"/default_avatar.png"}`)}
          style={{ width: 36, height: 36 }}
        />
      )}
    </View>
  );
}
