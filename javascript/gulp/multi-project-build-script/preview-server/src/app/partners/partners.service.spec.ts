import { TestBed } from '@angular/core/testing';

import { PartnersServiceService } from './partners-service.service';

describe('PartnersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartnersServiceService = TestBed.get(PartnersServiceService);
    expect(service).toBeTruthy();
  });
});
