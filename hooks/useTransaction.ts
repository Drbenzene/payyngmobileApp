import { QUERY_KEY } from "@/constants/Query";
import APICall from "@/features/ApiCall";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export async function getUserTransactions() {
  const res = await APICall("transaction/me", "GET");
  console.log(res, "the transactionssss outta ");
  return res?.data;
}

export function useTransactions() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.transactions],
    queryFn: () => getUserTransactions(),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.transactions]);
    },
  });
  return query;
}
