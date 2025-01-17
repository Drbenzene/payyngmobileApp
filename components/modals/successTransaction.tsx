import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ModalLayout from "./ModalLayout";
import Colors from "@/constants/Colors";
import { verticalScale, ms } from "react-native-size-matters";
import { Image } from "expo-image";
import * as Animatable from "react-native-animatable";
import PayyngButton from "../button/PayyngButton";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "expo-router";

interface SuccessTransactionDTO {
  open: boolean;
  setIsOpen: any;
}

const SuccessTransaction = ({ open, setIsOpen }: SuccessTransactionDTO) => {
  const { refetch } = useWallet();
  const { push, replace } = useRouter();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <ModalLayout modalVisible={open} closeModal={setIsOpen} height={100}>
      <View style={styles.container}>
        {/* Animated Success Image */}
        <Animatable.View
          animation="bounceIn"
          duration={3000}
          style={styles.imageContainer}
        >
          <Image
            source={require("../../assets/images/success.png")}
            contentFit="contain"
            style={styles.successImage}
          />
        </Animatable.View>

        {/* Success Message */}
        <Text style={styles.title}>Transaction Successful!</Text>

        {/* Description */}
        <Text style={styles.description}>
          Your gift card purchase has been completed successfully. Thank you for
          using Payyng.
        </Text>

        {/* Close Button */}

        <View style={styles.buttonContainer}>
          <PayyngButton
            buttonText={"PROCEED"}
            buttonColor={Colors.greenColor}
            buttonTextColor={Colors.white}
            onPress={() => {
              setIsOpen();
              replace("/(tabs)");
            }}
          />
        </View>
      </View>
    </ModalLayout>
  );
};

export default SuccessTransaction;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: ms(20),
    marginVertical: ms(100),
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
    paddingHorizontal: ms(20),
  },
});
