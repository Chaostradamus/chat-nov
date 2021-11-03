import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useChatContext } from "stream-chat-expo";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import UserListItem from "../components/UserListItem";

export default function TabTwoScreen() {
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { client } = useChatContext();

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await client.queryUsers({});
    setUsers(response.users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserListItem user={item} />}
        refreshing={isLoading}
        onRefresh={fetchUsers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
