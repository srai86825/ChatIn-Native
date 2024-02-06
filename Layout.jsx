import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { io } from "socket.io-client";

import Nav from "./components/Nav";
import TopBar from "./components/TopBar";
import Home from "./components/screens/Home/Home";
import Chat from "./components/screens/Chat/Chat";
import ViewStory from "./components/screens/ViewStory";
import Login from "./components/auth/Login";
import Onboarding from "./components/auth/Onboarding";
import { useGlobalContext, useGlobalSocket } from "./context/StateContext";
import ChatScreen from "./components/screens/Chat/ChatScreen";
import { HOST_SERVER } from "./utils/ApiRoutes";
import { reducerCases } from "./context/constants";

const Layout = () => {
  const Stack = createNativeStackNavigator();
  const {
    state: { userInfo, isNewUser, fullScreenMode },
    dispatch,
  } = useGlobalContext();

  const {dispatch:dispatchSocket}=useGlobalSocket();

  const socket = useRef();
  const [socketEvent, setSocketEvent] = useState(false);


  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST_SERVER);
      socket.current.emit("add-user", userInfo.id);
      // console.log(socket.current);
      dispatchSocket({ type: reducerCases.SET_SOCKET, socket });
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("rcv-msg", (data) => {
        // console.log(socket.current);
        // console.log("message received", data);
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });
      });

      socket.current.on("rcv-voice-call", (data) => {
        console.log("recieving voice call");
        dispatch({
          type: reducerCases.SET_INCOMING_VOICE_CALL,
          incomingVoiceCall: {
            ...data.from,
            roomId: data.roomId,
            callType: data.callType,
          },
        });
      });

      socket.current.on("rcv-video-call", (data) => {
        console.log("recieving video call");
        dispatch({
          type: reducerCases.SET_INCOMING_VIDEO_CALL,
          incomingVideoCall: {
            ...data.from,
            roomId: data.roomId,
            callType: data.callType,
          },
        });
      });

      socket.current.on("rejected-voice-call", () => {
        dispatch({ type: reducerCases.SET_END_CALL });
      });

      socket.current.on("rejected-video-call", () => {
        dispatch({ type: reducerCases.SET_END_CALL });
      });

      socket.current.on("online-users", ({ onlineUsers }) => {
        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
      });

      socket.current.on("disconnect",()=>{
        console.log("socket disconnected");
        socket.current.emit("signout",{
          id:userInfo.id
        })
      })

      setSocketEvent(true);
    }
  }, [socket.current]);

  return (
    <View className="flex flex-col h-full w-full">
      {userInfo && !isNewUser && (
        <View style={{ width: "100%", height: "100%" }}>
          {!fullScreenMode && <TopBar />}
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="ViewStory" component={ViewStory} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
            </Stack.Navigator>
            {/*Commented for development purposes add once done, and remove the other nav*/}
            {!fullScreenMode && <Nav />}
            {/* <Nav/> */}
          </NavigationContainer>
        </View>
      )}

      {(!userInfo || isNewUser) && (
        <View style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      )}
    </View>
  );
};

export default Layout;
