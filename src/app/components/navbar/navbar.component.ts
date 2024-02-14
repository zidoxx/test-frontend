import { Component, inject } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public currencyService = inject(CurrencyService);
  public setCurrency(currency: string): void {
    this.currencyService.changeCurrency(currency);
  }
}
