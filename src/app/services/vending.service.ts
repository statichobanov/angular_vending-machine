import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ERROR_MESSAGES } from '../constanst';

@Injectable({
  providedIn: 'root',
})
export class VendingService {
  private insertedAmount = new BehaviorSubject<number>(0);
  insertedAmount$ = this.insertedAmount.asObservable();

  private maxInsertedAmount = 10;
  private acceptedCoins: number[] = [0.1, 0.25, 0.5, 1, 5, 10];

  getAcceptedCoins(): number[] {
    return this.acceptedCoins;
  }

  insertCoin(denomination: number): void {
    if (this.acceptedCoins.includes(denomination)) {
      const newAmount = this.insertedAmount.value + denomination;

      if (newAmount > this.maxInsertedAmount) {
        throw new Error(ERROR_MESSAGES.EXCEEDED_INSERTED_AMOUNT);
      }

      this.insertedAmount.next(newAmount);
    } else {
      throw new Error(ERROR_MESSAGES.INVALID_DENOMINATION);
    }
  }

  reset(): void {
    this.insertedAmount.next(0);
  }

  deductAmount(amount: number): void {
    if (this.insertedAmount.value >= amount) {
      this.insertedAmount.next(this.insertedAmount.value - amount);
    } else {
      throw new Error(ERROR_MESSAGES.INSUFFICIENT_FUNDS);
    }
  }

  returnChangeInDenominations(): Record<number, number> {
    let change = this.insertedAmount.value;
    const changeDenominations: Record<number, number> = {};

    this.acceptedCoins
      .sort((a, b) => b - a)
      .forEach((coin) => {
        const count = Math.floor(change / coin);
        if (count > 0) {
          changeDenominations[coin] = count;
          change -= count * coin;
        }
      });

    this.reset();
    return changeDenominations;
  }
}
