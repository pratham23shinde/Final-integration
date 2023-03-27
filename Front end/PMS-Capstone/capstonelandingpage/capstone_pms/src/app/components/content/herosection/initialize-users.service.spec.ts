import { TestBed } from '@angular/core/testing';

import { InitializeUsersService } from './initialize-users.service';

describe('InitializeUsersService', () => {
  let service: InitializeUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitializeUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
