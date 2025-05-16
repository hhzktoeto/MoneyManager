import {Component, computed, inject} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {CommonModule} from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-total-expenses',
    imports: [CommonModule],
    templateUrl: './total-expenses.component.html',
    styleUrl: './total-expenses.component.scss'
})
export class TotalExpensesComponent {
    private readonly storeService = inject(StoreService);

    readonly totalAmount = computed(() => {
        return this.storeService.transactions()
            .filter(transaction => transaction.type === "EXPENSE")
            .reduce((sum, transaction) => {
                return sum + transaction.amount;
            }, 0);
    })
}
