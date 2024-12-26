import PayyngToast from "react-native-toast-message";

export class Toast {
  static success(message: string) {
    PayyngToast.show({
      type: "success",
      text1: message,
      position: "bottom",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }

  static error(message: string) {
    PayyngToast.show({
      type: "error",
      text1: message,
      position: "bottom",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }

  static info(message: string) {
    PayyngToast.show({
      type: "info",
      text1: message,
      position: "bottom",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }
}
