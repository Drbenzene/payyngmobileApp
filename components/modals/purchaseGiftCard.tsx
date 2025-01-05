import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import PayyngBar from "../Layouts/PayyngBar";
import Colors from "@/constants/Colors";
import * as Yup from "yup";
import { Formik } from "formik";
import PayyngCustomField from "../inputs/PayyngCustomField";
import PayyngButton from "../button/PayyngButton";
import { ms, verticalScale } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { purchaseGiftcard } from "@/hooks/useGiftCard";

interface PurchaseGiftCardDTO {
  open: boolean;
  setIsOpen: any;
  selectedGiftCard: any;
  setOpenSuccess: any;
}

const PurchaseGiftCard = ({
  open,
  selectedGiftCard,
  setIsOpen,
  setOpenSuccess,
}: PurchaseGiftCardDTO) => {
  const [error, setError] = useState<any>("");
  console.log(selectedGiftCard, "THE SELECTED GIFT CARD");

  const purchaseGiftCardHandler = async (values: any) => {
    setError("");
    const payload = {
      currency: selectedGiftCard?.recipientCurrencyCode,
      productId: selectedGiftCard?.productId,
      quantity: 1,
      unitPrice: Number(values.amount),
    };

    const res = await purchaseGiftcard(payload);
    if (res) {
      setOpenSuccess();
    } else {
      console.log("ERROR");
      setError(
        "We are unable to process your request at this time. Please try again later"
      );
    }
  };

  return (
    <ModalLayout modalVisible={open} closeModal={setIsOpen} height={70}>
      <View>
        <PayyngBar
          title={`${selectedGiftCard?.productName}`}
          imageRight={undefined}
          heightLeft={0}
          widthLeft={0}
          heightRight={0}
          widthRight={0}
          onPressLeft={() => {
            setIsOpen(false);
          }}
          onPressRight={undefined}
          titleColor={Colors.white}
          paddingTop={ms(10)}
        />
        <Formik
          initialValues={{
            amount: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.string().required("Amount is required "),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await purchaseGiftCardHandler(values);
            setSubmitting(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setValues,
            isSubmitting,
            isValid,
          }) => (
            <View>
              {selectedGiftCard?.fixedRecipientDenominations?.length <= 0 && (
                <PayyngCustomField
                  type="CURRENCY"
                  label="Amount"
                  id="amount"
                  returnKeyType="next"
                  value={values.amount}
                  labelColor={Colors.white}
                  keyboardType="phone-pad"
                  placeholder={`Enter Amount in ${selectedGiftCard?.recipientCurrencyCode}`}
                  currency={`${selectedGiftCard?.recipientCurrencyCode}`}
                  onChangeText={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  errorMessage={errors.amount}
                  setValues={setValues}
                  values={values}
                  placeholderTextColor={Colors.placeholderTextColor}
                />
              )}

              {selectedGiftCard?.fixedRecipientDenominations?.length > 0 && (
                <View>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: ms(14),
                      fontFamily: "payyng-semibold",
                      textAlign: "left",
                    }}
                  >
                    Select Purchase Amount
                  </Text>
                  <FlatList
                    data={selectedGiftCard?.fixedRecipientDenominations}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setValues({ ...values, amount: item });
                        }}
                        style={{
                          ...styles.amountContainer,
                          backgroundColor:
                            values.amount === item
                              ? Colors.greenColor
                              : Colors.white,
                        }}
                      >
                        <Image
                          contentFit="cover"
                          style={styles.image}
                          source={selectedGiftCard?.country?.flagUrl}
                        />
                        <Text
                          style={{
                            fontSize: ms(14),
                            color:
                              item === values.amount
                                ? Colors.white
                                : Colors.black,
                            textAlign: "center",
                            fontFamily: "payyng-semibold",
                          }}
                        >
                          {selectedGiftCard?.recipientCurrencyCode} {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}

              {(errors?.amount || error) && (
                <Text style={styles.errorText}>
                  <MaterialIcons
                    name="error-outline"
                    size={20}
                    color="#FA5C47"
                  />
                  {errors?.amount || error}
                </Text>
              )}

              {/* {values.amount && selectedGiftCard?.senderFee && (
                <Text style={styles.feeNotification}>
                  {`A fee of ${selectedGiftCard?.senderFee} will be charged on this transaction`}
                </Text>
              )} */}

              <View style={styles.actionBtnContainer}>
                <PayyngButton
                  buttonText="Proceed"
                  isProcessing={isSubmitting}
                  disabled={!isValid || isSubmitting}
                  buttonColor={Colors.primaryColor}
                  buttonTextColor={Colors.bgColor}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ModalLayout>
  );
};

export default PurchaseGiftCard;

const styles = StyleSheet.create({
  actionBtnContainer: {
    marginTop: ms(20),
  },

  feeNotification: {
    color: Colors.white,
    fontSize: ms(12),
    fontFamily: "payyng-semibold",
    padding: 10,
  },
  errorText: {
    color: Colors.error,
    fontSize: ms(16),
    fontFamily: "payyng-semibold",
    padding: 10,
  },

  amountContainer: {
    alignItems: "center",
    marginVertical: ms(10),
    backgroundColor: Colors.white,
    padding: ms(10),
    borderRadius: ms(5),
    marginHorizontal: ms(5),
  },

  image: {
    width: "50%",
    height: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: 100,
  },
});
