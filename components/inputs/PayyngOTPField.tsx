import { Dimensions, StyleSheet, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import React from "react";
import Colors from "@/constants/Colors";
import { vs, s, ms } from "react-native-size-matters";

interface PayyngOTPFieldProps {
  digits: number;
  onChange: any;
  hideValue?: boolean;
}

const PayyngOTPField = ({
  digits,
  onChange,
  hideValue,
}: PayyngOTPFieldProps) => {
  return (
    <View>
      <OtpInput
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        focusStickBlinkingDuration={500}
        numberOfDigits={digits}
        onTextChange={onChange}
        hideStick={true}
        secureTextEntry={hideValue}
        theme={{
          //   containerStyle: styles.container,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          //   focusStickStyle: styles.focusStick,
          //   focusedPinCodeContainerStyle: styles.activePinCodeContainer,
        }}
      />
    </View>
  );
};

export default PayyngOTPField;

const styles = StyleSheet.create({
  pinCodeText: {
    color: Colors.greenColor,
    fontWeight: 800,
    fontFamily: "payyng-regular",
  },

  pinCodeContainer: {
    width: vs(50),
    height: vs(50),
    marginHorizontal: vs(2),
  },
});
