import {
  StyleSheet,
  Animated,
  SafeAreaView,
  View,
  FlatList,
} from "react-native";
import AppLayout from "@/components/Layouts/AppLayout";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import PayyngBar from "@/components/Layouts/PayyngBar";
import { useGiftCard } from "@/hooks/useGiftCard";
import { useSession } from "@/features/ctx";
import PayyngCard from "@/components/payyngCard/PayyngCard";
import PayyngCustomField from "@/components/inputs/PayyngCustomField";
import { ms } from "react-native-size-matters";
import { Formik } from "formik";
import PurchaseGiftCard from "@/components/modals/purchaseGiftCard";
import SuccessTransaction from "@/components/modals/successTransaction";
import { BILLS_DATA } from "@/constants/constantData";
import BillCard from "@/components/payyngCard/BillCard";

export default function Bills() {
  const { session } = useSession();
  const [modalVisible, setModalVisible] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<any>(null);
  let filters = {
    productName: "",
  };

  const { data: products, refetch, isLoading } = useGiftCard(filters);
  console.log(products, "THE DATA OOOOO");
  const fadeAnim = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <AppLayout>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          title: "Gift Card",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <View>
        <PayyngBar
          title={"BILLS PAYMENT"}
          heightLeft={0}
          widthLeft={0}
          heightRight={0}
          widthRight={0}
          onPressLeft={undefined}
          onPressRight={undefined}
          titleColor={Colors.white}
          hideBackButton={true}
        />
      </View>

      <Animated.View
        style={
          {
            //   opacity: fadeAnim,
          }
        }
      >
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
      </Animated.View>

      {modalVisible && (
        <PurchaseGiftCard
          open={modalVisible}
          setIsOpen={() => setModalVisible(false)}
          selectedGiftCard={selectedGiftCard}
          setOpenSuccess={() => setOpenSuccess(true)}
        />
      )}

      {openSuccess && (
        <SuccessTransaction
          open={openSuccess}
          setIsOpen={() => {
            setOpenSuccess(false);
            setModalVisible(false);
          }}
        />
      )}
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ms(20),
  },

  cardContainer: {
    width: "50%",
    marginBottom: 16,
    paddingHorizontal: 6,
  },
});
