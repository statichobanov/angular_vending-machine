import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendingService {
  private insertedAmount = new BehaviorSubject<number>(0);
  insertedAmount$ = this.insertedAmount.asObservable();

  private maxInsertedAmount = 10;
  private acceptedCoins: number[] = [0.1, 0.25, 0.5, 1];

  insertCoin(denomination: number): void {
    if (this.acceptedCoins.includes(denomination)) {
      const newAmount = this.insertedAmount.value + denomination;

      if (newAmount > this.maxInsertedAmount) {
        throw new Error('Exceeded maximum inserted amount');
      }

      this.insertedAmount.next(newAmount);
    } else {
      throw new Error('Invalid coin denomination');
    }
  }

  reset(): void {
    this.insertedAmount.next(0);
  }

  deductAmount(amount: number): void {
    if (this.insertedAmount.value >= amount) {
      this.insertedAmount.next(this.insertedAmount.value - amount);
    } else {
      throw new Error('Insufficient funds');
    }
  }
}
