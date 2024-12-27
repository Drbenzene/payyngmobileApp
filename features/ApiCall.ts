import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "../utils/toast";

import axios, { AxiosError } from "axios";
const Base_URL = "https://optimum-hornet-awfully.ngrok-free.app/api/v1/";
// const Base_URL = "https://a86a-41-217-97-210.ngrok-free.app/api";

export default async function APICall(
  Url: string,
  Method: "GET" | "POST" | "PUT" | "DELETE",
  Data?: any,
  isFormData?: boolean,
  silent?: any
) {
  const authToken = await AsyncStorage.getItem("token");
  console.log(authToken, "THE TOKEN");

  if (authToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    axios.defaults.headers.common["Content-Type"] = isFormData
      ? "multipart/form-data"
      : "application/json";
    // axios.defaults.headers.common["cor"] = "no-cors";
  }

  axios.interceptors.response.use(
    async (response) => {
      if (response?.data?.authorization) {
        await AsyncStorage.setItem("token", response.data.authorization);
      }
      return response;
    },
    (error) => {
      return error.response;
    }
  );

  let baseUrl = Base_URL;
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  if (Url.startsWith("/")) {
    Url = Url.substring(1);
  }

  console.log(baseUrl + Url, "THE URL GOIGIGIGIGI");

  try {
    const response = await axios({
      method: Method,
      url: baseUrl + Url,
      data: Data,
      // timeout: timeoutOverride || process.env.REACT_APP_REQUEST_TIMEOUT,
    });

    console.log(response, "THE RESPONSE BACKK");
    console.log(response.data.code, "the codeee");

    console.log(response.data, "THE DATATAT");

    Toast.error("faileldldldlld");

    if (response?.data?.error) {
      console.log(response?.data?.message, "THE ERROR MESSAGE");
      const message =
        response?.data?.message ||
        "Something went wrong. please try again later ";
      Toast.error(message);
      return;
    }

    if (
      Number(response.data.code) >= Number(400) &&
      Number(response.data.code) < Number(500)
    ) {
      Toast.error(
        response?.data?.message ||
          " We are unable to process your request. Please try again"
      );
      Toast.error(
        response?.data?.message ||
          " We are unable to process your request. Please try again"
      );
      return;
    }

    const parsedRes = JSON.parse(JSON.stringify(response?.data));
    return (
      parsedRes || {
        status: "success",
      }
    );
  } catch (err) {
    const axiosError = err as AxiosError;
    Toast.error(" Server Error");
    Toast.error("Server Error");
  }
}

// {
//   "bookType": 2,
//   "title": "HBK Retrieval",
//   "authors": ["Gabriel", "Daniel"],
//   "description": "This book is generally for a test",
//   "sexuallyExplicit": false,
//   "minimumAge": 10,
//   "maximumAge": 28,
//   "bookCategory": 2,
//   "monetization": "paid",
//   "termsAndConditions": true,
//   "language": 1,
//   "currency": 2,
// "bookStatus": "draft",
// "price": 350,
// "discount": 10,
// "quantity": 25
// }
