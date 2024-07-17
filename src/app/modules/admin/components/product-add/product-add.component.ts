import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  nameValidator,
  priceValidator,
  quantityValidator,
} from 'src/app/validators/common';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      price: [0, [Validators.required, priceValidator]],
      quantity: [0, [Validators.required, quantityValidator]],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: this.generateRandomId(),
        ...this.productForm.value,
      };

      this.productService.addProduct(newProduct);

      this.router.navigate(['/admin']);
    }
  }

  private generateRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
