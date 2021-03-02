import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiosEditarComponent } from './beneficios-editar.component';

describe('BeneficiosEditarComponent', () => {
  let component: BeneficiosEditarComponent;
  let fixture: ComponentFixture<BeneficiosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiosEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
