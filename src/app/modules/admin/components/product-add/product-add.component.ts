import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ERROR_MESSAGES } from 'src/app/constanst';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(newProduct: Product): void {
    newProduct.id = this.generateRandomId();

    try {
      this.productService.addProduct(newProduct);

      this.router.navigate(['/admin']);
    } catch (error: any) {
      this.errorMessage = error.message || ERROR_MESSAGES.UNEXPECTED_ERROR;
    }
  }

  private generateRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
