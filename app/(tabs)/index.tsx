// import { Image, StyleSheet, Platform } from "react-native";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/partial-react-logo.png")}
//           style={styles.reactLogo}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit{" "}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
//           to see changes. Press{" "}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: "cmd + d",
//               android: "cmd + m",
//               web: "F12",
//             })}
//           </ThemedText>{" "}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this
//           starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{" "}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
//           to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//           directory. This will move the current{" "}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  RefreshControl,
} from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ms } from "react-native-size-matters";
import Colors from "@/constants/Colors";
import AppLayout from "@/components/Layouts/AppLayout";
const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const currencyCards = [
    {
      id: 1,
      currency: "NGN",
      balance: "₦50,000.00",
      accountNumber: "1234-5678-9101",
      flag: "https://flagcdn.com/w320/ng.png",
    },
    {
      id: 2,
      currency: "USD",
      balance: "$1,250.00",
      accountNumber: "1234-5678-9101",
      flag: "https://flagcdn.com/w320/us.png",
    },
    {
      id: 3,
      currency: "EUR",
      balance: "€800.00",
      accountNumber: "2234-5678-9101",
      flag: "https://flagcdn.com/w320/eu.png",
    },
    {
      id: 4,
      currency: "NGN",
      balance: "₦500,000.00",
      accountNumber: "3234-5678-9101",
      flag: "https://flagcdn.com/w320/ng.png",
    },
  ];

  const bills = [
    { id: 1, name: "Airtime", icon: "phone" },
    { id: 2, name: "Data", icon: "wifi" },
    { id: 3, name: "Electricity", icon: "bolt" },
    { id: 4, name: "Remita Payments", icon: "file-invoice" },
    { id: 5, name: "Water Bill", icon: "tint" },
  ];

  const recentTransactions = [
    { id: 1, date: "Dec 18", type: "Sent", amount: "-$50.00" },
    { id: 2, date: "Dec 17", type: "Received", amount: "+€75.00" },
    { id: 3, date: "Dec 16", type: "Bill Payment", amount: "-₦10,000" },
  ];

  const blogs = [
    {
      id: 1,
      title: "Top 5 Tips for Managing Your Finances",
      description: "Learn how to effectively manage your finances.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Why You Need a Virtual Dollar Card",
      description: "Explore the benefits of using a virtual card.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <AppLayout>
      <RefreshControl
        refreshing={false}
        onRefresh={() => {
          console.log("refreshing");
        }}
      >
        <ScrollView style={styles.container}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.headerText}>Welcome Back, User!</Text>

            {/* Currency Cards */}
            <FlatList
              data={currencyCards}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.currencyCard}>
                  <View style={styles.currencyHeader}>
                    <Image
                      source={{ uri: item.flag }}
                      style={styles.flagIcon}
                    />
                    <Text style={styles.currencyText}>{item.currency}</Text>
                  </View>
                  <Text style={styles.balanceText}>{item.balance}</Text>
                  <Text style={styles.accountText}>{item.accountNumber}</Text>
                  <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.cardButton}>
                      <MaterialIcons
                        name="send"
                        size={20}
                        color={Colors.greenColor}
                      />
                      <Text style={styles.iconText}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton}>
                      <MaterialIcons
                        name="call-received"
                        size={20}
                        color={Colors.greenColor}
                      />
                      <Text style={styles.iconText}>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton}>
                      <Ionicons
                        name="swap-horizontal"
                        size={20}
                        color={Colors.greenColor}
                      />
                      <Text style={styles.iconText}>Exchange</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            {/* Bills Section */}
            <Text style={styles.sectionHeader}>Pay Your Bills</Text>
            <View style={styles.billsContainer}>
              {bills.map((bill) => (
                <TouchableOpacity key={bill.id} style={styles.billItem}>
                  <FontAwesome5
                    name={bill.icon}
                    size={24}
                    color={Colors.greenColor}
                  />
                  <Text style={styles.billText}>{bill.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Recent Transactions */}
            <Text style={styles.sectionHeader}>Recent Transactions</Text>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionAmount}>
                  {transaction.amount}
                </Text>
              </View>
            ))}

            {/* Dollar Card */}
            <View style={styles.dollarCardSection}>
              <Text style={styles.sectionHeader}>Create a Dollar Card</Text>
              <Text style={styles.dollarCardText}>
                Generate a virtual dollar card for online purchases.
              </Text>
              <TouchableOpacity style={styles.createCardButton}>
                <Text style={styles.createCardText}>Create Now</Text>
              </TouchableOpacity>
            </View>

            {/* Blog Section */}
            <Text style={styles.sectionHeader}>Stay Informed</Text>
            <FlatList
              data={blogs}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.blogCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.blogImage}
                  />
                  <Text style={styles.blogTitle}>{item.title}</Text>
                  <Text style={styles.blogDescription}>{item.description}</Text>
                </View>
              )}
            />
          </Animated.View>
        </ScrollView>
      </RefreshControl>
    </AppLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(10),
    paddingTop: ms(40),
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "payyng-bold",
    color: Colors.white,
  },
  currencyCard: {
    backgroundColor: Colors.greenColor,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: width * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  currencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  flagIcon: {
    width: 50,
    height: 40,
    marginRight: 8,
    borderRadius: 50,
  },
  currencyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "payyng-bold",
  },
  balanceText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  accountText: {
    color: "#fff",
    fontSize: 14,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cardButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  iconText: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.greenColor,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    color: Colors.white,
    fontFamily: "payyng-bold",
  },
  billsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  billItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 16,
  },
  billText: {
    marginTop: 8,
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
  },
  transactionType: {
    fontSize: 14,
    fontWeight: "bold",
  },
  transactionAmount: {
    fontSize: 14,
    color: Colors.greenColor,
  },
  dollarCardSection: {
    marginVertical: 24,
    alignItems: "center",
  },
  dollarCardText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  createCardButton: {
    backgroundColor: Colors.greenColor,
    padding: 12,
    borderRadius: 8,
  },
  createCardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  blogCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: width * 0.6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  blogImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  blogDescription: {
    fontSize: 14,
    color: "#666",
  },
});
