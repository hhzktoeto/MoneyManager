import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {TransactionDTO} from '../types/transaction';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TransactionType} from '../constants/transaction-type';
import {Category} from '../types/category';
import {CacheService} from "../services/cache.service";
import {Observable} from "rxjs";

@Component({
    standalone: true,
    selector: 'app-add-transaction',
    imports: [CommonModule, FormsModule],
    templateUrl: './add-transaction.component.html',
    styleUrl: './add-transaction.component.scss'
})

export class AddTransactionComponent implements AfterViewInit {
    constructor(private readonly cacheService: CacheService) {}

    get categories$(): Observable<Category[]> {
        return this.cacheService.categories$;
    }

    @ViewChild("typeRef") typeRef!: ElementRef<HTMLSelectElement>;
    @ViewChild('categoryRef') categoryRef!: ElementRef<HTMLInputElement>;
    @ViewChild('amountRef') amountRef!: ElementRef<HTMLInputElement>;
    @ViewChild('dateRef') dateRef!: ElementRef<HTMLInputElement>;
    @ViewChild('descriptionRef') descriptionRef!: ElementRef<HTMLInputElement>;

    ngAfterViewInit() {
        this.dateRef.nativeElement.value = new Date().toISOString().split('T')[0];
    }

    addTransaction() {
        const type = this.typeRef.nativeElement.value === 'Расход' ? TransactionType.EXPENSE : TransactionType.INCOME;
        const dto: TransactionDTO = {
            type,
            category: String(this.categoryRef.nativeElement.value),
            amount: Number(Number(this.amountRef.nativeElement.value).toFixed(2)),
            date: String(this.dateRef.nativeElement.value),
            description: String(this.descriptionRef.nativeElement.value),
        };
        this.cacheService.addTransaction(dto).subscribe();
    }
}
