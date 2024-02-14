import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journey } from '../core/models/journey.model';
import { ResponseData } from '../core/models/response-data.model';
import { IFlight } from '../core/interfaces/flight.interface';
@Injectable({
  providedIn: 'root',
})
export default class FlightService implements IFlight {
  private flightsUrl = 'https://recruiting-api.newshore.es/api/flights/2';
  private errorMessage = 'No se pudieron cargar los vuelos';
  private pathErrorMessage = 'No se puede calcular la ruta.';
  public http = inject(HttpClient);

  public getFlights(): Observable<ResponseData[]> {
    return this.http.get<ResponseData[]>(this.flightsUrl);
  }

  public findRoute(origin: string, destination: string): Observable<Journey> {
    return new Observable((observer) => {
      this.getFlights().subscribe(
        (flights) => {
          const route = this.findRouteHelper(flights, origin, destination);
          if (route) {
            // Construir el objeto en el modelo entregado
            const journey: Journey = {
              origin: route[0].departureStation,
              destination: route[route.length - 1].arrivalStation,
              price: route.reduce((acc, flight) => acc + flight.price, 0),
              flights: route.map((flight: ResponseData) => ({
                origin: flight.departureStation,
                destination: flight.arrivalStation,
                price: flight.price,
                transport: {
                  flightCarrier: flight.flightCarrier,
                  flightNumber: flight.flightNumber,
                },
              })),
            };
            observer.next(journey);
          } else {
            observer.error(this.pathErrorMessage);
          }
        },
        (error) => {
          observer.error(this.errorMessage);
        }
      );
    });
  }

  private findRouteHelper(
    flights: ResponseData[],
    origin: string,
    destination: string
  ): ResponseData[] | undefined {
    function findAllRoutes(
      origin: string,
      currentRoute: any[],
      visited: Set<string>
    ): any[] {
      if (origin === destination) {
        return [currentRoute];
      }

      //Evitar repetidos en la ruta
      visited.add(origin);

      const possibleFlights = flights.filter(
        (flight) =>
          flight.departureStation === origin &&
          !visited.has(flight.arrivalStation)
      );

      let allRoutes: any[] = [];

      for (const flight of possibleFlights) {
        const nextRoute = [...currentRoute, flight];
        const nextVisited = new Set(visited);
        //Se utiliza recursividad para encontrar todas las rutas
        allRoutes = [
          ...allRoutes,
          ...findAllRoutes(flight.arrivalStation, nextRoute, nextVisited),
        ];
      }

      return allRoutes;
    }

    // Encuentra todas las rutas posibles
    const allRoutes = findAllRoutes(origin, [], new Set());

    // Encuentra la primera ruta encontrada
    if (allRoutes.length > 0) {
      return allRoutes[0];
    }
    {
      return undefined;
    }
  }
}
