import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

import Airtime from "./airtime";

const Stack = createNativeStackNavigator();

export default function PageLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerTintColor: Colors[colorScheme ?? "light"].text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="airtime" component={Airtime} />
    </Stack.Navigator>
  );
}
