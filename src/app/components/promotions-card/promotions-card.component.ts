import { Component, Input } from '@angular/core';
import { Promotion } from '../../core/models/promotion.model';

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
}
