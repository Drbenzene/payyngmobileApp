import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ModalLayout from "./ModalLayout";
import Colors from "@/constants/Colors";
import { verticalScale, ms } from "react-native-size-matters";
import PayyngButton from "../button/PayyngButton";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "expo-router";
import PayyngOTPField from "../inputs/PayyngOTPField";

interface VerifyTransactionPinDTO {
  open: boolean;
  setIsOpen: any;
  onPressHandler?: any;
  values: any;
  setValues: any;
}

const VerifyTransactionPin = ({
  open,
  setIsOpen,
  onPressHandler,
  setValues,
  values,
}: VerifyTransactionPinDTO) => {
  const { refetch } = useWallet();
  const { push, replace } = useRouter();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <ModalLayout modalVisible={open} closeModal={setIsOpen} height={50}>
      <Text style={styles.title}>Confirm Transaction</Text>
      <Text style={styles.description}>
        Please enter your 4 digits transaction pin to confirm this transaction
      </Text>
      <View style={styles.container}>
        <PayyngOTPField
          hideValue={true}
          digits={4}
          onChange={(value: any) => {
            setValues({ ...values, pin: value });
            console.log(values, "THE VALUES AFTER");
          }}
        />

        <View style={styles.buttonContainer}>
          <PayyngButton
            buttonText={"PROCEED"}
            buttonColor={Colors.greenColor}
            buttonTextColor={Colors.white}
            onPress={() => {
              if (!values.pin || values.pin.length < 4) {
                return;
              }
              onPressHandler();
            }}
          />
        </View>
      </View>
    </ModalLayout>
  );
};

export default VerifyTransactionPin;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: ms(20),
    // marginVertical: ms(100),
  },
  imageContainer: {
    marginBottom: verticalScale(20),
  },
  successImage: {
    width: verticalScale(100),
    height: verticalScale(100),
    borderRadius: 8,
  },
  title: {
    fontSize: ms(30),
    fontFamily: "payyng-bold",
    color: Colors.white,
    textAlign: "center",
    marginVertical: verticalScale(10),
  },
  description: {
    fontSize: ms(14),
    fontFamily: "payyng-regular",
    color: Colors.white,
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    borderRadius: ms(8),
    paddingVertical: ms(50),
    width: "100%",
    // paddingHorizontal: ms(20),
  },
});
