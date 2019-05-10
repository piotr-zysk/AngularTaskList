import { TestBed } from '@angular/core/testing';

import { FromEventService } from './from-event.service';

describe('FromEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FromEventService = TestBed.get(FromEventService);
    expect(service).toBeTruthy();
  });
});
