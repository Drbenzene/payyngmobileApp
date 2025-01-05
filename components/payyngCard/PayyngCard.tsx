import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Image } from "expo-image";
import { ms, verticalScale } from "react-native-size-matters";

interface PayyngCardProps {
  title: string;
  onPress: () => void;
  image: string;
}

const PayyngCard = ({ title, onPress, image }: PayyngCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: image }} contentFit="cover" style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PayyngCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: verticalScale(80),
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: ms(14),
    color: Colors.black,
    textAlign: "center",
    fontFamily: "payyng-semibold",
  },
});
