import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavePost({ postId }) {
  const [saved, setSaved] = useState([]);
  const [loadingComp, setLoadingComp] = useState(false);

  useEffect(() => {
    const checkForLike = async () => {
      try {
        setLoadingComp(true);
        const checkStorage = await AsyncStorage.getItem("saved_post");
        const parsedPosts = checkStorage ? JSON.parse(checkStorage) : [];
        setSaved(parsedPosts.includes(postId));
        setLoadingComp(false);
      } catch (error) {
        console.log("Something went wrong checking for liked posts!");
      }
    };
    checkForLike();
  }, []);

  const handleSave = async () => {
    try {
      const checkStorage = await AsyncStorage.getItem("saved_post");
      const parsedPosts = checkStorage ? JSON.parse(checkStorage) : [];

      let updatedLikes;
      if (parsedPosts.includes(postId)) {
        updatedLikes = parsedPosts.filter((id) => id !== postId);
        setSaved(false);
      } else {
        updatedLikes = [...parsedPosts, postId];
        setSaved(true);
      }

      await AsyncStorage.setItem("saved_post", JSON.stringify(updatedLikes));
    } catch (error) {
      console.log("There was an error liking/unliking this post");
    }
  };

  if (loadingComp) {
    return <ActivityIndicator size={20} color={"blue"} />;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        handleSave(postId);
        Vibration.vibrate(100);
      }}
    >
      <Feather
        name={saved ? "bookmark" : "bookmark"}
        size={20}
        color={saved ? "blue" : "#9d9d9d"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: "900",
  },
});
