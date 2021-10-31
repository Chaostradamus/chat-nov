import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const API_KEY = "r6bkczhwcgx2";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: "vadim",
          name: "Vadim Savin",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("vadim")
      );
      // channel creation
      const channel = client.channel("messaging", "notjustdev", {
        name: "notJust.dev",
      });
      await channel.watch()
    };

    connectUser();
    return () => client.disconnectUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
