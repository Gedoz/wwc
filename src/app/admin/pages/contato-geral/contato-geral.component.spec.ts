import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoGeralComponent } from './contato-geral.component';

describe('ContatoGeralComponent', () => {
  let component: ContatoGeralComponent;
  let fixture: ComponentFixture<ContatoGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatoGeralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
