// src/app/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId);
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/admin/product-add']);
  }
}
