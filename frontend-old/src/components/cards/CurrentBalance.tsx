import {transactionsQuery} from "../../hooks/transactions.ts";
import {useMemo} from "react";

export default function CurrentBalance() {
    const {data: transactions = []} = transactionsQuery();

    const totalAmount = useMemo(() => {
        return transactions.reduce((sum, transaction) => {
            return transaction.type === "INCOME"
                ? sum + transaction.amount
                : sum - transaction.amount;
        }, 0);
    }, [transactions]);

    return (
        <div
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Текущий баланс</h2>
                <span className="material-symbols-outlined text-primary-500">account_balance_wallet</span>
            </div>
            <p className="text-3xl font-bold mb-2">{totalAmount}</p>
            <div className="flex items-center text-green-500">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                <span className="text-sm">+2.4% from last month</span>
            </div>
        </div>
    );
}