import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { OnboardingData } from "@/constants/constantData";
import colors from "../../constants/Colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import PayyngButton from "@/components/button/PayyngButton";
import { ImageBackground } from "expo-image";

const { width, height } = Dimensions.get("window");

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  img: any;
}

const Onboarding = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { push } = router;

  const fade = useRef(new Animated.Value(0)).current;

  const animation = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation();
  }, []);

  const updateCurrentSlide = (e: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    if (currentIndex !== screenIndex) {
      setScreenIndex(currentIndex);
    }
  };

  const goToNextSlide = () => {
    if (screenIndex < OnboardingData.length - 1) {
      setScreenIndex(screenIndex + 1);
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: screenIndex + 1,
      });
    }
  };

  const indicatorColor = (index: number) => {
    return index === screenIndex ? colors.primaryColor : colors.bgColor;
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "onboarding",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <StatusBar style="dark" />
      <FlatList
        onMomentumScrollEnd={updateCurrentSlide}
        ref={flatListRef}
        data={OnboardingData}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View>
            <ImageBackground
              source={item.img}
              contentFit="cover"
              style={styles.image}
            >
              <View style={{ paddingHorizontal: moderateScale(15) }}>
                <Text
                  style={{
                    fontSize: 40,
                    lineHeight: 50,
                    fontFamily: "payyng-semibold",
                    color: colors.bgColor,
                    marginBottom: verticalScale(10),
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: scale(15),
                    lineHeight: 24,
                    fontFamily: "payyng-regular",
                    color: colors.bgColor,
                  }}
                >
                  {item.description}
                </Text>
                <View style={styles.buttonAndIndicatorContainer}>
                  <View style={styles.indicatorContainer}>
                    {OnboardingData.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.indicator,
                          {
                            backgroundColor: indicatorColor(index),
                          },
                        ]}
                      />
                    ))}
                  </View>
                  {screenIndex == OnboardingData.length - 1 ? (
                    <PayyngButton
                      buttonText="Get Started"
                      buttonColor={colors.primaryColor}
                      buttonTextColor={colors.bgColor}
                      onPress={() => {
                        router.push("/login");
                      }}
                    />
                  ) : (
                    <PayyngButton
                      buttonText={"Next"}
                      buttonColor={colors.primaryColor}
                      buttonTextColor={colors.bgColor}
                      onPress={goToNextSlide}
                    />
                  )}
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  indicator: {
    height: 4,
    width: 20,
    backgroundColor: colors.greenColor,
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  buttonAndIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 45,
    marginTop: 45,
    paddingHorizontal: moderateScale(10),
  },
  pageContainer: {
    flex: 1,
    width: width,
  },
  image: {
    flex: 1,
    flexDirection: "column",
    height: height,
    width: width,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "payyng-regular",
    marginBottom: verticalScale(5),
    color: colors.black,
    lineHeight: 35,
  },
  description: {
    fontSize: 15,
    fontFamily: "payyng-regular",
    color: colors.textColor,
  },
  startBtn: {
    backgroundColor: colors.primaryColor,
    padding: Platform.OS === "ios" ? 17 : 14,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  startText: {
    fontSize: 17,
    color: "#fff",
    fontFamily: "payyng-regular",
    textAlign: "center",
  },
  lendBtn: {
    backgroundColor: colors.bgColor,
    padding: Platform.OS === "ios" ? 17 : 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primaryColor,
  },
  lendText: {
    fontSize: 17,
    color: colors.primaryColor,
    fontFamily: "payyng-regular",
    textAlign: "center",
  },
});
