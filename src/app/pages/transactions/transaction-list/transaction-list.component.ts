import { Component } from '@angular/core';
import { BreadCrumbComponent } from '../../bread-crumb/bread-crumb.component';

@Component({
  selector: 'app-transaction-list',
  imports: [BreadCrumbComponent],
  standalone: true,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {

}
