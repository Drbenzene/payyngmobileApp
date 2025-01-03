import APICall from "@/features/ApiCall";

export function createCard(payload: any) {
  return APICall("card/create", "POST", payload);
}
