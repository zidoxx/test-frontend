import { Component } from '@angular/core';
import { Promotion } from '../../models/promotion.model';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent {

  public title: string = 'Ofertas';

  public promotions: Promotion[] = [
    {
      name: 'Promoción 1',
      location: 'PEREIRA',
      currency: 'USD',
      price: 1000,
      img: 'card1.jpeg'
    },
    {
      name: 'Promoción 2',
      location: 'MANIZALES',
      currency: 'USD',
      price: 2000,
      img: 'card2.jpeg'
    },
    {
      name: 'Promoción 3',
      location: 'CARTAGENA',
      currency: 'USD',
      price: 3000,
      img: 'card3.jpeg'
    }
  ]

}
