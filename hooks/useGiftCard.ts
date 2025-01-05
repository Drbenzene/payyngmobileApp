import { QUERY_KEY } from "@/constants/Query";
import APICall from "@/features/ApiCall";
import { stringifyFilter } from "@/utils/helperFunc";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export async function getAllGiftCardProducts(filters: any) {
  const params = stringifyFilter(filters);
  const res = await APICall(`giftcard/products${params}`, "GET");
  return res?.data;
}

export function getGiftCardProduct(id: string) {
  return APICall(`giftcard/products/${id}`, "GET");
}

export function purchaseGiftcard(data: any) {
  return APICall("giftcard/purchase", "POST", data);
}

export function useGiftCard(filters: any) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.giftCards],
    queryFn: () => getAllGiftCardProducts(filters),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.giftCards]);
    },
  });
  return query;
}
