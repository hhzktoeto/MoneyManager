import {Component, inject, signal} from '@angular/core';
import {TransactionDTO} from '../../types/transaction';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionType} from '../../constants/transaction-type';
import {StoreService} from "../../services/store.service";

@Component({
    standalone: true,
    selector: 'app-add-transaction',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-transaction.component.html',
    styleUrl: './add-transaction.component.scss'
})

export class AddTransactionComponent {
    private readonly storeService = inject(StoreService);
    private readonly formBuilder = inject(FormBuilder);

    readonly form = this.formBuilder.group({
        type: ["Расход", Validators.required],
        category: ["", Validators.required],
        amount: [null, Validators.required],
        date: [new Date().toISOString().split("T")[0], Validators.required],
        description: [""]
    })

    categoriesSig = this.storeService.categories
    errorMessage = signal<string | null>(null);
    isLoading = signal(false);

    async addTransaction() {
        this.errorMessage.set(null);
        if (this.form.invalid) {
            this.errorMessage.set("Не заполнены все обязательные поля");
            return;
        }

        this.isLoading.set(true);
        try {
            const formValues = this.form.value;
            const type = formValues.type === 'Расход'
                ? TransactionType.EXPENSE
                : TransactionType.INCOME;

            const dto: TransactionDTO = {
                type,
                category: formValues.category!,
                amount: formValues.amount!,
                date: formValues.date!,
                description: formValues.description ?? "",
            };
            await this.storeService.addTransaction(dto);
            this.form.patchValue({amount: null, description: ""})
        } catch (err) {
            this.errorMessage.set("Ошибка при добавлении транзакции");
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }
}
