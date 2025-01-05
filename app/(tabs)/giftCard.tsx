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
import PayyngLoader from "@/components/loader/Loading";
import EmptyState from "@/components/loader/EmptyState";

export default function GiftCard() {
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

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardContainer}>
      <PayyngCard
        title={item?.productName}
        onPress={() => {
          setSelectedGiftCard(item);
          setModalVisible(true);
        }}
        image={item?.logoUrls[0]}
      />
    </View>
  );

  console.log(modalVisible, "THE MODAL VISIBLE");
  console.log(openSuccess, "THE OPEN SUCCESS");

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
          title={"GIFT CARD"}
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
          <Formik
            initialValues={{
              productName: "",
              amount: "",
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setValues,
            }) => (
              <View style={styles.formContainer}>
                <PayyngCustomField
                  type="INPUT"
                  label=""
                  labelColor={Colors.white}
                  id="productName"
                  returnKeyType="next"
                  value={values.productName}
                  keyboardType="default"
                  onChangeText={(text: any) => {
                    setValues({ ...values, productName: text });
                    filters.productName = text;
                    refetch();
                  }}
                  onBlur={handleBlur("productName")}
                  errorMessage={errors.productName}
                  placeholder={"Search ...."}
                />
              </View>
            )}
          </Formik>
        </SafeAreaView>

        {isLoading && <PayyngLoader />}

        {products?.content?.length === 0 && (
          <EmptyState
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}

        <View style={styles.container}>
          <FlatList
            data={products?.content || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.productId}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
          />
        </View>
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
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "50%",
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  formContainer: {
    paddingHorizontal: ms(10),
  },
});
