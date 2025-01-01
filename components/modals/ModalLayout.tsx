import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Colors from "@/constants/Colors";

interface ModalLayoutDto {
  modalVisible: boolean;
  closeModal: any;
  children: any;
}
const ModalLayout = ({
  modalVisible,
  closeModal,
  children,
}: ModalLayoutDto) => {
  return (
    <View>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.3}
        backdropColor={Colors.greenColor}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
          position: "absolute",
          margin: 0,
        }}
      >
        {children}
      </Modal>
    </View>
  );
};

export default ModalLayout;

const styles = StyleSheet.create({});
