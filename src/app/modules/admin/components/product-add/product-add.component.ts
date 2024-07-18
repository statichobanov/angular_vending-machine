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
export class ProductAddComponent {
  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(newProduct: Product): void {
    newProduct.id = this.generateRandomId();

    this.productService.addProduct(newProduct);

    this.router.navigate(['/admin']);
  }

  private generateRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
