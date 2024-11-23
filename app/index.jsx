import { View, Text, ScrollView, Image, StatusBar } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import "react-native-url-polyfill/auto";
import { useGlobalContext } from "../context/GlobalProvider";

export default function HomeScreen() {
  const { isLoggedIn, isLoading } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[100vh] justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities width{" "}
              <Text className="text-secondary-200 ">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="max-w-[136px] w-full h-[15px] absolute -bottom-2 right-[22%]"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embarks on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
