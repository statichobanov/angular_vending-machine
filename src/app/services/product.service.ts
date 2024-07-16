import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private products = new BehaviorSubject<Product[]>([]);

  products$ = this.products.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(tap((products) => this.products.next(products)));
  }

  getProductById(id: number): Product | undefined {
    return this.products.getValue().find((product) => product.id === id);
  }
}
