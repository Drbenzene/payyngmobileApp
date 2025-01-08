import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  RefreshControl,
} from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ms } from "react-native-size-matters";
import Colors from "@/constants/Colors";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSession } from "@/features/ctx";
import { useWallet } from "@/hooks/useWallet";
import { formatToCurrency } from "@/utils/helperFunc";
import { currency } from "@/constants/currency";
import { useTransactions } from "@/hooks/useTransaction";
const { width } = Dimensions.get("window");
import VerifyBVNModal from "@/components/modals/verifyBVNModal";
import CreateDollarCard from "@/components/modals/createDollarCard";
import TransactionCard from "@/components/payyngCard/transactionCard";
import { BILLS_DATA } from "@/constants/constantData";
import { Image } from "expo-image";
import BillCard from "@/components/payyngCard/BillCard";

const HomeScreen = () => {
  const { session } = useSession();

  console.log(session, "my session");
  const [openVerifyBVN, setOpenVerifyBVN] = useState(
    session?.bvnVerified === false ? true : false
  );
  const [openCreateCard, setOpenCreateCard] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: wallet,
    isLoading,
    isRefetching,
    refetch: refetchWallet,
  } = useWallet();

  const {
    data: transactions,
    isLoading: transactionLoading,
    refetch: refetchTransaction,
    isFetching: transactionRefreshing,
  } = useTransactions();
  const { push } = useRouter();

  console.log(wallet, "my wallet");
  console.log(transactions, "THE TRANSACIONSISISI");

  const currencyCards = [
    {
      id: 1,
      currency: "NGN",
      balance: `${formatToCurrency(
        wallet?.NGN?.balance || 0.0,
        currency.NGN,
        "en-NG"
      )}`,
      accountNumber: `${wallet?.NGN?.accountNumber || ""}`,
      flag: "https://flagcdn.com/w320/ng.png",
    },
    {
      id: 2,
      currency: "USD",
      balance: `${formatToCurrency(
        wallet?.USD?.balance || 0.0,
        currency.USD,
        "en-US"
      )}`,
      accountNumber: `${wallet?.USD?.accountNumber || ""}`,
      flag: "https://flagcdn.com/w320/us.png",
    },
    {
      id: 3,
      currency: "EUR",
      balance: `${formatToCurrency(
        wallet?.EUR?.balance || 0.0,
        currency.EUR,
        "en-US"
      )}`,
      accountNumber: `${wallet?.EUR?.accountNumber || ""}`,
      flag: "https://flagcdn.com/w320/eu.png",
    },
    {
      id: 4,
      currency: "GBP",
      balance: `${formatToCurrency(
        wallet?.GBP?.balance || 0.0,
        currency.GBP,
        "en-US"
      )}`,
      accountNumber: `${wallet?.GBP?.accountNumber || ""}`,
      flag: "https://flagcdn.com/w320/gb.png",
    },
  ];

  const bills = [
    { id: 1, name: "Airtime", icon: "phone", route: "/(pages)/airtime" },
    { id: 2, name: "Data", icon: "wifi", route: "/(pages)/airtime" },
    { id: 3, name: "Electricity", icon: "bolt", route: "/(pages)/airtime" },
    {
      id: 4,
      name: "Remita Payments",
      icon: "file-invoice",
      route: "/(pages)/airtime",
    },
    { id: 5, name: "Water Bill", icon: "tint", route: "/(pages)/airtime" },
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

  const createCardHandler = () => {
    if (session?.tier === 0) {
      return setOpenVerifyBVN(true);
    }
    if (session?.tier === 1) {
      //OPEN THE ID VERIFICATION FLOW
      return setOpenCreateCard(true);
    }
    // if()
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchWallet(), refetchTransaction()]);
    setRefreshing(false);
  };

  return (
    <AppLayout>
      <StatusBar style="dark" />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        <Animated.View
          style={
            {
              // opacity: fadeAnim,
            }
          }
        >
          <Text style={styles.headerText}>
            Welcome Back {`, ${session?.firstName}`}!
          </Text>
          {/* Currency Cards */}
          <FlatList
            data={currencyCards}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.currencyCard}>
                <View style={styles.currencyHeader}>
                  <Image source={{ uri: item.flag }} style={styles.flagIcon} />
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

          <FlatList
            data={BILLS_DATA}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <BillCard
                  bill={{
                    id: item?.id,
                    name: item?.name,
                    route: `${item?.route}?code=${item?.code}`,
                  }}
                />
              </View>
            )}
          />

          {/* Recent Transactions */}
          <Text style={styles.sectionHeader}>Recent Transactions</Text>
          {transactions &&
            transactions?.data?.map((transaction: any) => (
              <TransactionCard
                key={transaction?.id}
                transaction={transaction}
              />
            ))}
          <Animated.View>
            {/* Dollar Card Section */}
            <View style={styles.dollarCardSection}>
              <Text style={styles.sectionHeader}>Create A Dollar Card</Text>
              <Text style={styles.dollarCardText}>
                Generate a virtual dollar card for online purchases.
              </Text>
              {/* Mock Dollar Card Design */}
              <View style={styles.mockDollarCard}>
                <Text style={styles.mockCardBankName}>Payyng</Text>
                <View style={styles.cardChipContainer}>
                  <View style={styles.cardChip} />
                </View>
                <Text style={styles.mockCardNumber}>**** **** **** 1234</Text>
                <View style={styles.cardDetailsContainer}>
                  <View>
                    <Text style={styles.cardDetailLabel}>CARD HOLDER</Text>
                    <Text style={styles.cardDetailValue}>
                      {session?.firstName
                        ? `${session?.firstName} ${session?.lastName}`
                        : "John Doe"}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.cardDetailLabel}>EXPIRY</Text>
                    <Text style={styles.cardDetailValue}>12/28</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.createCardButton}
                onPress={() => setOpenCreateCard(true)}
              >
                <Text style={styles.createCardText}>Create Card</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          {/* Blog Section */}
          <Text style={styles.sectionHeader}>Stay Informed</Text>
          <FlatList
            data={blogs}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.blogCard}>
                <Image source={{ uri: item.image }} style={styles.blogImage} />
                <Text style={styles.blogTitle}>{item.title}</Text>
                <Text style={styles.blogDescription}>{item.description}</Text>
              </View>
            )}
          />
        </Animated.View>
      </ScrollView>

      {openVerifyBVN && (
        <VerifyBVNModal
          open={openVerifyBVN}
          setIsOpen={() => {
            setOpenVerifyBVN(false);
          }}
        />
      )}

      {openCreateCard && (
        <CreateDollarCard
          open={openCreateCard}
          setIsOpen={() => {
            setOpenCreateCard(false);
          }}
        />
      )}
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
    marginVertical: 8,
    fontFamily: "payyng-bold",
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
    fontFamily: "payyng-bold",
    color: Colors.greenColor,
  },
  sectionHeader: {
    fontSize: 18,
    marginVertical: 16,
    color: Colors.white,
    fontFamily: "payyng-bold",
    textAlign: "left",
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
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    paddingVertical: ms(20),
  },

  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dollarCardSection: {
    marginVertical: 24,
    alignItems: "center",
  },
  dollarCardText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: Colors.white,
    fontFamily: "payyng-semibold",
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

  mockDollarCard: {
    width: "100%",
    backgroundColor: Colors?.greenColor,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  mockCardBankName: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 16,
    fontFamily: "payyng-semibold",
  },
  cardChipContainer: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardChip: {
    width: 40,
    height: 30,
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  mockCardNumber: {
    fontSize: 18,
    letterSpacing: 2,
    color: "#fff",
    marginBottom: 16,
    fontFamily: "payyng-semibold",
  },
  cardDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDetailLabel: {
    fontSize: 12,
    color: "#B0C4DE",
  },
  cardDetailValue: {
    fontSize: 14,
    color: "#fff",
  },
  createCardButton: {
    backgroundColor: Colors.greenColor,
    padding: 12,
    borderRadius: 8,
  },
  createCardText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "payyng-semibold",
    textAlign: "center",
  },

  emptyImage: {
    width: 150,
    // height: 150,
  },

  cardContainer: {
    width: "50%",
    marginBottom: 16,
    paddingHorizontal: 6,
  },
});
