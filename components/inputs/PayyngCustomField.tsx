import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {} from "react-native-responsive-fontsize";
import ErrorMsg from "./errorMsg";
import colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-input";

interface PayyngCustomFieldProps {
  type:
    | "INPUT"
    | "SELECT"
    | "DATE"
    | "TIME"
    | "CHECKBOX"
    | "RADIO"
    | "PASSWORD"
    | "TEXTAREA"
    | "NUMBER"
    | "EMAIL"
    | "PHONE"
    | "SEARCH"
    | "URL"
    | "FILE";

  label: string;
  value: any;
  onChangeText: any;
  errorMessage?: any;
  onBlur?: any;
  placeholder: string;
  returnKeyType: any;
  keyboardType: any;
  placeholderTextColor: any;
  id?: any;
  onPress?: string;
  maxLength?: number;
  labelColor?: string;
  setValues?: any;
  values?: any;
}

const PayyngCustomField = ({
  type,
  label,
  id,
  returnKeyType,
  value,
  keyboardType,
  placeholder,
  onChangeText,
  onBlur,
  errorMessage,
  placeholderTextColor,
  onPress,
  maxLength,
  labelColor,
  setValues,
  values,
}: PayyngCustomFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      style={{
        marginTop: 0,
      }}
    >
      <Text
        style={{
          fontFamily: "payyng-regular",
          fontSize: Platform.OS === "ios" ? 17 : 16,
          marginTop: 15,
          color: labelColor || colors.black,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          borderRadius: 20,
          borderWidth: 1,
          padding: 10,
          marginTop: 5,
          borderColor: "#F2F2F2",
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#fff",
          marginBottom: 2,
          shadowOffset: { width: 2, height: 2 },
          shadowRadius: 20,
          elevation: 2,
          shadowColor: "#E3E3E3",
          height: 60,
        }}
      >
        {type === "INPUT" && (
          <TextInput
            id={id}
            placeholder={placeholder}
            value={value}
            style={styles.inputbox}
            onChangeText={onChangeText}
            placeholderTextColor={colors.placeHolderColor}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onBlur={onBlur}
            maxLength={maxLength}
          />
        )}

        {type === "PASSWORD" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              id={id}
              placeholder={placeholder}
              value={value}
              style={styles.inputbox}
              onChangeText={onChangeText}
              placeholderTextColor={colors.placeHolderColor}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              onBlur={onBlur}
              maxLength={maxLength}
              secureTextEntry={!showPassword}
            />
            {/* //DISPLAY EYE ICON */}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 10,
              }}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={30}
                color={colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
        )}

        {type === "PHONE" && (
          <View
            style={{
              paddingTop: 10,
            }}
          >
            <PhoneInput
              ref={(ref) => console.log("MEMEMEM")}
              onPressFlag={() => console.log("I DEYY")}
              initialCountry={"ng"}
              initialValue=""
              textProps={{
                placeholder: "Enter your phone number",
              }}
              onChangePhoneNumber={(value: any) => {
                console.log(value, "THE PHONE NUMBER");
                setValues({
                  ...values,
                  [id]: value,
                });
              }}
            />
          </View>
        )}
      </View>

      {errorMessage && <ErrorMsg message={`${errorMessage}`} />}
    </View>
  );
};

export default PayyngCustomField;

const styles = StyleSheet.create({
  inputbox: {
    backgroundColor: "transparent",
    fontFamily: "payyng-regular",
    fontSize: Platform.OS === "ios" ? 16 : 15,
    paddingVertical: 3,
    color: colors.black,
  },
});
