import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import {
  ERROR_MESSAGES,
  MAX_PRODUCTS_LIMIT,
  MIN_PRODUCTS_LIMIT,
} from '../constanst';
import { environment } from '@env';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private products = new BehaviorSubject<Product[]>([]);

  products$ = this.products.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadProducts(): void | any {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (products) => this.products.next(products),
      error: (e) => this.router.navigate(['/error']),
    });
  }

  getProductById(id: number): Product | undefined {
    return this.products
      .getValue()
      .find((product) => Number(product.id) === id);
  }

  addProduct(newProduct: Product): void {
    const currentProducts = this.products.getValue();

    if (currentProducts.length >= MAX_PRODUCTS_LIMIT) {
      throw new Error(ERROR_MESSAGES.EXCEEDED_PRODUCT_LIMIT);
    }

    this.products.next([...currentProducts, newProduct]);
  }

  updateProduct(updatedProduct: Product): void {
    const currentProducts = this.products.getValue();
    const updatedProducts = currentProducts.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.products.next(updatedProducts);
  }

  deleteProduct(productId: number): void {
    const currentProducts = this.products.getValue();

    if (currentProducts.length === MIN_PRODUCTS_LIMIT) {
      throw new Error(ERROR_MESSAGES.MIN_PRODUCT_LIMIT);
    }

    const updatedProducts = currentProducts.filter(
      (product) => product.id !== productId
    );
    this.products.next(updatedProducts);
  }

  decreaseProductQuantity(productId: number): void {
    const currentProducts = this.products.getValue();
    const productToUpdate = currentProducts.find(
      (product) => product.id === productId
    );

    if (productToUpdate) {
      const updatedQuantity = productToUpdate.quantity - 1;

      if (updatedQuantity <= 0) {
        this.deleteProduct(productId);
      } else {
        const updatedProduct = {
          ...productToUpdate,
          quantity: updatedQuantity,
        };
        const updatedProducts = currentProducts.map((product) =>
          product.id === productId ? updatedProduct : product
        );
        this.products.next(updatedProducts);
      }
    }
  }
}
