import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  handleTextChange,
  placeHolder,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className={`border-2 ${
          focus ? "border-secondary" : "border-black-200"
        } w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base w-full h-full text-center"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleTextChange}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
