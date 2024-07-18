import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import {
  nameValidator,
  priceValidator,
  quantityValidator,
} from 'src/app/validators/common';
import { ERROR_MESSAGES } from 'src/app/constanst';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() submitButtonText: string = 'Add';
  @Output() formSubmit = new EventEmitter<Product>();

  productForm!: FormGroup;
  readonly errorMessages = ERROR_MESSAGES;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      price: [0, [Validators.required, priceValidator]],
      quantity: [0, [Validators.required, quantityValidator]],
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.formSubmit.emit(this.productForm.value);
    }
  }
}
