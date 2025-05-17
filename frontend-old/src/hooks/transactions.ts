import {useMutation, useQuery} from "@tanstack/react-query";
import {categoryService} from "../services/CategoryService";
import {transactionService} from "../services/TransactionService";
import {queryClient} from "../queryClient";
import type {Transaction} from "../types/Transaction";
import {QueryKey} from "./QueryKey";
import {ShowPeriod, transactionUtils} from "../util/TransactionsUtils.ts";
import {showPeriodQuery} from "./showPeriod.ts";

export function categoriesQuery() {
    return useQuery({
        queryKey: QueryKey.Categories,
        queryFn: categoryService.getAllCategories,
    });
}

export function transactionsQuery() {
    return useQuery({
        queryKey: QueryKey.Transactions,
        queryFn: transactionService.getAll,
        staleTime: Infinity
    })
}

export function createTransactionMutation() {
    return useMutation({
        mutationFn: transactionService.create,
        onSuccess: async (newTransaction: Transaction): Promise<void> => {
            queryClient.setQueryData<Array<Transaction>>(
                QueryKey.Transactions,
                (old = []) => [newTransaction, ...old]
            );
            await queryClient.invalidateQueries({queryKey: QueryKey.Categories});
        }
    });
}

export function deleteTransactionMutation() {
    return useMutation({
        mutationFn: transactionService.delete,
        onSuccess: async (_, id): Promise<void> => {
            queryClient.setQueryData<Array<Transaction>>(
                QueryKey.Transactions,
                (old = []) => old.filter(t => t.id !== id)
            )
        }
    });
}

export function filteredTransactionsQuery() {
    const {data: transactions = []} = transactionsQuery();
    const {data: showPeriod = ShowPeriod.Custom} = showPeriodQuery();

    return useQuery<Array<Transaction>>({
        queryKey: ["f-transactions", showPeriod],
        queryFn: () => transactionUtils.filter(transactions, showPeriod),
        enabled: !!transactions.length,
        staleTime: Infinity
    });
}
