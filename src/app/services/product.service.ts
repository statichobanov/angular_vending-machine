import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { MAX_PRODUCTS_LIMIT, MIN_PRODUCTS_LIMIT } from '../constanst/common';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private products = new BehaviorSubject<Product[]>([]);

  products$ = this.products.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts(): void {
    this.http
      .get<Product[]>(this.apiUrl)
      .subscribe((products) => this.products.next(products));
  }

  getProductById(id: number): Product | undefined {
    return this.products
      .getValue()
      .find((product) => Number(product.id) === id);
  }

  addProduct(newProduct: Product): void {
    const currentProducts = this.products.getValue();

    if (currentProducts.length >= MAX_PRODUCTS_LIMIT) {
      throw new Error('Exceeded products limit');
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
      throw new Error('There must be atleast one product in stock');
    }

    const updatedProducts = currentProducts.filter(
      (product) => product.id !== productId
    );
    this.products.next(updatedProducts);
  }
}
