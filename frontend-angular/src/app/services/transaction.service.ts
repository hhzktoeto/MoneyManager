import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Transaction, TransactionDTO} from '../types/transaction';
import {ApiPath} from '../constants/api-path';

@Injectable({providedIn: "root"})
export class TransactionService {
    private readonly apiService = inject(ApiService);

    async getAll(): Promise<Transaction[]> {
        return this.apiService.getAll<Transaction>(ApiPath.TRANSACTIONS);
    }

    async create(dto: TransactionDTO): Promise<Transaction> {
        return this.apiService.add<TransactionDTO, Transaction>(ApiPath.TRANSACTIONS, dto);
    }

    async delete(id: number): Promise<void> {
        return this.apiService.delete(ApiPath.TRANSACTIONS, id);
    }
}
