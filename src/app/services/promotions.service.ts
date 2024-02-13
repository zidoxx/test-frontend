import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Promotion } from "../models/promotion.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  public fakeDataAPI = '../../assets/fake-data';
  public http = inject(HttpClient);

  public getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.fakeDataAPI}/promotions.json`);
  }
}
