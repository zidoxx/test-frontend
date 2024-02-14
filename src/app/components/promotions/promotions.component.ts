import { Component, OnInit, inject } from '@angular/core';
import { Promotion } from '../../core/models/promotion.model';
import { PromotionsService } from '../../services/promotions.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements OnInit {
  public title: string = 'Ofertas';

  public currencyService = inject(CurrencyService);
  public promotionsService = inject(PromotionsService);
  public promotions: Promotion[] = [];

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe((currency) => {
      this.promotions = this.mapCurrency(currency);
    });
    this.getPromotions();
  }

  private getPromotions(): void {
    this.promotionsService.getPromotions().subscribe((promotions: any) => {
      localStorage.setItem('promotions', JSON.stringify(promotions));
      this.promotions = promotions;
    });
  }

  public mapCurrency(currency: string): Promotion[] {
    let promotionsSaved = JSON.parse(localStorage.getItem('promotions') as string);
    return promotionsSaved.map((promotion: Promotion) => {
      let promotionClone = Object.create(promotion);
      return {
        ...promotion,
        currency: currency,
        price: Math.trunc(this.currencyService.convertCurrency(promotionClone.price, currency)),
      };
    });
  }
}
