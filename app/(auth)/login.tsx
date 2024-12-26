import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import LoginWithPin from "@/components/auth/loginWithPin";
import LoginWithPassword from "@/components/auth/LoginWithPassword";
import { vs, s, ms } from "react-native-size-matters";
import { Stack, useRouter } from "expo-router";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  return (
    <AuthLayout>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          title: "login",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        {/* <LoginWithPin /> */}
        <LoginWithPassword />
      </SafeAreaView>
    </AuthLayout>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(10),
    paddingTop: vs(20),
  },
});
