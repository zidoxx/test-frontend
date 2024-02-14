import { Component, Input } from '@angular/core';
import { Promotion } from '../../core/models/promotion.model';
import { Currency } from '../../core/enums/currency.enum';

@Component({
  selector: 'app-promotions-card',
  templateUrl: './promotions-card.component.html',
  styleUrl: './promotions-card.component.scss',
})
export class PromotionsCardComponent {
  public promotionPath: string = '../../../assets/images/cards/';
  public promotionCaption: string = 'Por trayecto desde';
  @Input() promotion: Promotion = {} as Promotion;

  public getPromotionImg(): string {
    return `${this.promotionPath}${this.promotion.img}`;
  }

  private promotions: Record<string, string> = {
    [Currency.USD]: `${Currency.USD} `,
    [Currency.EUR]: `${Currency.EUR} `,
    [Currency.COP]: `${Currency.COP} `
  };

  public getPromotionCurrency(currency: string): string {
    return this.promotions[currency] || this.promotions[Currency.USD];
  }
}
