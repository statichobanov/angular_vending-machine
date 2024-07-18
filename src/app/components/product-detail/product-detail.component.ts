import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { VendingService } from 'src/app/services/vending.service';
import { Product } from '../../models/product';
import { MESSAGE } from '../../constanst';
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

        this.productService.decreaseProductQuantity(this.product.id);

        const changeDenominations =
          this.vendingService.returnChangeInDenominations();

        const changeMessage = Object.entries(changeDenominations)
          .map(([denomination, count]) => `${count} x $${denomination}`)
          .join(', ');

        alert(`${MESSAGE.SUCCESSFULL_PURCHASE}. Your change: ${changeMessage}`);

        this.router.navigate(['/product-list']);
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      alert(MESSAGE.INSUFFICIENT_AMOUNT);
    }
  }
}
