import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerComponent } from './practitioner.component';

describe('PractitionerCreateComponent', () => {
  let component: PractitionerComponent;
  let fixture: ComponentFixture<PractitionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PractitionerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
