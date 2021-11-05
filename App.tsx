import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";

import messaging from "@react-native-firebase/messaging";

import AuthContext from "./contexts/Authentication";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const API_KEY = "r6bkczhwcgx2";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [userId, setUserId] = useState("");

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  const registerDevice = async () => {
    const token = await messaging().getToken();
    await client.addDevice(token, "firebase");
  };

  useEffect(() => {
    if (userId) {
      registerDevice();
    }
  }, [userId]);

  useEffect(() => {
    requestPermission();

    // for background noti
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to oepn from the background state:",
        remoteMessage
      );
      const channel = JSON.parse(remoteMessage?.data?.channel || "");
      console.log("This message belongs to the channel with id - ", channel.id);
    });

    // for noti when app is in quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from a quit state:",
            remoteMessage
          );
          const channel = JSON.parse(remoteMessage?.data?.channel || "");

          console.log("this message belongs to channel with ID - ", channel.id);
        }
      });
  }, []);

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{ userId, setUserId }}>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme="light" />
            </Chat>
            {/* <Chat client={client}>
            {selectedChannel ? (
              <Channel channel={selectedChannel}>
                <MessageList />
                <MessageInput />
                <Text
                  style={{ margin: 50 }}
                  onPress={() => setSelectedChannel(null)}
                >
                  Go Back
                </Text>
              </Channel>
            ) : (
              <ChannelList onSelect={onChannelPressed} />
            )}
          </Chat> */}
          </OverlayProvider>
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
