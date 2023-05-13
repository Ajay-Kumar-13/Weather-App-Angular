import { TestBed } from '@angular/core/testing';

import { weatherService } from './weather.service';

describe('ServeService', () => {
  let service: weatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(weatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
