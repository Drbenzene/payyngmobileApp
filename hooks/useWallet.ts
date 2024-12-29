import { QUERY_KEY } from "@/constants/Query";
import APICall from "@/features/ApiCall";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export async function getUserWallet() {
  const res = await APICall("wallet", "GET");
  console.log(res, "the wallet ");
  return res?.data;
}

export function useWallet() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.wallet],
    queryFn: () => getUserWallet(),
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.wallet]);
    },
  });

  return query;
}
