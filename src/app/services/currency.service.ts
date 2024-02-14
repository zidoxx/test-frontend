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

  public convertCurrency(value: number, currency: string): number {
    if(currency === 'USD') {
      return value;
    }
    if(currency === 'EUR') {
      return value * 1.12;
    }
    if(currency === 'COP') {
      return value * 3700;
    }
    return value * parseFloat(currency);
  }
}
