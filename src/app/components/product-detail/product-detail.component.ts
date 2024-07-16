import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { VendingService } from 'src/app/services/vending.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  insertedAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private vendingService: VendingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductDetail();
    this.vendingService.insertedAmount$.subscribe((amount) => {
      this.insertedAmount = amount;
    });
  }

  getProductDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.product = this.productService.getProductById(id)!;

    if (!this.product) {
      this.router.navigate(['/product-list']);
    }
  }

  buyProduct(): void {
    if (this.insertedAmount >= this.product.price) {
      try {
        this.vendingService.deductAmount(this.product.price);
        // Decrease product quantity (implement this logic as needed)
        alert('Product purchased successfully');
        this.router.navigate(['/product-list']);
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      alert('Insufficient amount. Please insert more coins.');
    }
  }
}
