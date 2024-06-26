import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugueisComponent } from './alugueis.component';

describe('AlugueisComponent', () => {
  let component: AlugueisComponent;
  let fixture: ComponentFixture<AlugueisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlugueisComponent]
    });
    fixture = TestBed.createComponent(AlugueisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
