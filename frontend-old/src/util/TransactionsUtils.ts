import type {Transaction,} from "../types/Transaction.ts";
import {TransactionFieldName} from "../types/Transaction.ts"

export const ShowPeriod = {
    CurrentMonth: "Текущий месяц",
    LastMonth: "Прошлый месяц",
    CurrentYear: "Текущий год",
    All: "Все",
    Custom: "Выбрать период"
} as const;

export const SortingDirection = {
    ASC: "ASC",
    DESC: "DESC"
}

export interface SortingRules {
    sortingBy: TransactionFieldName
    direction: SortingDirection
}

export type ShowPeriod = typeof ShowPeriod[keyof typeof ShowPeriod];
export type SortingDirection = typeof SortingDirection[keyof typeof SortingDirection];

class TransactionUtils {

    filter(transactions: Array<Transaction>, showPeriod: ShowPeriod): Array<Transaction> {
        console.log("Filtering transactions :", showPeriod)
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        switch (showPeriod) {
            case ShowPeriod.All:
                return transactions;
            case ShowPeriod.CurrentMonth:
                return transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.date);

                    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
                });
            case ShowPeriod.LastMonth:
                return transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.date);
                    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

                    return transactionDate.getMonth() === lastMonth && transactionDate.getFullYear() === lastMonthYear;
                });
            case ShowPeriod.CurrentYear:
                return transactions.filter(transaction => new Date(transaction.date).getFullYear() === currentYear);
            case ShowPeriod.Custom:
                // TODO: Добавить выбор кастомного периода
                return transactions;
            default:
                return transactions;
        }
    }

    sort(transactions: Array<Transaction>, rules: SortingRules): Array<Transaction> {
        return [...transactions].sort((a, b) => {
            let compare = 0;

            switch (rules.sortingBy) {
                case TransactionFieldName.Category:
                    compare = a.category.localeCompare(b.category);
                    break;
                case TransactionFieldName.Type:
                    compare = a.type.localeCompare(b.type);
                    break;
                case TransactionFieldName.Date:
                    compare = new Date(a.date).getTime() - new Date(b.date).getTime();
                    break;
                case TransactionFieldName.Amount:
                    compare = a.amount - b.amount;
                    break;
                case TransactionFieldName.Description:
                    compare = a.description.localeCompare(b.description);
                    break;
            }
            compare = compare === 0 ? a.id - b.id : compare;

            return rules.direction === SortingDirection.ASC ? compare : -compare;
        });
    }
}

export const transactionUtils = new TransactionUtils();