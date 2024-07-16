import { Component, OnInit } from '@angular/core';
import { VendingService } from '../../services/vending.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss'],
})
export class VendingMachineComponent implements OnInit {
  insertedAmount: number = 0;

  constructor(private vendingService: VendingService) {}

  ngOnInit(): void {
    this.vendingService.insertedAmount$.subscribe((amount) => {
      this.insertedAmount = amount;
    });
  }

  insertCoin(denomination: number): void {
    try {
      this.vendingService.insertCoin(denomination);
    } catch (error: any) {
      alert(error.message);
    }
  }

  reset(): void {
    this.vendingService.reset();
  }
}
