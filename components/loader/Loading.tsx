import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import * as Animatable from "react-native-animatable";
import Colors from "@/constants/Colors";
import { ms } from "react-native-size-matters";

const PayyngLoader = () => {
  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Animatable.View
        animation="rotate"
        iterationCount="infinite"
        duration={2000}
        easing="linear"
        style={styles.imageContainer}
      >
        <Image
          source={require("../../assets/images/loading.png")}
          contentFit="contain"
          style={styles.loadingImage}
        />
      </Animatable.View>

      {/* Loading Text */}
      <Text style={styles.loadingText}>Loading, please wait...</Text>
    </View>
  );
};

export default PayyngLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: ms(50),
  },
  imageContainer: {
    marginBottom: 20,
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: "payyng-semibold",
    textAlign: "center",
  },
});
