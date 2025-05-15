import {TransactionType} from '../constants/transaction-type';

export interface TransactionDTO {
    type: TransactionType;
    category: string;
    date: string;
    amount: number;
    description: string;
}

export interface Transaction extends TransactionDTO {
    id: number;
    usedId: number;
    type: TransactionType;
    category: string;
    date: string;
    amount: number;
    description: string;
}
