import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiosCriarComponent } from './beneficios-criar.component';

describe('BeneficiosCriarComponent', () => {
  let component: BeneficiosCriarComponent;
  let fixture: ComponentFixture<BeneficiosCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiosCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiosCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
