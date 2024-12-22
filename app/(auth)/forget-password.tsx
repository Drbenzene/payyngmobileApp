import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { vs, s, ms } from "react-native-size-matters";
import PayyngCustomField from "@/components/inputs/PayyngCustomField";
import { Formik } from "formik";
import * as Yup from "yup";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import PayyngButton from "@/components/button/PayyngButton";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useRouter } from "expo-router";
const { width, height } = Dimensions.get("window");

const ForgetPassword = () => {
  const { push } = useRouter();
  return (
    <AuthLayout>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          title: "forgetPassword",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>Forget Password</Text>
          <Text style={styles.subText}>
            Enter your email address and we will help you regain access to your
            account
          </Text>
        </View>
        <Formik
          initialValues={{
            email: "",
          }}
          // validationSchema={Yup.object({
          //   email: Yup.string().email("Invalid email address"),
          // })}
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
          }) => (
            <View style={styles.formContainer}>
              <PayyngCustomField
                type="INPUT"
                label="Email"
                id="email"
                returnKeyType="next"
                value={values.email}
                labelColor={Colors.white}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                errorMessage={errors.email}
                placeholderTextColor={Colors.placeholderTextColor}
              />

              <View style={styles.buttonAndIndicatorContainer}>
                <PayyngButton
                  buttonText="PROCEED"
                  buttonColor={Colors.newPrimaryColor}
                  buttonTextColor={Colors.white}
                  onPress={() => {
                    push("/(auth)/validate-otp-forget-password");
                  }}
                />

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
            </View>
          )}
        </Formik>
      </View>
    </AuthLayout>
  );
};

export default ForgetPassword;

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
  },

  buttonAndIndicatorContainer: {
    width: "100%",
    marginBottom: 20,
    marginTop: 40,
  },

  resetPassword: {
    color: Colors.white,
    textAlign: "right",
    marginTop: vs(10),
    fontFamily: "payyng-regular",
  },

  backToLogin: {
    color: Colors.white,
    textAlign: "center",
    marginTop: vs(20),
    fontFamily: "payyng-bold",
  },
});
