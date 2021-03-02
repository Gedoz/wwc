import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoEmailComponent } from './configuracao-email.component';

describe('ConfiguracaoEmailComponent', () => {
  let component: ConfiguracaoEmailComponent;
  let fixture: ComponentFixture<ConfiguracaoEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracaoEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
