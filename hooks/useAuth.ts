import APICall from "@/features/ApiCall";

export function login(payload: any) {
  return APICall("/login", "POST", payload);
}

export function register(payload: any) {
  return APICall("/register", "POST", payload);
}
