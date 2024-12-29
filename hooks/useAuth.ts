import APICall from "@/features/ApiCall";

export function login(payload: any) {
  return APICall("auth/login", "POST", payload);
}

export function loginWithPin(payload: any) {
  return APICall("auth/login-pin", "POST", payload);
}

export async function register(payload: any) {
  console.log(payload, "THE PAYLOAD");
  return await APICall("auth/register", "POST", payload);
}

export async function verifyEmail(payload: any) {
  return await APICall("auth/verify-email", "POST", payload);
}

export async function resendEmail() {
  return await APICall("auth/resend-email-verify", "GET");
}

export async function setPin(payload: any) {
  return await APICall("auth/set-pin", "POST", payload);
}

export async function passwordForget(payload: any) {
  return await APICall("auth/forget-password", "POST", payload);
}

export async function resetPassword(payload: any) {
  return await APICall("auth/reset-password", "POST", payload);
}
