import { Component } from '@angular/core';
import { BreadCrumbComponent } from '../../bread-crumb/bread-crumb.component';

@Component({
  selector: 'app-card-product',
  imports: [BreadCrumbComponent],
  standalone: true,
  templateUrl: 'card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {}
