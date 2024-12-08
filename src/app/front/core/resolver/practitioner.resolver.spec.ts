import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { practitionerResolver } from './practitioner.resolver';

describe('practitionerResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => practitionerResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
