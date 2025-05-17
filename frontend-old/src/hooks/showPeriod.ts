import {useMutation, useQuery} from "@tanstack/react-query";
import {QueryKey} from "./QueryKey.ts";
import {ShowPeriod} from "../util/TransactionsUtils.ts";
import {queryClient} from "../queryClient.ts";

export function showPeriodQuery() {
    return useQuery<ShowPeriod>({
        queryKey: QueryKey.ShowPeriod,
        queryFn: () => ShowPeriod.CurrentMonth,
        staleTime: Infinity
    })
}

export function showPeriodMutation() {
    return useMutation({
        mutationFn: async (newShowPeriod: ShowPeriod) => {
            queryClient.setQueryData<ShowPeriod>(
                QueryKey.ShowPeriod,
                newShowPeriod
            );
        }
    })
}