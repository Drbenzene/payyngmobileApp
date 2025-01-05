import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { formatToCurrency } from "@/utils/helperFunc";
import moment from "moment";
import * as Animatable from "react-native-animatable";

interface TransactionCardProps {
  transaction: any;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Animatable.View
      key={transaction.id}
      style={styles.transactionItem}
      animation="fadeInUp"
      duration={800}
      easing="ease-out"
    >
      <View style={styles.leftSection}>
        <Text style={styles.transactionType}>
          {transaction.transactionType}
        </Text>
        <Text style={styles.transactionDate}>
          {moment(transaction.createdAt).format("MMM DD, YYYY, hh:mm A")}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Text
          style={{
            ...styles.transactionAmount,
            color:
              transaction.transactionType === "CREDIT"
                ? Colors.greenColor
                : Colors.error,
          }}
        >
          {formatToCurrency(
            transaction.amount,
            transaction.currency,
            `en-${transaction.currency?.slice(0, 2).toUpperCase()}`
          )}
        </Text>
      </View>
    </Animatable.View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: Colors.cardBackground,
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  transactionType: {
    fontSize: 16,
    fontFamily: "payyng-semibold",
    color: Colors.white,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: "payyng-regular",
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: "payyng-semibold",
  },
});
