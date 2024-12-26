import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import PayyngBar from "@/components/Layouts/PayyngBar";
import AppLayout from "@/components/Layouts/AppLayout";
import { StatusBar } from "expo-status-bar";
import { ms, vs } from "react-native-size-matters";
import PayyngCustomField from "@/components/inputs/PayyngCustomField";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "@/components/button/PayyngButton";
import Colors from "@/constants/Colors";
import CurrencyInput from "react-native-currency-input";

const Airtime = () => {
  return (
    <AppLayout>
      <StatusBar style="dark" />
      <PayyngBar
        title={"Airtime"}
        imageRight={undefined}
        heightLeft={0}
        widthLeft={0}
        heightRight={0}
        widthRight={0}
        onPressLeft={undefined}
        onPressRight={undefined}
      />
      <SafeAreaView style={styles.container}></SafeAreaView>
      <View>
        <Formik
          initialValues={{
            phone: "",
            amount: "",
          }}
          validationSchema={Yup.object({
            phone: Yup.string().required("Required"),
            amount: Yup.string().required("Required"),
          })}
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
                label="Phone Number"
                labelColor={Colors.white}
                id="phone"
                returnKeyType="next"
                value={values.phone}
                keyboardType="phone-pad"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                errorMessage={errors.phone}
                placeholder={""}
                placeholderTextColor={undefined}
              />

              <PayyngCustomField
                type="CURRENCY"
                label="Amount"
                currency="NGN "
                labelColor={Colors.white}
                id="amount"
                returnKeyType="next"
                value={values.amount}
                keyboardType="phone-pad"
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                errorMessage={errors.amount}
                placeholder={"Enter Amount"}
                setValues={setValues}
              />

              <View style={styles.buttonContainer}>
                <PayyngButton
                  buttonText="Buy Airtime"
                  onPress={handleSubmit}
                  buttonColor={Colors.greenColor}
                  buttonTextColor={Colors.white}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </AppLayout>
  );
};

export default Airtime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(10),
  },

  formContainer: {
    paddingHorizontal: ms(10),
  },
  buttonContainer: {
    marginTop: vs(20),
  },
});
