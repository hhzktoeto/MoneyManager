import {Component, computed, inject} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {CommonModule} from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-current-balance',
    imports: [CommonModule],
    templateUrl: './current-balance.component.html',
    styleUrl: './current-balance.component.scss'
})
export class CurrentBalanceComponent {
    private readonly storeService = inject(StoreService);

    readonly totalAmount = computed(() => {
        return this.storeService.transactions()
            .reduce((sum, transaction) => {
                return transaction.type === "INCOME"
                    ? sum + transaction.amount
                    : sum - transaction.amount;
            }, 0);
    })
}
