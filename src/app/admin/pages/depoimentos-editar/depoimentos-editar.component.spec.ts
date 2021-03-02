import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoimentosEditarComponent } from './depoimentos-editar.component';

describe('DepoimentosEditarComponent', () => {
  let component: DepoimentosEditarComponent;
  let fixture: ComponentFixture<DepoimentosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepoimentosEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepoimentosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
