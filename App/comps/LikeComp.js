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

export default function LikeComp({ postId }) {
  const [liked, setLiked] = useState([]);
  const [loadingComp, setLoadingComp] = useState(false);

  useEffect(() => {
    const checkForLike = async () => {
      try {
        setLoadingComp(true);
        const checkStorage = await AsyncStorage.getItem("liked_post");
        const parsedPosts = checkStorage ? JSON.parse(checkStorage) : [];
        setLiked(parsedPosts.includes(postId));
        setLoadingComp(false);
      } catch (error) {
        console.log("Something went wrong checking for liked posts!");
      }
    };
    checkForLike();
  }, []);

  const handleLike = async () => {
    try {
      const checkStorage = await AsyncStorage.getItem("liked_post");
      const parsedPosts = checkStorage ? JSON.parse(checkStorage) : [];

      let updatedLikes;
      if (parsedPosts.includes(postId)) {
        updatedLikes = parsedPosts.filter((id) => id !== postId);
        setLiked(false);
      } else {
        updatedLikes = [...parsedPosts, postId];
        setLiked(true);
      }

      await AsyncStorage.setItem("liked_post", JSON.stringify(updatedLikes));
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
        handleLike(postId);
        Vibration.vibrate(100);
      }}
    >
      <AntDesign
        name={liked ? "heart" : "hearto"}
        size={20}
        color={liked ? "blue" : "#9d9d9d"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: "900",
  },
});
