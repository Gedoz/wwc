import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriasEditarComponent } from './consultorias-editar.component';

describe('ConsultoriasEditarComponent', () => {
  let component: ConsultoriasEditarComponent;
  let fixture: ComponentFixture<ConsultoriasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultoriasEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultoriasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
