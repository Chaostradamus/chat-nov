import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const UserListItem = ({ user }) => {
  console.log(user);
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{ uri: user.image }} />
      <Text>{user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 50,
    marginRight: 10,
  },
});

export default UserListItem;
