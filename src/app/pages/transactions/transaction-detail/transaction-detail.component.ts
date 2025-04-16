import { Component } from '@angular/core';
import { BreadCrumbComponent } from '../../bread-crumb/bread-crumb.component';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [BreadCrumbComponent],
  template: `
    <app-bread-crumb></app-bread-crumb>
    <p>Transaction detail works!</p>
  `,
})
export class TransactionDetailComponent {}
