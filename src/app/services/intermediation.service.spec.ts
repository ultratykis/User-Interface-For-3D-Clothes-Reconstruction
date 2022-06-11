import { TestBed } from '@angular/core/testing';

import { IntermediationService } from './intermediation.service';

describe('IntermediationService', () => {
  let service: IntermediationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntermediationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
