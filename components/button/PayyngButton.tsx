import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import colors from "../../constants/Colors";

interface Props {
  buttonText: string;
  buttonColor: any;
  buttonTextColor: any;
  onPress: any;
  disabled?: boolean;
  marginTop?: any;
  borderWidth?: any;
  borderColor?: any;
  isProcessing?: boolean;
}

const PayyngButton = ({
  onPress,
  buttonText,
  buttonColor,
  buttonTextColor,
  disabled,
  marginTop,
  borderWidth,
  borderColor,
  isProcessing,
}: Props) => {
  const [showIndicator, setShowIndicator] = useState(false);

  return (
    <View>
      <TouchableOpacity
        disabled={disabled || showIndicator}
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          borderRadius: 50,
          height: 60,
          backgroundColor: buttonColor,
          paddingVertical: Platform.OS === "ios" ? 15 : 16,
          paddingHorizontal: 14,
          borderWidth: borderWidth,
          borderColor: borderColor,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "payyng-bold",
            textAlign: "center",
            color: buttonTextColor,
          }}
        >
          {isProcessing && <ActivityIndicator />}
          {buttonText}
        </Text>
        <MaterialIcons name="keyboard-arrow-right" size={27} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default PayyngButton;
