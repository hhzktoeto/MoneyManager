import {Component} from '@angular/core';
import {TabName} from '../constants/tab-name';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {AddTransactionComponent} from '../add-transaction/add-transaction.component';
import {ShowPeriod} from '../constants/show-period';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderComponent, AddTransactionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  activeTab: TabName = TabName.MAIN;
  currentShowPeriod: ShowPeriod = ShowPeriod.CURRENT_MONTH

  setTab(tab: string): void {
    this.activeTab = tab as TabName;
  }

  changeShowPeriod(period: string): void {
    this.currentShowPeriod = period as ShowPeriod;
  }

  protected readonly TabName = TabName;
  protected readonly ShowPeriod = ShowPeriod;
  protected readonly Object = Object;
}
