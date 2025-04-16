import { Component } from '@angular/core';
import { BreadCrumbComponent } from '../../bread-crumb/bread-crumb.component';

@Component({
  selector: 'app-card-product-detail',
  standalone: true,
  imports: [BreadCrumbComponent],
  template: `
    <app-bread-crumb></app-bread-crumb>
    <p>Product detail works!</p>
  `,
})
export class CardProductDetailComponent {}
