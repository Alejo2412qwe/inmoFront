import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprovantesComponent } from './comprovantes.component';

describe('ComprovantesComponent', () => {
  let component: ComprovantesComponent;
  let fixture: ComponentFixture<ComprovantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprovantesComponent]
    });
    fixture = TestBed.createComponent(ComprovantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
