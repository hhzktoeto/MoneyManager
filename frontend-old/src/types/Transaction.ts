export interface Transaction {
    id: number;
    usedId: number;
    type: 'INCOME' | 'EXPENSE';
    category: string;
    date: string;
    amount: number;
    description: string;
}

export interface TransactionDTO {
    type: string;
    category: string;
    date: string;
    amount: number;
    description: string;
}

export const TransactionFieldName = {
    Category: "Категория",
    Type: "Тип",
    Date: "Дата",
    Amount: "Сумма",
    Description: "Описание"
}
export type TransactionFieldName = typeof TransactionFieldName[keyof typeof TransactionFieldName]