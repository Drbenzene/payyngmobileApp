import APICall from "@/features/ApiCall";

export const getVendingProducts = async (code: string) => {
  const res = await APICall(`vending/products?categoryCode=${code}`, "GET");
  return res?.data;
};

export const validateBiller = async (payload: any) => {
  const res = await APICall(`vending/validate-biller`, "POST", payload);
  return res?.data;
};
