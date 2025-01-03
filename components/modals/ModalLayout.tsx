import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Colors from "@/constants/Colors";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { ms } from "react-native-size-matters";

interface ModalLayoutDto {
  modalVisible: boolean;
  closeModal: any;
  children: any;
  height?: number;
}

const ModalLayout = ({
  modalVisible,
  closeModal,
  children,
  height,
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
        <View
          style={{
            ...styles.container,
            height: responsiveScreenHeight(height || 50),
          }}
        >
          {children}
        </View>
      </Modal>
    </View>
  );
};

export default ModalLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: responsiveScreenWidth(100),
    padding: ms(20),
  },
});
