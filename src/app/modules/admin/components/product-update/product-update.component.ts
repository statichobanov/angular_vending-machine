import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  nameValidator,
  priceValidator,
  quantityValidator,
} from 'src/app/validators/common';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      price: [0, [Validators.required, priceValidator]],
      quantity: [0, [Validators.required, quantityValidator]],
    });

    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.product = this.productService.getProductById(productId)!;

    this.prefillForm(this.product);
  }

  prefillForm(product: Product): void {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  }

  onSubmit(updatedProduct: Product): void {
    const productToUpdate = { ...this.product, ...updatedProduct };

    this.productService.updateProduct(productToUpdate);

    this.router.navigate(['/admin']);
  }
}
