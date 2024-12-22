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
import PayyngBar from "@/components/Layouts/PayyngBar";
const { width, height } = Dimensions.get("window");

const Signup = () => {
  const { push } = useRouter();

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
            phone: "",
            referralCode: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            push("/(auth)/verify-email");
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
                id="password"
                labelColor={Colors.white}
                returnKeyType="next"
                value={values.password}
                keyboardType="default"
                placeholder="phone"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                errorMessage={errors.phone}
                placeholderTextColor={Colors.placeholderTextColor}
                setValues={setValues}
                values={values}
              />
              <PayyngCustomField
                type="INPUT"
                label="Referral Code (Optional)"
                id="referralCode"
                returnKeyType="next"
                value={values.email}
                labelColor={Colors.white}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={handleChange("referralCode")}
                onBlur={handleBlur("referralCode")}
                errorMessage={errors.referralCode}
                placeholderTextColor={Colors.placeholderTextColor}
              />

              <View style={styles.buttonAndIndicatorContainer}>
                <PayyngButton
                  buttonText="PROCEED"
                  buttonColor={Colors.greenColor}
                  buttonTextColor={Colors.white}
                  onPress={handleSubmit}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  push("/(auth)/login");
                }}
              >
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
