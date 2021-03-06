import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTotalSaleComponent } from './modal-total-sale.component';

describe('ModalTotalSaleComponent', () => {
  let component: ModalTotalSaleComponent;
  let fixture: ComponentFixture<ModalTotalSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTotalSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTotalSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
