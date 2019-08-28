import { TestBed } from '@angular/core/testing';

import { HasNotificationsService } from './has-notifications.service';

describe('HasNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HasNotificationsService = TestBed.get(HasNotificationsService);
    expect(service).toBeTruthy();
  });
});
