import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Journey } from '../../core/models/journey.model';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnChanges {
  public currency: string = 'USD';
  @Input() flightPathResults!: Journey;

  ngOnChanges(changes: SimpleChanges): void {
    localStorage.setItem('flightPathResults', JSON.stringify(this.flightPathResults));
    this.currencyService.getCurrency().subscribe((currency) => {
      this.currency = `${currency} `;
      this.flightPathResults = this.mapCurrency(currency);
    });
  }

  public currencyService = inject(CurrencyService);

  public mapCurrency(currency: string): Journey {
    let flightPathResultsString: Journey = JSON.parse(localStorage.getItem('flightPathResults') as string);
    return {
      origin: flightPathResultsString.origin,
      destination: flightPathResultsString.destination,
      flights: [
        ...flightPathResultsString.flights.map((flight) => ({
          ...flight,
          price: Math.trunc(this.currencyService.convertCurrency(flight.price, currency)),
        }))
      ],
      price: Math.trunc(this.currencyService.convertCurrency(
        flightPathResultsString.price,
        currency
      )),
    };
  }
}
