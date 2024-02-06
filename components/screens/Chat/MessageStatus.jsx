import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
function MessageStatus({ messageStatus }) {
  return (
    <View className="mr-2">
      {/* {console.log("msg-status",messageStatus)} */}
      {messageStatus === "sent" && (
        <FontAwesome name="check" size={13} color="gray" />
      )}
      {messageStatus === "delivered" && (
        <FontAwesome5 name="check-double" size={13} color="gray" />
      )}
      {messageStatus === "read" && (
        <FontAwesome5
          name="check-double"
          size={13}
          color="#53bdeb"
        />
      )}
    </View>
  );
}

export default MessageStatus;
