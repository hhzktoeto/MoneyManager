import {Component, computed, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StoreService} from "../../services/store.service";

@Component({
  standalone: true,
  selector: 'app-total-incomes',
  imports: [CommonModule],
  templateUrl: './total-incomes.component.html',
  styleUrl: './total-incomes.component.scss'
})
export class TotalIncomesComponent {
  private readonly storeService = inject(StoreService);

  readonly totalAmount = computed(() => {
    return this.storeService.transactions()
        .filter(transaction => transaction.type === "INCOME")
        .reduce((sum, transaction) => {
          return sum + transaction.amount;
        }, 0);
  })
}
