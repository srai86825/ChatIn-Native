import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { useGlobalContext } from "../../context/StateContext";

const Onboarding = () => {
  const navigation = useNavigation();
  const {
    state: { userInfo, currentChatUser },
  } = useGlobalContext();
  return (
    <View>
      <Text>Onboarding</Text>
    </View>
  );
};

export default Onboarding;
