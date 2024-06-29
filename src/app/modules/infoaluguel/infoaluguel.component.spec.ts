import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoaluguelComponent } from './infoaluguel.component';

describe('InfoaluguelComponent', () => {
  let component: InfoaluguelComponent;
  let fixture: ComponentFixture<InfoaluguelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoaluguelComponent]
    });
    fixture = TestBed.createComponent(InfoaluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
