import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import PayyngBar from "../Layouts/PayyngBar";
import Colors from "@/constants/Colors";
import * as Yup from "yup";
import { Formik } from "formik";
import PayyngCustomField from "../inputs/PayyngCustomField";
import PayyngButton from "../button/PayyngButton";
import { ms } from "react-native-size-matters";
import { currency } from "@/constants/currency";
import { createCard } from "@/hooks/useCard";
import { Toast } from "@/utils/toast";
import { MaterialIcons } from "@expo/vector-icons";

interface CreateDollaarCardDTO {
  open: boolean;
  setIsOpen: any;
}

const CreateDollarCard = ({ open, setIsOpen }: CreateDollaarCardDTO) => {
  const [error, setError] = useState<any>("");
  const createDollarCardHandler = async (values: any) => {
    const payload = {
      amount: Number(values.amount),
      currency: currency.USD,
    };
    const res = await createCard(payload);
    if (res) {
      Toast.success("Card created successfully");
      setIsOpen(false);
    } else {
      setError(
        "We are unable to create card at the moment. Please try again later"
      );
    }
  };

  return (
    <ModalLayout modalVisible={open} closeModal={setIsOpen} height={50}>
      <View>
        <PayyngBar
          title={"CREATE DOLLAR CARD"}
          imageRight={undefined}
          heightLeft={0}
          widthLeft={0}
          heightRight={0}
          widthRight={0}
          onPressLeft={undefined}
          onPressRight={undefined}
          titleColor={Colors.white}
        />
        <Formik
          initialValues={{
            amount: "1000",
          }}
          validationSchema={Yup.object({
            amount: Yup.string().required("Funding Amoint is required "),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await createDollarCardHandler(values);
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
            touched,
            isSubmitting,
            isValid,
          }) => (
            <View>
              <PayyngCustomField
                type="CURRENCY"
                label="Funding Amount"
                id="amount"
                returnKeyType="next"
                value={values.amount}
                labelColor={Colors.white}
                keyboardType="phone-pad"
                placeholder="Enter funding amount (USD)"
                currency="USD"
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                errorMessage={errors.amount}
                setValues={setValues}
                values={values}
                placeholderTextColor={Colors.placeholderTextColor}
              />

              <Text style={styles.feeNotification}>
                You will be charged $3.50 for this transaction and card creation
                fee
              </Text>

              {error && (
                <Text style={styles.errorText}>
                  <MaterialIcons
                    name="error-outline"
                    size={20}
                    color="#FA5C47"
                  />

                  {error}
                </Text>
              )}

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

export default CreateDollarCard;

const styles = StyleSheet.create({
  actionBtnContainer: {
    marginTop: ms(20),
  },

  feeNotification: {
    color: Colors.white,
    fontSize: ms(12),
    fontFamily: "payyng-regular",
    padding: 10,
  },
  errorText: {
    color: Colors.error,
    fontSize: ms(16),
    fontFamily: "payyng-semibold",
    padding: 10,
  },
});
