import { TestBed } from '@angular/core/testing';

import { ConfiguracaoEmailService } from './configuracao-email.service';

describe('ConfiguracaoEmailService', () => {
  let service: ConfiguracaoEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracaoEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
