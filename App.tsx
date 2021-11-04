import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";


import AuthContext from './contexts/Authentication'

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import messaging from '@react-native-firebase/messaging'


const API_KEY = "r6bkczhwcgx2";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userId, setUserId] = useState('')

  const [selectedChannel, setSelectedChannel] = useState<any>(null);

 const requestPermission = async () => {
   const authStatus = await messaging().requestPermission();
   const enabled =
     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

   if (enabled) {
     console.log("Authorization status:", authStatus);
   }
 };

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{userId, setUserId}}>
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
