import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import LoginWithPin from "@/components/auth/loginWithPin";
import LoginWithPassword from "@/components/auth/LoginWithPassword";
import { vs, ms } from "react-native-size-matters";
import { Stack } from "expo-router";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [usePin, setUsePin] = useState<any>(null);

  useEffect(() => {
    const getIsUserAlreadyLoggedIn = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("email");
        setUsePin(!!userEmail);
      } catch (error) {
        console.error("Error reading email from AsyncStorage:", error);
        setUsePin(false);
      }
    };
    getIsUserAlreadyLoggedIn();
  }, []);

  // Show a loader or empty screen while determining the state
  if (usePin === null) {
    return null; // Render nothing while loading; optionally add a loader component
  }

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
        {usePin ? (
          <LoginWithPin setUsePin={setUsePin} />
        ) : (
          <LoginWithPassword />
        )}
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
