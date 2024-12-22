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
import Colors from "@/constants/Colors";
import PayyngButton from "@/components/button/PayyngButton";
import { useRouter } from "expo-router";
const { width, height } = Dimensions.get("window");

const LoginWithPassword = () => {
  const { push } = useRouter();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Welcome Back</Text>
        <Text style={styles.subText}>
          Enter the email and password associated with your Payyng account
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
        //   password: Yup.string().required("Required"),
        // })}
        onSubmit={(values) => {
          push("/(tabs)");
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
            <PayyngCustomField
              type="PASSWORD"
              label="Password"
              id="password"
              labelColor={Colors.white}
              returnKeyType="done"
              value={values.password}
              keyboardType="default"
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              errorMessage={errors.password}
              placeholderTextColor={Colors.placeholderTextColor}
            />
            <TouchableOpacity
              onPress={() => {
                push("/(auth)/forget-password");
              }}
            >
              <Text style={styles.resetPassword}>
                Forgot password?{" "}
                <Text style={{ color: Colors.white }}>Reset</Text>
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonAndIndicatorContainer}>
              <PayyngButton
                buttonText="Login"
                buttonColor={Colors.greenColor}
                buttonTextColor={Colors.white}
                onPress={handleSubmit}
              />
            </View>

            <View style={{}}>
              <PayyngButton
                buttonText="Sign Up"
                buttonColor={Colors.newPrimaryColor}
                buttonTextColor={Colors.white}
                onPress={() => {
                  push("/(auth)/signup");
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginWithPassword;

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
    marginTop: 20,
    // paddingHorizontal: s(10),
  },

  resetPassword: {
    color: Colors.white,
    textAlign: "right",
    marginTop: vs(10),
    fontFamily: "payyng-regular",
  },
});
