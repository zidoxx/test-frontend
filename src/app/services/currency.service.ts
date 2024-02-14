import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  private currencySubject: BehaviorSubject<string> = new BehaviorSubject<string>('USD');

  public changeCurrency(currency: string): void {
    this.currencySubject.next(currency);
  }

  public getCurrency(): Observable<string> {
    return this.currencySubject.asObservable();
  }

  private conversionRates: Record<string, number> = {
    'USD': 1,
    'EUR': 1.12,
    'COP': 3700
  };

  public convertCurrency(value: number, currency: string): number {
    const conversionRate = this.conversionRates[currency];
    return value * (conversionRate || parseFloat(currency) || 1);
  }
}
