import APICall from "@/features/ApiCall";

export function login(payload: any) {
  return APICall("auth/login", "POST", payload);
}

export function register(payload: any) {
  console.log(payload, "THE PAYLOAD");
  return APICall("auth/register", "POST", payload);
}
