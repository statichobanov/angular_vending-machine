import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VendingService } from '../../services/vending.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss'],
})
export class VendingMachineComponent implements OnInit {
  insertedAmount: number = 0;

  constructor(private vendingService: VendingService, private router: Router) {}

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

  navigateToAdministration(): void {
    this.router.navigate([`/admin`]);
  }
}
