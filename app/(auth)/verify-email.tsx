import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { vs, s, ms } from "react-native-size-matters";
import { Formik } from "formik";
import * as Yup from "yup";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import PayyngButton from "@/components/button/PayyngButton";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useRouter } from "expo-router";
import PayyngOTPField from "@/components/inputs/PayyngOTPField";
const { width, height } = Dimensions.get("window");

const VerifyEmail = () => {
  const { push } = useRouter();
  return (
    <AuthLayout>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          title: "verify-email",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>One More Step ✈️</Text>
          <Text style={styles.subText}>
            Enter the 6 digits OTP code sent to verify your email and continue
            enjoying Payyng{" "}
          </Text>
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          // validationSchema={Yup.object({
          //   email: Yup.string()
          //     .email("Invalid email address")
          //     .required("Required"),
          // })}
          onSubmit={(values) => {
            push("/(auth)/set-transaction-pin");
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
              <View
                style={{
                  marginVertical: vs(20),
                }}
              >
                <PayyngOTPField digits={6} onChange={handleChange("otp")} />
              </View>

              <View style={styles.buttonAndIndicatorContainer}>
                <PayyngButton
                  buttonText="PROCEED"
                  buttonColor={Colors.greenColor}
                  buttonTextColor={Colors.white}
                  onPress={handleSubmit}
                />
                <TouchableOpacity
                  onPress={() => {
                    push("/(auth)/login");
                  }}
                >
                  <Text style={styles.resendOtp}>
                    Resend <Text style={{ color: Colors.white }}>OTP</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </AuthLayout>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    paddingHorizontal: s(16),
    paddingTop: vs(20),
  },
  headerText: {
    fontSize: ms(30),
    color: Colors.white,
    marginTop: vs(20),
    fontFamily: "payyng-bold",
  },

  subText: {
    color: Colors.white,
    fontSize: ms(16),
    textAlign: "left",
    marginTop: vs(10),
    fontFamily: "payyng-semibold",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },

  buttonAndIndicatorContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
    // paddingHorizontal: s(10),
  },

  resendOtp: {
    color: Colors.white,
    textAlign: "center",
    marginTop: vs(20),
    fontFamily: "payyng-bold",
  },
});
