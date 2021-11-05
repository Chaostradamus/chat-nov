import { useRoute } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-react-native-core";

const ChannelScreen = () => {
  const [channel, setChannel] = useState(null);
  const route = useRoute();
  const { client } = useChatContext();

  const { channelId } = route.params || {};

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ id: { $eq: channelId } });
      if (channels.length > 0) {
        setChannel(channels[0])
      }
    };
    fetchChannel();
  }, [channelId]);

  if (!channel) {
    return <Text>Loading...</Text>;
  }
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;
