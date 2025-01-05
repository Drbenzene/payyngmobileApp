import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../constants/Colors";
import { Image } from "expo-image";
import { ms, scale, verticalScale } from "react-native-size-matters";

interface Props {
  title: string;
  heightLeft: number;
  widthLeft: number;
  heightRight: number;
  widthRight: number;
  onPressLeft: any;
  onPressRight: any;
  imageLeft?: any;
  titleColor?: string;
  imageRight?: any;
  hideBackButton?: boolean;
  paddingTop?: number;
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
  titleColor,
  hideBackButton,
  paddingTop,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: colors.black,
        paddingVertical: ms(10),
        paddingHorizontal: ms(20),
        paddingTop: ms(paddingTop || 40),
        backgroundColor: colors.black,
      }}
    >
      {hideBackButton && <View style={{ width: scale(2) }} />}
      {!hideBackButton && (
        <TouchableOpacity onPress={onPressLeft}>
          <Image
            // contentFit="contain"
            source={imageLeft || require("../../assets/images/back_2.png")}
            style={{
              height: verticalScale(heightLeft || 30),
              width: scale(widthLeft || 30),
            }}
          />

          {/* <Text>Back</Text> */}
        </TouchableOpacity>
      )}

      <Text
        style={{
          fontSize: scale(20),
          fontFamily: "payyng-bold",
          color: titleColor || colors.greenColor,
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
