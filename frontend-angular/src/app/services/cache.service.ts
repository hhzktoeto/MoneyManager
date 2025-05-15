import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, take, tap} from 'rxjs';
import {Transaction, TransactionDTO} from '../types/transaction';
import {Category} from '../types/category';
import {CategoryService} from './category.service';
import {TransactionService} from './transaction.service';

@Injectable({providedIn: "root"})
export class CacheService {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly transactionService: TransactionService
    ) {
        this.loadData()
    }

    private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
    private readonly categoriesSubject = new BehaviorSubject<Category[]>([]);

    public readonly transactions$ = this.transactionsSubject.asObservable();
    public readonly categories$ = this.categoriesSubject.asObservable();

    private readonly categoriesNames = new Set<string>();

    refreshTransactions(): void {
        this.transactionService.getAll().pipe(take(1)).subscribe({
            next: transactions => this.transactionsSubject.next(transactions)
        });
    }

    refreshCategories(): void {
        this.categoryService.getAll().pipe(take(1)).subscribe({
            next: categories => {
                this.categoriesSubject.next(categories);

                this.categoriesNames.clear();
                categories.map(category => category.name)
                    .forEach(name => this.categoriesNames.add(name));
            },
            error: err => console.error("Failed to load transactions", err)
        });
    }

    addTransaction(dto: TransactionDTO): Observable<Transaction> {
        return this.transactionService.create(dto).pipe(
            tap({
                next: newTransaction => {
                    const current = this.transactionsSubject.value;
                    this.transactionsSubject.next([...current, newTransaction]);
                    if (!this.categoriesNames.has(newTransaction.category)) {
                        this.refreshCategories();
                    }
                }
            })
        )
    }

    deleteTransaction(id: number): Observable<void> {
        return this.transactionService.delete(id).pipe(
            tap({
                next: () => {
                    const updated = this.transactionsSubject.value.filter(deletedTransaction => deletedTransaction.id !== id);
                    this.transactionsSubject.next(updated)
                }
            })
        )
    }

    private loadData(): void {
        this.transactionService.getAll().pipe(take(1)).subscribe({
            next: transactions => this.transactionsSubject.next(transactions)
        });
        this.categoryService.getAll().pipe(take(1)).subscribe({
            next: categories => {
                this.categoriesSubject.next(categories);
                if (this.categoriesNames.size > 0) {
                    this.categoriesNames.clear();
                }
                categories.map(category => category.name)
                    .forEach(name => this.categoriesNames.add(name));
            }
        });
    }
}
