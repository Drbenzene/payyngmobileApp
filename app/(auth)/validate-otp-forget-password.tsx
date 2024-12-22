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
const ValidateForgetPasswordOtp = () => {
  const { push } = useRouter();
  return (
    <AuthLayout>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          title: "validate-otp-forget-password",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <View style={styles.container}>
        <Formik
          initialValues={{
            otp: "",
            password: "",
            confirmPassword: "",
          }}
          // validationSchema={Yup.object({
          //   otp: Yup.string().required("Required"),
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
            <>
              <View>
                <Text style={styles.headerText}>Forget Password</Text>
                {values.otp?.length < 4 && (
                  <Text style={styles.subText}>
                    Enter the 6 digits OTP code sent to your email to reset your
                    password
                  </Text>
                )}

                {values.otp?.length === 4 && (
                  <Text style={styles.subText}>
                    Enter your new password and confirm it to reset your
                    password
                  </Text>
                )}
              </View>
              <View style={styles.formContainer}>
                {values.otp?.length < 4 && (
                  <PayyngOTPField digits={4} onChange={handleChange("otp")} />
                )}

                {values.otp?.length === 4 && (
                  <>
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

                    <PayyngCustomField
                      type="PASSWORD"
                      label="Confirm Password"
                      id="confirmPassword"
                      labelColor={Colors.white}
                      returnKeyType="done"
                      value={values.confirmPassword}
                      keyboardType="default"
                      placeholder="Confirm password"
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      errorMessage={errors.confirmPassword}
                      placeholderTextColor={Colors.placeholderTextColor}
                    />
                  </>
                )}

                <>
                  {values?.otp.length === 4 && (
                    <>
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
                          <Text style={{ color: Colors.white }}>
                            Back to Login
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              </View>
            </>
          )}
        </Formik>
      </View>
    </AuthLayout>
  );
};

export default ValidateForgetPasswordOtp;

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
