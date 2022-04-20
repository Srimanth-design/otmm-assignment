import { TestBed } from '@angular/core/testing';

import { GetDetailService } from './get-detail.service';

describe('GetDetailService', () => {
  let service: GetDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
