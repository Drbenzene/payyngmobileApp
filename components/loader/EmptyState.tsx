import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import * as Animatable from "react-native-animatable";
import Colors from "@/constants/Colors";
import { ms } from "react-native-size-matters";
import PayyngButton from "../button/PayyngButton";
interface EmptyStateProps {
  onPress: () => void;
  message?: string;
  buttonText?: string;
}
const EmptyState = ({
  message = "No items found",
  buttonText = "Try Again",
  onPress,
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Animatable.View
        animation="fadeIn"
        delay={4000}
        duration={2000}
        iterationCount="infinite"
        style={styles.imageContainer}
      >
        <Image
          source={require("../../assets/images/empty.png")}
          contentFit="contain"
          style={styles.emptyImage}
        />
      </Animatable.View>

      {/* Empty State Text */}
      <Text style={styles.emptyText}>{message}</Text>

      {/* Retry Button */}
      <Animatable.View
        animation="fadeIn"
        delay={500}
        duration={1000}
        style={styles.buttonContainer}
      >
        <Text style={styles.retryButton} onPress={onPress}>
          <PayyngButton
            buttonText={buttonText}
            buttonColor={Colors.greenColor}
            buttonTextColor={Colors.white}
            onPress={onPress}
          />
          {buttonText}
        </Text>
      </Animatable.View>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: Colors.white,
    padding: ms(20),
  },
  imageContainer: {
    marginBottom: ms(20),
  },
  emptyImage: {
    width: 150,
    height: 150,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "payyng-regular",
    textAlign: "center",
    marginBottom: ms(20),
  },
  buttonContainer: {
    borderRadius: ms(25),
    overflow: "hidden",
  },
  retryButton: {
    borderRadius: ms(25),
  },
});
