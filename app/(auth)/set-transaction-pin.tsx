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
import PayyngCustomField from "@/components/inputs/PayyngCustomField";

const SetTransactionPin = () => {
  const { push } = useRouter();
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
          <Text style={styles.headerText}>Set Transaction Pin</Text>
          <Text style={styles.subText}>
            Enter your 4 digits Transaction pin to secure your account
          </Text>
        </View>
        <Formik
          initialValues={{
            otp: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            otp: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            push("/(tabs)/");
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
          }) => (
            <View style={styles.formContainer}>
              <PayyngOTPField digits={4} onChange={handleChange("otp")} />

              <View
                style={{
                  marginTop: vs(20),
                }}
              >
                <PayyngButton
                  onPress={handleSubmit}
                  buttonText={"PROCEED"}
                  buttonColor={Colors.greenColor}
                  buttonTextColor={Colors.white}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  push("/(auth)/login");
                }}
              >
                <Text style={styles.backToLogin}>
                  Remember Now?{" "}
                  <Text style={{ color: Colors.white }}>Back to Login</Text>
                </Text>
              </TouchableOpacity>
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
    fontWeight: "bold",
    color: Colors.white,
    marginTop: vs(20),
    fontFamily: "payyng-bold",
  },
  subText: {
    color: Colors.white,
    fontSize: ms(16),
    textAlign: "left",
    marginTop: vs(10),
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    marginTop: vs(20),
  },

  backToLogin: {
    color: Colors.white,
    textAlign: "center",
    marginTop: vs(20),
    fontFamily: "payyng-bold",
  },
});
