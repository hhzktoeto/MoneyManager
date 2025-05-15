import {Injectable} from '@angular/core';
import {api} from '../api/api';
import {Observable} from 'rxjs';
import {Transaction, TransactionDTO} from '../types/transaction';
import {ApiPath} from '../constants/api-path';

@Injectable({providedIn: "root"})
export class TransactionService {
    constructor(private readonly api: api) {}

    getAll(): Observable<Array<Transaction>> {
        return this.api.getAll<Transaction>(ApiPath.TRANSACTIONS);
    }

    create(dto: TransactionDTO): Observable<Transaction> {
        return this.api.add<TransactionDTO, Transaction>(ApiPath.TRANSACTIONS, dto);
    }

    delete(id: number): Observable<void> {
        return this.api.delete(ApiPath.TRANSACTIONS, id);
    }
}
