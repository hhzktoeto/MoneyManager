import {deleteTransactionMutation, filteredTransactionsQuery} from "../../hooks/transactions.ts";
import {useMemo, useState} from "react";
import {type Transaction, TransactionFieldName} from "../../types/Transaction";
import {SortingDirection, type SortingRules, transactionUtils} from "../../util/TransactionsUtils.ts";

export default function TransactionsHistory() {
    const [sorting, setSorting] = useState<SortingRules>({
        sortingBy: TransactionFieldName.Date,
        direction: "DESC"
    });

    const {data: transactions = []} = filteredTransactionsQuery();
    const {mutate: deleteTransaction} = deleteTransactionMutation();

    const processedTransactions: Array<Transaction> = useMemo(() => {
        return transactionUtils.sort(transactions, sorting);
    }, [transactions, sorting]);

    return (
        <>
            <div>
                <div className="flex justify-between items-center p-5 border-b">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold">История транзакций</h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition duration-300">
                            <span className="material-symbols-outlined text-sm">filter_alt</span>
                            Фильтр
                        </button>
                        <div className="relative">
                            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                                {/*https://fonts.google.com/icons*/}
                                <span className="material-symbols-outlined text-sm text-gray-500">search</span>
                                <input className="bg-transparent border-none outline-none text-sm w-36"
                                       placeholder="Поиск..."/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        {
                            Object.values(TransactionFieldName).map(fieldName => {
                                const isActive = sorting.sortingBy === fieldName;
                                const isDirectionAsc = sorting.direction === SortingDirection.ASC;

                                return (
                                    <th
                                        key={fieldName}
                                        onClick={() => {
                                            setSorting((prevState) => {
                                                if (prevState.sortingBy === fieldName) {
                                                    return {
                                                        sortingBy: fieldName,
                                                        direction: prevState.direction === "ASC" ? "DESC" : "ASC"
                                                    }
                                                }
                                                return {
                                                    sortingBy: fieldName,
                                                    direction: "DESC"
                                                };
                                            });
                                        }}
                                        className="px-6 py-1 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    >
                                        <span className="flex gap-1">
                                            {fieldName}
                                            {isActive && (
                                                <span className="material-symbols-outlined text-xs resize-triggers">
                                                    {isDirectionAsc ? "arrow_drop_up" : "arrow_drop_down"}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {
                        processedTransactions
                            .map(transaction => {
                                const transactionType = transaction.type;
                                return (
                                    <tr key={transaction.id}
                                        className="group hover:bg-gray-100 transition-colors duration-150">
                                        <td className="px-4 py-4 whitespace-nowrap cursor-pointer">
                                            <div className="w-24 flex items-center">
                                                <div
                                                    className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                            <span
                                                className="material-symbols-outlined text-primary-600">shopping_bag</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{transaction.category}</div>
                                                    <div className="text-sm text-gray-500">Online</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">{transactionType === "EXPENSE" ? "Расход" : "Доход"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(transaction.date).toLocaleDateString("ru-RU", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            }).replace(" г.", "")}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${transactionType === "EXPENSE" ? "text-red-500" : "text-green-500"} font-medium`}
                                            onDoubleClick={() => console.log("clicked on amount")}>{transaction.amount.toFixed(2)}₽
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap flex justify-between">
                                            <span
                                                onDoubleClick={() => console.log("clicked on description")}
                                                className="flex text-gray-500">
                                                {transaction.description}
                                            </span>
                                            <button onClick={() => deleteTransaction(transaction.id)}
                                                    className="opacity-0 text-red group-hover:opacity-90 transition-opacity duration-200 ml-2">
                                                <span className="material-symbols-outlined text-base">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}