import {Component, computed, inject, signal} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {SortingRules, TransactionUtils} from "../../utils/transactions.utils";
import {TransactionFieldName} from "../../constants/transaction-field-name";
import {SortingDirection} from "../../constants/sorting-direction";
import {FormattingUtils} from "../../utils/formatting.utils";
import {NgIf} from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-transactions-history',
    imports: [
        NgIf
    ],
    templateUrl: './transactions-history.component.html',
    styleUrl: './transactions-history.component.scss'
})
export class TransactionsHistoryComponent {
    private readonly storeService = inject(StoreService);

    readonly transactionsSig = this.storeService.transactions;
    readonly hoveredIdSig = signal<number | null>(null);

    sortingSig = signal<SortingRules>({
        sortingBy: TransactionFieldName.DATE,
        direction: SortingDirection.DESC
    });

    readonly transactions = computed(() => {
        console.log("sorting transactions history by", this.sortingSig())
        return TransactionUtils.sort(this.transactionsSig(), this.sortingSig())
    })

    toggleSorting(fieldName: string): void {
        const field = fieldName as TransactionFieldName;
        this.sortingSig.update(previous => {
            if (previous.sortingBy === field) {
                return {
                    sortingBy: field,
                    direction: previous.direction === SortingDirection.ASC ? SortingDirection.DESC : SortingDirection.ASC
                };
            }
            return {
                sortingBy: field,
                direction: SortingDirection.DESC
            };
        })
    }

    async delete(id: number): Promise<void> {
        await this.storeService.deleteTransaction(id);
    }

    protected readonly TransactionFieldName = TransactionFieldName;
    protected readonly Object = Object;
    protected readonly FormattingUtils = FormattingUtils;
}
