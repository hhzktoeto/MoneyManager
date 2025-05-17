import {api} from "../api/Api";
import {ApiPath} from "../api/ApiPath";
import type {Transaction, TransactionDTO} from "../types/Transaction";

class TransactionService {
    async create(dto: TransactionDTO): Promise<Transaction> {
        return await api.add<TransactionDTO, Transaction>(ApiPath.Transactions, dto);
    }

    async getAll(): Promise<Array<Transaction>> {
        return await api.getAll<Transaction>(ApiPath.Transactions);
    }

    async delete(id: number): Promise<void> {
        return await api.delete(ApiPath.Transactions, id);
    }
}

export const transactionService = new TransactionService();