import { TestBed, inject } from '@angular/core/testing';

import { PoubelleService } from './poubelle.service';

describe('PoubelleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoubelleService]
    });
  });

  it('should be created', inject([PoubelleService], (service: PoubelleService) => {
    expect(service).toBeTruthy();
  }));
});
