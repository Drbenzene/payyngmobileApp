import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface AuthLayoutProps {
  children: React.ReactNode;
}
function AuthLayout({ children }: AuthLayoutProps) {
  const slideIn = useSharedValue(0);
  const fadeIn = useSharedValue(0);
  useEffect(() => {
    slideIn.value = withTiming(1, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    fadeIn.value = withTiming(1, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, []);
  return (
    <LinearGradient
      colors={["#ADD8E6", "#141d30", "#000", "#141d30", "#000", "#000"]} // Light blue to black
      style={styles.gradientBackground}
    >
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        {children}
      </Animated.ScrollView>
    </LinearGradient>
  );
}

export default AuthLayout;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: width,
    height: height,
  },
});
