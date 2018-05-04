import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseByIdComponent } from './adresse-by-id.component';

describe('AdresseByIdComponent', () => {
  let component: AdresseByIdComponent;
  let fixture: ComponentFixture<AdresseByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdresseByIdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresseByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
