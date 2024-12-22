import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface IErrorProps {
  message: any;
}
const ErrorMsg = ({ message }: IErrorProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        paddingVertical: 2,
      }}
    >
      <MaterialIcons name="error-outline" size={20} color="#FA5C47" />
      <Text
        style={{
          textAlign: "left",
          color: "#FA5C47",
          fontFamily: "payyng-regular",
          fontSize: Platform.OS === "ios" ? 15 : 14,
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default ErrorMsg;

const styles = StyleSheet.create({});
