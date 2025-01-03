import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalLayout from "./ModalLayout";
import PayyngBar from "../Layouts/PayyngBar";
import Colors from "@/constants/Colors";
import * as Yup from "yup";
import { Formik } from "formik";
import PayyngCustomField from "../inputs/PayyngCustomField";
import PayyngButton from "../button/PayyngButton";
import { ms } from "react-native-size-matters";

interface VerifyBVNDTO {
  open: boolean;
  setIsOpen: any;
}
const VerifyBVNModal = ({ open, setIsOpen }: VerifyBVNDTO) => {
  const validateBVNHandler = async (values: any) => {
    console.log(values);
  };

  return (
    <ModalLayout modalVisible={open} closeModal={setIsOpen} height={70}>
      <View>
        <PayyngBar
          title={"VERIFY BVN"}
          imageRight={undefined}
          heightLeft={0}
          widthLeft={0}
          heightRight={0}
          widthRight={0}
          onPressLeft={undefined}
          onPressRight={undefined}
          titleColor={Colors.white}
        />
        <Formik
          initialValues={{
            bvn: "12156153487",
            bankCode: "058",
            accountNumber: "0157568238",
          }}
          validationSchema={Yup.object({
            bvn: Yup.string().required("BVN is required"),
            bankCode: Yup.string().required("Bank code is required"),
            accountNumber: Yup.string().required("Account number is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await validateBVNHandler(values);
            setSubmitting(false);
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
            <View>
              <PayyngCustomField
                type="INPUT"
                label="BVN (Bank Verification Number)"
                id="bvn"
                returnKeyType="next"
                value={values.bvn}
                labelColor={Colors.white}
                keyboardType="phone-pad"
                placeholder="22********"
                onChangeText={handleChange("bvn")}
                onBlur={handleBlur("bvn")}
                errorMessage={errors.bvn}
                placeholderTextColor={Colors.placeholderTextColor}
              />
              <PayyngCustomField
                type="INPUT"
                label="Account Number"
                id="accountNumber"
                returnKeyType="next"
                value={values.accountNumber}
                labelColor={Colors.white}
                keyboardType="phone-pad"
                placeholder="01********"
                onChangeText={handleChange("accountNumber")}
                onBlur={handleBlur("accountNumber")}
                errorMessage={errors.accountNumber}
                placeholderTextColor={Colors.placeholderTextColor}
              />
              <PayyngCustomField
                type="SELECT"
                label="Select Bank"
                id="bankCode"
                returnKeyType="next"
                value={values.bankCode}
                labelColor={Colors.white}
                placeholder="Select Bank"
                onChangeText={handleChange("bankCode")}
                onBlur={handleBlur("bankCode")}
                errorMessage={errors.bankCode}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType={"default"}
              />
              <View style={styles.actionBtnContainer}>
                <PayyngButton
                  buttonText="Proceed"
                  buttonColor={Colors.primaryColor}
                  buttonTextColor={Colors.bgColor}
                  onPress={() => {
                    // router.push("/login");
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ModalLayout>
  );
};

export default VerifyBVNModal;

const styles = StyleSheet.create({
  actionBtnContainer: {
    marginTop: ms(20),
  },
});
