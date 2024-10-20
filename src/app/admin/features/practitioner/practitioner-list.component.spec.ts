import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerListComponent } from './practitioner-list.component';

describe('PractitionerComponent', () => {
  let component: PractitionerListComponent;
  let fixture: ComponentFixture<PractitionerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PractitionerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
