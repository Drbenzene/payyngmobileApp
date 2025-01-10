import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import PayyngBar from "@/components/Layouts/PayyngBar";
import AppLayout from "@/components/Layouts/AppLayout";
import { StatusBar } from "expo-status-bar";
import { ms, vs } from "react-native-size-matters";
import PayyngCustomField from "@/components/inputs/PayyngCustomField";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "@/components/button/PayyngButton";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { payVendingBill, useVendingCategoryProduct } from "@/hooks/useBill";
import ErrorMsg from "@/components/inputs/errorMsg";
import SuccessTransaction from "@/components/modals/successTransaction";
import VerifyTransactionPin from "@/components/modals/verityTransactionPin";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "expo-router";
import { Toast } from "@/utils/toast";
import PayyngLoader from "@/components/loader/Loading";

const CableTV = () => {
  const { push } = useRouter();
  const { data: walletInfo, refetch } = useWallet();
  const { code } = useLocalSearchParams();
  console.log(code, "THE CODE HEHEHE");
  const { data, isLoading } = useVendingCategoryProduct(code as string);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openPin, setOpenPin] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const payBillHandler = async () => {
    console.log(payload, "PAYLOAD");
    if (walletInfo?.NGN?.balance < Number(payload.amount)) {
      return Toast.info("Insufficient Balance. Please fund your wallet");
    }

    setLoading(true);
    const res = await payVendingBill({
      ...payload,
      amount: Number(payload.amount),
    });
    setLoading(false);
    console.log(res, "RES");
    if (res) {
      setOpenSuccess(true);
    }
  };

  return (
    <AppLayout>
      <StatusBar style="dark" />
      <View>
        <PayyngBar
          title={"CABLE TV"}
          heightLeft={0}
          widthLeft={0}
          heightRight={0}
          widthRight={0}
          onPressLeft={() => {
            push("/(tabs)");
          }}
          onPressRight={undefined}
          titleColor={Colors.white}
        />
      </View>

      <SafeAreaView style={styles.container}>
        <View>
          <Formik
            initialValues={{
              amount: "",
              productCode: "",
              accountNumber: "",
              billType: "AIRTIME",
              pin: "",
            }}
            validationSchema={Yup.object({
              amount: Yup.string().required("Amount is Required"),
              productCode: Yup.string().required("Network is Required"),
              accountNumber: Yup.string().required("Phone Number is Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              setPayload(values);
              setOpenPin(true);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setValues,
              isSubmitting,
              isValid,
            }) => (
              <View style={styles.formContainer}>
                <Text style={styles.networkSelectorText}>
                  Select Network Provider
                </Text>
                <View
                  style={{
                    marginTop: vs(20),
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {isLoading && <PayyngLoader />}
                  {data?.length &&
                    data
                      ?.filter((item: any) => item?.countryCode === "NGA")
                      .map?.((item: any) => (
                        <TouchableOpacity
                          key={item?.id}
                          onPress={() => {
                            setValues({
                              ...values,
                              productCode: item?.code,
                            });
                          }}
                        >
                          <View
                            style={{
                              backgroundColor:
                                item?.code === values.productCode
                                  ? Colors.black
                                  : Colors.greenColor,
                              padding: ms(10),
                              borderRadius: ms(5),
                              margin: ms(5),
                              width: ms(100),
                              height: ms(80),
                              borderColor:
                                item?.code === values.productCode
                                  ? Colors.white
                                  : Colors.black,
                            }}
                            key={item?.id}
                          >
                            <Text
                              style={{
                                color: Colors.white,
                                fontFamily: "payyng-semibold",
                              }}
                            >
                              {item?.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                </View>
                {errors.productCode && (
                  <ErrorMsg message={`${errors.productCode}`} />
                )}

                <PayyngCustomField
                  type="SELECT"
                  label="Choose Provider"
                  labelColor={Colors.white}
                  id="accountNumber"
                  returnKeyType="next"
                  value={values.accountNumber}
                  // itemsData={}
                  keyboardType="phone-pad"
                  onChangeText={handleChange("accountNumber")}
                  onBlur={handleBlur("accountNumber")}
                  errorMessage={errors.accountNumber}
                  placeholder={"Choose Provider"}
                  placeholderTextColor={undefined}
                  maxLength={11}
                />

                <PayyngCustomField
                  type="INPUT"
                  label="Phone Number"
                  labelColor={Colors.white}
                  id="accountNumber"
                  returnKeyType="next"
                  value={values.accountNumber}
                  keyboardType="phone-pad"
                  onChangeText={handleChange("accountNumber")}
                  onBlur={handleBlur("accountNumber")}
                  errorMessage={errors.accountNumber}
                  placeholder={"Enter Phone Number"}
                  placeholderTextColor={undefined}
                  maxLength={11}
                />

                <PayyngCustomField
                  type="CURRENCY"
                  label="Amount"
                  currency="NGN "
                  labelColor={Colors.white}
                  id="amount"
                  returnKeyType="next"
                  value={values.amount}
                  keyboardType="phone-pad"
                  onChangeText={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  errorMessage={errors.amount}
                  placeholder={"Enter Amount"}
                  setValues={setValues}
                  values={values}
                />

                <View style={styles.buttonContainer}>
                  <PayyngButton
                    buttonText="PROCEED"
                    onPress={handleSubmit}
                    isProcessing={isSubmitting}
                    disabled={isSubmitting || !isValid}
                    buttonColor={Colors.greenColor}
                    buttonTextColor={Colors.white}
                  />
                </View>
              </View>
            )}
          </Formik>

          {openSuccess && (
            <SuccessTransaction
              open={openSuccess}
              setIsOpen={() => {
                setOpenSuccess(false);
              }}
            />
          )}

          {openPin && (
            <VerifyTransactionPin
              open={openPin}
              setIsOpen={() => {
                setOpenPin(false);
              }}
              onPressHandler={payBillHandler}
              values={payload}
              setValues={setPayload}
              processing={loading}
            />
          )}
        </View>
      </SafeAreaView>
    </AppLayout>
  );
};

export default CableTV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    paddingHorizontal: ms(10),
    marginTop: vs(20),
  },
  buttonContainer: {
    marginTop: vs(20),
  },

  networkSelectorText: {
    color: Colors.white,
    fontFamily: "payyng-semibold",
    fontSize: ms(20),
  },
});
