import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ placeHolder, initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const [focus, setFocus] = useState(false);
  return (
    <View
      className={`border-2 ${
        focus ? "border-secondary" : "border-black-200"
      } w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4`}
    >
      <TextInput
        className="flex-1 text-white font-psemibold text-base mt-0.5"
        value={query}
        placeholder={placeHolder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search"
            );
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
