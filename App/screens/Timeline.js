import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import LikeComp from "../comps/LikeComp";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SavePost from "../comps/SavePost";
import SharePost from "../comps/SharePost";

export default function Timeline() {
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);

  const fetchTimeLine = async () => {
    try {
      const storedLikes = await AsyncStorage.getItem("liked_post");
      const parsedLikes = storedLikes ? JSON.parse(storedLikes) : [];
      console.log(
        "This right here is an array of the parsed information:",
        parsedLikes
      );
      //      console.log(storedLikes.json());
      const apiResponse = await fetch(
        `https://dummyjson.com/products?limit=${limit}`
      );
      const responseData = await apiResponse.json();
      //   console.log(responseData);
      if (responseData.products) {
        setData(responseData.products);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("There was an error caught in the try catch error");
    }
  };

  useEffect(() => {
    fetchTimeLine();
  }, []);
  return (
    <SafeAreaView>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontWeight: "500",
            color: "dodgerblue",
            textAlign: "center",
          }}
        >
          Instagram Reels Assignment
        </Text>
      </View>
      <ScrollView style={{ backgroundColor: "whitesmoke" }}>
        {data.length > 0 ? (
          data.map((item) => (
            <View
              key={item.id}
              style={{
                borderWidth: 0.3,
                borderColor: "#9d9d9d46",
                padding: 10,
                paddingTop: 5,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <TouchableOpacity
                style={styles.userCardDet}
                onPress={() => {
                  Vibration.vibrate(100);
                }}
              >
                <Image
                  source={require("../assets/profile.jpeg")}
                  style={styles.profileImage}
                />
                <Text style={styles.brandName}>{item.brand}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{ uri: item.images[0] }}
                  style={{ width: 200, height: 200 }}
                />
              </TouchableOpacity>
              <View style={styles.interactionComponent}>
                <View style={styles.leftInteractionComponent}>
                  <LikeComp postId={item.id} />
                  <SavePost postId={item.id} />
                </View>
                <View style={styles.rightInteractionComponent}>
                  <SharePost postId={item.id} />
                </View>
              </View>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          ))
        ) : (
          <View style={{ width: "100%", height: 100, alignContent: "center" }}>
            <ActivityIndicator size={20} color={"#9d9d9d"} />
          </View>
        )}
        <View
          style={{ width: "100%", height: 50, backgroundColor: "#fff" }}
        ></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  interactionComponent: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
  },
  leftInteractionComponent: {
    width: "17%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightInteractionComponent: {
    width: "83%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  description: {
    width: "100%",
    paddingHorizontal: 10,
    fontWeight: "400",
  },
  title: {
    width: "100%",
    paddingHorizontal: 10,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  userCardDet: {
    width: "100%",
    //  backgroundColor: "red",
    padding: 5,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    resizeMode: "cover",
  },
  brandName: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#5d5d5d",
    marginLeft: 5,
  },
});
