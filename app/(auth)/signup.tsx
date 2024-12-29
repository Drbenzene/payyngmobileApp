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
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import PayyngButton from "@/components/button/PayyngButton";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { register } from "@/hooks/useAuth";
import { Toast } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSession } from "@/features/ctx";

const { width, height } = Dimensions.get("window");

const Signup = () => {
  const { push, replace } = useRouter();

  const { isLoading, createAccount } = useSession();

  const signupHandler = async (values: any) => {
    const res = createAccount(values);

    console.log(res, "THE SIGNUP RESS");

    // if (res) {
    //   await AsyncStorage.setItem("token", res?.data?.accessToken);
    //   replace("/(auth)/verify-email");
    // }
  };

  return (
    <AuthLayout>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          title: "signup",
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>Let's Get Started</Text>
          <Text style={styles.subText}>
            Get setup and start enjoying Payyng in 3 minutes
          </Text>
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
            phoneNumber: "",
            referrerCode: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phoneNumber: Yup.string().required("Required"),
            password: Yup.string()
              .required("Required")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol"
              ),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await signupHandler(values);
            setSubmitting(false);
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
            isSubmitting,
            isValid,
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
              <PayyngCustomField
                type="PASSWORD"
                label="Password"
                id="password"
                labelColor={Colors.white}
                returnKeyType="next"
                value={values.password}
                keyboardType="default"
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                errorMessage={errors.password}
                placeholderTextColor={Colors.placeholderTextColor}
              />

              <PayyngCustomField
                type="PHONE"
                label="Phone Number"
                id="phoneNumber"
                labelColor={Colors.white}
                returnKeyType="next"
                value={values.phoneNumber}
                keyboardType="default"
                placeholder="phoneNumber"
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                errorMessage={errors.phoneNumber}
                placeholderTextColor={Colors.placeholderTextColor}
                setValues={setValues}
                values={values}
              />
              <PayyngCustomField
                type="INPUT"
                label="Referral Code (Optional)"
                id="referrerCode"
                returnKeyType="next"
                value={values.referrerCode}
                labelColor={Colors.white}
                keyboardType="default"
                placeholder="Enter Referral Code"
                onChangeText={handleChange("referrerCode")}
                onBlur={handleBlur("referrerCode")}
                errorMessage={errors.referrerCode}
                placeholderTextColor={Colors.placeholderTextColor}
              />

              <View style={styles.buttonAndIndicatorContainer}>
                <PayyngButton
                  buttonText="PROCEED"
                  buttonColor={Colors.greenColor}
                  buttonTextColor={Colors.white}
                  onPress={handleSubmit}
                  disabled={isSubmitting || !isValid || isLoading}
                  isProcessing={isSubmitting || isLoading}
                />
              </View>

              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text style={styles.backToLogin}>
                  Already have an account?{" "}
                  <Text style={{ color: Colors.white }}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </AuthLayout>
  );
};

export default Signup;

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
    marginTop: 40,
    // paddingHorizontal: s(10),
  },

  backToLogin: {
    color: Colors.white,
    textAlign: "center",
    marginTop: vs(20),
    fontFamily: "payyng-bold",
  },
});
