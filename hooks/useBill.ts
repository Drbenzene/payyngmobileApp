import { QUERY_KEY } from "@/constants/Query";
import APICall from "@/features/ApiCall";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const getVendingProducts = async (code: string) => {
  const res = await APICall(
    `bill/vending/products?categoryCode=${code}`,
    "GET"
  );
  return res?.data?.items;
};

export const validateBiller = async (payload: any) => {
  const res = await APICall(`vending/validate-biller`, "POST", payload);
  return res?.data;
};

export const payVendingBill = async (payload: any) => {
  const res = await APICall(`bill/vending/payment`, "POST", payload);
  return res?.data;
};

export function useVendingCategoryProduct(code: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QUERY_KEY.vendingProducts],
    queryFn: () => getVendingProducts(code),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.vendingProducts]);
    },
  });
  return query;
}
