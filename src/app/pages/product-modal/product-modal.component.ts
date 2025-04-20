import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnChanges {
  @Input() visible = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() productData: any = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mode === 'edit' && this.productData) {
      this.productForm.patchValue(this.productData);
    } else if (this.mode === 'add') {
      this.productForm.reset();
    }
  }

  save() {
    if (this.productForm.valid) {
      this.onSave.emit({
        mode: this.mode,
        data: this.productForm.value
      });
    }
  }

  close() {
    this.onClose.emit();
  }
}
