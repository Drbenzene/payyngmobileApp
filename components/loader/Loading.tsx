import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { useLoading } from "../Layouts/LoadingContext";

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <Modal transparent visible={isLoading} animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default LoadingOverlay;
