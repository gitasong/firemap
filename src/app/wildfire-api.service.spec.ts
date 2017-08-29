import { TestBed, inject } from '@angular/core/testing';

import { WildfireApiService } from './wildfire-api.service';

describe('WildfireApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WildfireApiService]
    });
  });

  it('should ...', inject([WildfireApiService], (service: WildfireApiService) => {
    expect(service).toBeTruthy();
  }));
});
