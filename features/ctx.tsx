import React, { useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";
// import authService from "./actions/authAction";
import { login, register } from "@/hooks/useAuth";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signInWithPin: () => void;
  createAccount: (values: any) => void;
  signOut: () => void;
  session?: any | null;
  isLoading: boolean;
  isFirstTime: string | null;
  token?: string | null;
}>({
  signIn: () => null,
  signOut: () => null,
  signInWithPin: () => null,
  createAccount: () => null,
  session: null,
  isLoading: false,
  isFirstTime: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [isFirstTime, setIsFirstTime] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchIsFirstTime = async () => {
      const storedIsFirstTime = await AsyncStorage.getItem("isFirstTime");
      setIsFirstTime(storedIsFirstTime);
    };

    fetchIsFirstTime();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          setProcessing(true);
          //TODO: Add device token
          const payload = {
            emailaddress: email,
            deviceToken: "deviceToken",
            password,
          };
          const res = await login(payload);
          setProcessing(false);

          if (res) {
            setSession(res.data);

            if (
              res?.data?.status === "User Created, Pending Email Verification"
            ) {
              //   router.replace("/auth/enter-code");
              return;
            }
            await AsyncStorage.setItem("name", res.data.name);
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("password", password);
            // router.replace("/home");
          }
        },
        signOut: () => {
          setSession(null);
          //   router.push("/auth/login");
        },

        createAccount: async (values: any) => {
          setProcessing(true);
          const res = await register(values);
          setProcessing(false);
          if (res) {
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("email", values.emailaddress);
            // router.push("/auth/enter-code");
          }
        },
        signInWithPin: () => {},

        session,
        isLoading: processing,
        isFirstTime,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
