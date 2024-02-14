import { Observable } from 'rxjs';
import { ResponseData } from '../models/response-data.model';
import { Journey } from '../models/journey.model';

export interface IFlight {
  getFlights() :Observable<ResponseData[]>;
  findRoute(origin: string, destination: string): Observable<Journey>;
}
