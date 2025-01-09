import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ms, vs, s } from "react-native-size-matters";
import { Formik } from "formik";
import * as Yup from "yup";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import AuthLayout from "@/components/Layouts/AuthLayout";
import PayyngButton from "@/components/button/PayyngButton";
import PayyngOTPField from "@/components/inputs/PayyngOTPField";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { setPin } from "@/hooks/useAuth";
import { Toast } from "@/utils/toast";

const SetTransactionPin = () => {
  const { replace } = useRouter();

  const setTransactionPinHandler = async (values: any) => {
    const payload = {
      pin: Number(values.pin),
    };
    const res = await setPin(payload);

    if (res) {
      replace("/(tabs)");
    }
  };

  return (
    <AuthLayout>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          title: "set-transaction-pin",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}> Transaction Pin</Text>
          <Text style={styles.subText}>
            Enter your 4 digits Transaction pin to secure your account
          </Text>
        </View>
        <Formik
          initialValues={{
            pin: "",
          }}
          validationSchema={Yup.object({
            pin: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await setTransactionPinHandler(values);
            setSubmitting(false);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            isValid,
          }) => (
            <View style={styles.formContainer}>
              <PayyngOTPField
                hideValue={true}
                digits={4}
                onChange={handleChange("pin")}
              />

              <View
                style={{
                  marginTop: vs(60),
                }}
              >
                <PayyngButton
                  onPress={handleSubmit}
                  buttonText={"PROCEED"}
                  buttonColor={Colors.greenColor}
                  buttonTextColor={Colors.white}
                  isProcessing={isSubmitting}
                  disabled={isSubmitting || !isValid}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </AuthLayout>
  );
};

export default SetTransactionPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(16),
    paddingTop: vs(20),
  },
  headerText: {
    fontSize: ms(40),
    color: Colors.white,
    marginTop: vs(20),
    textAlign: "center",
    fontFamily: "payyng-bold",
  },
  subText: {
    color: Colors.white,
    fontSize: ms(16),
    textAlign: "center",
    marginTop: vs(10),
    fontFamily: "payyng-semibold",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    marginTop: vs(20),
  },
});
