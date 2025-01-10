import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { ms } from "react-native-size-matters";
import Colors from "@/constants/Colors";

interface BillCardProps {
  bill: {
    id: number;
    name: string;
  };
}

const BillCard = ({ bill }: BillCardProps) => {
  return (
    <View>
      <View style={styles.billItem}>
        <Image
          source={require("../../assets/images/electricity.png")}
          contentFit="cover"
          style={styles.emptyImage}
        />

        <Text style={styles.billText}>{bill.name}</Text>
      </View>
    </View>
  );
};

export default BillCard;

const styles = StyleSheet.create({
  billItem: {
    width: "100%",
    // height: "100%",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    paddingVertical: ms(20),
  },

  billText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.greenColor,
    textAlign: "center",
    textTransform: "capitalize",
    fontFamily: "payyng-semibold",
  },

  emptyImage: {
    width: 150,
    // height: 150,
  },
});
