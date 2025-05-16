import {Component} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [DashboardComponent],
    templateUrl: 'app.component.html',
})
export class AppComponent {
}
