import { TestBed, inject } from '@angular/core/testing';

import { AddresseService } from './addresse.service';

describe('AddresseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddresseService]
    });
  });

  it('should be created', inject([AddresseService], (service: AddresseService) => {
    expect(service).toBeTruthy();
  }));
});
