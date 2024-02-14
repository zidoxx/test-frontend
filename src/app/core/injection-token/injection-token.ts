import { InjectionToken } from "@angular/core";
import FlightService from "../../services/flight.service";
import { IFlight } from "../interfaces/flight.interface";

export const FLIGHT_SERVICE = new InjectionToken<IFlight>('FlightService');
export const flightProvider = [{provide: FLIGHT_SERVICE, useClass: FlightService}];
