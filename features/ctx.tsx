import React, { useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";
// import authService from "./actions/authAction";
import { login, loginWithPin, register } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signInWithPin: (values: any) => void;
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

  const { replace } = useRouter();

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          setProcessing(true);
          //TODO: Add device token
          const payload = {
            email,
            password,
          };
          const res = await login(payload);
          setProcessing(false);

          console.log(res, "the login resss");

          if (res) {
            setSession(res.data?.user);

            if (
              res?.data?.status === "User Created, Pending Email Verification"
            ) {
              //   router.replace("/auth/enter-code");
              return;
            }
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("email", email);
            replace("/(tabs)");
          }
        },
        signOut: () => {
          setSession(null);
          replace("/(auth)/login");
        },

        createAccount: async (values: any) => {
          setProcessing(true);
          const res = await register(values);
          setProcessing(false);
          console.log(res, "THE SIGN UP RESS");
          if (res) {
            await AsyncStorage.setItem("token", res.data.accessToken);
            setSession(res?.data?.user);
            replace("/(auth)/verify-email");
          }
        },
        signInWithPin: async (payload: any) => {
          setProcessing(true);

          const res = await loginWithPin(payload);
          setProcessing(false);

          if (res) {
            setSession(res.data?.user);

            if (
              res?.data?.status === "User Created, Pending Email Verification"
            ) {
              //   router.replace("/auth/enter-code");
              return;
            }
            await AsyncStorage.setItem("token", res.data.token);
            await AsyncStorage.setItem("email", payload.email);
            replace("/(tabs)");
          }
        },

        session,
        isLoading: processing,
        isFirstTime,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
