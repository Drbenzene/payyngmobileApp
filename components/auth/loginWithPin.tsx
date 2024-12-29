import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Colors from "@/constants/Colors";
import * as LocalAuthentication from "expo-local-authentication";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ms } from "react-native-size-matters";
import { useSession } from "@/features/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginWithPinDTO {
  setUsePin: any;
}
const LoginWithPin = ({ setUsePin }: LoginWithPinDTO) => {
  const { replace, push } = useRouter();
  const { signInWithPin, isLoading } = useSession();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const handleKeyPress = (digit: any) => {
    if (pin.length < 4) {
      setPin((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    if (pin.length < 4) {
      return setError("Please enter a 4-digit PIN.");
    }
    const email = await AsyncStorage.getItem("email");
    const payload = {
      pin: Number(pin),
      email,
    };

    console.log(payload, "THE PAYLOAD GOIINN");

    signInWithPin(payload);
  };

  const handleFingerprintLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      setAuthError(
        "Fingerprint authentication is not supported on this device."
      );
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      setAuthError("No fingerprints are enrolled on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Fingerprint",
    });

    if (result.success) {
      console.log("Fingerprint authentication successful");
      // Handle successful fingerprint authentication
    } else {
      setAuthError("Fingerprint authentication failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Welcome Back</Text>
        <Text style={styles.subText}>
          Enter Your 4-digits PIN to access your account
        </Text>
      </View>

      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              styles.pinBox,
              pin[index] ? styles.filledPinBox : styles.emptyPinBox,
            ]}
          >
            <Text style={styles.pinText}>{pin[index] ? "*" : ""}</Text>
          </View>
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.keypadContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "fingerprint", 0, "delete"].map(
          (key, index) => (
            <TouchableOpacity
              key={index}
              style={styles.keyButton}
              onPress={() => {
                if (key === "delete") handleDelete();
                else if (key !== "") handleKeyPress(key);
              }}
              disabled={key === ""}
            >
              {key === "fingerprint" ? (
                <Pressable onPress={handleFingerprintLogin}>
                  <MaterialIcons
                    name="fingerprint"
                    size={24}
                    color={Colors.white}
                  />
                </Pressable>
              ) : (
                <Text style={styles.keyText}>
                  {key === "delete" ? "⌫" : key}
                </Text>
              )}
            </TouchableOpacity>
          )
        )}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, pin.length === 4 && styles.activeButton]}
        onPress={handleSubmit}
        disabled={pin.length !== 4}
      >
        <Text style={styles.submitText}>
          {isLoading ? "Please wait..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginWithPasswordContainer}>
        <Text
          onPress={() => {
            setUsePin(false);
          }}
        >
          <Text style={styles.loginWithPasswordText}>
            Proceed with Password
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginWithPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 32,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "payyng-bold",
  },
  subText: {
    fontSize: 16,
    color: Colors.placeholderTextColor,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "payyng-semibold",
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  pinBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filledPinBox: {
    backgroundColor: Colors.greenColor,
  },
  emptyPinBox: {
    backgroundColor: Colors.placeholderTextColor,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
  },
  keyButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 40,
    backgroundColor: Colors.newPrimaryColor,
  },
  keyText: {
    fontSize: 24,
    color: Colors.white,
  },
  submitButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.placeholderTextColor,
  },
  activeButton: {
    backgroundColor: Colors.greenColor,
  },
  submitText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "payyng-semibold",
  },
  fingerprintButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.newPrimaryColor,
  },
  fingerprintText: {
    fontSize: 18,
    color: Colors.white,
  },

  pinText: {
    color: Colors.white,
    fontSize: 30,
  },
  loginWithPasswordText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "payyng-semibold",
  },

  loginWithPasswordContainer: {
    marginTop: ms(40),
    alignItems: "center",
    justifyContent: "center",
  },
});
