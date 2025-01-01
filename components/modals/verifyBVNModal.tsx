import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalLayout from "./ModalLayout";
import PayyngBar from "../Layouts/PayyngBar";
import { ms } from "react-native-size-matters";
import Colors from "@/constants/Colors";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import * as Yup from "yup";
import { Formik } from "formik";
import PayyngCustomField from "../inputs/PayyngCustomField";

interface VerifyBVNDTO {
  open: boolean;
  setIsOpen: any;
}
const VerifyBVNModal = ({ open, setIsOpen }: VerifyBVNDTO) => {
  return (
    <ModalLayout modalVisible={open} closeModal={setIsOpen}>
      <View style={styles.container}>
        <PayyngBar
          title={"VERIFY BVN"}
          imageRight={undefined}
          heightLeft={0}
          widthLeft={0}
          heightRight={0}
          widthRight={0}
          onPressLeft={undefined}
          onPressRight={undefined}
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
            </View>
          )}
        </Formik>
      </View>
    </ModalLayout>
  );
};

export default VerifyBVNModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.black,
    // flexDirection: "column",
    // alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(50),
  },
});
