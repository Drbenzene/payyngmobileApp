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
import { verifyEmail, resendEmail } from "@/hooks/useAuth";
import { Toast } from "@/utils/toast";

const VerifyEmail = () => {
  const { push, replace } = useRouter();
  const handleEmailVerification = async (values: any) => {
    const payload = {
      code: values.otp,
    };
    const res = await verifyEmail(payload);
    if (res) {
      replace("/(auth)/set-transaction-pin");
    }
  };

  const resendEmailVerificationHandler = async (values: any) => {
    const res = await resendEmail();
    if (res) {
      Toast.success("Email Resent Successfully");
    }
  };
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
            Enter the 4 digits OTP code sent to verify your email and continue
            enjoying Payyng{" "}
          </Text>
        </View>
        <Formik
          initialValues={{
            otp: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await handleEmailVerification(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, isSubmitting, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <View
                style={{
                  marginVertical: vs(20),
                }}
              >
                <PayyngOTPField digits={4} onChange={handleChange("otp")} />
              </View>

              <View style={styles.buttonAndIndicatorContainer}>
                <PayyngButton
                  buttonText="PROCEED"
                  buttonColor={Colors.greenColor}
                  buttonTextColor={Colors.white}
                  onPress={handleSubmit}
                  disabled={isSubmitting || !isValid}
                  isProcessing={isSubmitting}
                />
                <TouchableOpacity
                  onPress={() => {
                    push("/(auth)/login");
                  }}
                >
                  <TouchableOpacity onPress={resendEmailVerificationHandler}>
                    <Text style={styles.resendOtp}>
                      Resend <Text style={{ color: Colors.white }}>OTP</Text>
                    </Text>
                  </TouchableOpacity>
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
