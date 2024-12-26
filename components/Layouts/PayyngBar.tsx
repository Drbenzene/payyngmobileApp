import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../constants/Colors";
import { Image } from "expo-image";
import { ms, scale, verticalScale } from "react-native-size-matters";
interface Props {
  title: string;
  imageRight: any;
  heightLeft: number;
  widthLeft: number;
  heightRight: number;
  widthRight: number;
  onPressLeft: any;
  onPressRight: any;
  imageLeft?: any;
}

export default function PayyngBar({
  title,
  imageLeft,
  imageRight,
  heightLeft,
  widthLeft,
  heightRight,
  widthRight,
  onPressLeft,
  onPressRight,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: colors.black,
        paddingVertical: 10,
        paddingHorizontal: 20,
        paddingTop: ms(20),
        backgroundColor: colors.black,
      }}
    >
      <TouchableOpacity onPress={onPressLeft}>
        <Image
          contentFit="contain"
          source={imageLeft}
          style={{
            height: verticalScale(heightLeft),
            width: scale(widthLeft),
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: scale(20),
          fontFamily: "payyng-bold",
          color: colors.greenColor,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onPressRight}>
        <Image
          contentFit="contain"
          source={imageRight}
          style={{
            height: verticalScale(heightRight),
            width: scale(widthRight),
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
