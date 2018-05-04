import { TestBed, inject } from '@angular/core/testing';

import { AlerteService } from './alerte.service';

describe('AlerteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlerteService]
    });
  });

  it('should be created', inject([AlerteService], (service: AlerteService) => {
    expect(service).toBeTruthy();
  }));
});
