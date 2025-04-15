import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SharePost({ postId }) {
  const [shared, setShared] = useState([]);
  const [loadingComp, setLoadingComp] = useState(false);

  useEffect(() => {
    const checkForLike = async () => {
      try {
        setLoadingComp(true);
        const checkStorage = await AsyncStorage.getItem("shared_post");
        const parsedPosts = checkStorage ? JSON.parse(checkStorage) : [];
        setShared(parsedPosts.includes(postId));
        setLoadingComp(false);
      } catch (error) {
        console.log("Something went wrong checking for liked posts!");
      }
    };
    checkForLike();
  }, []);

  const handleShare = async () => {
    try {
      const checkStorage = await AsyncStorage.getItem("shared_post");
      const parsedPosts = checkStorage ? JSON.parse(checkStorage) : [];

      let updatedLikes;
      let url = `https://unigate.com.ng/posts/${postId}`;
      if (parsedPosts.includes(postId)) {
        updatedLikes = parsedPosts.filter((id) => id !== postId);
        setShared(false);
      } else {
        updatedLikes = [...parsedPosts, postId];
        await Clipboard.setStringAsync(url);
        setShared(true);
      }

      await AsyncStorage.setItem("shared_post", JSON.stringify(updatedLikes));
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
        handleShare(postId);
        Vibration.vibrate(100);
      }}
    >
      <Feather
        name={shared ? "share" : "share"}
        size={20}
        color={shared ? "blue" : "#9d9d9d"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: "900",
  },
});
