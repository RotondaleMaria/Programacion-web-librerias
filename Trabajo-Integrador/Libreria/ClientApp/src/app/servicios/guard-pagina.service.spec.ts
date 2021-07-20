import { TestBed } from '@angular/core/testing';

import { GuardPaginaService } from './guard-pagina.service';

describe('GuardPaginaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardPaginaService = TestBed.get(GuardPaginaService);
    expect(service).toBeTruthy();
  });
});
