import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TransactionDTO} from '../types/transaction';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TransactionsService} from '../services/transactions.service';
import {CategoryService} from '../services/category.service';
import {TransactionType} from '../constants/transaction-type';
import {Category} from '../types/category';

@Component({
  standalone: true,
  selector: 'app-add-transaction',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss'
})

export class AddTransactionComponent implements OnInit {
  @ViewChild("typeRef") typeRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('categoryRef') categoryRef!: ElementRef<HTMLInputElement>;
  @ViewChild('amountRef') amountRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dateRef') dateRef!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionRef') descriptionRef!: ElementRef<HTMLInputElement>;

  categories: Array<Category> = [];

  constructor(
    private transactionsService: TransactionsService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.dateRef.nativeElement.value = new Date().toISOString().split('T')[0];
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
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
    this.transactionsService.create(dto).subscribe();
  }
}
