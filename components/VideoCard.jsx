import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import { updateAttribute } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
    $id,
    liked: color,
  },
}) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  const [liked, setLiked] = useState(true);
  // const [color, setColor] = useState(false);

  const favorites = async () => {
    setLiked((prevLiked) => !prevLiked);
    // setColor(!color);

    console.log($id, user.$id);

    try {
      await updateAttribute({
        videoDocumentId: `${$id}`,
        userId: user.$id,
        videoLiked: liked,
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0 5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="pt-2" onPress={favorites}>
          {/* <Image
            source={icons.bookmark}
            className="w-5 h-5"
            resizeMode="contain"
          /> */}
          <Icon name="heart" size={15} color={color ? "red" : "white"} />
        </TouchableOpacity>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          // className="w-full h-full rounded-xl mt-3 "
          // style={{
          //   width: full, // Convert 52 Tailwind units to pixels (52 * 4 = 208px)
          //   height: 288, // 72 Tailwind units
          //   borderRadius: 35,
          //   marginTop: 12, // Equivalent to Tailwind's mt-3
          //   backgroundColor: "rgba(255, 255, 255, 0.1)", // Matches `bg-white/10`
          // }}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 12, // 0.75rem
            marginTop: 12, // 0.75rem
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 "
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
