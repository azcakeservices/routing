import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface IProduct {
  id?: string;
  name: string;
  price: number;
  status: string;
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  animation: 'open' | 'closed' = 'closed';
  mode: 'add' | 'edit' = 'add';
  productForm: FormGroup;
  selectedProduct: IProduct | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  openAddModal() {
    this.mode = 'add';
    this.selectedProduct = null;
    this.productForm.reset();
    this.animation = 'open';
  }

  openEditModal(product: IProduct) {
    this.mode = 'edit';
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.animation = 'open';
  }

  closeModal() {
    this.animation = 'closed';
  }

  save() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;

    let payload: { product: IProduct };

    if (this.mode === 'add') {
      const newProduct: IProduct = {
        ...formValue,
        status: 'active'
      };
      payload = { product: newProduct };
      console.log('Добавление:', payload);
      // this.apiService.createProduct(payload).subscribe(...)
    } else {
      const updatedProduct: IProduct = {
        ...this.selectedProduct!,
        ...formValue
      };
      payload = { product: updatedProduct };
      console.log('Обновление:', payload);
      // this.apiService.updateProduct(payload).subscribe(...)
    }

    this.closeModal();
  }
}
