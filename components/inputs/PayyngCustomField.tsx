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
import CurrencyInput from "react-native-currency-input";
import DropDownPicker from "react-native-dropdown-picker";
import ModalLayout from "../modals/ModalLayout";
import Colors from "../../constants/Colors";
import { ms } from "react-native-size-matters";
import RadioGroup from "react-native-radio-buttons-group";

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
    | "CURRENCY"
    | "FILE";

  label: string;
  value: any;
  onChangeText: any;
  errorMessage?: any;
  onBlur?: any;
  placeholder: string;
  returnKeyType: any;
  keyboardType: any;
  placeholderTextColor?: any;
  id?: any;
  onPress?: string;
  maxLength?: number;
  labelColor?: string;
  setValues?: any;
  values?: any;
  currency?: string;
  itemsData?: any[];
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
  maxLength,
  labelColor,
  setValues,
  values,
  currency,
}: PayyngCustomFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [amountValue, setAmountValue] = useState<any>();

  return (
    <View
      style={{
        marginTop: 0,
      }}
    >
      <Text
        style={{
          fontFamily: "payyng-semibold",
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
              placeholderTextColor={colors.black || placeholderTextColor}
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

        {type === "CURRENCY" && (
          <CurrencyInput
            value={value}
            placeholder={placeholder}
            onChangeValue={(val) => {
              console.log(val, "YEYEYEYEY");
              console.log(id, "THE ID");
              setValues({
                ...values,
                [id]: val,
              });
            }}
            prefix={`${currency} `}
            delimiter=","
            separator="."
            precision={2}
            minValue={0}
            style={styles.inputbox}
            showPositiveSign={false}
            onChangeText={(formattedValue) => {
              console.log(formattedValue, "the formatted valye"); // R$ +2.310,46
            }}
          />
        )}
        {/* 
        {type === "SELECT" && (
          <DropDownPicker
            open={open}
            value={value}
            items={[
              {
                label: "UK",
                value: "uk",
              },
              {
                label: "France",
                value: "france",
              },
              {
                label: "Germany",
                value: "germany",
              },
              {
                label: "UK",
                value: "uk",
              },
              {
                label: "France",
                value: "france",
              },
              {
                label: "Germany",
                value: "germany",
              },
              {
                label: "UK",
                value: "uk",
              },
              {
                label: "France",
                value: "france",
              },
              {
                label: "Germany",
                value: "germany",
              },
              {
                label: "UK",
                value: "uk",
              },
              {
                label: "France",
                value: "france",
              },
              {
                label: "Germany",
                value: "germany",
              },
              {
                label: "UK",
                value: "uk",
              },
              {
                label: "France",
                value: "france",
              },
              {
                label: "Germany",
                value: "germany",
              },
            ]}
            setOpen={setOpen}
            setValue={onChangeText}
            containerStyle={{
              marginBottom: 10,
              borderRadius: 0,
              width: "100%",
              height: "100%",
            }}
            style={{
              borderWidth: 0, // Remove borders
              backgroundColor: "#000", // Ensure background is transparent
              // shadowColor: "transparent", // Remove shadows
            }}
            dropDownContainerStyle={{
              borderWidth: 0, // Remove borders from dropdown list
              backgroundColor: "black", // Transparent dropdown list
            }}
            searchable={true}
            placeholder={placeholder}
            textStyle={{
              fontFamily: "payyng-semibold", // Set font family for text
              fontSize: 16, // Optional: Adjust font size
            }}
            searchPlaceholder="Search..."
            scrollViewProps={{
              showsVerticalScrollIndicator: true, // Hide vertical scrollbar
              showsHorizontalScrollIndicator: true, // Hide horizontal scrollbar
            }}
          />
        )} */}

        {type === "SELECT" && (
          <TouchableOpacity
            id={id}
            onPress={() => {
              setOpenModal(true);
            }}
            style={styles.inputbox}
          >
            <Text>{placeholder}</Text>
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && <ErrorMsg message={`${errorMessage}`} />}

      {openModal && <SelectModalComponent placeholder={placeholder} />}
    </View>
  );
};

export default PayyngCustomField;

const styles = StyleSheet.create({
  inputbox: {
    backgroundColor: "transparent",
    fontFamily: "payyng-semibold",
    fontSize: Platform.OS === "ios" ? 16 : 15,
    paddingVertical: 3,
    color: colors.black,
  },
});
interface SelectModalProps {
  placeholder: string;
}
const SelectModalComponent = ({ placeholder }: SelectModalProps) => {
  const data = [
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Option 1",
      value: "option1",
    },
    {
      id: "2",
      label: "Option 2fvc kvn dfkcv kfd fk",
      value: "option2",
    },
  ];

  const [selectedId, setSelectedId] = useState();

  return (
    <ModalLayout height={50} modalVisible={true} closeModal={undefined}>
      <View>
        <Text
          style={{
            color: Colors.white,
            textAlign: "center",
            fontFamily: "payyng-semibold",
            fontSize: ms(20),
          }}
        >
          {placeholder}
        </Text>
      </View>

      <View
        style={{
          marginTop: ms(20),
        }}
      >
        <RadioGroup
          radioButtons={data}
          onPress={(value) => {
            console.log(value, "THE VALUE OOOOOO");
          }}
          selectedId={selectedId}
          labelStyle={{
            color: Colors.white,
            fontFamily: "payyng-semibold",
          }}
          containerStyle={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        />
      </View>
    </ModalLayout>
  );
};
