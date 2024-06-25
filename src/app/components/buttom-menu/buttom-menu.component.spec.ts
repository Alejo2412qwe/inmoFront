import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomMenuComponent } from './buttom-menu.component';

describe('ButtomMenuComponent', () => {
  let component: ButtomMenuComponent;
  let fixture: ComponentFixture<ButtomMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtomMenuComponent]
    });
    fixture = TestBed.createComponent(ButtomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
