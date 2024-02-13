import { Component, OnInit, inject } from '@angular/core';
import { Promotion } from '../../core/models/promotion.model';
import { PromotionsService } from '../../services/promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements OnInit {
  public title: string = 'Ofertas';

  public promotionsService = inject(PromotionsService);

  public promotions: Promotion[] = [];

  ngOnInit(): void {
    this.getPromotions();
  }

  private getPromotions(): void {
    this.promotionsService.getPromotions().subscribe((promotions: any) => {
      this.promotions = promotions;
    });
  }
}
