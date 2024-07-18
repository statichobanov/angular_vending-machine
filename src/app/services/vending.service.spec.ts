import { TestBed } from '@angular/core/testing';

import { VendingService } from './vending.service';
import { ERROR_MESSAGES } from '../constanst';

fdescribe('VendingService', () => {
  let service: VendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendingService],
    });

    service = TestBed.inject(VendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate correct the insertedAmount', () => {
    service.insertCoin(0.25);
    service.insertCoin(1);

    service.insertedAmount$.subscribe((amount) => {
      expect(amount).toBe(1.25);
    });
  });

  it('should throw invalid coin denomination', () => {
    expect(() => service.insertCoin(0.05)).toThrowError(
      ERROR_MESSAGES.INVALID_DENOMINATION
    );
  });

  it('should throw error exceeded maximum amount', () => {
    service.insertCoin(10);

    expect(() => service.insertCoin(1)).toThrowError(
      ERROR_MESSAGES.EXCEEDED_INSERTED_AMOUNT
    );
  });

  it('should throw error Insufficient funds', () => {
    service.insertCoin(1);

    expect(() => service.deductAmount(10)).toThrowError(
      ERROR_MESSAGES.INSUFFICIENT_FUNDS
    );
  });

  it('should reset insertedAmount', () => {
    service.insertCoin(0.5);
    service.reset();

    service.insertedAmount$.subscribe((amount) => {
      expect(amount).toBe(0);
    });
  });

  it('should deduct from insertedAmount correctly', () => {
    service.insertCoin(1);
    service.deductAmount(0.75);

    service.insertedAmount$.subscribe((amount) => {
      expect(amount).toBe(0.25);
    });
  });

  it('should return change in denominations correctly', () => {
    service.insertCoin(10);
    service.deductAmount(3);

    const change = service.returnChangeInDenominations();

    expect(change).toEqual({ 5: 1, 1: 2 });
    service.insertedAmount$.subscribe((amount) => {
      expect(amount).toBe(0);
    });
  });
});
