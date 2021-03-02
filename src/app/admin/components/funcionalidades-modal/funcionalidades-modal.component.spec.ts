import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionalidadesModalComponent } from './funcionalidades-modal.component';

describe('FuncionalidadesModalComponent', () => {
  let component: FuncionalidadesModalComponent;
  let fixture: ComponentFixture<FuncionalidadesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionalidadesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionalidadesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
