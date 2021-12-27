import { TestBed } from '@angular/core/testing';

import { FlashService } from './flash.service';

describe('FlashService', () => {
  let service: FlashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
