import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import FlightService from './flight.service';

describe('FlightService', () => {
  let service: FlightService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightService],
    });
    service = TestBed.inject(FlightService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch flights from API', () => {
    const mockResponse = [
      {
        departureStation: 'MZL',
        arrivalStation: 'MDE',
        flightCarrier: 'CO',
        flightNumber: '8001',
        price: 200,
      },
    ];

    service.getFlights().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      'https://recruiting-api.newshore.es/api/flights/2'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should find route between origin and destination', () => {
    const mockFlights = [
      {
        departureStation: 'MZL',
        arrivalStation: 'MDE',
        flightCarrier: 'CO',
        flightNumber: '8001',
        price: 200,
      },
    ];

    spyOn(service, 'getFlights').and.returnValue(mockFlights as any);

    service.findRoute('A', 'B').subscribe((data) => {
      expect(data.origin).toEqual('A');
      expect(data.destination).toEqual('B');
      expect(data.price).toEqual(100);
      // You can add more expectations here
    });
  });

  // Add more test cases as needed
});
